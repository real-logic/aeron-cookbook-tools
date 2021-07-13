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

import {
  AeronStatOutput,
  AeronStatParsed,
  AeronStatSubscription,
  AeronStatPublication,
  AeronStatInternalFlow,
  AeronClusterDetails,
  TopLevelAeronStats,
  AeronStatRecommendation
} from './aeronStatTypes';

export function recommend(aeronStatParsed: AeronStatParsed): AeronStatOutput {
  let mediaDriverRunning = '';
  let mediaDriverRunningFlag = false;

  if (aeronStatParsed.heartbeatAgeMs > 0) {
    mediaDriverRunning =
      'Media driver is running with PID ' +
      aeronStatParsed.pid +
      '. Media Driver heartbeat age is ' +
      aeronStatParsed.heartbeatAgeMs +
      'ms';
    mediaDriverRunningFlag = true;
  } else if (aeronStatParsed.heartbeatAgeMs > 60000) {
    mediaDriverRunning =
      'Media driver might be running with PID ' +
      aeronStatParsed.pid +
      '. Media Driver heartbeat age is ' +
      aeronStatParsed.heartbeatAgeMs +
      'ms. With such a high heartbeat age, it could have exited without a clean shutdown.';
    mediaDriverRunningFlag = false;
  } else {
    mediaDriverRunning =
      'Media driver is not running. Last PID was ' + aeronStatParsed.pid;
  }

  const recommendations = checkStats(
    aeronStatParsed.internalFlows,
    aeronStatParsed.clusterData,
    aeronStatParsed.topLevelAeronStats
  );
  recommendations.sort((rec1, rec2) => (rec1.weight > rec2.weight ? -1 : 1));

  return {
    mediaDriverRunning: mediaDriverRunning,
    mediaDriverRunningFlag: mediaDriverRunningFlag,
    topLevelAeronStats: aeronStatParsed.topLevelAeronStats,
    errorCount: -1,
    recomendations: recommendations,
    featuresDetected: aeronStatParsed.aeronStatFeaturesDetected,
    sendSockets: aeronStatParsed.sendSockets,
    receiveSockets: aeronStatParsed.receiveSockets,
    aeronStatSubscriptions: filterSubscriptionInternalFlows(
      aeronStatParsed.aeronStatSubscriptions,
      aeronStatParsed.internalFlows
    ),
    aeronStatPublications: filterPublicationInternalFlows(
      aeronStatParsed.aeronStatPublications,
      aeronStatParsed.internalFlows
    ),
    internalFlows: aeronStatParsed.internalFlows,
    clusterData: aeronStatParsed.clusterData,
    aeronClients: aeronStatParsed.aeronClients
  };
}

function filterSubscriptionInternalFlows(
  aeronStatSubscriptions: AeronStatSubscription[],
  internalFlows: AeronStatInternalFlow[]
): AeronStatSubscription[] {
  return aeronStatSubscriptions.filter((subscription) => {
    return !internalFlows.find((internalFlow) => {
      return internalFlow.sessionId === subscription.sessionId;
    });
  });
}

