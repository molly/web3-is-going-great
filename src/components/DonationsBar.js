import PropTypes from "prop-types";
import useWindowWidth from "../hooks/useWindowWidth";
import { formatDollarString } from "../js/utilities";

export default function DonationsBar({
  donations,
  totalExpenses,
  remainingCredits,
  usedCredits,
}) {
  const windowWidth = useWindowWidth();
  const expensesAfterCredits = totalExpenses - usedCredits;
  let remainingDonations = donations - expensesAfterCredits;
  if (remainingDonations < 0) {
    remainingDonations = 0;
  }

  if (remainingDonations >= 0 || remainingCredits > 0) {
    const denominator = totalExpenses + remainingDonations + remainingCredits;
    const usedCreditsWidth = (usedCredits / denominator) * 100;
    const paidWidth = (expensesAfterCredits / denominator) * 100;
    const remainingCreditsWidth = (remainingCredits / denominator) * 100;
    const remainingDonationsWidth = (remainingDonations / denominator) * 100;
    return (
      <div className="donations-bar-wrapper">
        <div className="text-bar">
          <div style={{ width: `${usedCreditsWidth + paidWidth}%` }}>
            {formatDollarString(totalExpenses)}
          </div>
          {(remainingCredits !== 0 || remainingDonations !== 0) && (
            <div
              style={{
                width: `${remainingCreditsWidth + remainingDonationsWidth}%`,
              }}
            >
              {formatDollarString(remainingCredits + remainingDonations)}
            </div>
          )}
        </div>
        <div className="donations-bar">
          <div
            className="used-credits"
            style={{ width: `${usedCreditsWidth}%` }}
          >
            {windowWidth !== "sm" ? "Credits" : null}
          </div>
          <div className="paid" style={{ width: `${paidWidth}%` }}>
            {windowWidth !== "sm" ? "Expenses" : null}
          </div>
          {remainingCredits !== 0 && (
            <div
              className="extra-credits"
              style={{ width: `${remainingCreditsWidth}%` }}
            >
              {windowWidth !== "sm" ? "Remaining credits" : null}
            </div>
          )}
          {remainingDonations !== 0 && (
            <div
              className="extra-donations"
              style={{ width: `${remainingDonationsWidth}%` }}
            >
              {windowWidth !== "sm" ? "Remaining donations" : null}
            </div>
          )}
        </div>
        <div className="text-bar">
          <div style={{ width: `${usedCreditsWidth}%` }}>
            {formatDollarString(usedCredits)}
          </div>
          <div style={{ width: `${paidWidth}%` }}>
            {formatDollarString(expensesAfterCredits)}
          </div>
          {remainingCredits !== 0 && (
            <div style={{ width: `${remainingCreditsWidth}%` }}>
              {formatDollarString(remainingCredits)}
            </div>
          )}
          {remainingDonations !== 0 && (
            <div style={{ width: `${remainingDonationsWidth}%` }}>
              {formatDollarString(remainingDonations)}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    const paidWidth = (donations / totalExpenses) * 100;
    const remainderWidth = ((totalExpenses - donations) / totalExpenses) * 100;
    return (
      <div className="donations-bar-wrapper">
        <div className="text-bar">
          <div style={{ width: `${paidWidth}%` }}>
            {formatDollarString(donations)}
          </div>
          <div style={{ width: `${remainderWidth}%` }}>
            {formatDollarString(totalExpenses - donations)}
          </div>
        </div>
        <div className="donations-bar">
          <div className="paid" style={{ width: `${paidWidth}%` }}>
            {windowWidth !== "sm" ? "Donations" : null}
          </div>
          <div className="remainder" style={{ width: `${remainderWidth}%` }}>
            {windowWidth !== "sm" ? "Remaining expenses" : null}
          </div>
        </div>
      </div>
    );
  }
}

DonationsBar.propTypes = {
  donations: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  remainingCredits: PropTypes.number.isRequired,
  usedCredits: PropTypes.number.isRequired,
};
