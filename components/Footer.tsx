import React from 'react';
import { FaGithub } from 'react-icons/fa'

const Footer: React.FC = () => (
  <footer >
    <div className="w-full mx-auto py-12 px-4 sm:px-6 flex bg-shaunnew-700 items-center md:justify-between lg:px-8 font-display">
      <div className="flex justify-center space-x-6 order-2">
          <a key='github' href='https://github.com/eleventy7' className="text-gray-500 hover:text-blue-700">
            <FaGithub className="h-6 w-6 text-white" aria-hidden="true" />
          </a>
      </div>
      <div className="flex justify-center text-center text-base order-1">
        <p className="text-white">&copy; 2009-2021 Shaun Laurens. All Rights Reserved.</p>
        <span className="font-title italic hidden">hi</span>
        <span className="font-code hidden">hi</span>
      </div>
    </div>
  </footer>
);

export default Footer;
