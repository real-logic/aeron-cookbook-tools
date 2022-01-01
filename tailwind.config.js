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

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        ui: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen-Sans',
          'Ubuntu',
          'Cantarell',
          'Helvetica Neue',
          'sans-serif'
        ],
        code: [
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ]
      },
      fontSize: {
        '5xl': ['3rem', '3.5rem']
      },
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        orange: colors.orange,
        lime: colors.lime,
        amber: colors.amber,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia
      }
    }
  }
};
