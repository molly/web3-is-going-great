import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import BackBar from "../components/BackBar";
import CustomHead from "../components/CustomHead";
import SimpleHeader from "../components/SimpleHeader";
import clsx from "clsx";

export default function FAQ() {
  const [highlightedEntry, setHighlightedEntry] = useState();
  useEffect(() => {
    if (window.location.hash) {
      setHighlightedEntry(window.location.hash.slice(1));
    }
  }, [setHighlightedEntry]);

  return (
    <>
      <CustomHead
        title="FAQ – Web3 is Going Just Great"
        description="Frequently asked questions about the Web3 is Going Just Great site"
        urlPath="faq"
      />
      <SimpleHeader>FAQ</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page longform-text">
          <div
            id="not-web3"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "not-web3",
            })}
          >
            <h3>
              Why does this site include posts about Bitcoin/cryptocurrency
              exchanges/other things that are not "web3"?
            </h3>
            <p>
              As mentioned on the <Link href="/about">about page</Link>, this
              project focuses on anything in the blockchains/crypto/web3
              technology space. Unfortunately "Cryptocurrencies and
              Blockchain-based Projects are Going Just Great" doesn't exactly
              roll off the tongue, even though it would be a more precise title.
            </p>
          </div>
          <div
            id="dollar-amounts"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "dollar-amounts",
            })}
          >
            <h3>How are dollar amounts estimated?</h3>
            <p>
              Unless stated otherwise, the dollar value of crypto tokens are
              estimated based on the token price at the time of the event.
            </p>
            <p>
              With NFTs, I typically estimate value based on actual sale price.
              For example, if an NFT is stolen, I usually use the price at which
              the thief resold the NFT to estimate loss — even though thieves
              often flip NFTs for less money than they might otherwise fetch. In
              some cases I will also note the NFT collection's{" "}
              <Link href="/glossary#floor-price">floor price</Link> or previous
              sale amounts, if there is a large discrepancy between the sale
              amount and typical sales of NFTs in that collection.
            </p>
          </div>
          <div
            id="notional"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "notional",
            })}
          >
            <h3>Why do some entries use language like "notionally worth"?</h3>
            <p>
              With illiquid crypto tokens, naively estimating value based on
              token price&nbsp;&times;&nbsp;number of tokens doesn't produce an
              accurate value – see my essay "
              <a
                href="https://blog.mollywhite.net/cryptocurrency-market-caps-and-notional-value/"
                target="_blank"
                rel="noreferrer"
              >
                Cryptocurrency 'market caps' and notional value
              </a>
              ". In these cases, I will use language like "notionally worth",
              "nominally worth", or "priced at" to indicate that there is a
              substantial amount of error in the number, and I typically try to
              provide a better estimate based on the actual sale price of the
              tokens if it's at all possible.
            </p>
          </div>
          <div
            id="fiat-inaccurate"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "fiat-inaccurate",
            })}
          >
            <h3>Aren't fiat estimates of crypto notoriously inaccurate?</h3>
            <p>
              Yes. It's usually impossible to accurately estimate how much
              actual fiat currency has gone in to the system to create the
              supposed fiat valuations of any crypto asset.
            </p>
            <p>
              However, most people (myself included) have a tough time of
              estimating at a glance what 1&nbsp;BNB is worth in relation to
              1&nbsp;SOL in relation to 1&nbsp;ETH in relation to
              1&nbsp;ElonDogeMoonToken, and so I use USD estimates to try to
              give people <i>some</i> frame of reference to go with. I almost
              always include the actual number of tokens involved with an event
              (unless there are many different tokens involved), so people can
              perform their own estimates if they'd prefer.
            </p>
          </div>
          <div
            id="changing-number"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "changing-number",
            })}
          >
            <h3>Do the estimates change?</h3>
            <p>
              Yes. I routinely go back and update entries when new information
              comes out, and so you'll sometimes see estimates moving around as
              I strive to keep them as accurate as possible.
            </p>
          </div>
          <div
            id="recovered"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "recovered",
            })}
          >
            <h3>What is the "recovered" column in the leaderboard table?</h3>
            <p>
              This reflects lost funds that were recovered, either because they
              were returned by a thief, or recovered by law enforcement or some
              other entity. It does not include funds that were "covered" by an
              infusion of new funds, as the original assets are still missing in
              those cases.
            </p>
          </div>
          <div
            id="grift-counter"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "grift-counter",
            })}
          >
            <h3>What's the number in the corner with the flames?</h3>
            <p>
              That's the Grift Counter (™™™)! A running total of the amount of
              money lost so far to grifts and scams, which increments as you
              scroll through the page. It doesn't update with every single post
              that mentions a monetary loss (for example, if someone transfers
              money to a dead-end wallet by mistake)—just the money lost to
              intentional thefts and scams. If it makes more sense to you to
              start with the total amount of money lost to grifts and scams, and
              have it decrement as you scroll back in time, that's an option
              too! Just click the{" "}
              <i className="fas fa-gear" aria-hidden={true} />
              <span className="sr-only">settings panel icon</span> and pick
              "Start at total amount scammed and subtract as you scroll". You
              can also show and hide the counter or stop the animation of the
              flames from this panel.
            </p>
            <p>
              The grift counter does not appear when you visit the website via a
              permalink to an entry, because it throws off the total to start
              partway through the timeline.
            </p>
          </div>
          <div
            id="grift-counter-higher"
            className={clsx("faq-entry", {
              highlighted: highlightedEntry === "grift-counter-higher",
            })}
          >
            <h3>Did the grift counter go way up recently?</h3>
            <p>
              In July 2023, I updated the grift counter to include some of the
              larger cryptocurrency collapses, which I previously omitted due to
              challenges in reflecting uncertainty in these amounts. The{" "}
              <Link href="/charts/top" target="_blank">
                Leaderboard
              </Link>{" "}
              now reflects uncertainty more explicitly. Prior to the update, the
              grift counter showed the total amount at around
              $12.66&nbsp;billion.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
