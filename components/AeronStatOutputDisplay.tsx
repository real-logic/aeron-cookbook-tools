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

import { AeronStatOutput } from "../lib/aeronStatTypes";
import AeronStatFeaturePills from "./AeronStatFeaturePills";
import AeronStatCoreStatDisplay from "./AeronStatCoreStatDisplay";
import AeronStatCoreSocketDisplay from "./AeronStatCoreSocketDisplay";
import AeronStatSubscriptionDisplay from "./AeronStatSubscriptionDisplay";
import AeronStatPublicationDisplay from "./AeronStatPublicationDisplay";
import AeronStatInternalFlowDisplay from "./AeronStatInternalFlowDisplay";


type Props = {
    aeronStatOutput: AeronStatOutput;
  };
  
  const AeronStatOutputDisplay: React.FC<Props> = ({ aeronStatOutput }: Props) => {
    return (
        <div className="mt-0 overflow-x-scroll overflow-scroll">
            
        <div className="bg-white shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 h-8 font-semibold text-gray-900 items-center">Aeron Stat Analysis
                <AeronStatFeaturePills featuresDetected={aeronStatOutput.featuresDetected}/>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">As processed at {Date().toLocaleString()}.</p>
          </div>
  
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="divide-y divide-gray-200">
              <div className={aeronStatOutput.mediaDriverRunningFlag === true ? "py-4 grid grid-cols-3 gap-4 px-6" : "py-4 grid grid-cols-4 gap-4 px-6"}>
                    <dd className={aeronStatOutput.mediaDriverRunningFlag === true ? "mt-1 text-sm text-green-600 col-span-3" : "mt-1 text-sm text-red-600 col-span-3"}>{aeronStatOutput.mediaDriverRunning}</dd>
              </div>
              <AeronStatCoreStatDisplay topLevelStats={aeronStatOutput.topLevelAeronStats}/>
              <AeronStatInternalFlowDisplay flows={aeronStatOutput.internalFlows}/>
              <AeronStatPublicationDisplay publications={aeronStatOutput.aeronStatPublications}/>
              <AeronStatSubscriptionDisplay subscriptions={aeronStatOutput.aeronStatSubscriptions}/>
              <AeronStatCoreSocketDisplay sendSockets={aeronStatOutput.sendSockets} receiveSockets={aeronStatOutput.receiveSockets}/>
            </dl>
          </div>
        </div>
      </div>
    );
  };
  
export default AeronStatOutputDisplay;
  