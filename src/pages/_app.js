import "../styles/main.sass";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import { AppProvider } from "../context/AppContext";

if (typeof window !== "undefined") {
  ReactGA.initialize("UA-215114522-1");
  history.scrollRestoration = "manual";
}

function CustomApp({ Component, pageProps }) {
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
        <title key="title">Web3 is going just great</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          key="description"
          content="A timeline recording only some of the many disasters happening in crypto, decentralized finance, NFTs, and other blockchain-based projects."
        />
        <meta name="author" content="Molly White" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#5948a4" />
        <meta
          property="og:url"
          key="ogurl"
          content="https://web3isgoinggreat.com/"
        />
        <meta
          property="og:title"
          key="ogtitle"
          content="Web3 Is Going Just Great"
        />
        <meta property="og:type" key="ogtype" content="website" />
        <meta
          property="og:description"
          key="ogdescription"
          content="A timeline recording only some of the many disasters happening in crypto, decentralized finance, NFTs, and other blockchain-based projects."
        />
        <meta
          property="og:image"
          key="ogimage"
          content="https://storage.googleapis.com/primary-web3/monkey-og.png"
        />
        <meta
          property="og:image:alt"
          key="ogimagealt"
          content="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames. Text next to it says 'Web3 is going just great.'"
        />
        <meta property="og:image:width" key="ogwidth" content="1200" />
        <meta property="og:image:height" key="ogheight" content="630" />
        <meta
          name="twitter:card"
          key="twittercard"
          content="summary_large_image"
        />
        <meta name="twitter:creator" content="@molly0xfff" />
        <meta name="twitter:creator:id" content="545445165" />
        <meta name="twitter:site" content="@web3isgreat" />
        <meta name="twitter:site:id" content="1477342011875381251" />
        <meta
          name="twitter:title"
          key="twittertitle"
          content="Web3 is going just great"
        />
        <meta
          name="twitter:description"
          key="twitterdescription"
          content="A timeline recording only some of the many disasters happening in crypto, decentralized finance, NFTs, and other blockchain-based projects."
        />
        <meta
          name="twitter:image"
          key="twitterimage"
          content="https://storage.googleapis.com/primary-web3/monkey-twitter.png"
        />
        <meta
          name="twitter:image:alt"
          key="twitterimagealt"
          content="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames. Text next to it says 'Web3 is going just great.'"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}

CustomApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

export default CustomApp;
