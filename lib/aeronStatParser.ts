/*
 * Copyright 2020-2021 Shaun Laurens
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AeronStatParsed, SendSocket, ReceiveSocket, TopLevelAeronStats, AeronStatSubscription,
         AeronStatPublication, defaultStreams, AeronStatFeatureDetected, AeronStatInternalFlow, AeronClusterDetails, consensusModuleStateValues, clusterNodeRoleValues, clusterElectionStateValues } from "./aeronStatTypes";

export function parseAeronStat(stats: string) : AeronStatParsed {
    const lines = stats.split("\n");
    const firstLine = lines[0];
    const secondLine = lines[1];
    const lastLine = lines[lines.length - 1];
    if (isInvalidContents(firstLine, secondLine, lastLine)) {
        return {
            error: "Not enough lines in stats",
            pid: -1,
            timestamp : '',
            heartbeatAgeMs : -1,
            topLevelAeronStats: undefined,
            aeronStatFeaturesDetected : [],
            aeronStatPublications : [],
            aeronStatSubscriptions : [],
            sendSockets : [],
            receiveSockets : [],
            internalFlows : [],
            clusterData : undefined
        }
    }  

    //first line items
    const pidSection = firstLine.split(",")[1];
    const pid = pidSection.split(" ")[2];
    const timestamp = firstLine.split(" ")[0];  
    const heartbeatAgeMs = firstLine.split(",")[2].split(" ")[3].replace("ms", "");

    //rest of file
    const topLevelAeronStats = parseTopLevelAeronStats(lines);

    //send sockets
    const sendSockets = parseSendSockets(lines);

    //receive sockets
    const receiveSockets = parseReceiveSockets(lines);
    
    //publications
    const publications = parsePublications(lines);
    
    //subscriptions
    const subscriptions = parseSubscriptions(lines);

    const internalFlows = parseInternalFlows(publications, subscriptions);
    
    //feature detection
    const aeronStatFeaturesDetected = parseAeronStatFeaturesDetected(lines);
    
    //archive
    const clusterData = parseClusterData(lines);
    //cluster
    //artio

    return {
        error: "WIP",
        pid: parseInt(pid),
        timestamp : timestamp,
        heartbeatAgeMs : parseInt(heartbeatAgeMs),
        topLevelAeronStats: topLevelAeronStats,
        aeronStatFeaturesDetected : aeronStatFeaturesDetected,
        aeronStatPublications : publications,
        aeronStatSubscriptions : subscriptions,
        sendSockets : sendSockets,
        receiveSockets : receiveSockets,
        internalFlows : internalFlows,
        clusterData : clusterData
    }
}

function parseSubscriptions(lines: string[]) : AeronStatSubscription[] {
    const aeronStatSubscriptions: AeronStatSubscription[] = [];

    const sessions = new Set<string>();
    //step 1: find all the sessionIds
    for (let i = 2; i < lines.length - 1; i++) {
        const rightSide = lines[i].split(" - ")[1].trim();
        //sub-pos: 21 -792819123 108 aeron:udp?term-length=64k|endpoint=10.24.175.22:10006 @0
        if (rightSide.startsWith("sub-pos")) {
            const rightPart1 = rightSide.split(": ")[1].trim();
            const rightPart2 = rightPart1.split(" ")[1];
            sessions.add(rightPart2);
        }
    }

    sessions.forEach(function(sessionId) {
        const sessionLines = lines.filter((line) => line.indexOf(sessionId) > -1);
        const subscription = parseSubscription(sessionLines, sessionId);
        aeronStatSubscriptions.push(subscription);
    });

    return aeronStatSubscriptions.sort((left, right) => (left.streamId > right.streamId ? -1 : 1)).reverse();
}

function parseSubscription(lines: string[], sessionId : string) : AeronStatSubscription {
    let subPosition = '';
    let subPositionNumeric = -1;
    let receivePosition = '';
    let receiveHighWatermark = '';
    let recordingPosition = '';
    let receivePositionNumeric = -1;
    let processingLine = '';

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("sub-pos") > -1) {
            processingLine = lines[i];
            break;
        }
    }

    const rightFirst = processingLine.split(" - ")[1].trim();
    const rightPart1 = rightFirst.split(": ")[1].trim();
    const rightPart2 = rightPart1.split(" ");

    for (let i = 0; i < lines.length; i++) {
        const rightSide = lines[i].split(" - ")[1].trim();
        const leftSide = lines[i].split(" - ")[0].trim();
        const numericLeftSide = stripComma(leftSide.split(":")[1].trim());

        if (rightSide.startsWith("sub-pos")) {
            subPosition = parseInt(numericLeftSide).toLocaleString();
            subPositionNumeric = parseInt(numericLeftSide);
        } else  if (rightSide.startsWith("rcv-pos")) {
            receivePosition = parseInt(numericLeftSide).toLocaleString();
            receivePositionNumeric = parseInt(numericLeftSide);
        } else  if (rightSide.startsWith("rcv-hwm")) {
            receiveHighWatermark = parseInt(numericLeftSide).toLocaleString();
        } else  if (rightSide.startsWith("rec-pos")) {
            recordingPosition = parseInt(numericLeftSide).toLocaleString();
        }
    }

    let streamIdDecorated = rightPart2[2];
    if (rightPart2[2] !== undefined) {
        if (defaultStreams.has(rightPart2[2].trim())) {
            streamIdDecorated = rightPart2[2].trim() + " - " +defaultStreams.get(rightPart2[2].trim());
        }
    }

    return {
        sessionId : sessionId,
        channel : rightPart2[3],
        streamId : streamIdDecorated,
        subPosition : subPosition,
        subPositionNumeric : subPositionNumeric,
        receivePosition : receivePosition,
        receiveHighWatermark : receiveHighWatermark,
        recordingPosition : recordingPosition,
        receivePositionNumeric : receivePositionNumeric,
        mystery: ''
    }
}


function parsePublications(lines: string[]) : AeronStatPublication[] {
    const aeronStatPublications: AeronStatPublication[] = [];

    const sessions = new Set<string>();
    //step 1: find all the sessionIds
    for (let i = 2; i < lines.length - 1; i++) {
        const rightSide = lines[i].split(" - ")[1].trim();
        if (rightSide.startsWith("pub-pos (sampled)")) {
            const rightPart1 = rightSide.split(": ")[1].trim();
            const rightPart2 = rightPart1.split(" ")[1];
            sessions.add(rightPart2);
        }
    }

    sessions.forEach(function(sessionId) {
        const sessionLines = lines.filter((line) => line.indexOf(sessionId) > -1);
        const publication = parsePublication(sessionLines, sessionId);
        aeronStatPublications.push(publication);
    });

    return aeronStatPublications.sort((left, right) => (left.streamId > right.streamId ? -1 : 1)).reverse();
}

function parseClusterData(lines: string[]) : AeronClusterDetails {
    let electionState = '';
    let likelyClusterStat = false;
    let nodeRole = '';
    let consensusModuleState = '';
    let timedOutClientCount = '';
    let clusterContainerErrors = '';
    let clusterErrors = '';
    let snapshotCount = '';
    let clusterCommitPos = '';


    for (let i = 2; i < lines.length - 1; i++) {
        const leftSide = lines[i].split(" - ")[0].trim();
        const numericLeftSide = stripComma(leftSide.split(":")[1].trim());
        const rightSide = lines[i].split(" - ")[1].trim();

        if (rightSide.startsWith("Cluster Errors")) {
            clusterErrors = parseInt(numericLeftSide).toLocaleString();
        }
        else if (rightSide.startsWith("Consensus Module state")) {
            consensusModuleState = consensusModuleStateValues.get(numericLeftSide) === undefined ? '?' : consensusModuleStateValues.get(numericLeftSide)!;
        }
        else if (rightSide.startsWith("Cluster node role")) {
            nodeRole = clusterNodeRoleValues.get(numericLeftSide) === undefined ? '?' : clusterNodeRoleValues.get(numericLeftSide)!;
            likelyClusterStat = true;
        }
        else if (rightSide.startsWith("Cluster election state")) {
            electionState = clusterElectionStateValues.get(numericLeftSide) === undefined ? '?' : clusterElectionStateValues.get(numericLeftSide)!;
        }
        else if (rightSide.startsWith("Cluster timed out client count")) {
            timedOutClientCount = parseInt(numericLeftSide).toLocaleString();
        }
        else if (rightSide.startsWith("Cluster Container Errors")) {
            clusterContainerErrors = parseInt(numericLeftSide).toLocaleString();
        }
        else if (rightSide.startsWith("Cluster snapshot count")) {
            snapshotCount = parseInt(numericLeftSide).toLocaleString();
        }
        else if (rightSide.startsWith("Cluster commit-pos")) {
            clusterCommitPos = parseInt(numericLeftSide).toLocaleString();
        }
    }

    return {
        electionState : electionState,
        nodeRole : nodeRole,
        likelyClusterStat : likelyClusterStat,
        clusterCommitPos : clusterCommitPos,
        consensusModuleState : consensusModuleState,
        timedOutClientCount : timedOutClientCount,
        clusterContainerErrors : clusterContainerErrors,
        clusterErrors : clusterErrors,
        snapshotCount : snapshotCount
    };
}

function parsePublication(lines: string[], sessionId : string) : AeronStatPublication {
    let pubPos = '';
    let pubPositionSampledNumeric = -1;
    let pubLmt = '';
    let sndPos = '';
    let sndLmt = '';
    let sndBpe = '';
    let sndPosNumeric = 1;

    let processingLine = '';

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("pub-pos") > -1) {
            processingLine = lines[i];
            break;
        }
    }

    const rightFirst = processingLine.split(" - ")[1].trim();
    const rightPart1 = rightFirst.split(": ")[1].trim();
    const rightPart2 = rightPart1.split(" ");

    for (let i = 0; i < lines.length; i++) {
        const rightSide = lines[i].split(" - ")[1].trim();
        const leftSide = lines[i].split(" - ")[0].trim();
        const numericLeftSide = stripComma(leftSide.split(":")[1].trim());

        if (rightSide.startsWith("pub-pos")) {
            pubPos = parseInt(numericLeftSide).toLocaleString();
            pubPositionSampledNumeric = parseInt(numericLeftSide);
        } else  if (rightSide.startsWith("pub-lmt")) {
            pubLmt = parseInt(numericLeftSide).toLocaleString();
        } else  if (rightSide.startsWith("snd-bpe")) {
            sndBpe = parseInt(numericLeftSide).toLocaleString();
        } else  if (rightSide.startsWith("snd-lmt")) {
            sndLmt = parseInt(numericLeftSide).toLocaleString();
        } else  if (rightSide.startsWith("snd-pos")) {
            sndPos = parseInt(numericLeftSide).toLocaleString();
            sndPosNumeric = parseInt(numericLeftSide);
        }
    }

    let streamIdDecorated = rightPart2[2];
    if (rightPart2[2] !== undefined) {
        if (defaultStreams.has(rightPart2[2].trim())) {
            streamIdDecorated = rightPart2[2].trim() + " - " +defaultStreams.get(rightPart2[2].trim());
        }
    }

    return {
        sessionId : sessionId,
        channel : rightPart2[3],
        streamId : streamIdDecorated,
        pubPositionSampled : pubPos,
        pubPositionSampledNumeric : pubPositionSampledNumeric,
        pubLimit : pubLmt,
        sendPosition : sndPos,
        sendPositionNumeric : sndPosNumeric,
        sendLimit : sndLmt,
        sendBackPressureEvents : sndBpe,
        mystery: ''
    }
}


function parseTopLevelAeronStats(lines: string[]) : TopLevelAeronStats {
    let bytesSent = -1;
    let bytesReceived = -1;
    let errors = -1;
    let failedOffersToReceiverProxy = -1;
    let failedOffersToSenderProxy = -1;
    let failedOffersToDriverConductorProxy = -1;
    let naksSent = -1;
    let naksReceived = -1;
    let shortSends = -1;
    let statusMessagesReceived = -1;
    let statusMessagesSent = -1;
    let heartbeatsReceived = -1;
    let heartbeatsSent = -1;
    let retransmitsSent = -1;
    let flowControlOverRuns = -1;
    let flowControlUnderRuns = -1;
    let invalidPackets = -1;
    let backPressureEvents = -1;
    let lossGapFills = -1;
    let failedAttemptsToFreeLogBuffers = -1;
    let clientLivenessTimeouts = -1;
    let possibleTtlAsymmetry = -1;
    let unblockedControlCommands = -1;
    let unblockedPublications = -1;
    let conductorMaxCycleTime = -1;
    let conductorWorkCycleExceededCount = -1;
    let nameResolutionCount = -1;
    let currentResolvedHost = '';

    for (let i = 2; i < lines.length - 1; i++) {
        const leftSide = lines[i].split(" - ")[0].trim();
        const numericLeftSide = stripComma(leftSide.split(":")[1].trim());
        const rightSide = lines[i].split(" - ")[1].trim();
        if (rightSide.startsWith("Bytes sent")) {
            bytesSent = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Bytes received")) {
            bytesReceived = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Errors")) {
            errors = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Failed offers to ReceiverProxy")) {
            failedOffersToReceiverProxy = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Failed offers to SenderProxy")) {
            failedOffersToSenderProxy = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Failed offers to DriverConductorProxy")) {
            failedOffersToDriverConductorProxy = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("NAKs sent")) {
            naksSent = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("NAKs received")) {
            naksReceived = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Short sends")) {
            shortSends = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Status Messages sent")) {
            statusMessagesSent = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Status Messages received")) {
            statusMessagesReceived = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Heartbeats sent")) {
            heartbeatsSent = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Heartbeats received")) {
            heartbeatsReceived = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Retransmits sent")) {
            retransmitsSent = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Flow control under runs")) {
            flowControlUnderRuns = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Flow control over runs")) {
            flowControlOverRuns = parseInt(numericLeftSide);
        }
        else if (rightSide.startsWith("Invalid packets")) {
            invalidPackets = parseInt(numericLeftSide);
        }          
        else if (rightSide.startsWith("Sender flow control limits")) {
            backPressureEvents = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Loss gap fills")) {
            lossGapFills = parseInt(numericLeftSide);
        }          
        else if (rightSide.startsWith("Client liveness timeouts")) {
            clientLivenessTimeouts = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Failed attempts to free log buffers")) {
            failedAttemptsToFreeLogBuffers = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Possible TTL Asymmetry")) {
            possibleTtlAsymmetry = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Unblocked Publications")) {
            unblockedPublications = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Unblocked Control Commands")) {
            unblockedControlCommands = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Conductor max cycle time doing its work")) {
            conductorMaxCycleTime = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Conductor work cycle exceeded threshold")) {
            conductorWorkCycleExceededCount = parseInt(numericLeftSide);
        }        
        else if (rightSide.startsWith("Resolution changes: ")) {
            nameResolutionCount = parseInt(numericLeftSide);
            currentResolvedHost = rightSide.split("hostname=")[1].trim();
        }        
    }

    return {
        bytesSent : bytesSent,
        bytesReceived : bytesReceived,
        failedOffersToReceiverProxy : failedOffersToReceiverProxy,
        failedOffersToSenderProxy : failedOffersToSenderProxy,
        failedOffersToDriverConductorProxy : failedOffersToDriverConductorProxy,
        naksReceived : naksReceived,
        naksSent : naksSent,
        shortSends : shortSends,
        statusMessagesReceived : statusMessagesReceived,
        statusMessagesSent : statusMessagesSent,
        heartbeatsReceived : heartbeatsReceived,
        heartbeatsSent : heartbeatsSent,
        retransmitsSent : retransmitsSent,
        flowControlOverRuns : flowControlOverRuns,
        flowControlUnderRuns : flowControlUnderRuns,
        invalidPackets : invalidPackets,
        errors : errors,
        failedAttemptsToFreeLogBuffers : failedAttemptsToFreeLogBuffers,
        backPressureEvents : backPressureEvents,
        unblockedControlCommands : unblockedControlCommands,
        unblockedPublications : unblockedPublications,
        possibleTtlAsymmetry : possibleTtlAsymmetry,
        lossGapFills : lossGapFills,
        clientLivenessTimeouts : clientLivenessTimeouts,
        conductorMaxCycleTime : conductorMaxCycleTime,
        conductorWorkCycleExceededCount : conductorWorkCycleExceededCount,
        nameResolutionCount : nameResolutionCount,
        currentResolvedHost : currentResolvedHost
    }

}

function stripComma(line: string) {
    return line.replace(/,/g, "");
}

function isInvalidContents(firstLine: string, secondLine: string, lastLine: string) {
    if (lastLine.indexOf("--") === -1) {
        console.log("last line does not contain --");
        console.log(lastLine);
        return true;
    }
    if (firstLine.indexOf("Aeron Stat") === -1) {
        console.log("first line does not contain 'Aeron Stat'");
        console.log(firstLine);
        return true;
    }
    if (secondLine.indexOf("==============") === -1) {
        console.log("second line does not contain ===============");
        console.log(secondLine);
        return true;
    }
}

function parseSendSockets(lines: string[]) : SendSocket[] {
    const sendSockets: SendSocket[] = [];
    const linesWithChannels = lines.filter((line) => line.indexOf("snd-channel") > -1);

    for (let i = 2; i < lines.length - 1; i++) {
        const rightSide = lines[i].split(" - ")[1].trim();
        if (rightSide.startsWith("snd-local-sockaddr")) {
            const rightPart1 = rightSide.split(": ")[1].trim();
            const lookupLine = rightPart1.split(" ")[0].trim();
            const rightPart2 = rightPart1.split(" ")[1].trim();

            let channelVal = '';
            for (let j = 0; j < linesWithChannels.length; j++) {
                if (linesWithChannels[j].indexOf(lookupLine.trim() + ":") > -1) {
                    const channelLs = linesWithChannels[j].split(" - ")[1].trim();
                    channelVal = channelLs.split(": ")[1].trim();
                }
            }

            sendSockets.push({hostAndPort: rightPart2, channel: channelVal});
        }
    }

    return sendSockets.sort((post1, post2) => (post1.hostAndPort > post2.hostAndPort ? -1 : 1)).reverse();
}

function parseReceiveSockets(lines: string[]) : ReceiveSocket[] {
    const receiveSockets: ReceiveSocket[] = [];
    const linesWithChannels = lines.filter((line) => line.indexOf("rcv-channel") > -1);

    for (let i = 2; i < lines.length - 1; i++) {
        const rightSide = lines[i].split(" - ")[1].trim();
        if (rightSide.startsWith("rcv-local-sockaddr")) {
            const rightPart1 = rightSide.split(": ")[1].trim();
            const lookupLine = rightPart1.split(" ")[0].trim();
            const rightPart2 = rightPart1.split(" ")[1].trim();

            let channelVal = '';
            for (let j = 0; j < linesWithChannels.length; j++) {
                if (linesWithChannels[j].indexOf(lookupLine.trim() + ":") > -1) {
                    const channelLs = linesWithChannels[j].split(" - ")[1].trim();
                    channelVal = channelLs.split(": ")[1].trim();
                    break;
                }
            }

            receiveSockets.push({hostAndPort: rightPart2, channel: channelVal});
        }
    }

    return receiveSockets.sort((post1, post2) => (post1.hostAndPort > post2.hostAndPort ? -1 : 1)).reverse();
}

function parseAeronStatFeaturesDetected(lines: string[]) : AeronStatFeatureDetected[] {
    const aeronStatFeaturesDetected = new Set<AeronStatFeatureDetected>();

    for (let i = 2; i < lines.length - 1; i++) {
        if (lines[i].indexOf("Archive Control Sessions") > -1) {
            aeronStatFeaturesDetected.add(AeronStatFeatureDetected.AERON_ARCHIVE_SERVER);
        } else if (lines[i].indexOf("aeron:ipc") > -1) {
            aeronStatFeaturesDetected.add(AeronStatFeatureDetected.AERON_IPC);
        } else if (lines[i].indexOf("aeron:udp") > -1) {
            aeronStatFeaturesDetected.add(AeronStatFeatureDetected.AERON_UDP);
        } else if (lines[i].indexOf("Cluster node role") > -1) {
            aeronStatFeaturesDetected.add(AeronStatFeatureDetected.AERON_CLUSTER);
        } else if (lines[i].indexOf("Invalid Library Attempts") > -1) {
            aeronStatFeaturesDetected.add(AeronStatFeatureDetected.ARTIO);
        }
    }

    return Array.from(aeronStatFeaturesDetected.values());
}

function parseInternalFlows(publications: AeronStatPublication[], subscriptions: AeronStatSubscription[]) : AeronStatInternalFlow[] {

    const internalFlows: AeronStatInternalFlow[] = [];

    for (let i = 0; i < publications.length; i++) {
        const publication = publications[i];

        for (let j = 0; j < subscriptions.length; j++) {
            const subscription = subscriptions[j];

            if (subscription.sessionId === publication.sessionId) {
                internalFlows.push({
                    channel : publication.channel,
                    pubLimit : publication.pubLimit,
                    streamId : publication.streamId,
                    sendLimit : publication.sendLimit,
                    sessionId : publication.sessionId,
                    subPosition : subscription.subPosition,
                    pubPositionSampled : publication.pubPositionSampled,
                    sendBackPressureEvents : publication.sendBackPressureEvents,
                    sendPosition : publication.sendPosition,
                    receivePosition : subscription.receivePosition,
                    receiveHighWatermark : subscription.receiveHighWatermark,
                    recordingPosition : subscription.recordingPosition,
                    mystery : subscription.mystery,
                    diff : (subscription.subPositionNumeric - publication.pubPositionSampledNumeric).toLocaleString()
                });
            }
        }    
    }

    return internalFlows;
}