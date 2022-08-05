import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import * as React from "react";
import type { NextComponentType } from "next";
import { ReactElement, ReactNode } from "react";

type CustomAppProps = AppProps & {
  Component: CustomComponent;
};

type CustomComponent = NextComponentType & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

export default MyApp;
