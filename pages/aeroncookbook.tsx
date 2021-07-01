import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { SITE_NAME } from '../utils/constants';

const AeronCookbook: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{SITE_NAME} | Aeron Cookbook</title>
      </Head>
      <div className="ml-2 sm:ml-2 lg:ml-4 xl:ml-8 h-screen">
        <h1 className="font-content text-2xl font-bold mt-10">Aeron Cookbook</h1>
        <p className="mt-4 mb-4 w-full max-w-screen-lg font-heading text-lg leading-8">I&apos;ve been using Aeron and Aeron Cluster for the past few years to build financial marketplaces. Aeron is a powerful tool for efficient UDP and IPC messaging, and can be challenging to use for both new and intermediate users alike.
          <br/><br/>I&apos;ve taken my notes from using it over the past few years and put them together into a dedicated site. The site is updated from time to time, and has 105 pages of content specific to Aeron, Aeron Archive and Aeron Cluster.</p>
        <p className="mt-4 mb-8 w-full max-w-screen-lg font-heading text-lg leading-8">If you&apos;re interested, take a look at <a href="https://aeroncookbook.com/?utm_source=shaunlaurens.com&utm_medium=web&utm_campaign=blog" className="text-shaunother-200 hover:text-red-400">Aeron Cookbook</a></p>
      </div>
    </Layout>
  );
};

export default AeronCookbook;
