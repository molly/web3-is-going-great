import useGA from "../hooks/useGA";

import CustomHead from "../components/CustomHead";
import BackBar from "../components/BackBar";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";

export default function WhatIsWeb3() {
  useGA();
  return (
    <>
      <CustomHead
        title="What is web3? – Web3 is going just great"
        description={
          'Generally speaking, web3 is an umbrella term to refer to the "future of the Internet", which believers say will be decentralized and based on the blockchain. Proponents tend to tout how data won\'t be controlled by "Big Tech", and how it will be uncensorable and egalitarian. There is, however, no shortage of examples in this timeline of how many "web3" projects are indeed centralized in similar ways to Big Tech, as well as instances where "uncensorable" or "unmodifiable" platforms have removed or modified data.'
        }
        urlPath="attribution"
      />
      <header className="page-header">
        <h1>What is Web3?</h1>
      </header>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page what-page longform-text">
          <p>
            One of the most distinguishing features of "web3" is the sheer level
            of handwaviness surrounding it. While you can find no end of press
            releases, crypto evangelists on Twitter, and venture capitalists
            extolling the virtues of web3, you will have a much harder time
            finding any definition that's not so full of buzzwords that it
            becomes meaningless.
          </p>
          <p>
            Generally speaking, "web3" is an umbrella term to refer to the
            "future of the Internet", which believers say will be decentralized
            and based on the blockchain. Proponents tend to tout how data won't
            be controlled by "Big Tech", and how it will be uncensorable and
            egalitarian. There is, however, no shortage of examples in this
            timeline of how many "web3" projects are indeed centralized in
            similar ways to Big Tech, as well as instances where "uncensorable"
            or "unmodifiable" platforms have removed or modified data.
          </p>
          <p>
            Skeptics of web3 tend to point out that decentralization was a
            founding tenet of the Internet and is not something that is only (or
            best) achieved with the blockchain. They also tend to point out the
            enormous environmental impacts of blockchain technology
            (particularly{" "}
            <ExternalLink href="https://www.coindesk.com/learn/2020/12/16/what-is-proof-of-work/">
              <span>proof-of-work</span>
            </ExternalLink>{" "}
            blockchains, including Bitcoin and until recently Ethereum). They
            also often mention that an awful lot of web3 projects sound quite a
            bit like{" "}
            <ExternalLink href="https://en.wikipedia.org/wiki/Ponzi_scheme">
              <span>Ponzi</span>
            </ExternalLink>{" "}
            or{" "}
            <ExternalLink href="https://en.wikipedia.org/wiki/Pyramid_scheme">
              <span>pyramid schemes</span>
            </ExternalLink>
            , and question the lack of regulation, oversight, and taxation that
            makes fraud, tax evasion, and other criminal behavior particularly
            rampant in the space.
          </p>
          <p>
            Ideas described as web3 tend to incorporate some of the following:
          </p>
          <ul>
            <li>various cryptocurrencies</li>
            <li>decentralized autonomous organizations (DAOs)</li>
            <li>decentralized finance (DeFi)</li>
            <li>non-fungible tokens (NFTs)</li>
            <li>smart contracts</li>
          </ul>
          <p>
            This is intended to be a brief overview of the concept rather than a
            long explainer or opinion piece, so here are some resources where
            you can learn more if you are looking for those kinds of things:
          </p>
          <h3>Explainers</h3>
          <ul>
            <li>
              <ExternalLink href="https://en.wikipedia.org/wiki/Web3">
                <span>Web3</span>
              </ExternalLink>
              <span> on Wikipedia</span>
            </li>
          </ul>
          <h3>Opinion</h3>
          <div className="indent">
            <h4>Web3</h4>
            <ul>
              <li>
                <ExternalLink href="https://www.stephendiehl.com/blog/web3-bullshit.html">
                  <span>"Web3 is bullshit"</span>
                </ExternalLink>
                <span> by Stephen Diehl</span>
              </li>
              <li>
                <ExternalLink href="https://www.youtube.com/watch?v=YQ_xWvX1n9g">
                  <span>"Line Goes Up – The Problem With NFTs"</span>
                </ExternalLink>
                <span> by Dan Olson (video)</span>
              </li>
              <li>
                <ExternalLink href="https://www.oreilly.com/radar/why-its-too-early-to-get-excited-about-web3/">
                  <span>"Why it's too early to get excited about Web3"</span>
                </ExternalLink>
                <span> by </span>
                <ExternalLink href="https://en.wikipedia.org/wiki/Tim_O%27Reilly">
                  Tim O'Reilly
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://society.robinsloan.com/archive/notes-on-web3/">
                  "Notes on Web3"
                </ExternalLink>
                <span> by </span>
                <ExternalLink href="https://en.wikipedia.org/wiki/Robin_Sloan">
                  Robin Sloan
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://tante.cc/2021/12/17/the-third-web/">
                  "The Third Web"
                </ExternalLink>
                <span> by tante</span>
              </li>
              <li>
                <ExternalLink href="https://www.usenix.org/publications/loginonline/web3-fraud">
                  "The Web3 Fraud"
                </ExternalLink>
                <span> by Nicholas Weaver</span>
              </li>
              <li>
                <ExternalLink href="https://the-crypto-syllabus.com/web3-a-map-in-search-of-territory/">
                  "Web3: A Map in Search of Territory"
                </ExternalLink>
                <span> by </span>
                <ExternalLink href="https://en.wikipedia.org/wiki/Evgeny_Morozov">
                  Evgeny Morozov
                </ExternalLink>
              </li>
            </ul>
            <h4>Crypto more broadly</h4>
            <ul>
              <li>
                <i>
                  <ExternalLink href="https://davidgerard.co.uk/blockchain/book/">
                    Attack of the 50 Foot Blockchain
                  </ExternalLink>
                </i>
                <span> by David Gerard (book)</span>
              </li>
              <li>
                <ExternalLink href="https://blog.dshr.org/2022/02/ee380-talk.html">
                  Slides and transcript
                </ExternalLink>
                <span> or </span>
                <ExternalLink href="https://www.youtube.com/watch?v=twrduL8aNGE">
                  video
                </ExternalLink>
                <span>
                  {" "}
                  of{" "}
                  <ExternalLink href="https://en.wikipedia.org/wiki/David_S._H._Rosenthal">
                    David S. H. Rosenthal's
                  </ExternalLink>{" "}
                  talk to Stanford EE Computer Systems students
                </span>
              </li>
              <li>
                <ExternalLink href="https://www.youtube.com/watch?v=xCHab0dNnj4">
                  Blockchains and Cryptocurrencies: Burn It With Fire
                </ExternalLink>
                <span> lecture by Nicholas Weaver (video)</span>
              </li>
              <li>
                <ExternalLink href="https://onezero.medium.com/the-inevitability-of-trusted-third-parties-a51cbcffc4e2">
                  "The Inevitability of Trusted Third Parties"
                </ExternalLink>
                <span> by </span>
                <ExternalLink href="https://en.wikipedia.org/wiki/Cory_Doctorow">
                  Cory Doctorow
                </ExternalLink>
              </li>
            </ul>
          </div>
          <h3>Other collections of resources</h3>
          <ul>
            <li>
              <ExternalLink href="https://blog.mollywhite.net/blockchain/">
                My own longer-form writing
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://web3.lifeitself.us/guide">
                Making Sense of Crypto and Web3 Guide
              </ExternalLink>
              <span> and its </span>
              <ExternalLink href="https://www.zotero.org/groups/4600269/web3/library">
                enormous reading list
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://davidgerard.co.uk/blockchain/">
                "Attack of the 50 Foot Blockchain"
              </ExternalLink>
              <span> blog by David Gerard</span>
            </li>
            <li>
              <span>Stephen Diehl's </span>
              <ExternalLink href="https://www.stephendiehl.com/blog.html">
                blog
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://rekt.news/">Rekt.news</ExternalLink>
            </li>
            <li>
              <span>A list of some really thoughtful </span>
              <ExternalLink href="https://twitter.com/i/lists/1473337241594388495">
                Web3 and crypto skeptics
              </ExternalLink>
              <span> on Twitter</span>
            </li>
            <li>
              <span>My </span>
              <ExternalLink href="https://www.mollywhite.net/reading/blockchain">
                blockchain reading list
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://cryptocriticscorner.com/">
                <i>Crypto Critics' Corner</i>
              </ExternalLink>
              <span> podcast</span>
            </li>
          </ul>
        </article>
      </div>
      <Footer />
    </>
  );
}
