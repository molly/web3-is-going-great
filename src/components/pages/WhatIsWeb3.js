import React from "react";
import BackBar from "../shared/BackBar";
import ExternalLink from "../shared/ExternalLink";
import Footer from "../shared/Footer";

export default function WhatIsWeb3() {
  return (
    <>
      <header className="page-header">
        <h1>What is Web3?</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page">
          <p>
            Great question. One of the most distinguishing features of "web3" is
            the sheer level of handwaviness surrounding it. While you can find
            thousands of press releases, Twitter crypto bros, venture
            capitalists, and others extolling the virtues of web3, you will have
            a much harder time finding any definition that's widely agreed-upon
            or not so full of buzzwords that it becomes meaningless.
          </p>
          <p>
            Generally speaking, web3 is an umbrella term to refer to the "future
            of the Internet", which its proponents believe will be decentralized
            and based on the blockchain. Proponents tend to tout how data won't
            be controlled by "Big Tech", and how it will be "uncensorable".
            There is, however, no shortage of examples in this timeline of how
            many "web3" ideas are indeed centralized in similar ways to Big
            Tech, as well as instances where "uncensorable" or "unmodifiable"
            platforms have removed or modified data.
          </p>
          <p>
            Ideas described as web3 tend to incorporate some of the following:
            <ul>
              <li>cryptocurrency</li>
              <li>decentralized autonomous organizations (DAOs)</li>
              <li>decentralized finance (DeFi)</li>
              <li>non-fungible tokens (NFTs)</li>
              <li>smart contracts</li>
            </ul>
          </p>
          <p>
            Here are some resources where you can learn more:
            <ul>
              <li>
                <ExternalLink href="https://en.wikipedia.org/wiki/Web3">
                  <span>Web3</span>
                </ExternalLink>{" "}
                on Wikipedia
              </li>
              <li>
                <ExternalLink href="https://www.stephendiehl.com/blog/web3-bullshit.html">
                  <span>"Web3 is bullshit"</span>
                </ExternalLink>{" "}
                by Stephen Diehl
              </li>
            </ul>
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
