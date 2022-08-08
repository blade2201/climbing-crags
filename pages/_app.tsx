import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

export default MyApp;
