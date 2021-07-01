import { GetStaticProps } from 'next';
import Head from 'next/head';

import Layout from '../components/Layout';
import NextLink from '../components/NextLink';
import Pagination from '../components/Pagination';
import { SITE_NAME } from '../utils/constants';
import { getAllNotes } from '../utils/mdxUtils';
import { INote } from '../types/note';
import useNotePagination from '../hooks/useNotePagination';

type Props = {
  posts: INote[];
};

const Index: React.FC<Props> = ({ posts }: Props) => {

  const { currentPage, currentData, maxPage, setElement } = useNotePagination(
    posts,
    20,
    1.0
  );

  const currentPosts = currentData();

  return (
    <Layout>
      <Head>
        <title>{SITE_NAME} | Notes</title>
      </Head>

      <h1 className="font-bold text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl subpixel-antialiased text-black mt-8 mb-8 ml-2 sm:ml-2 lg:ml-4 xl:ml-8 font-title">
        Notes
      </h1>


      <div className="font-display xl:grid xl:grid-cols-4 xl:gap-x-6 pb-16 xl:pb-20">
        <div className="xl:pb-0 xl:col-span-3 xl:row-span-2 ml-2 md:ml-4 xl:ml-8">
        {currentPosts.map((post) => (
          <div key={post.slug}>
            <h2 className='text-2xl font-normal mb-2 hover:text-shaunother-100 font-content'>
              <NextLink href={`/note/${post.slug}`}>{post.title}  &nbsp; {post.evergreen}</NextLink>
            </h2>
            <p className='dark:text-gray-300 font-heading mb-8'>{post.description}</p>
          </div>
        ))}
        </div>
        <dl className=' p-6 border-2 border-shaunother-100'>
          <dt className='sr-only'>Key</dt>
          <dd>
            <div className='font-display text-shaunnew-200 text-base flex xl:block flex-col justify-center mb-4'>
              Shorter, more focused content.
            </div>
            <div className='font-display text-shaunnew-200 text-sm flex xl:block flex-col justify-center'>
              <ul>
                <li className='mb-2'>🌳 - mature note, revisted from time to time</li>
                <li className='mb-2'>🌿 - not a draft, and not yet mature</li>
                <li className='mb-2'>🌱 - early stage note, rough draft or outline</li>
              </ul>
            </div>
          </dd>
        </dl>
      </div>

      <Pagination
        currentPage={currentPage}
        maxPage={maxPage}
        setElement={setElement}
      />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllNotes(
    ['slug', 'date', 'thumbnail', 'title', 'description', 'evergreen', 'readingtime']
  );

  return { props: { posts } };
};
