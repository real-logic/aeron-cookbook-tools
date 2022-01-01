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
import { AeronStatFeatureDetected } from '../lib/aeronStatTypes';

type Props = {
  featuresDetected: AeronStatFeatureDetected[];
};

const myMap = new Map<AeronStatFeatureDetected, string>([
  [AeronStatFeatureDetected.AERON_IPC, 'Aeron IPC'],
  [AeronStatFeatureDetected.AERON_UDP, 'Aeron UDP'],
  [AeronStatFeatureDetected.ARTIO, 'Artio'],
  [AeronStatFeatureDetected.AERON_ARCHIVE_SERVER, 'Aeron Archive Server'],
  [AeronStatFeatureDetected.AERON_CLUSTER, 'Aeron Cluster']
]);

const AeronStatFeaturePills: React.FC<Props> = ({
  featuresDetected
}: Props) => {
  return (
    <>
      {featuresDetected.map((featureDetected) => (
        <span
          key={featureDetected}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2"
        >
          {myMap.get(featuresDetected[featureDetected])}
        </span>
      ))}
    </>
  );
};

export default AeronStatFeaturePills;
