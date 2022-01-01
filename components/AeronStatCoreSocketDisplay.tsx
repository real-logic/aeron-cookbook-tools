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
import { ReceiveSocket, SendSocket } from '../lib/aeronStatTypes';

type Props = {
  receiveSockets: ReceiveSocket[];
  sendSockets: SendSocket[];
};

const AeronStatCoreSocketDisplay: React.FC<Props> = ({
  receiveSockets,
  sendSockets
}: Props) => {
  return (
    <>
      <div className="py-2 px-6 bg-yellow-100">
        <span>Sockets in use by Aeron</span>
      </div>
      <div className="grid grid-cols-2 px-6 bg-yellow-50">
        <dt className="text-sm font-medium text-gray-500">Send</dt>
        <dt className="text-sm pl-2 font-medium text-gray-500">Receive</dt>
      </div>
      <div className="grid grid-cols-2 font-code">
        <ul className="text-xs">
          {sendSockets.map((socket) => (
            <li key={socket.hostAndPort} className="pb-2 pl-6 pt-2 border-b">
              {socket.hostAndPort} - {socket.channel}
            </li>
          ))}
        </ul>
        <ul className="text-xs font-code">
          {receiveSockets.map((socket) => (
            <li key={socket.hostAndPort} className="pb-2 pl-2 pt-2 border-b">
              {socket.hostAndPort} - {socket.channel}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AeronStatCoreSocketDisplay;
