import Head from 'next/head';

import Layout from '../components/Layout';
import { IArticle } from '../types/article';
import { SITE_NAME } from '../utils/constants';

type Props = {
  posts: IArticle[];
};

const Index: React.FC<Props> = ({ posts }: Props) => {

  return (
    <Layout>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <div className='h-screen'>
        <h1 className='text-2xl mt-10 mb-8 ml-2 sm:ml-2 lg:ml-4 xl:ml-8 font-heading'>
          Hi 👋
        </h1>

        <div className='font-title ml-2 sm:ml-2 lg:ml-4 xl:ml-8 text-lg leading-8'>
          This is my home on the Internet, where I share my love of travel and technology. My technology interests are
          mostly focused on distributed systems, system performance, finance, architecture and the engineering
          organization.
        </div>

        <div className='font-title mt-10 ml-2 sm:ml-2 lg:ml-4 xl:ml-8 text-lg leading-8'>
          The guide to the open source messaging library Aeron previously on this site has been moved to a dedicated
          site: <a href="https://aeroncookbook.com?utm_source=shaunlaurens.com&utm_medium=web&utm_campaign=home" className="text-shaunother-200 hover:text-red-400">Aeron Cookbook</a>
        </div>
      </div>


    </Layout>
  );
};

export default Index;

