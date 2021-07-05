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

import { AeronStatOutput, AeronStatParsed, AeronStatSubscription, AeronStatPublication, AeronStatInternalFlow } from "./aeronStatTypes";

export function recommend(aeronStatParsed : AeronStatParsed) : AeronStatOutput {
 
    let mediaDriverRunning = "";
    let mediaDriverRunningFlag = false;

    if (aeronStatParsed.heartbeatAgeMs  > 0) {
        mediaDriverRunning = "Media driver is running with PID " + aeronStatParsed.pid + ". Media Driver heartbeat age is " + aeronStatParsed.heartbeatAgeMs + "ms";
        mediaDriverRunningFlag = true;
    } else {
        mediaDriverRunning = "Media driver is not running. Last PID was " + aeronStatParsed.pid;
    }

    return {
        mediaDriverRunning: mediaDriverRunning,
        mediaDriverRunningFlag : mediaDriverRunningFlag,
        topLevelAeronStats : aeronStatParsed.topLevelAeronStats,
        errorCount : -1,
        recomendations: [],
        featuresDetected: aeronStatParsed.aeronStatFeaturesDetected,
        sendSockets: aeronStatParsed.sendSockets,
        receiveSockets: aeronStatParsed.receiveSockets,
        aeronStatSubscriptions: filterSubscriptionInternalFlows(aeronStatParsed.aeronStatSubscriptions, aeronStatParsed.internalFlows),
        aeronStatPublications: filterPublicationInternalFlows(aeronStatParsed.aeronStatPublications, aeronStatParsed.internalFlows),
        internalFlows: aeronStatParsed.internalFlows,
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
