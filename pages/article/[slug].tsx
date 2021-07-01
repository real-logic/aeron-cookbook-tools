import React, { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import Layout from '../../components/Layout';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { useMdxComponentsContext } from '../../context/MdxComponents';
import { IArticle } from '../../types/article';
import { getArticle, getAllArticles, Heading } from '../../utils/mdxUtils';
import Callout from '../../components/Callout';
import SidebarToc from '../../components/SidebarToc';
import ReadingProgress from '../../components/ReadingProgress';
import ArticleMetadataFooter from '../../components/ArticleMetadataFooter';
import MdxWarningAside from '../../components/MdxWarningAside';
import ViewsCounter from '../../components/ViewsCounter';
import MDX from '../../components/MDX'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mdxPrism from 'mdx-prism';

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IArticle, 'slug'>;
  headingList: Heading[];
  counterKey : string;
};

const components = {
  Callout,
  MdxWarningAside,
  Image
};

const PostPage: React.FC<Props> = ({ source, frontMatter, headingList, counterKey }: Props) => {

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
      </Head>
      <ReadingProgress />
      <article className=''>
        <a href={'top'}></a>
        <header className='pt-6'>
          <div className="grid grid-cols-3">
            <div className='space-y-1 text-left xl:col-span-2 col-span-3'>
              <div className='font-post-title mb-4 line-numbers'>
                <h1 className='font-bold text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl subpixel-antialiased text-black'>{frontMatter.title}</h1>
              </div>
              <div className='font-display mt-4'>
                <span className=' text-shaunnew-200 text-2xl mt-8 text-tight'>{frontMatter.description}</span>
              </div>
            </div>
            <div className='xl:col-span-1 col-span-3'>
            </div>
            </div>
        </header>
        <div className='mt-8 border-t-4 border-shaunnew-500 w-full'>
        </div>
        <div className='font-display xl:grid xl:grid-cols-4 xl:gap-x-6 pb-16 xl:pb-20'>
          <div className=' xl:pb-0 xl:col-span-3 xl:row-span-2'>
            <div className='prose max-w-none pt-10 pb-8 dark:prose-dark font-title'>
              <MDXRemote {...source} components={components} />
            </div>
          </div>
          <dl className='mt-10 xl:h-screen sticky top-0 ml-8'>
            <SidebarToc headings={headingList} />
            <dt className='sr-only'>Metadata</dt>
            <dd>
              <div className='font-display uppercase text-shaunnew-200 text-sm flex xl:block flex-col'>
                <div className='mb-4 pt-4'>
                  <ViewsCounter title={ "article-" + counterKey} />
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <ArticleMetadataFooter frontMatter={frontMatter}/>
      </article>
      <ScrollToTopButton />
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data, headingList, counterKey } = getArticle(params?.slug as string);
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
console.log("key=" + counterKey);
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      headingList: headingList,
      counterKey: counterKey
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllArticles(['slug']);
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
