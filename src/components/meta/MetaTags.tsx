import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  imageUrl?: string;
  siteUrl?: string;
  additionalKeywords?: string;
}
const MetaTags = ({ title, description, imageUrl, siteUrl, additionalKeywords }: Props) => {
  const metaTitle = title ? `오늘자재 - ${title}` : '오늘자재, 자재업체를 한곳에!';
  const metaDescription =
    description ??
    '내 주변 자재 업체 검색 서비스 - 다루끼, V컷팅, 보일러배관, 환기덕트, 차단기, 철물까지! 오늘자재에서 나에게 필요한 자재 업체를 찾아보세요.';
  const metaSiteUrl = siteUrl ?? 'https://ojajae.com';
  const metaImageUrl = imageUrl ?? '/image/ojajae-opengraph-image.png';
  const metaKeywords = `${additionalKeywords}, 건축자재, 자재업체, 철물점, 몰딩, 합판, MDF, 갈바, 석고보드, 페인트, 누수, 방수, 변압기, 그라스울, 아이소핑크, 오늘자재, ojaje, ojajae, 건축자재단가표, 일위대가, 조달청가격정보`;
  return (
    <Head>
      <meta charSet="utf-8" />
      {/** icon */}
      <link href="/image/ojajae-meta-logo.png" rel="icon" type="image/x-icon" />
      <link href="/image/ojajae-meta-logo.png" type="image/x-icon" />
      {/** 타이틀 */}
      <title>{metaTitle}</title>

      <meta name="title" content={metaTitle} />
      {/** 디스크립션 */}
      <meta name="description" content={metaDescription} />
      {/** 키워드 */}
      <meta name="keywords" content={metaKeywords} />

      {/** 오픈그래프 */}
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="오늘자재, 자재업체를 한곳에!" />
      <meta property="og:url" content={metaSiteUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};

export default MetaTags;
