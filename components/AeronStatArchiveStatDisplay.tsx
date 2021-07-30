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
import { AeronArchiveDetails } from '../lib/aeronStatTypes';
import AeronStatCoreStatDisplayRow from './AeronStatCoreStatDisplayRow';

type Props = {
  archiveData: AeronArchiveDetails;
};

const AeronStatArchiveStatDisplay: React.FC<Props> = ({
  archiveData
}: Props) => {
  return (
    <>
      {archiveData.likelyArchiveStat === true && (
        <>
          <div className="px-6 py-2 bg-yellow-100">
            <span>Aeron Archive</span>
          </div>
          <AeronStatCoreStatDisplayRow
            leftName="Archive Control Sessions"
            leftValue={archiveData.archiveControlSessions}
            rightName=""
            rightValue=""
          />
        </>
      )}
    </>
  );
};

export default AeronStatArchiveStatDisplay;
