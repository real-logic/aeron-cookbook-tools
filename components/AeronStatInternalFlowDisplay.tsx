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

import { AeronStatInternalFlow } from "../lib/aeronStatTypes";

type Props = {
  flows: AeronStatInternalFlow[];
};

 
const AeronStatInternalFlowDisplay: React.FC<Props> = ({ flows }: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
       <span>Internal Flows - {flows.length}</span>
      </div>
      
      <div className="py-2 grid grid-cols-9 gap-2 px-6">
        <span className="mt-1 text-xs text-gray-500 text-medium col-span-3 break-all">Channel</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Session</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Stream ID</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Pub Pos</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Sub Pos</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Difference</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Back Pressure Events</span>
      </div>

      {flows.map((flow) => (
        <div key={flow.sessionId} className="py-2 grid grid-cols-9 gap-2 px-6">
          <span className="mt-1 text-xs text-gray-900  col-span-3 break-all font-code">{flow.channel}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{flow.sessionId}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{flow.streamId}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{flow.pubPositionSampled}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{flow.subPosition}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{flow.diff}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{flow.sendBackPressureEvents}</span>
        </div>
      ))}

    </>
  );
};
  
export default AeronStatInternalFlowDisplay;
  