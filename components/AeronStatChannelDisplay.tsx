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
import { AeronChannel } from '../lib/aeronStatTypes';

const componentColors = new Map<string, string>([
  ['endpoint', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-blue-200'],
  ['linger', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-teal-200 text-black'],
  ['term-length', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-pink-200'],
  ['control', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-orange-200 text-black'],
  ['fc', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-red-100'],
  ['ssc', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-emerald-200 text-black'],
  ['rejoin', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-red-600 text-white'],
  ['mtu', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-gray-200'],
  ['group', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-gray-600 text-white'],
  ['sparse', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-green-200'],
  ['control-mode', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-cyan-200 text-black'],
  ['term-id', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-purple-200'],
  [
    'term-offset',
    'has-tooltip rounded-r-sm pl-2 pr-2 bg-lime-200 text-black'
  ],
  ['tags', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-indigo-200'],
  ['session-id', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-amber-200 text-black'],
  ['init-term-id', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-yellow-200'],
  ['alias', 'has-tooltip rounded-r-sm pl-2 pr-2 bg-fuchsia-200 text-black']
]);

const explains = new Map<string, string>([
  ['endpoint', 'the endpoint for this channel'],
  ['linger', 'the length of time the channel should linger for'],
  [
    'term-length',
    'the term length for this channel. max message length is min(16MB, term-length/8). log buffers are approximately 3x the term length.'
  ],
  ['control', 'the MDC control endpoint'],
  ['fc', 'the flow control arguments'],
  ['rejoin', 'signals if the channel should rejoin after loss'],
  ['mtu', 'the largest packet size for this channel'],
  ['group', 'the flow control group for this channel'],
  ['sparse', 'if true, the log buffer is sparse on the file system'],
  ['control-mode', 'MDC control mode'],
  ['term-id', 'the term id for this channel'],
  ['term-offset', 'the term offset for this channel'],
  ['tags', 'the tags for this channel'],
  ['session-id', 'the session id for this channel'],
  ['init-term-id', 'the initial term id for this channel'],
  ['alias', 'the channel alias']
]);

type Props = {
  channelData: AeronChannel;
};

const AeronStatChannelDisplay: React.FC<Props> = ({ channelData }: Props) => {
  return (
    <>
      {channelData.success === true && (
        <>
          <span className="font-code">
            aeron:{channelData.media}?<br />
            {channelData.sections.map((part) => (
              <>
                <span
                  key={part.key}
                  className={
                    componentColors.get(part.key) === undefined
                      ? ''
                      : componentColors.get(part.key)
                  }
                >
                  {part.key}={part.value}
                  <span className="tooltip">
                    {explains.get(part.key) === undefined
                      ? ''
                      : explains.get(part.key)}
                  </span>
                </span>
                <span>|</span>
                <br />
              </>
            ))}
          </span>
        </>
      )}
      {channelData.success !== true && (
        <>
          <span className="font-code">{channelData.channel}</span>
        </>
      )}
    </>
  );
};

export default AeronStatChannelDisplay;
