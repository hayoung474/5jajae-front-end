import { HydrationBoundary, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '~/style/GlobalStyles';
import { theme } from '~/style/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (e) => {
            console.log('useQuery Error!', e);
          },
        }),
        mutationCache: new MutationCache({
          onError: (e) => {
            console.log('useMutation Error!', e);
          },
        }),
      }),
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
