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

import { AeronStatPublication } from "../lib/aeronStatTypes";

type Props = {
  publications: AeronStatPublication[];
};

 
const AeronStatPublicationDisplay: React.FC<Props> = ({ publications }: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
       <span>External Publications - {publications.length}</span>
      </div>
      
      <div className="py-2 grid grid-cols-9 gap-2 px-6">
        <span className="mt-1 text-xs text-gray-500 text-medium col-span-2 break-all">Channel</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Session</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Stream ID</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Send Back Pressure</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Pub Pos (Sampled)</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Pub Lmt</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Send Pos</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Send Lmt</span>
      </div>

      {publications.map((pub) => (
        <div key={pub.sessionId} className="py-2 grid grid-cols-9 gap-2 px-6">
          <span className="mt-1 text-xs text-gray-900 col-span-2 break-all font-code">{pub.channel}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.sessionId}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.streamId}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.sendBackPressureEvents}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.pubPositionSampled}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.pubLimit}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.sendPosition}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{pub.sendLimit}</span>
        </div>
      ))}

    </>
  );
};
  
export default AeronStatPublicationDisplay;
  