import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import useScroll from "../hooks/useScroll";
import { ScrollContext } from "../context/scroll-context";
import {
  AccountContext,
  initialAccountContext,
} from "../context/account-context";
import { useState, useMemo } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const isScrollUp = useScroll();
  const [account, setAccount] = useState(initialAccountContext);
  const accountMemo = useMemo(() => ({ account, setAccount }), [account]);

  return (
    <ThemeProvider defaultTheme="light">
      <ScrollContext.Provider value={isScrollUp}>
        <AccountContext.Provider value={accountMemo}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AccountContext.Provider>
      </ScrollContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
