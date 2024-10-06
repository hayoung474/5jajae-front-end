// import dynamic from 'next/dynamic';
import MainScreen from '~/components/main/MainScreen';

/** ssr:false 하여야 내부 suspense가 정상 동작 한다. */
// export default dynamic(() => import('~/components/main/MainScreen'), {
//   ssr: false,
// });

export default function Page() {
  return <MainScreen />;
}
