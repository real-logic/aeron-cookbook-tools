import Header from '../components/Header';
import Meta from '../components/Meta';
import React from "react"
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const Layout: React.FC<Props> = ({ children, pageTitle }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />

      <div className="bg-shaunnew-800">
        <Header />
        <main className="pt-4 pb-12 max-w-screen-xl w-full mx-auto px-4">{children}</main>
        <Footer/>
      </div>
      <script defer data-domain="shaunlaurens.com" data-api="/pollen/api/trail" src="/pollen/js/pollen.js"></script>
    </>
  );
};

export default Layout;
