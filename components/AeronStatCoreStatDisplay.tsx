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
import AeronStatCoreStatDisplayRow from "./AeronStatCoreStatDisplayRow";

type Props = {
  topLevelStats?: TopLevelAeronStats;
  };
 
const AeronStatCoreStatDisplay: React.FC<Props> = ({ topLevelStats }: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
       <span>Core Counters</span>
      </div>
      <AeronStatCoreStatDisplayRow leftName='Errors' leftValue={topLevelStats?.errors.toLocaleString()}  rightName='Back Pressure Events' rightValue={topLevelStats?.backPressureEvents.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Client Liveness Timeouts' leftValue={topLevelStats?.clientLivenessTimeouts.toLocaleString()}  rightName='Loss Gap Fills' rightValue={topLevelStats?.lossGapFills.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Short Sends' leftValue={topLevelStats?.shortSends.toLocaleString()}  rightName='Invalid Packets' rightValue={topLevelStats?.invalidPackets.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='NAKs Sent' leftValue={topLevelStats?.naksSent.toLocaleString()}  rightName='NAKs Received' rightValue={topLevelStats?.naksReceived.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Retransmits Sent' leftValue={topLevelStats?.retransmitsSent.toLocaleString()}  rightName='Aeron Clients using this Media Driver' rightValue={topLevelStats?.connectedAeronClients.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Conductor max cycle time doing its work (ns)' leftValue={topLevelStats?.conductorMaxCycleTime.toLocaleString()}  rightName='Conductor work cycle exceeded threshold count' rightValue={topLevelStats?.conductorWorkCycleExceededCount.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Bytes Sent' leftValue={topLevelStats?.bytesSent.toLocaleString()}  rightName='Bytes Received' rightValue={topLevelStats?.bytesReceived.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Publications Unblocked' leftValue={topLevelStats?.unblockedPublications.toLocaleString()}  rightName='Commands Unblocked' rightValue={topLevelStats?.unblockedControlCommands.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Heartbeats Sent' leftValue={topLevelStats?.heartbeatsSent.toLocaleString()}  rightName='Heartbeats Received' rightValue={topLevelStats?.heartbeatsReceived.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Status Messages Sent' leftValue={topLevelStats?.statusMessagesSent.toLocaleString()}  rightName='Status Messages Received' rightValue={topLevelStats?.statusMessagesReceived.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Failed attempts to free log buffers' leftValue={topLevelStats?.failedAttemptsToFreeLogBuffers.toLocaleString()}  rightName='Failed offers to driver conductor proxy' rightValue={topLevelStats?.failedOffersToDriverConductorProxy.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Failed offers to receiver proxy' leftValue={topLevelStats?.failedOffersToReceiverProxy.toLocaleString()}  rightName='Failed offers to sender proxy' rightValue={topLevelStats?.failedOffersToSenderProxy.toLocaleString()}/>
      <AeronStatCoreStatDisplayRow leftName='Name resolution count' leftValue={topLevelStats?.nameResolutionCount.toLocaleString()}  rightName='Current resolved address' rightValue={topLevelStats?.currentResolvedHost}/>
    </>
  );
};
  
export default AeronStatCoreStatDisplay;
  