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
import Head from 'next/head';

const LostPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{`Aeron Tools | 404`}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#fff" />
        <link rel="stylesheet" href="/css/fonts.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="feed.xml"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body
        className="leading-normal tracking-normal m-0 bg-cover bg-fixed"
        style={{ backgroundImage: `url("/assets/lost.jpg")` }}
      >
        <div className="h-screen">
          <div className="w-full container mx-auto">
            <div className="w-full flex items-center justify-between mt-8">
              <a
                className="flex items-center no-underline hover:no-underline font-semibold text-3xl"
                href="/"
              >
                Aeron Tools
              </a>
            </div>
          </div>
          <div className="container pt-24 md:pt-36 mx-auto font-text flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <span className="my-4 font-code text-6xl text-black font-bold leading-tight text-center md:text-left">
                404
              </span>
              <p className="leading-normal font-text font-medium text-4xl mb-8 text-center md:text-left">
                The page you were looking for could not be not found.
              </p>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default LostPage;
