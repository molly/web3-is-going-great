import React, { useMemo } from "react";
import PropTypes from "prop-types";
import useGA from "../hooks/useGA";

import { add, sub, isPast, startOfMonth } from "date-fns";
import filter from "lodash.filter";
import find from "lodash.find";
import { formatDollarString } from "../js/utilities";

import { getMoney } from "../db/money";

import CustomHead from "../components/CustomHead";
import SimpleHeader from "../components/SimpleHeader";
import BackBar from "../components/BackBar";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";
import DonationsBar from "../components/DonationsBar";

export async function getServerSideProps() {
  return {
    props: {
      money: await getMoney(),
    },
  };
}

const humanizeMonthAndYear = (date) =>
  date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    timeZone: "utc",
  });

export default function Contribute({ money }) {
  useGA();

  const totalExpenses = useMemo(
    () =>
      money.expenses.reduce((acc, { value }) => acc + value, 0) +
      money.nextMonthEstimate,
    [money]
  );

  const nextMonth = useMemo(() => {
    let lastMonthOfExpenses = startOfMonth(new Date());
    for (let i = 0; i < 5; i++) {
      // Could use a while loop, but if something gets screwy in the DB it'll kick off an infinite loop.
      // If I haven't updated in multiple months, something's wrong here, no need to loop forever.
      const latestExpense = find(money.expenses, {
        date: humanizeMonthAndYear(lastMonthOfExpenses),
        label: "Cloud services",
      });
      if (latestExpense) {
        break;
      } else {
        lastMonthOfExpenses = sub(lastMonthOfExpenses, { months: 1 });
      }
    }

    const nextMonth = add(lastMonthOfExpenses, { months: 1 });
    return humanizeMonthAndYear(nextMonth);
  }, [money]);

  const tableRows = useMemo(() => {
    let rows = [];
    let month = new Date("2021-12-01T12:00:00");
    while (isPast(month)) {
      const monthStr = humanizeMonthAndYear(month);
      const expenses = filter(money.expenses, { date: monthStr });
      let credits = filter(money.credits, { date: monthStr });
      if (credits.length) {
        credits = credits.map((c) => ({
          ...c,
          label: `${c.label}*`,
          value: -c.value,
        }));
        rows = rows.concat(credits);
      }
      if (expenses.length) {
        rows = rows.concat(expenses);
      }
      month = add(month, { months: 1 });
    }
    return rows;
  }, [money]);

  return (
    <>
      <CustomHead
        title="Contribute"
        description="Contribute content to Web3 is Going Just Great, and see how to donate."
        urlPath="contribute"
      />
      <SimpleHeader>Contribute</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page longform-text">
          <h2>Suggest an addition or change</h2>
          <p>
            The best and quickest way to suggest an addition or change to this
            timeline is via Github Issue.{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great/issues/new?assignees=&labels=bug%2Ctriage&template=new-entry.yml&title=%5BNEW%5D%3A+">
              <span>Suggest a new entry</span>
            </ExternalLink>
            , or{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great/issues/new?assignees=&labels=&template=change-to-existing-entry.md&title=%5BEDIT%5D">
              suggest a change to an existing entry.
            </ExternalLink>
          </p>
          <p>
            If Github's not for you, you can also DM or tweet at me on my{" "}
            <ExternalLink href="https://twitter.com/molly0xFFF">
              @molly0xFFF
            </ExternalLink>{" "}
            account (I often miss tweets to the{" "}
            <ExternalLink href="https://twitter.com/web3isgreat">
              @web3isgreat
            </ExternalLink>{" "}
            account!) For the Mastodon users, you can toot at{" "}
            <ExternalLink href="https://hachyderm.io/@molly0xfff">
              @molly0xfff@hachyderm.io
            </ExternalLink>
            . Make sure to send me a link to reporting about any event you're
            hoping to see on the timeline.
          </p>
          <h2>Donate</h2>
          <p>
            If you would like to support my work, which includes this website, I
            have a{" "}
            <ExternalLink href="https://newsletter.mollywhite.net/">
              Substack
            </ExternalLink>
            . You can also make one-off donations via{" "}
            <a href="https://account.venmo.com/u/MollyWhite">Venmo</a>,{" "}
            <a href="https://cash.app/$molly0xfff">Cash App</a>, or{" "}
            <a href="https://www.paypal.com/donate/?business=3RM66P9NEQNFA&no_recurring=0&currency_code=USD">
              Paypal
            </a>
            . If you wish to make a one-off donation specifically towards the
            upkeep of this website, please note that in the message so that I
            can earmark the funds for this project. There is a transparency
            report below where I record the cost of keeping this site online, as
            well as those earmarked funds.
          </p>
          <h3>Expenses</h3>
          <table className="expenses centered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={`${row.label}-${row.date}`}>
                  <td>{row.label}</td>
                  <td>{row.date}</td>
                  <td className="number">{formatDollarString(row.value)}</td>
                </tr>
              ))}
              <tr className="estimate">
                <td>
                  <i>Cloud services estimate</i>
                </td>
                <td>{nextMonth}</td>
                <td className="number">
                  {formatDollarString(money.nextMonthEstimate)}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  Total expenses to date (including next month's estimate)
                </td>
                <td className="number">{formatDollarString(totalExpenses)}</td>
              </tr>
              <tr>
                <td colSpan={2}>Total donations to date</td>
                <td className="number">
                  {formatDollarString(money.donations)}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Remaining donations</td>
                <td className="number">
                  {formatDollarString(
                    Math.max(
                      money.donations - (totalExpenses - money.usedCredits),
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <DonationsBar
            donations={money.donations}
            totalExpenses={totalExpenses}
            remainingCredits={money.remainingCredits}
            usedCredits={money.usedCredits}
          />
          <p>
            I manually update the table above, so don't be startled if it takes
            a day or so for your donation to show up here!
          </p>
          <p className="help-text">
            * Credits refer to free credits for Google Cloud Platform, provided
            by Google.
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}

Contribute.propTypes = {
  money: PropTypes.shape({
    donations: PropTypes.number.isRequired,
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        date: PropTypes.string,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    credits: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        date: PropTypes.string,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    nextMonthEstimate: PropTypes.number.isRequired,
    remainingCredits: PropTypes.number.isRequired,
    usedCredits: PropTypes.number.isRequired,
  }),
};
