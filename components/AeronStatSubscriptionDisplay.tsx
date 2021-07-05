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

import { AeronStatSubscription } from "../lib/aeronStatTypes";

type Props = {
  subscriptions: AeronStatSubscription[];
};

 
const AeronStatSubscriptionDisplay: React.FC<Props> = ({ subscriptions }: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
       <span>External Subscriptions - {subscriptions.length}</span>
      </div>
      
      <div className="py-2 grid grid-cols-7 gap-2 px-6">
        <span className="mt-1 text-xs text-gray-500 text-medium col-span-2 break-all">Channel</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Session</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Stream ID</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Subs Pos</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Receive Pos</span>
        <span className="mt-1 text-xs text-gray-500 text-medium ">Receive Hwm</span>
      </div>

      {subscriptions.map((subs) => (
        <div key={subs.sessionId} className="py-2 grid grid-cols-7 gap-2 px-6">
          <span className="mt-1 text-xs text-gray-900 col-span-2 break-all font-code">{subs.channel}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{subs.sessionId}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{subs.streamId}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{subs.subPosition}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{subs.receivePosition}</span>
          <span className="mt-1 text-xs text-gray-900 font-code">{subs.receiveHighWatermark}</span>
        </div>
      ))}

    </>
  );
};
  
export default AeronStatSubscriptionDisplay;
  