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

import Meta from './Meta';
import React, { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { EyeIcon } from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import { IoIosSpeedometer } from 'react-icons/io';
import { FaTools } from 'react-icons/fa';
import { AeronStatOutput } from '../lib/aeronStatTypes';
import AeronStatOutputDisplay from './AeronStatOutputDisplay';
import { parseAeronStat } from '../lib/aeronStatParser';
import { recommend } from '../lib/aeronStatRecommender';

const sidebarNavigation = [
  { name: 'Aeron Stat', href: '#', icon: IoIosSpeedometer, current: true }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const publishingOptions = [
  {
    title: 'Data Entry',
    description: 'Show the data entry and complete view.',
    current: true
  },
  {
    title: 'Complete',
    description: 'Hide the data entry and show complete view.',
    current: false
  }
];

const App = () => {
  const [formState, setFormState] = React.useState(
    'Paste AeronStat output here'
  );
  const [data, setData] = React.useState<AeronStatOutput>();
  const [showModal, setShowModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selected, setSelected] = useState(publishingOptions[0]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(event.target.value);
    console.log('parse');
  };

  function handleClick() {
    const output = parseAeronStat(formState);
    setData(recommend(output));
  }

  return (
    <div className="flex flex-col overflow-hidden bg-gray-100 overscroll-y-none font-ui">
      <Meta pageTitle={'Aeron Cookbook Tools'} />
      <header className="relative flex items-center flex-shrink-0 h-16 bg-white">
        <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
          <a
            className="flex items-center justify-center w-16 h-16 bg-blue-500 md:w-28"
            href="/"
          >
            <FaTools className="w-6 h-6 text-white" aria-hidden="true" />
          </a>
        </div>

        <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <div className="relative max-w-2xl ml-4 text-2xl font-bold text-black">
              <span>Aeron Cookbook Tools</span>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 pr-4 ml-10 space-x-10">
            <nav aria-label="Global" className="flex space-x-10">
              <span>
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only">
                        Change published status
                      </Listbox.Label>
                      <div className="relative">
                        <div className="inline-flex divide-x divide-blue-600 rounded-md shadow-sm">
                          <div className="relative z-0 inline-flex divide-x divide-blue-600 rounded-md shadow-sm">
                            <div className="relative inline-flex items-center py-2 pl-3 pr-4 text-white bg-gray-100 border border-transparent shadow-sm rounded-l-md">
                              <EyeIcon
                                className="w-5 h-5 text-black"
                                aria-hidden="true"
                              />
                              <p className="ml-2.5 text-sm text-black font-medium">
                                {selected.title}
                              </p>
                            </div>
                            <Listbox.Button className="relative inline-flex items-center p-2 text-sm font-medium text-white bg-blue-500 rounded-l-none rounded-r-md hover:bg-blue-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500">
                              <span className="sr-only">
                                Change published status
                              </span>
                              <ChevronDownIcon
                                className="w-5 h-5 text-white"
                                aria-hidden="true"
                              />
                            </Listbox.Button>
                          </div>
                        </div>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            static
                            className="absolute right-0 z-10 mt-2 overflow-hidden origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {publishingOptions.map((option) => (
                              <Listbox.Option
                                key={option.title}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'text-white bg-blue-500'
                                      : 'text-gray-900',
                                    'cursor-default select-none relative p-4 text-sm'
                                  )
                                }
                                value={option}
                              >
                                {({ selected, active }) => (
                                  <div className="flex flex-col">
                                    <div className="flex justify-between">
                                      <p
                                        className={
                                          selected
                                            ? 'font-semibold'
                                            : 'font-normal'
                                        }
                                      >
                                        {option.title}
                                      </p>
                                      {selected ? (
                                        <span
                                          className={
                                            active
                                              ? 'text-white'
                                              : 'text-blue-500'
                                          }
                                        >
                                          <EyeIcon
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </div>
                                    <p
                                      className={classNames(
                                        active
                                          ? 'text-blue-200'
                                          : 'text-gray-500',
                                        'mt-2'
                                      )}
                                    >
                                      {option.description}
                                    </p>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </span>
              <button
                className="inline-flex items-center px-4 py-2 ml-6 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowModal(true)}
              >
                About
              </button>
              {showModal ? (
                <>
                  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-3xl mx-auto my-6">
                      <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-blue-200 border-solid rounded-t">
                          <h3 className="text-2xl font-semibold">About</h3>
                        </div>
                        <div className="relative flex-auto p-6">
                          <p className="w-full max-w-screen-lg mt-4 mb-4 text-lg leading-8 dark:text-white font-ui">
                            This is a collection of tools aimed at understanding
                            Aeron operational data. This site is delivered via a
                            statically compiled typescript/react application.
                            Tested on Chrome on desktop devices only. This site
                            intentionally does not work on mobile devices.
                            <br />
                            <br />
                            <span className="font-semibold font-italic">
                              Data is processed in the browser and is never sent
                              server side. There are no cookies and no tracking
                              of any kind.
                            </span>
                            <span>
                              {' '}
                              This can be confirmed via the{' '}
                              <a
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/eleventy7/acb-tools"
                              >
                                source code
                              </a>
                              , which is open source. This is built off of
                              commit{' '}
                              <span className="font-code">
                                {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}.
                              </span>
                              <br />
                              <br /> See also:{' '}
                              <a
                                href="https://www.aeroncookbook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-blue-500 underline"
                              >
                                Aeron Cookbook
                              </a>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-blue-200 border-solid rounded-b">
                          <button
                            className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
              ) : null}
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-1 min-h-0 overflow-hidden overscroll-y-none">
        <nav
          aria-label="Sidebar"
          className="hidden md:block md:flex-shrink-0 md:bg-blue-200 overscroll-y-none"
        >
          <div className="relative flex flex-col p-3 space-y-3 w-28">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-blue-50 text-black'
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white',
                  'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? 'text-black'
                      : 'text-indigo-300 group-hover:text-white',
                    'h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </a>
            ))}
          </div>
        </nav>

        <main className="flex-1 min-w-0 border-t border-gray-200 lg:flex">
          <section
            aria-labelledby="primary-heading"
            className="flex flex-col flex-1 h-full min-w-0 overflow-hidden lg:order-last"
          >
            {data && <AeronStatOutputDisplay aeronStatOutput={data} />}
          </section>
          {selected.title === 'Data Entry' && (
            <aside className="flex-shrink-0 order-first block">
              <div className="relative h-screen bg-gray-100 border-r border-gray-200 w-96">
                <div className="h-screen">
                  <div className="h-96">
                    <textarea
                      name="aeronstat"
                      className="w-full h-full pl-4 pr-4 text-xs break-normal resize-none font-code"
                      onChange={(e) => handleChange(e)}
                      value={formState}
                    >
                      Paste AeronStat output here
                    </textarea>
                  </div>
                  <div className="h-16">
                    <div className="mt-4 mb-4 ml-8 mr-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 mb-4 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => handleClick()}
                      >
                        Process in Browser
                      </button>
                      <button
                        onClick={() => setShowHelp(true)}
                        className="inline-flex items-center px-4 py-2 mb-4 ml-8 text-base font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Help
                      </button>
                      {showHelp ? (
                        <>
                          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                            <div className="relative w-auto max-w-3xl mx-auto my-6">
                              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-blue-200 border-solid rounded-t">
                                  <h3 className="text-2xl font-semibold">
                                    Help
                                  </h3>
                                </div>
                                <div className="relative flex-auto p-6">
                                  <p className="w-full max-w-screen-lg text-lg leading-8 font-ui">
                                    To use this, you will need to get the output
                                    of{' '}
                                    <a
                                      className="text-blue-500 underline"
                                      target="_blank"
                                      rel="noreferrer"
                                      href="https://aeroncookbook.com/aeron/aeron-tooling/#aeron-stat"
                                    >
                                      Aeron Stat
                                    </a>
                                    <br />
                                    When you copy the data, it must include all
                                    content from the header, for example:
                                    <br />
                                    <code>
                                      14:39:35 - Aeron Stat (CnC v0.2.0), pid
                                      236, heartbeat age 371ms
                                    </code>
                                    <br />
                                    to the final line:
                                    <br />
                                    <code>--</code>
                                    <br />
                                    Do not include additional lines after the
                                    final line.
                                  </p>
                                  <p className="w-full max-w-screen-lg mt-8 text-lg leading-8 font-ui">
                                    <span className="font-bold font-ui">
                                      Known issues:
                                    </span>
                                    <ul className="list-disc list-inside">
                                      <li>
                                        Only tested with Aeron Stat as included
                                        with Aeron 1.34.0
                                      </li>
                                      <li>
                                        Multiple subscriptions sharing the same
                                        session ID are hidden
                                      </li>
                                      <li>
                                        Multiple publications sharing the same
                                        session ID are hidden
                                      </li>
                                      <li>
                                        Raise issues on{' '}
                                        <a
                                          className="text-red-500 underline"
                                          target="_blank"
                                          rel="noreferrer"
                                          href="https://github.com/eleventy7/acb-tools/issues"
                                        >
                                          GitHub
                                        </a>
                                      </li>
                                    </ul>
                                  </p>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-blue-200 border-solid rounded-b">
                                  <button
                                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    type="button"
                                    onClick={() => setShowHelp(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>
      <footer className="bg-gray-900">
         <div className="ml-4">
           <div className="">
             <span className="text-sm text-white ">
               &copy; 2020-2021 <a href="/about">Shaun Laurens</a>.{' '}
               <a
                 href="https://github.com/eleventy7/acb-tools"
                 className="text-blue-400"
               >
                 Open source under the Apache 2.0 license.{' '}
               </a>
               <span className="text-red-400">
                 This is alpha software and may produce inaccurate output. Always
                 verify the output before blindly trusting it
               </span>
             </span>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default App;
