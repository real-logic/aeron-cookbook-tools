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

type Props = {
  name: string;
  value?: string;
};

const defaultProps = {
  name: '',
  value: ''
};

const AeronStatCoreStatDisplayRow: React.FC<Props> = ({
  name,
  value
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 px-6 border">
      <dt
        className={
          value === '0'
            ? 'pt-2 pb-2 pl-2 text-sm text-gray-400 font-ui'
            : 'pt-2 pb-2 pl-2 text-sm text-gray-900 font-ui'
        }
      >
        {name}
      </dt>
      <dd
        className={
          value === '0'
            ? 'pt-2 pb-2 pr-4 text-sm text-right text-gray-400 font-code'
            : 'pt-2 pb-2 pr-4 text-sm text-right text-gray-900 font-code'
        }
      >
        {value}
      </dd>
    </div>
  );
};

AeronStatCoreStatDisplayRow.defaultProps = defaultProps;

export default AeronStatCoreStatDisplayRow;
