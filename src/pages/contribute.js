import React, { useMemo } from "react";
import PropTypes from "prop-types";
import useGA from "../hooks/useGA";

import moment from "moment";
import { getMoney } from "../db/money";

import CustomHead from "../components/CustomHead";
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

export default function Contribute({ money }) {
  useGA();

  const totalExpenses = useMemo(
    () =>
      money.expenses.reduce((acc, { value }) => acc + value, 0) +
      money.nextMonthEstimate,
    [money]
  );

  const nextMonth = useMemo(() => {
    let lastMonthOfExpenses = moment();
    for (let i = money.expenses.length - 1; i >= 0; i--) {
      if (money.expenses[i].label === "Cloud services") {
        lastMonthOfExpenses = money.expenses[i].date;
        break;
      }
    }
    const nextMonthMoment = moment(lastMonthOfExpenses, "MMMM YYYY").add(
      1,
      "month"
    );
    return nextMonthMoment.format("MMMM YYYY");
  }, [money]);

  const renderOtherDonationLinks = () => {
    return (
      <>
        <ExternalLink href="https://www.colorstack.org/">
          ColorStack
        </ExternalLink>
        ,{" "}
        <ExternalLink href="https://www.underdogdevs.org/">
          Underdog Devs
        </ExternalLink>
        ,{" "}
        <ExternalLink href="https://girlswhocode.com/">
          Girls Who Code
        </ExternalLink>
        *, or{" "}
        <ExternalLink href="https://www.blackgirlscode.com/">
          Black Girls Code
        </ExternalLink>
        *
      </>
    );
  };

  return (
    <>
      <CustomHead
        title="Contribute"
        description="Contribute content to Web3 is Going Just Great, and see how to donate."
        urlPath="contribute"
      />
      <header className="page-header attribution-header">
        <h1>Contribute</h1>
      </header>
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
            account (I sometimes miss tweets to the{" "}
            <ExternalLink href="https://twitter.com/web3isgreat">
              @web3isgreat
            </ExternalLink>{" "}
            account, though I do my best!) Make sure to send me a link to
            reporting about any event you're hoping to see on the timeline!
          </p>
          <h2>Donate</h2>
          <p>
            If you were hoping to donate, please consider donating to causes
            that need it more than me, like {renderOtherDonationLinks()}. This
            project also benefits enormously from the non-profit{" "}
            <ExternalLink href="https://free.law/donate/">
              Free Law Project
            </ExternalLink>
            , which provides invaluable access to court records for free.
          </p>
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
          <p>
            Please note that I created the project with the expectation that I
            would pay for it out-of-pocket, so this isn't a scenario where the
            site will come offline if hosting costs aren't covered by donations.
          </p>
          <table className="expenses centered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              {money.expenses.map((expense) => (
                <tr key={`${expense.label}-${expense.date}`}>
                  <td>{expense.label}</td>
                  <td>{expense.date}</td>
                  <td className="number">{`$${expense.value.toFixed(2)}`}</td>
                </tr>
              ))}
              <tr className="estimate">
                <td>
                  <i>Cloud services estimate</i>
                </td>
                <td>{nextMonth}</td>
                <td className="number">{`$${money.nextMonthEstimate.toFixed(
                  2
                )}`}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  Total expenses to date (including next month's estimate)
                </td>
                <td className="number">{`$${totalExpenses.toFixed(2)}`}</td>
              </tr>
              <tr>
                <td colSpan={2}>Total donations to date</td>
                <td className="number">{`$${money.donations.toFixed(2)}`}</td>
              </tr>
            </tbody>
          </table>
          <DonationsBar
            donations={money.donations}
            totalExpenses={totalExpenses}
          />
          <p>
            I manually update the table above, so don't be startled if it takes
            a day or so for your donation to show up here!
          </p>
          <p className="help-text">
            * Both Girls Who Code and Black Girls Code have partnered with
            crypto projects in the past. While I don't support that decision, I
            do think they are doing enormously good work towards helping the
            demographics they focus on. To my knowledge, neither UnderdogDevs
            nor ColorStack have crypto entanglements, if you are more
            comfortable donating to them.
          </p>
          <p className="help-text">
            ** Cloud services costs begin in February because those services
            were covered by intro credits until then.
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
    nextMonthEstimate: PropTypes.number.isRequired,
  }),
};
