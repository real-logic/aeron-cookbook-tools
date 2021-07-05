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

import { TopLevelAeronStats } from "../lib/aeronStatTypes";

type Props = {
  topLevelStats?: TopLevelAeronStats;
  };

 
const AeronStatCoreStatDisplay: React.FC<Props> = ({ topLevelStats }: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
       <span>Core Counters</span>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Errors</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.errors.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Back Pressure Events</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.backPressureEvents.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Client Liveness Timeouts</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.clientLivenessTimeouts.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Loss Gap Fills</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.lossGapFills.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Short Sends</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.shortSends.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Invalid Packets</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.invalidPackets.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Naks Sent</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.naksSent.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Naks Received</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.naksReceived.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Conductor max cycle time doing its work (ns)</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.conductorMaxCycleTime.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Conductor work cycle exceeded threshold count</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.conductorWorkCycleExceededCount.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Bytes Sent</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.bytesSent.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Bytes Received</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.bytesReceived.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Heartbeats Sent</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.heartbeatsSent.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Heartbeats Received</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.heartbeatsReceived.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Status Messages Sent</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.statusMessagesSent.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Status Messages Received</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.statusMessagesReceived.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Failed attempts to free log buffers</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.failedAttemptsToFreeLogBuffers.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Failed offers to driver conductor proxy</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.failedOffersToDriverConductorProxy.toLocaleString()}</dd>
      </div>
      <div className="py-2 grid grid-cols-4 gap-2 px-6">
        <dt className="text-sm font-medium text-gray-500">Failed offers to receiver proxy</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.failedOffersToReceiverProxy.toLocaleString()}</dd>
        <dt className="text-sm font-medium text-gray-500">Failed offers to sender proxy</dt>
        <dd className="mt-1 text-sm text-gray-900 ">{topLevelStats?.failedOffersToSenderProxy.toLocaleString()}</dd>
      </div>
    </>
  );
};
  
export default AeronStatCoreStatDisplay;
  