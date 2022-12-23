import React from "react";
import useGA from "../hooks/useGA";
import Link from "next/link";

import CustomHead from "../components/CustomHead";
import BackBar from "../components/BackBar";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";

export default function WhatIsWeb3() {
  useGA();
  return <>
    <CustomHead
      title="About – Web3 is Going Just Great"
      description="About the Web3 is Going Just Great project"
      urlPath="about"
    />
    <header className="page-header">
      <h1>About</h1>
    </header>
    <BackBar />
    <div className="content-wrapper">
      <article className="generic-page longform-text">
        <h3>What is this?</h3>
        <p>
          Web3 is Going Just Great is a project to track some examples of how
          things in the blockchains/crypto/web3 technology space aren't
          actually going as well as its proponents might like you to believe.
          The timeline tracks events in cryptocurrency and blockchain-based
          technologies, dating back to the beginning of 2021.
        </p>
        <p>
          This is a personal project of mine, and reflects my own opinions. If
          you are looking for an unbiased descriptor of web3 and related
          technologies, there are short ones in the{" "}
          <Link href="/glossary">
            Glossary
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
          I have a{" "}
          <ExternalLink href="https://www.mollywhite.net/crypto-disclosures">
            disclosure statement
          </ExternalLink>
          . The TL;DR is that I hold no cryptocurrencies or NFTs, and am also
          not trying to make money off of crypto markets doing poorly by
          shorting the market, etc. I do have a{" "}
          <ExternalLink href="https://newsletter.mollywhite.net/">
            Substack
          </ExternalLink>{" "}
          for people who wish to support my otherwise unpaid work (which
          includes this website, but tends to be pretty wide-ranging), and I
          also accept{" "}
          <Link href="/contribute">
            donations
          </Link>{" "}
          for the website.
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
          money lost so far to grifts and scams, which increments as you
          scroll through the page. It doesn't update with every single post
          that mentions a monetary loss (for example, if someone transfers
          money to a dead-end wallet by mistake)—just the money lost to
          intentional thefts and scams. If it makes more sense to you to start
          with the total amount of money lost to grifts and scams, and have it
          decrement as you scroll back in time, that's an option too! Just
          click the <i className="fas fa-gear" aria-hidden={true} />
          <span className="sr-only">settings panel icon</span> and pick "Start
          at total amount scammed and subtract as you scroll". You can also
          show and hide the counter or stop the animation of the flames from
          this panel.
        </p>
        <p>
          The grift counter does not appear when you visit the website via a
          permalink, because it throws off the total to start partway through
          the timeline.
        </p>
      </article>
    </div>
    <Footer />
  </>;
}
