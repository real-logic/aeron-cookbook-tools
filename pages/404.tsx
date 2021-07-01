import React from 'react';
import { SITE_NAME } from '../utils/constants';
import Head from 'next/head';

const LostPage: React.FC = () => {
  return (
    <>
    <Head>
      <title>{`Shaun Laurens | 404`}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#00a300" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#fff" />
      <link rel="stylesheet" href="/css/fonts.css"/>
      <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="feed.xml" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <body className="leading-normal tracking-normal m-0 bg-cover bg-fixed" style={{backgroundImage: `url("/assets/lost.jpg")`}}>
    <div className="h-screen">
      <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between mt-8">
          <a
            className="flex items-center no-underline hover:no-underline"
            href="/">
            <svg width="200" height="auto" viewBox="0 0 110 10"  xmlns="http://www.w3.org/2000/svg">
              <path d="M4.68 9.204C7.716 9.204 8.52 7.68 8.52 6.48C8.52 4.68 7.02 4.2 5.304 3.9C3.9 3.648 3.096 3.588 3.096 3C3.096 2.544 3.54 2.256 4.608 2.256C5.688 2.256 6.972 2.628 7.956 3.216H7.968V1.116C7.008 0.648 5.844 0.396 4.776 0.396C2.112 0.396 0.84 1.668 0.84 3.156C0.84 4.836 2.316 5.364 4.032 5.64C5.892 5.952 6.276 6.096 6.276 6.588C6.276 7.068 5.76 7.344 4.752 7.344C3.576 7.344 2.184 6.972 0.876 6.288H0.864V8.4C1.968 8.88 3.156 9.204 4.68 9.204ZM9.19256 9H11.3886V5.652H15.3486V9H17.5566V0.599999H15.3486V3.72H11.3886V0.599999H9.19256V9ZM18.0583 9H20.3263L20.9983 7.14H24.7423L25.4143 9H27.7063L24.6223 0.599999H21.1543L18.0583 9ZM22.6543 2.544H23.0983L24.1183 5.376H21.6343L22.6543 2.544ZM31.9801 9.228C34.3681 9.228 36.1441 8.292 36.1441 5.688V0.599999H33.9481V5.64C33.9481 6.876 33.0241 7.248 31.9921 7.248C30.9601 7.248 30.0481 6.852 30.0481 5.592V0.599999H27.8401V5.736C27.8401 8.292 29.5801 9.228 31.9801 9.228ZM37.4066 9H39.5186V3.684H39.5666L43.5746 9H45.8186V0.599999H43.7066V5.76H43.6586L39.7466 0.599999H37.4066V9ZM49.2355 9H55.9675L56.0515 7.056H51.4315V0.599999H49.2355V9ZM56.0388 9H58.3068L58.9788 7.14H62.7228L63.3948 9H65.6868L62.6028 0.599999H59.1348L56.0388 9ZM60.6348 2.544H61.0788L62.0988 5.376H59.6148L60.6348 2.544ZM69.9606 9.228C72.3486 9.228 74.1246 8.292 74.1246 5.688V0.599999H71.9286V5.64C71.9286 6.876 71.0046 7.248 69.9726 7.248C68.9406 7.248 68.0286 6.852 68.0286 5.592V0.599999H65.8206V5.736C65.8206 8.292 67.5606 9.228 69.9606 9.228ZM75.3871 9H77.5831V6.66H79.4911L81.1591 9H83.6911L81.6271 6.24C82.7551 5.832 83.3431 4.92 83.3431 3.552C83.3431 1.632 82.2751 0.599999 80.0791 0.599999H75.3871V9ZM77.5831 4.86V2.46H79.8871C80.8111 2.46 81.1351 2.964 81.1351 3.648C81.1351 4.344 80.8111 4.86 79.8871 4.86H77.5831ZM84.2488 9H91.5928L91.6648 7.14H86.4328V5.568H90.4648V3.804H86.4328V2.46H91.5088L91.4248 0.599999H84.2488V9ZM92.5363 9H94.6483V3.684H94.6963L98.7043 9H100.948V0.599999H98.8363V5.76H98.7883L94.8763 0.599999H92.5363V9ZM105.841 9.204C108.877 9.204 109.681 7.68 109.681 6.48C109.681 4.68 108.181 4.2 106.465 3.9C105.061 3.648 104.257 3.588 104.257 3C104.257 2.544 104.701 2.256 105.769 2.256C106.849 2.256 108.133 2.628 109.117 3.216H109.129V1.116C108.169 0.648 107.005 0.396 105.937 0.396C103.273 0.396 102.001 1.668 102.001 3.156C102.001 4.836 103.477 5.364 105.193 5.64C107.053 5.952 107.437 6.096 107.437 6.588C107.437 7.068 106.921 7.344 105.913 7.344C104.737 7.344 103.345 6.972 102.037 6.288H102.025V8.4C103.129 8.88 104.317 9.204 105.841 9.204Z" fill="black"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="container pt-24 md:pt-36 mx-auto font-text flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <span
            className="my-4 font-code text-6xl text-black font-bold leading-tight text-center md:text-left">
            404
          </span>
          <p className="leading-normal font-text font-medium text-4xl mb-8 text-center md:text-left">
            The page you were looking for could not be not found.
          </p>
        </div>
      </div>
    </div>
    </body>
      </>
  );
};

export default LostPage;
