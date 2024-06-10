import {
  HydrationBoundary,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Suspense, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '~/style/GlobalStyles';
import { theme } from '~/style/theme';

export default function App({ Component, pageProps }: AppProps) {
  const queryCache = new QueryCache();
  /** 앱 내부와 인스턴스 참조(또는 리액트 상태에서)에서 새 QueryClient 인스턴스를 만든다. 이렇게 하면 여러 사용자와 요청간에 데이터가 공유되지 않고 컴포넌트 생명주기 한번만 QueryClient를 생성할 수 있다. */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/** tanstack query devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
      {/** v5에서 Hydrate -> HydrationBoundary 로 네이밍 변경 */}
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
