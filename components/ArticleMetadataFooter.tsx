import { Heading } from '../utils/mdxUtils';
import React from 'react';
import { IArticle } from '../types/article';

type Props = {
  frontMatter: Omit<IArticle, 'slug'>;
};

const ArticleMetadataFooter: React.FC<Props> = ({ frontMatter }: Props) => {
  return <div className=''>

      <div className='grid grid-cols-3 font-content text-gray-400 uppercase text-sm'>
        <div className='col-span-1'>
          <span className="font-bold">status</span><br />{frontMatter.state}
        </div>
        <div className='col-span-1'>
          <span className="font-bold">importance</span><br />{frontMatter.importance}
        </div>
        <div className='col-span-1'>
          <span className="font-bold">review policy</span><br />{frontMatter.review}
        </div>
        <div className='col-span-1 mt-8'>
          <span className="font-bold">reading time</span><br />{frontMatter.readingtime}
        </div>
        <div className='col-span-1 mt-8'>
          <span className="font-bold">published</span><br />{frontMatter.date}
          <br />
          <br />
          <span className="font-bold">last updated</span><br />{frontMatter.updated}
        </div>
        <div className='col-span-1 mt-8'>
          <span className='space-x-2 font-bold'>Topics</span>
          {frontMatter.tags.map((item) => (
            <div key={item} className='ml-4'>{item}</div>
          ))}
        </div>
      </div>
  </div>;
};

export default ArticleMetadataFooter;