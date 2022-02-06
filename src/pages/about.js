import React from "react";
import useGA from "../hooks/useGA";
import Link from "next/link";

import CustomHead from "../components/CustomHead";
import BackBar from "../components/BackBar";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";

export default function WhatIsWeb3() {
  useGA();
  return (
    <>
      <CustomHead
        title="About – Web3 is going just great"
        description="About the Web3 is going just great project"
        urlPath="about"
      />
      <header className="page-header">
        <h1>About</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page">
          <h3>What is this?</h3>
          <p>
            This is a personal project of mine, and reflects my own opinions. If
            you are looking for an unbiased descriptor of web3 and related
            technologies, there are short ones in the{" "}
            <Link href="/glossary">
              <a>Glossary</a>
            </Link>
            , but that is not the goal of this site. I would recommend Wikipedia
            for that (and if the pages there are lacking, I would strongly
            encourage you to{" "}
            <ExternalLink href="https://en.wikipedia.org/wiki/Help:Introduction">
              contribute to them
            </ExternalLink>
            !) If you would like to see a version of this website that takes a
            different approach or covers a different topic, this is all
            open-source, so please feel free to{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great">
              fork the code and make your own
            </ExternalLink>
            !
          </p>
          <h3>Who am I?</h3>
          <p>
            I'm Molly White, a software engineer by trade who is also very
            passionate about free and open knowledge and resources, and
            presenting information such that it is more accessible to all.
            You'll usually find me working on and talking about Wikipedia. I
            also care very much about equity in the tech industry and online
            spaces. You can learn more about me on{" "}
            <ExternalLink href="https://www.mollywhite.net/">
              my website
            </ExternalLink>{" "}
            or find me on{" "}
            <ExternalLink href="https://twitter.com/molly0xFFF">
              Twitter
            </ExternalLink>
            .
          </p>
          <p>
            If you are interested, I also have{" "}
            <ExternalLink href="https://blog.mollywhite.net/blockchain/">
              longer-form, less sarcastic thoughts on web3
            </ExternalLink>
            .
          </p>
          <h3>Privacy and money</h3>
          <p>
            For full disclosure, I own no cryptocurrencies or NFTs. I have no
            particular financial interest in whether web3 takes off or not,
            though I have plenty of non-financial interests; after all, I do
            have to live on this planet, and I spend enough time engaging with
            the tech industry and online to care about the futures of both.
          </p>
          <p>
            I was not paid to make this site. I don't post sponsored content on
            this website or its associated Twitter account (or anywhere else for
            that matter). A few generous people have sent money to me via
            Twitter tips; I have earmarked that money for cloud hosting costs,
            which I otherwise pay out of pocket. I don't run ads or otherwise
            make money off the website in any way.
          </p>
          <p>
            The site does use Google Analytics, mostly for my own curiosity. All
            IP data is anonymized, no advertising features are enabled, and data
            retention is set to the minimum value (14 months). If you would
            rather not be tracked by Google Analytics, there are great
            extensions like{" "}
            <a href="https://en.wikipedia.org/wiki/Privacy_Badger">
              Privacy Badger
            </a>
            , or you can disable JavaScript for this site.
          </p>
          <h3 id="grift-question">
            What's the number in the corner with the flames?
          </h3>
          <p>
            That's the Grift Counter (™™™)! A running total of the amount of
            money lost so far to grifts and scams. It doesn't update with every
            single post that mentions a monetary loss (for example, if someone
            transfers money to a dead-end wallet by mistake)—just the money lost
            to intentional thefts and scams.
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
