import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { MdxComponentsProvider } from '../context/MdxComponents';

import 'tailwindcss/tailwind.css';
import MDX from '../components/MDX';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <MDX>
        <Component {...pageProps} />
      </MDX>
    </ThemeProvider>
  );
};

export default MyApp;
