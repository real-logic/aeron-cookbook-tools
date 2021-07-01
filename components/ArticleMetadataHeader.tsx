import { Heading } from '../utils/mdxUtils';
import React from 'react';
import { IArticle } from '../types/article';

type Props = {
  frontMatter: Omit<IArticle, 'slug'>;
};

const ArticleMetadataHeader: React.FC<Props> = ({ frontMatter }: Props) => {
  return <div className="grid grid-cols-4 font-content text-gray-400 uppercase text-sm mt-4">
      <div className="col-span-1">
        status<br />{frontMatter.state}
      </div>
      <div className="col-span-1">
        importance<br />{frontMatter.importance}
      </div>
      <div className="col-span-1">
        review policy<br />{frontMatter.review}
      </div>
      <div className="col-span-1">
        last updated<br />{frontMatter.updated}
      </div>
  </div>;
};

export default ArticleMetadataHeader;