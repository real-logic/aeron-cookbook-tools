import React, { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mdxPrism from 'mdx-prism';

import Layout from '../../components/Layout';
import { useMdxComponentsContext } from '../../context/MdxComponents';
import { INote } from '../../types/note';
import { SITE_URL } from '../../utils/constants';
import { getNote, getAllNotes, Heading } from '../../utils/mdxUtils';
import Callout from '../../components/Callout';
import Series from '../../components/Series';
import ViewsCounter from '../../components/ViewsCounter';
import ReadingProgress from '../../components/ReadingProgress';

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<INote, 'slug'>;
  counterKey : string;
};

const components = {
  Series,
  Callout
};

const PostPage: React.FC<Props> = ({ source, frontMatter, counterKey }: Props) => {

  const ogImage = SITE_URL + frontMatter.thumbnail;

  return (
    <Layout pageTitle={frontMatter.title}>
      <Head>
        <meta
          name='description'
          content={frontMatter.description}
          key='description'
        />
        <meta
          property='og:description'
          content={frontMatter.description}
          key='ogDescription'
        />
        <meta property='og:image' content={ogImage} key='ogImage' />
      </Head>
      <ReadingProgress />
      <article className=''>
        <header className='pt-6'>
          <div className='space-y-1 text-left'>
            <div className='font-post-title mb-4'>
              <h1 className='font-bold text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl subpixel-antialiased text-black'>{frontMatter.title}</h1>
            </div>
            <div className='font-display mt-4'>
              <span className=' text-shaunnew-200 text-2xl text-tight'>{frontMatter.description}</span>
            </div>
          </div>
        </header>
        <div className='w-full max-w-none mt-4 items-center flex'>
          <div className='w-full max-w-none border-2 border-shaunother-100 flex-row'></div>
        </div>
        <div className='font-display xl:grid xl:grid-cols-4 xl:gap-x-6 pb-16 xl:pb-20'>
          <div className=' xl:pb-0 xl:col-span-3 xl:row-span-2'>
            <div className='prose max-w-none pt-10 pb-8 dark:prose-dark font-title'>
              <MDXRemote {...source} components={components} />
            </div>
          </div>
          <dl className='mt-4 xl:ml-8'>
            <dt className='sr-only'>Metadata</dt>
            <dd>
              <div className='font-display uppercase text-shaunnew-200 text-sm flex xl:block flex-col justify-center'>
                <div className='mb-2 pt-4'>
                  <span className='text-4xl'>{frontMatter.evergreen}</span>
                </div>
                <div className="mb-2 pt-4">
                  <span className="font-bold">reading time</span><br/>{frontMatter.readingtime}
                </div>
                <div className='mb-2 pt-4'>
                  <span className="font-bold">published</span><br />{frontMatter.date}
                </div>
                <div className='mb-2 pt-4'>
                  <span className="font-bold">last updated</span><br />{frontMatter.updated}
                </div>
                <div className='mb-2 pt-4'>
                  <span className="font-bold">importance</span><br />{frontMatter.importance}
                </div>
                <div className='mb-4 pt-4'>
                  <span className="font-bold">review policy</span><br />{frontMatter.review}
                </div>
                <div className='pt-4'>
                  <span className='space-x-2 font-bold'>Topics</span>
                  {frontMatter.tags.map((item) => (
                    <div key={item} className='ml-4'>{item}</div>
                  ))}
                </div>
                <div className='mb-4 pt-4'>
                  <ViewsCounter title={ "note-" + counterKey} />
                </div>
              </div>
            </dd>
          </dl>
        </div>


      </article>
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data, counterKey } = getNote(params?.slug as string);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        [
          require('remark-autolink-headings'),
          {
            behavior: 'wrap',
            linkProperties: {
              className: ['anchor']
            }
          }
        ],
        [
          require('remark-code-titles')
        ]
      ],
      rehypePlugins: []
    }
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      counterKey: counterKey
    }
  };
};


export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllNotes(['slug']);
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug
    }
  }));

  return {
    paths,
    fallback: false
  };
};