function filterPublicationInternalFlows(
  aeronStatPublications: AeronStatPublication[],
  internalFlows: AeronStatInternalFlow[]
): AeronStatPublication[] {
  return aeronStatPublications.filter((publication) => {
    return !internalFlows.find((internalFlow) => {
      return internalFlow.sessionId === publication.sessionId;
    });
  });
}
function checkStats(
  internalFlows: AeronStatInternalFlow[],
  clusterData?: AeronClusterDetails,
  topLevelAeronStats?: TopLevelAeronStats
): AeronStatRecommendation[] {
  const recs: AeronStatRecommendation[] = [];

  if (topLevelAeronStats === undefined) {
    return recs;
  }

  if (topLevelAeronStats.errors > 0) {
    recs.push({
      level: 'WARN',
      message:
        'Aeron errors were raised. Review raised errors from logs or with Aeron ErrorStat Tool',
      weight: 1000
    });
  }

  for (let i = 0; i < internalFlows.length; i++) {
    const logDiff = parseInt(stripComma(internalFlows[i].diff));
    if (Math.abs(logDiff) > 1000) {
      recs.push({
        level: 'WARN',
        message:
          'Stream ' +
          internalFlows[i].streamId +
          ' is running behind by ' +
          Math.abs(logDiff).toLocaleString() +
          '. Production is faster than consumption, and may result in backpressure.',
        weight: 100
      });
    }
  }

  if (topLevelAeronStats.conductorWorkCycleExceededCount > 0) {
    let times = 'time';
    if (topLevelAeronStats.conductorWorkCycleExceededCount > 1) {
      times = 'times';
    }

    const secs = topLevelAeronStats.conductorMaxCycleTime / 1000000000;

    recs.push({
      level: 'WARN',
      message:
        'The conductor work cycle exceeded the limit ' +
        topLevelAeronStats.conductorWorkCycleExceededCount.toLocaleString() +
        ' ' +
        times +
        ' with a max of ' +
        secs +
        ' seconds. Confirm there are enough system resources on the host.',
      weight: 800
    });
  }

  if (topLevelAeronStats.shortSends > 0) {
    recs.push({
      level: 'WARN',
      message:
        'Short sends detected. Investigate the SO_SNDBUF size & network equipment if this value is high & increasing.',
      weight: 500
    });
  }

  if (topLevelAeronStats.naksSent > 0) {
    recs.push({
      level: 'WARN',
      message:
        'The Media Driver had to send ' +
        topLevelAeronStats.naksSent.toLocaleString() +
        ' NAKs in order to request missing packet(s). Review loss-stat output.',
      weight: 500
    });
  }

  if (topLevelAeronStats.naksReceived > 0) {
    recs.push({
      level: 'WARN',
      message:
        'The Media Driver received ' +
        topLevelAeronStats.naksReceived.toLocaleString() +
        ' NAKs in order to recover missing packet(s). Review loss-stat output for this and the other process.',
      weight: 500
    });
  }

  if (topLevelAeronStats.unblockedPublications > 0) {
    recs.push({
      level: 'WARN',
      message:
        'The Media Driver had to unblock ' +
        topLevelAeronStats.unblockedPublications.toLocaleString() +
        ' publications in order to send data to subscribers. Confirm that usages of tryClaim are committing within timeout limits.',
      weight: 500
    });
  }

  if (topLevelAeronStats.retransmitsSent > 0) {
    let times = 'time';
    if (topLevelAeronStats.retransmitsSent > 1) {
      times = 'times';
    }
    recs.push({
      level: 'WARN',
      message:
        'The Media Driver had to retransmit data ' +
        topLevelAeronStats.retransmitsSent.toLocaleString() +
        ' ' +
        times +
        '. Review loss-stat output.',
      weight: 500
    });
  }

  if (clusterData !== undefined) {
    if (clusterData.likelyClusterStat !== true) {
      return recs;
    }
  } else {
    return recs;
  }

  if (topLevelAeronStats.retransmitsSent > 0 && topLevelAeronStats.naksReceived > 0 &&
      topLevelAeronStats.flowControlUnderRuns > 0) {
        recs.push({
          level: 'WARN',
          message:
            'It appears as if data loss at the network layer was likely. Review LossStat output.',
          weight: 1010
        });
  }

  if (parseInt(clusterData.clusterErrors) > 0) {
    recs.push({
      level: 'WARN',
      message:
        'Cluster errors were raised. Review raised errors from logs or with Aeron Cluster Tool',
      weight: 1001
    });
  }

  if (parseInt(clusterData.clusterContainerErrors) > 0) {
    recs.push({
      level: 'WARN',
      message:
        'Cluster container errors were raised. Review raised errors from logs or with Aeron Cluster Tool',
      weight: 1002
    });
  }

  let logDiff = 0;

  for (let i = 0; i < internalFlows.length; i++) {
    if (internalFlows[i].streamId.startsWith('100 - ')) {
      logDiff = parseInt(stripComma(internalFlows[i].diff));
      break;
    }
  }

  if (logDiff !== 0) {
    recs.push({
      level: 'WARN',
      message:
        'Cluster container is running behind the cluster commit position by ' +
        Math.abs(logDiff).toLocaleString() +
        ' bytes.',
      weight: 900
    });
  }

  return recs;
}

function stripComma(line: string) {
  return line.replace(/,/g, '');
}
