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
import { AeronClient } from '../lib/aeronStatTypes';

type Props = {
  aeronClients: AeronClient[];
};

const AeronStatClientStatDisplay: React.FC<Props> = ({
  aeronClients
}: Props) => {
  return (
    <>
      <div className="px-6 py-2 bg-yellow-100">
        <span>Aeron clients to this Media Driver</span>
      </div>

      <div className="grid grid-cols-2 px-6 bg-yellow-50">
        <span className="pt-1 pr-2 text-xs font-bold text-gray-500 break-all ">
          Client ID
        </span>
        <span className="pt-1 pr-2 text-xs font-bold text-right text-gray-500">
          Last Heartbeat
        </span>
      </div>

      {aeronClients.map((client) => (
        <div key={client.client} className="grid grid-cols-2 px-6">
          <span className="pt-2 pb-2 pr-2 text-xs text-gray-900 break-all font-code">
            {client.client}
          </span>
          <span className="pt-2 pb-2 pl-2 pr-2 text-xs text-right text-gray-900 font-code">
            {client.heartbeatTime}
          </span>
        </div>
      ))}
    </>
  );
};

export default AeronStatClientStatDisplay;
