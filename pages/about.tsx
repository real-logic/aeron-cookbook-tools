import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { SITE_NAME } from '../utils/constants';
import { RssIcon } from '@heroicons/react/solid'
import { AcademicCapIcon, BookOpenIcon, GlobeIcon, ShareIcon, DocumentTextIcon } from '@heroicons/react/outline'

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{SITE_NAME} | About</title>
      </Head>

      <div className="ml-2 sm:ml-2 lg:ml-4 xl:ml-8 font-heading">
        <p className="dark:text-white mt-4 mb-4 w-full text-lg max-w-screen-lg leading-8">This site is where I share my public articles & notes. Articles are longer form, while notes are shorter and more tightly focused. Unlike a blog, these articles and notes may be static, or continuously updated as I learn more. <br/><br/>The content may be little more than <i>rough outlines</i> (especially notes marked 🌱), <i>incomplete or contain inaccuracies</i>. No content is meant to be a definitive source on any particular topic, just a source. <br/><br/><i>Opinions expressed are solely my own. This site is not monetized.</i><br/>
        </p>
        <h1 className="font-content text-xl mt-8">Contact me</h1>
        <p className="dark:text-white mt-4 mb-8 text-lg w-full max-w-screen-lg">I can be reached via <a href="https://keybase.io/slaurens" className="text-shaunother-400 hover:text-red-400">keybase</a> or  <a href="mailto:sacb@hey.com" className="text-shaunother-400 hover:text-red-400">email</a> if needed.</p>

        <h2 className="font-content text-xl mt-4 mb-2">Subscribe</h2>
        <a href="https://www.shaunlaurens.com/feed.xml">
          <div className="flex flex-row items-center text-shaunother-400 hover:text-red-400">
            <div><RssIcon className="h-6 w-6 text-gray-500 hover:text-red-400"/></div>
            <div>RSS Feed</div>
          </div>
          <br/>
        </a>


        <h2 className="font-content text-xl mt-4 mb-2">Article Metadata</h2>
        <div className="text-lg max-w-screen-lg mb-4 prose prose-lg">

          <p className="text-lg mt-4 mb-4 w-full">Each article includes additional metadata, explained below:</p>
        <ul>
          <li className=""><em>Status</em> - current article status. One of: <code className="prose dark:prose-dark">work in progess</code>, <code className="prose dark:prose-dark">draft</code>, <code className="prose dark:prose-dark">in progress</code> or <code className="prose dark:prose-dark">final</code>. Unlike a typical blog, <code className="prose dark:prose-dark">work in progess</code> and <code className="prose dark:prose-dark">draft</code> entries will still be published.</li>
          <li className=""><em>Importance</em> - relative importance of the article, from my own subjective viewpoint. This should not be taken as any indication of the definitive nature of the article.</li>
          <li className=""><em>Review Policy</em> - how often, if ever, the article will be reviewed. One of: <code className="prose dark:prose-dark">one off</code> or <code className="prose dark:prose-dark">continuous</code>. One off articles will rarely have the content updated, while continuous articles are subject to review and updates. The URL will remain constant in both cases.</li>
        </ul>
        </div>
      <h2 className="font-content text-xl mt-8">Note Icons</h2>
        <div className="text-lg max-w-screen-lg mb-4 prose prose-lg">
          <ul>
            <li className="">🌱 - early stage note, rough draft or outline</li>
            <li className="">🌿 - not a draft, and not yet mature</li>
            <li className="">🌳 - mature note, revisted from time to time</li>
          </ul>
        </div>
        <h2 className="font-content text-xl mt-8">Reference Icons</h2>
      <div className="flex w-full flex-col p-2 rounded-md text-lg">
        <div className="flex flex-row p-2 rounded-md">
          <div className="pr-2">
            <AcademicCapIcon className="h-6 w-6 text-gray-500 hover:text-shaunother-400 "/>
          </div>
          <div>Academic Paper
          </div>
        </div>

        <div className="flex flex-row p-2 rounded-md">
          <div className="pr-2">
            <BookOpenIcon className="h-6 w-6 text-gray-500 hover:text-shaunother-400 "/>
          </div>
          <div>Book</div>
        </div>

        <div className="flex flex-row p-2 rounded-md">
          <div className="pr-2">
            <GlobeIcon className="h-6 w-6 text-gray-500 hover:text-shaunother-400 "/>
          </div>
          <div>Web Link
          </div>
        </div>

        <div className="flex flex-row p-2 rounded-md">
          <div className="pr-2">
            <ShareIcon className="h-6 w-6 text-gray-500 hover:text-shaunother-400 "/>
          </div>
          <div>Internal Link
          </div>
        </div>

        <div className="flex flex-row p-2 rounded-md mb-6">
          <div className="pr-2">
            <DocumentTextIcon className="h-6 w-6 text-gray-500 hover:text-shaunother-400 "/>
          </div>
          <div>Source Code
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
