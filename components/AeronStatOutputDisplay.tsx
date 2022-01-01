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
import { AeronStatOutput } from '../lib/aeronStatTypes';
import AeronStatFeaturePills from './AeronStatFeaturePills';
import AeronStatCoreStatDisplay from './AeronStatCoreStatDisplay';
import AeronStatCoreSocketDisplay from './AeronStatCoreSocketDisplay';
import AeronStatSubscriptionDisplay from './AeronStatSubscriptionDisplay';
import AeronStatPublicationDisplay from './AeronStatPublicationDisplay';
import AeronStatInternalFlowDisplay from './AeronStatInternalFlowDisplay';
import AeronStatClusterStatDisplay from './AeronStatClusterStatDisplay';
import AeronStatArchiveStatDisplay from './AeronStatArchiveStatDisplay';
import AeronStatCoreStatRecommendations from './AeronStatCoreStatRecommendations';
import AeronStatClientStatDisplay from './AeronStatClientStatDisplay';

type Props = {
  aeronStatOutput: AeronStatOutput;
};

const AeronStatOutputDisplay: React.FC<Props> = ({
  aeronStatOutput
}: Props) => {
  return (
    <div className="mt-0 overflow-scroll overscroll-y-none">
      <div className="bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="items-center h-8 text-lg font-semibold leading-6 text-gray-900">
            Aeron Stat Analysis
            <AeronStatFeaturePills
              featuresDetected={aeronStatOutput.featuresDetected}
            />
          </h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            As processed at {Date().toLocaleString()}.
          </p>
        </div>

        <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
          <dl className="divide-y divide-gray-200">
            <div
              className={
                aeronStatOutput.mediaDriverRunningFlag === true
                  ? 'py-4 grid grid-cols-3 gap-4 px-6'
                  : 'py-4 grid grid-cols-4 gap-4 px-6'
              }
            >
              <dd
                className={
                  aeronStatOutput.mediaDriverRunningFlag === true
                    ? 'mt-1 text-sm text-green-600 col-span-3'
                    : 'mt-1 text-sm text-red-600 col-span-3'
                }
              >
                {aeronStatOutput.mediaDriverRunning}
              </dd>
            </div>
            {aeronStatOutput.recomendations.length > 0 && (
              <AeronStatCoreStatRecommendations
                recs={aeronStatOutput.recomendations}
              />
            )}
            <AeronStatCoreStatDisplay
              topLevelStats={aeronStatOutput.topLevelAeronStats}
            />
            {aeronStatOutput.archiveData.likelyArchiveStat === true && (
              <AeronStatArchiveStatDisplay
                archiveData={aeronStatOutput.archiveData}
              />
            )}
            {aeronStatOutput.clusterData !== undefined && (
              <AeronStatClusterStatDisplay
                clusterData={aeronStatOutput.clusterData}
              />
            )}
            {aeronStatOutput.internalFlows.length > 0 && (
              <AeronStatInternalFlowDisplay
                flows={aeronStatOutput.internalFlows}
              />
            )}
            {aeronStatOutput.aeronStatPublications.length > 0 && (
              <AeronStatPublicationDisplay
                publications={aeronStatOutput.aeronStatPublications}
              />
            )}
            {aeronStatOutput.aeronStatSubscriptions.length > 0 && (
              <AeronStatSubscriptionDisplay
                subscriptions={aeronStatOutput.aeronStatSubscriptions}
              />
            )}
            <AeronStatClientStatDisplay
              aeronClients={aeronStatOutput.aeronClients}
            />
            <AeronStatCoreSocketDisplay
              sendSockets={aeronStatOutput.sendSockets}
              receiveSockets={aeronStatOutput.receiveSockets}
            />
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AeronStatOutputDisplay;
