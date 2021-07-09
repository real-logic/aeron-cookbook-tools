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
    <div className="overflow-hidden overscroll-y-none bg-gray-100 flex font-ui flex-col">
      <Meta pageTitle={'Aeron Cookbook Tools'} />
      <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
        <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
          <a
            className="flex items-center justify-center h-16 w-16 bg-blue-500 md:w-28"
            href="/"
          >
            <FaTools className="text-white h-6 w-6" aria-hidden="true" />
          </a>
        </div>

        <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="ml-4 max-w-2xl relative text-black font-bold text-2xl">
              <span>Aeron Cookbook Tools</span>
            </div>
          </div>
          <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
            <nav aria-label="Global" className="flex space-x-10">
              <span>
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only">
                        Change published status
                      </Listbox.Label>
                      <div className="relative">
                        <div className="inline-flex shadow-sm rounded-md divide-x divide-blue-600">
                          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-blue-600">
                            <div className="relative inline-flex items-center bg-gray-100 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                              <EyeIcon
                                className="h-5 w-5 text-black"
                                aria-hidden="true"
                              />
                              <p className="ml-2.5 text-sm text-black font-medium">
                                {selected.title}
                              </p>
                            </div>
                            <Listbox.Button className="relative inline-flex items-center bg-blue-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500">
                              <span className="sr-only">
                                Change published status
                              </span>
                              <ChevronDownIcon
                                className="h-5 w-5 text-white"
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
                            className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                                            className="h-5 w-5"
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
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowModal(true)}
              >
                About
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
                          <h3 className="text-2xl font-semibold">About</h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                          <p className="dark:text-white font-ui mt-4 mb-4 w-full text-lg max-w-screen-lg leading-8">
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
                                className="underline text-blue-500"
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
                                className="underline text-blue-500 font-medium"
                              >
                                Aeron Cookbook
                              </a>
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b">
                          <button
                            className="text-white bg-blue-500 font-bold rounded-md uppercase px-6 py-2 text-sm outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </nav>
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1 flex overflow-hidden overscroll-y-none">
        <nav
          aria-label="Sidebar"
          className="hidden md:block md:flex-shrink-0 md:bg-blue-200 overscroll-y-none"
        >
          <div className="relative w-28 flex flex-col p-3 space-y-3">
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

        <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
          <section
            aria-labelledby="primary-heading"
            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
          >
            {data && <AeronStatOutputDisplay aeronStatOutput={data} />}
          </section>
          {selected.title === 'Data Entry' && (
            <aside className="block flex-shrink-0 order-first">
              <div className="h-screen relative w-96 border-r border-gray-200 bg-gray-100">
                <div className="h-screen">
                  <div className="h-96">
                    <textarea
                      name="aeronstat"
                      className="font-code w-full h-full pl-4 pr-4 text-xs break-normal resize-none"
                      onChange={(e) => handleChange(e)}
                      value={formState}
                    >
                      Paste AeronStat output here
                    </textarea>
                  </div>
                  <div className="h-16">
                    <div className="ml-8 mr-2 mt-4 mb-4">
                      <button
                        type="button"
                        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => handleClick()}
                      >
                        Process in Browser
                      </button>
                      <button
                        onClick={() => setShowHelp(true)}
                        className="ml-8 mb-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Help
                      </button>
                      {showHelp ? (
                        <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
                                  <h3 className="text-2xl font-semibold">
                                    Help
                                  </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                  <p className="font-ui w-full text-lg max-w-screen-lg leading-8">
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
                                  <p className="font-ui w-full mt-8 text-lg max-w-screen-lg leading-8">
                                    <span className="font-ui font-bold">
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
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b">
                                  <button
                                    className="text-white bg-blue-500 font-bold rounded-md uppercase px-6 py-2 text-sm outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowHelp(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
    </div>
    
  );
};

export default App;
