import dynamic from 'next/dynamic';

/** ssr:false 하여야 내부 suspense가 정상 동작 한다. */
export default dynamic(() => import('~/components/Page'), {
  ssr: false,
});
