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

import { AeronChannel } from "../lib/aeronStatTypes";

const componentColors = new Map<string, string>([
  ['endpoint', 'bg-blue-200'],
  ['linger', 'bg-blue-800 text-white'],
  ['term-length', 'bg-pink-200'],
  ['control', 'bg-pink-800 text-white'],
  ['fc', 'bg-red-200'],
  ['rejoin', 'bg-red-600 text-white'],
  ['mtu', 'bg-gray-200'],
  ['group', 'bg-gray-600 text-white'],
  ['sparse', 'bg-green-200'],
  ['control-mode', 'bg-green-800 text-white'],
  ['term-id', 'bg-purple-200'],
  ['term-offset', 'bg-purple-800 text-white'],
  ['tags', 'bg-indigo-200'],
  ['session-id', 'bg-indigo-800 text-white'],
  ['init-term-id', 'bg-yellow-200'],
  ['alias', 'bg-yellow-800 text-white'],
]);

type Props = {
  channelData: AeronChannel;
  };
 
const AeronStatChannelDisplay: React.FC<Props> = ({ channelData }: Props) => {
  return (
    
    <>
    {channelData.success === true && (
      <>
          <span className="font-code">aeron:{channelData.media}?
          {channelData.sections.map((part) => (
            <span key={part.key} className={componentColors.get(part.key) === undefined ? '' : componentColors.get(part.key)}>{part.key}={part.value}|</span>
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
  