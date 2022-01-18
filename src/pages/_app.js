import "../styles/main.sass";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import useIsBrowserRendering from "../hooks/useIsBrowserRendering";

if (typeof window !== "undefined") {
  ReactGA.initialize("UA-215114522-1");
}

function CustomApp({ Component, pageProps }) {
  const isBrowserRendering = useIsBrowserRendering();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <Head>
        <title>Web3 is going just great</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="A timeline of some of the greatest hits in cryptocurrencies, NFTs, and other web3 projects since the beginning of 2021."
        />
        <meta name="author" content="Molly White" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#5948a4" />
        <meta property="og:url" content="https://web3isgoinggreat.com/" />
        <meta property="og:title" content="Web3 is going just great" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A timeline of some of the greatest hits in cryptocurrencies, NFTs, and other web3 projects since the beginning of 2021"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/web3-334501.appspot.com/monkey-og.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@molly0xfff" />
        <meta name="twitter:title" content="Web3 is going just great" />
        <meta
          name="twitter:description"
          content="A timeline of some of the greatest hits in cryptocurrencies, NFTs, and other web3 projects since the beginning of 2021."
        />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/web3-334501.appspot.com/monkey-twitter.png"
        />
        <meta
          name="twitter:image:alt"
          content="Illustration: A sad-looking Bored Ape
      Yacht Club NFT monkey looks at a world engulfed in flames. Text next to it
      says 'Web3 is going just great.'"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        {!isBrowserRendering && <link rel="stylesheet" href="./min.css"></link>}
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

CustomApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object,
};

export default CustomApp;
