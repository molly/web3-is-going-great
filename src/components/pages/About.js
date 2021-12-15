import React from "react";
import useGA from "../../js/useGA";
import { Link } from "react-router-dom";

import BackBar from "../shared/BackBar";
import ExternalLink from "../shared/ExternalLink";
import Footer from "../shared/Footer";

export default function WhatIsWeb3() {
  useGA();
  return (
    <>
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
            <Link to="/glossary">Glossary</Link>, but that is not the goal of
            this site. I would recommend Wikipedia for that (and if the pages
            there are lacking, I would strongly encourage you to{" "}
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
            For full disclosure, I own no cryptocurrencies or NFTs. I was not
            paid to make this site, nor do I make any money from it. I have no
            particular financial interest in whether web3 takes off or not,
            though I have plenty of non-financial interests; after all, I do
            have to live on this planet, and I spend enough time engaging with
            the tech industry and online to care about the futures of both.
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
