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

import { AeronStatOutput, AeronStatParsed, AeronStatSubscription, AeronStatPublication, AeronStatInternalFlow,
         AeronClusterDetails, TopLevelAeronStats, AeronStatRecommendation } from "./aeronStatTypes";

export function recommend(aeronStatParsed : AeronStatParsed) : AeronStatOutput {
 
    let mediaDriverRunning = "";
    let mediaDriverRunningFlag = false;

    if (aeronStatParsed.heartbeatAgeMs  > 0) {
        mediaDriverRunning = "Media driver is running with PID " + aeronStatParsed.pid + ". Media Driver heartbeat age is " + aeronStatParsed.heartbeatAgeMs + "ms";
        mediaDriverRunningFlag = true;
    } else {
        mediaDriverRunning = "Media driver is not running. Last PID was " + aeronStatParsed.pid;
    }

    const clusterRecommendations = checkStats(aeronStatParsed.internalFlows, aeronStatParsed.clusterData, aeronStatParsed.topLevelAeronStats);

    return {
        mediaDriverRunning: mediaDriverRunning,
        mediaDriverRunningFlag : mediaDriverRunningFlag,
        topLevelAeronStats : aeronStatParsed.topLevelAeronStats,
        errorCount : -1,
        recomendations: clusterRecommendations,
        featuresDetected: aeronStatParsed.aeronStatFeaturesDetected,
        sendSockets: aeronStatParsed.sendSockets,
        receiveSockets: aeronStatParsed.receiveSockets,
        aeronStatSubscriptions: filterSubscriptionInternalFlows(aeronStatParsed.aeronStatSubscriptions, aeronStatParsed.internalFlows),
        aeronStatPublications: filterPublicationInternalFlows(aeronStatParsed.aeronStatPublications, aeronStatParsed.internalFlows),
        internalFlows: aeronStatParsed.internalFlows,
        clusterData: aeronStatParsed.clusterData
    }
}

function filterSubscriptionInternalFlows(aeronStatSubscriptions: AeronStatSubscription[], internalFlows: AeronStatInternalFlow[]): AeronStatSubscription[] {
    return aeronStatSubscriptions.filter(subscription => {
        return !internalFlows.find(internalFlow => {
            return internalFlow.sessionId === subscription.sessionId;
        });
    });
}

function filterPublicationInternalFlows(aeronStatPublications: AeronStatPublication[], internalFlows: AeronStatInternalFlow[]): AeronStatPublication[] {
    return aeronStatPublications.filter(publication => {
        return !internalFlows.find(internalFlow => {
            return internalFlow.sessionId === publication.sessionId;
        });
    });
}
function checkStats(internalFlows: AeronStatInternalFlow[], clusterData?: AeronClusterDetails, topLevelAeronStats?: TopLevelAeronStats) : AeronStatRecommendation[] {
    const recs : AeronStatRecommendation[] = [];

    if (topLevelAeronStats === undefined) {
        return recs;
    }

    if (topLevelAeronStats.errors > 0) {
        recs.push({level: 'WARN', message : 'Aeron errors were raised. Review raised errors from logs or with Aeron ErrorStat Tool'});
    } 


    for(let i = 0; i < internalFlows.length; i++) {
        const logDiff = parseInt(stripComma(internalFlows[i].diff));
        if (Math.abs(logDiff) > 0) {
            recs.push({level: 'WARN', message : 'Stream ' + internalFlows[i].streamId + ' is running behind by '+Math.abs(logDiff).toLocaleString()+'. Production is faster than consumption, and may result in backpressure.'});
        }
    }

    if (clusterData !== undefined) {
        if (clusterData.likelyClusterStat !== true) {
            return recs;
        }
    } else {
        return recs;
    }

    if (parseInt(clusterData.clusterErrors) > 0) {
        recs.push({level: 'WARN', message : 'Cluster errors were raised. Review raised errors from logs or with Aeron Cluster Tool'});
    } 

    if (parseInt(clusterData.clusterContainerErrors) > 0) {
        recs.push({level: 'WARN', message : 'Cluster container errors were raised. Review raised errors from logs or with Aeron Cluster Tool'});
    } 

    let logDiff = 0;

    for(let i = 0; i < internalFlows.length; i++) {
        if (internalFlows[i].streamId.startsWith('100 - ')) {
            logDiff = parseInt(stripComma(internalFlows[i].diff));
            break;
        }
    }

    if (logDiff !== 0) {
        recs.push({level: 'WARN', message : 'Cluster container is running behind the cluster commit position by ' + Math.abs(logDiff).toLocaleString()+ ' bytes.'});
    }

    return recs;
}

function stripComma(line: string) {
    return line.replace(/,/g, "");
}

