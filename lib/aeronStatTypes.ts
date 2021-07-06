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

export type AeronStatRecommendation = {
    level : string;
    message : string;
}

export type AeronStatOutput = {
    mediaDriverRunning: string,
    mediaDriverRunningFlag: boolean,
    topLevelAeronStats? :TopLevelAeronStats, 
    errorCount : number,
    recomendations : AeronStatRecommendation[],
    sendSockets : SendSocket[],
    receiveSockets : ReceiveSocket[],
    featuresDetected: AeronStatFeatureDetected[],
    aeronStatPublications : AeronStatPublication[],
    aeronStatSubscriptions : AeronStatSubscription[],
    internalFlows : AeronStatInternalFlow[]
  }

  export type TopLevelAeronStats = {
    bytesSent : number,
    bytesReceived : number,
    failedOffersToReceiverProxy : number,
    failedOffersToSenderProxy   : number,
    failedOffersToDriverConductorProxy  : number,
    naksSent    : number,
    naksReceived    : number,
    statusMessagesSent  : number,
    statusMessagesReceived : number,
    heartbeatsSent : number,
    heartbeatsReceived : number,
    retransmitsSent : number,
    flowControlUnderRuns : number,
    flowControlOverRuns : number,
    invalidPackets : number,
    errors : number,
    shortSends : number,
    failedAttemptsToFreeLogBuffers : number,
    backPressureEvents : number,
    unblockedPublications : number,
    unblockedControlCommands : number,
    possibleTtlAsymmetry : number,
    lossGapFills : number,
    clientLivenessTimeouts : number,  
    conductorMaxCycleTime : number,
    conductorWorkCycleExceededCount : number,
    nameResolutionCount : number,
    currentResolvedHost : string,
}

export enum AeronStatFeatureDetected {
    AERON_UDP,
    AERON_IPC,
    AERON_ARCHIVE_SERVER,
    AERON_CLUSTER,
    ARTIO,
    NONE
}


export const clusterElectionState = new Map<string, string>([
    ["0", "INIT"],
    ["1", "CANVASS"],
    ["2", "NOMINATE"],
    ["3", "CANDIDATE_BALLOT"],
    ["4", "FOLLOWER_BALLOT"],
    ["5", "LEADER_LOG_REPLICATION"],
    ["6", "LEADER_REPLAY"],
    ["7", "LEADER_INIT"],
    ["8", "LEADER_READY"],
    ["9", "FOLLOWER_LOG_REPLICATION"],
    ["10", "FOLLOWER_REPLAY"],
    ["11", "FOLLOWER_CATCHUP_INIT"],
    ["12", "FOLLOWER_CATCHUP_AWAIT"],
    ["13", "FOLLOWER_CATCHUP"],
    ["14", "FOLLOWER_LOG_INIT"],
    ["15", "FOLLOWER_LOG_INIT"],
    ["16", "FOLLOWER_READY"],
    ["17", "CLOSED"],
  ]); 

export const clusterNodeRole = new Map<string, string>([
    ["0", "Follower"],
    ["1", "Candidate"],
    ["2", "Leader"]
  ]); 

export const consensusModuleState = new Map<string, string>([
    ["0", "Initializing"],
    ["1", "Active"],
    ["2", "Suspended"],
    ["3", "Snapshot"],
    ["4", "Quitting"],
    ["5", "Terminating"],
    ["6", "Closed"]
  ]); 

export const defaultStreams = new Map<string, string>([
    ["1", "Artio Inbound"],
    ["2", "Artio Outbound"],
    ["3", "Artio Replay"],
    ["10", "Archive Control Req"],
    ["20", "Archive Control Resp"],
    ["30", "Archive Recording Events"],
    ["101", "Cluster Ingress"],
    ["102", "Cluster Egress"],
    ["103", "Replay Stream"],
    ["104", "Clustered Service"],
    ["105", "Consensus Module"],
    ["106", "Clustered Service Snapshot"],
    ["107", "Consensus Module Snapshot"],
    ["108", "Consensus Stream"]
  ]); 

export type AeronStatPublication = {
    channel : string,
    sessionId : string,
    streamId : string,
    mystery : string,
    pubLimit : string,
    pubPositionSampled : string,
    pubPositionSampledNumeric : number,
    sendPosition : string,
    sendPositionNumeric : number,
    sendLimit :     string,
    sendBackPressureEvents : string
}

export type AeronStatSubscription = {
    channel : string,
    sessionId : string,
    streamId : string,
    mystery : string,
    subPosition : string,
    subPositionNumeric : number,
    receivePosition : string,
    receivePositionNumeric : number,
    receiveHighWatermark : string,
    recordingPosition : string
}

export type AeronStatInternalFlow = {
    channel : string,
    sessionId : string,
    streamId : string,
    mystery : string,
    pubLimit : string,
    pubPositionSampled : string,
    sendPosition : string,
    sendLimit :     string,
    sendBackPressureEvents : string
    subPosition : string,
    receivePosition : string,
    receiveHighWatermark : string,
    recordingPosition : string,
    diff : string
}

export type SendSocket = {
    hostAndPort : string,
    channel : string,
}

export type ReceiveSocket = {
    hostAndPort : string,
    channel : string,
}

export type AeronStatParsed = {
    pid : number,
    timestamp : string,
    heartbeatAgeMs: number,
    topLevelAeronStats? : TopLevelAeronStats,
    aeronStatFeaturesDetected : AeronStatFeatureDetected[],
    aeronStatPublications : AeronStatPublication[],
    aeronStatSubscriptions : AeronStatSubscription[],
    sendSockets : SendSocket[],
    receiveSockets : ReceiveSocket[],
    internalFlows : AeronStatInternalFlow[],
    error : string
}