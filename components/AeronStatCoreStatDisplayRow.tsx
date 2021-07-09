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

type Props = {
  leftName: string;
  leftValue?: string;
  rightName: string;
  rightValue?: string;
};

const AeronStatCoreStatDisplayRow: React.FC<Props> = ({
  leftName,
  leftValue,
  rightName,
  rightValue
}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2 px-6">
      <dt className="pt-2 pb-2 text-sm font-medium text-gray-500">
        {leftName}
      </dt>
      <dd className="pt-2 pb-2 text-sm text-gray-900 text-right font-code pr-4">
        {leftValue}
      </dd>
      <dt className="pt-2 pb-2 text-sm font-medium text-gray-500 border-l pl-2">
        {rightName}
      </dt>
      <dd className="pt-2 pb-2 text-sm text-gray-900 text-right font-code pr-4">
        {rightValue}
      </dd>
    </div>
  );
};

export default AeronStatCoreStatDisplayRow;
