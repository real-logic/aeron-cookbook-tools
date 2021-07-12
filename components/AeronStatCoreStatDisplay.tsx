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

import React from 'react';
import { TopLevelAeronStats } from '../lib/aeronStatTypes';
import AeronStatCoreStatDisplayCell from './AeronStatCoreStatDisplayCell';

type Props = {
  topLevelStats?: TopLevelAeronStats;
};

const AeronStatCoreStatDisplay: React.FC<Props> = ({
  topLevelStats
}: Props) => {
  return (
    <>
      <div className="px-6 py-2 bg-yellow-100">
        <span>Core Counters</span>
      </div>
      <div className="grid grid-cols-2">
        {/* Left col */}
        <div className="grid grid-cols-1">
          <AeronStatCoreStatDisplayCell
            name="Short Sends"
            value={topLevelStats?.shortSends.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="NAKs Sent"
            value={topLevelStats?.naksSent.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="NAKs Received"
            value={topLevelStats?.naksReceived.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Retransmits Sent"
            value={topLevelStats?.retransmitsSent.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Conductor max cycle time doing its work"
            value={
              topLevelStats?.conductorMaxCycleTimeSeconds.toLocaleString() + 's'
            }
          />
          <AeronStatCoreStatDisplayCell
            name="Conductor work cycle exceeded threshold count"
            value={topLevelStats?.conductorWorkCycleExceededCount.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Bytes Sent"
            value={topLevelStats?.bytesSent.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Bytes Received"
            value={topLevelStats?.bytesReceived.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Heartbeats Sent"
            value={topLevelStats?.heartbeatsSent.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Heartbeats Received"
            value={topLevelStats?.heartbeatsReceived.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Flow Control Underruns"
            value={topLevelStats?.flowControlUnderRuns.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Flow Control Overruns"
            value={topLevelStats?.flowControlOverRuns.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Name resolution count"
            value={topLevelStats?.nameResolutionCount.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Current resolved address"
            value={topLevelStats?.currentResolvedHost}
          />
        </div>
        {/* Right col */}
        <div className="grid grid-cols-1">
          <AeronStatCoreStatDisplayCell
            name="Errors"
            value={topLevelStats?.errors.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Back Pressure Events"
            value={topLevelStats?.backPressureEvents.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Loss Gap Fills"
            value={topLevelStats?.lossGapFills.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Invalid Packets"
            value={topLevelStats?.invalidPackets.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Client Liveness Timeouts"
            value={topLevelStats?.clientLivenessTimeouts.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Aeron Clients using this Media Driver"
            value={topLevelStats?.connectedAeronClients.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Publications Unblocked"
            value={topLevelStats?.unblockedPublications.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Commands Unblocked"
            value={topLevelStats?.unblockedControlCommands.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Status Messages Sent"
            value={topLevelStats?.statusMessagesSent.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Status Messages Received"
            value={topLevelStats?.statusMessagesReceived.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Failed attempts to free log buffers"
            value={topLevelStats?.failedAttemptsToFreeLogBuffers.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Failed offers to receiver proxy"
            value={topLevelStats?.failedOffersToReceiverProxy.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Failed offers to driver conductor proxy"
            value={topLevelStats?.failedOffersToDriverConductorProxy.toLocaleString()}
          />
          <AeronStatCoreStatDisplayCell
            name="Failed offers to sender proxy"
            value={topLevelStats?.failedOffersToSenderProxy.toLocaleString()}
          />
        </div>
      </div>
    </>
  );
};

export default AeronStatCoreStatDisplay;
