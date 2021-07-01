import { Heading } from '../utils/mdxUtils';
import React from 'react';

type Props = {
  headings: Heading[];
};

const levelCss = {
  level2: 'ml-0',
  level3: 'ml-4',
  level4: 'ml-8',
  common: ' text-shaunnew-200 text-base hover:text-shaunnew-500',
};


const SidebarToc: React.FC<Props> = ({ headings }: Props) => {
  if (headings.length >= 4) {
    return (
      <div className="visible mt-2">
        <ul>
          {
            headings.map((item) => (
              <li key={item.link} className={`${
                item.level === 2 ? levelCss.level2 : item.level === 3 ? levelCss.level3 : levelCss.level4
              } ${levelCss.common}`}><a href={item.link}>{item.title}</a></li>
            ))}
        </ul>
        <a href={'#top'}>
          <div className='flex flex-row items-center text-shaunnew-500 hover:text-red-500'>
            <div className="ml-0 mt-8 text-base">return to top</div>
          </div>
        </a>
      </div>
    );
  } else {
    return <div/>;
  }
};

export default SidebarToc;