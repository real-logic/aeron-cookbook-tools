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
import { AeronStatSubscription } from '../lib/aeronStatTypes';
import AeronStatChannelDisplay from './AeronStatChannelDisplay';

type Props = {
  subscriptions: AeronStatSubscription[];
};

const AeronStatSubscriptionDisplay: React.FC<Props> = ({
  subscriptions
}: Props) => {
  return (
    <>
      <div className="px-6 py-2 bg-yellow-100">
        <span>External Subscriptions - {subscriptions.length}</span>
      </div>

      <div className="grid grid-cols-8 px-6 bg-yellow-50">
        <span className="col-span-2 pt-1 pr-2 text-xs font-bold text-gray-500 break-all">
          Channel
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500 bg-blue-50">
          Session
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500">
          Stream ID
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500 bg-blue-50 ">
          Subs Pos
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500">
          Receive Pos
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500 bg-blue-50 ">
          Receive Hwm
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500 ">
          Join Pos
        </span>
      </div>

      {subscriptions.map((subs) => (
        <div key={subs.sessionId} className="grid grid-cols-8 px-6">
          <span className="col-span-2 pt-2 pb-2 pr-2 text-xs text-gray-900 break-all font-code">
            <AeronStatChannelDisplay
              channelData={subs.channelParsed}
              key={subs.channel}
            />
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code bg-blue-50">
            {subs.sessionId}
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code">
            {subs.streamId}
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code bg-blue-50">
            {subs.subPosition}
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code ">
            {subs.receivePosition}
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code bg-blue-50 ">
            {subs.receiveHighWatermark}
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code ">
            {subs.joinPosition}
          </span>
        </div>
      ))}
    </>
  );
};

export default AeronStatSubscriptionDisplay;
