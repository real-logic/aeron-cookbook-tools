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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Meta from '../components/Meta';
import React, { useState } from 'react';
import { Switch } from '@headlessui/react'
import { IoIosSpeedometer } from 'react-icons/io';
import { FaTools } from 'react-icons/fa';
import { AeronStatOutput } from '../lib/aeronStatTypes';
import AeronStatOutputDisplay from '../components/AeronStatOutputDisplay';
import { parseAeronStat } from '../lib/aeronStatParser';
import { recommend } from '../lib/aeronStatRecommender';

const sidebarNavigation = [
  { name: 'Aeron Stat', href: '#', icon: IoIosSpeedometer, current: true }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Layout = () => {
  const [formState, setFormState] = React.useState('Paste AeronStat output here');
  const [data, setData] = React.useState<AeronStatOutput>();
  const [enabled, setEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(event.target.value);
    console.log("parse");
  }

  function handleClick() {
    const output = parseAeronStat(formState);
    setData(recommend(output));
  }

  return (
      <div className="h-screen overflow-hidden bg-gray-100 flex font-ui flex-col">
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
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={classNames(
                    enabled ? 'bg-blue-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  )}>
                  <span className="sr-only">Toggle entry</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
                </span>
                <button className="text-sm font-medium text-gray-900" onClick={() => setShowModal(true)}>
                  About
                </button>
                {showModal ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
                            <h3 className="text-2xl font-semibold">About</h3>
                          </div>
                          <div className="relative p-6 flex-auto">
                          <p className="dark:text-white font-ui mt-4 mb-4 w-full text-lg max-w-screen-lg leading-8">
                            This is a collection of tools aimed at understanding Aeron operational data. This site is delivered via a statically compiled typescript/react application. Tested on Chrome on desktop devices only. This site intentionally does not work on mobile devices.
                            <br/>
                            <br/>
                            <span className="font-semibold font-italic">Data is processed in the browser and is never sent server side. There are no cookies and no tracking of any kind.</span><span> This can be confirmed via the <a className="underline text-blue-500" target="_blank" rel="noreferrer" href="https://github.com/eleventy7/acb-tools">source code</a>, which is open source.<br/><br/> See also: <a href="https://www.aeroncookbook.com"  target="_blank" rel="noreferrer" className="underline text-blue-500 font-medium">Aeron Cookbook</a></span>
                          </p>
                          </div>
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b">
                            <button
                              className="text-white bg-blue-500 font-bold rounded-md uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
       <div className="min-h-0 flex-1 flex overflow-hidden">
          <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:bg-blue-200 md:overflow-y-auto">
            <div className="relative w-28 flex flex-col p-3 space-y-3">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-blue-50 text-black' : 'text-blue-100 hover:bg-blue-800 hover:text-white',
                  'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-black' : 'text-indigo-300 group-hover:text-white',
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
              {data && (
                <AeronStatOutputDisplay aeronStatOutput={data} />
              )}
            </section>
            {enabled && ( 
            <aside className="block flex-shrink-0 order-first">
              <div className="h-screen relative w-96 border-r border-gray-200 bg-gray-100">
                <div className="h-screen">
                  <div className="h-96">
                    <textarea name="aeronstat" className="font-code w-full h-full pl-4 pr-4 text-xs break-normal resize-none"
                              onChange={e => handleChange(e)}
                              value={formState}>
                        Paste AeronStat output here
                    </textarea>
                  </div>
                  <div className="h-16">
                    <div className="ml-8 mr-2 mt-4 mb-4">
                      <button type="button"
                              className="mb-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                              onClick={e => handleClick()}>
                        Process in Browser
                      </button>
                      <button onClick={() => setShowHelp(true)}
                              className="ml-8 mb-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none">
                        Help
                      </button>
                      {showHelp ? (
                        <>
                          <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
                                  <h3 className="text-2xl font-semibold">Help</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                <p className="font-ui w-full text-lg max-w-screen-lg leading-8">
                                  To use this, you will need to get the output of <a className="text-blue-500 underline"  target="_blank" rel="noreferrer" href="https://aeroncookbook.com/aeron/aeron-tooling/#aeron-stat">Aeron Stat</a>
                                  <br />
                                  When you copy the data, it must include all content from the header, for example:<br/>
                                  <code>14:39:35 - Aeron Stat (CnC v0.2.0), pid 236, heartbeat age 371ms</code>
                                  <br />
                                  to the final line:<br/>
                                  <code>--</code>
                                  <br />
                                  Do not include additional lines after the final line.
                                </p>
                                <p className="font-ui w-full mt-8 text-lg max-w-screen-lg leading-8">
                                  <span className="font-ui font-bold" >Known issues:</span>
                                  <ul className="list-disc list-inside">
                                    <li>Only tested with Aeron Stat as included with Aeron 1.34.0</li>
                                    <li>Multiple subscriptions sharing the same session ID are hidden</li>
                                    <li>Multiple publications sharing the same session ID are hidden</li>
                                    <li>Raise issues on <a className="text-red-500 underline"  target="_blank" rel="noreferrer" href="https://github.com/eleventy7/acb-tools/issues">GitHub</a></li>
                                  </ul>
                                </p>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b">
                                  <button
                                    className="text-white bg-blue-500 font-bold rounded-md uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
            </aside> )}
          </main>
        </div>
        <footer className="bg-gray-900">
      <div className="ml-4">
        <div className="">
          <span className=" text-white text-sm">&copy; 2020-2021 <a href="/about">Shaun Laurens</a>. <a href="https://github.com/eleventy7/acb-tools" className="text-blue-400">Open source under the Apache 2.0 license. </a><span className="text-red-400">This is alpha software and may produce inaccurate output. Always verify the output before blindly trusting it</span></span>
        </div>
      </div>
    </footer>
      </div>
    );
};

export default Layout;
