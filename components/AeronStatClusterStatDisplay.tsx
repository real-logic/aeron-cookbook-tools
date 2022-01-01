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
import { AeronClusterDetails } from '../lib/aeronStatTypes';
import AeronStatCoreStatDisplayRow from './AeronStatCoreStatDisplayRow';

type Props = {
  clusterData: AeronClusterDetails;
};

const AeronStatClusterStatDisplay: React.FC<Props> = ({
  clusterData
}: Props) => {
  return (
    <>
      {clusterData.likelyClusterStat === true && (
        <>
          <div className="py-2 px-6 bg-yellow-100">
            <span>Aeron Cluster</span>
          </div>
          <AeronStatCoreStatDisplayRow
            leftName="Cluster Commit Pos"
            leftValue={clusterData.clusterCommitPos}
            rightName="Timed out clients"
            rightValue={clusterData.timedOutClientCount}
          />
          <AeronStatCoreStatDisplayRow
            leftName="Cluster Node Role"
            leftValue={clusterData.nodeRole}
            rightName="Cluster Errors"
            rightValue={clusterData.clusterErrors}
          />
          <AeronStatCoreStatDisplayRow
            leftName="Consensus Module State"
            leftValue={clusterData.consensusModuleState}
            rightName="Cluster Container Errors"
            rightValue={clusterData.clusterContainerErrors}
          />
          <AeronStatCoreStatDisplayRow
            leftName="Election State"
            leftValue={clusterData.electionState}
            rightName="Snapshot Count"
            rightValue={clusterData.snapshotCount}
          />
        </>
      )}
    </>
  );
};

export default AeronStatClusterStatDisplay;
