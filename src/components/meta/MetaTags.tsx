import Head from 'next/head';

const MetaTags = () => {
  return (
    <Head>
      {/** icon */}
      <link href="/image/ojajae-meta-logo.png" rel="icon" type="image/x-icon" />
      <link href="/image/ojajae-meta-logo.png" type="image/x-icon" />
      {/** 타이틀 */}
      <title>오늘자재</title>
    </Head>
  );
};

export default MetaTags;
