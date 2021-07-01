import React from 'react';
import { ExclamationIcon } from '@heroicons/react/solid';

type Props = {
  asideTitle: string;
  asideBody: string;
};

const MdxWarningAside: React.FC<Props> = ({ asideTitle, asideBody }: Props) => {
  return (
    <div className='bg-yellow-50 border-l-4 border-yellow-400 pt-4 mb-8 pl-4'>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <ExclamationIcon className='h-5 w-5 text-yellow-400 uppercase font-content' />
          <span className="text-md uppercase font-content ml-1">{asideTitle}</span>
        </div>
        <div >
          <p className='font-heading text-sm ml-1'>
            {asideBody}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MdxWarningAside;