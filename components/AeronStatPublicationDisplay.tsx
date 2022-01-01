/*
 * Copyright 2020-2022 Shaun Laurens
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
import { AeronStatPublication } from '../lib/aeronStatTypes';
import AeronStatChannelDisplay from './AeronStatChannelDisplay';

type Props = {
  publications: AeronStatPublication[];
};

const AeronStatPublicationDisplay: React.FC<Props> = ({
  publications
}: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
        <span>External Publications - {publications.length}</span>
      </div>

      <div className="grid grid-cols-9 px-6 bg-yellow-50">
        <span className="pt-1 pr-2 text-xs text-gray-500 font-bold col-span-2 break-all ">
          Channel
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 bg-blue-50 font-bold text-right">
          Session
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 font-bold text-right">
          Stream ID
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 bg-blue-50 font-bold text-right">
          Send Back Pressure
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 font-bold text-right">
          Pub Pos (Sampled)
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 bg-blue-50 font-bold text-right">
          Pub Lmt
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 font-bold text-right">
          Send Pos
        </span>
        <span className="pt-1 pr-2 text-xs text-gray-500 bg-blue-50 font-bold text-right">
          Send Lmt
        </span>
      </div>

      {publications.map((pub) => (
        <div key={pub.sessionId} className="grid grid-cols-9 px-6">
          <span className="pt-2 pb-2 pr-2 text-xs text-gray-900 col-span-2 break-all font-code">
            <AeronStatChannelDisplay channelData={pub.channelParsed} />
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 bg-blue-50 font-code text-right">
            {pub.sessionId}
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 font-code text-right">
            {pub.streamId}
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 bg-blue-50 font-code text-right">
            {pub.sendBackPressureEvents}
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 font-code text-right">
            {pub.pubPositionSampled}
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 bg-blue-50 font-code text-right">
            {pub.pubLimit}
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 font-code text-right">
            {pub.sendPosition}
          </span>
          <span className="pt-2 pb-2 pr-2 pl-2 text-xs text-gray-900 bg-blue-50 font-code text-right">
            {pub.sendLimit}
          </span>
        </div>
      ))}
    </>
  );
};

export default AeronStatPublicationDisplay;
