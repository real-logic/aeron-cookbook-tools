import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_URL, SITE_NAME } from '../utils/constants';

type Props = {
  pageTitle?: string;
};

const meta = {
  description: `${SITE_NAME}.`,
  ogImagePath: '/assets/card-image.webp',
};

const Meta: React.FC<Props> = ({ pageTitle }: Props) => {
  const router = useRouter();
  const ogUrl = SITE_URL + router.asPath;
  const ogType = router.pathname === '/' ? 'website' : 'article';
  const ogTitle = pageTitle ? pageTitle : 'Shaun Laurens';
  const ogImage = SITE_URL + meta.ogImagePath;

  return (
    <Head>
      <title>{`${pageTitle} | ${SITE_NAME}`}</title>
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
      <meta name="description" content={meta.description} key="description" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta
        property="og:description"
        content={meta.description}
        key="ogDescription"
      />
      <meta property="og:image" content={ogImage} key="ogImage" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
