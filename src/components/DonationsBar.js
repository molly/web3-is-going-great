import PropTypes from "prop-types";
import useWindowWidth from "../hooks/useWindowWidth";
import { formatDollarString } from "../js/utilities";

function DonationLabel({ children }) {
  const windowWidth = useWindowWidth();
  if (windowWidth === "xs") {
    return null;
  }
  return <span title={children}>{children}</span>;
}

DonationLabel.propTypes = {
  children: PropTypes.string.isRequired,
};

export default function DonationsBar({
  donations,
  totalExpenses,
  remainingCredits,
  usedCredits,
}) {
  const expensesAfterCredits = totalExpenses - usedCredits;
  let remainingDonations = Math.max(donations - expensesAfterCredits, 0);
  const remainingExpenses = Math.max(
    totalExpenses - usedCredits - donations,
    0
  );

  let denominator;
  if (remainingDonations >= 0 || remainingCredits > 0) {
    denominator = totalExpenses + remainingDonations + remainingCredits;
  } else {
    denominator = totalExpenses;
  }

  const usedCreditsWidth = (usedCredits / denominator) * 100;
  const paidWidth =
    (Math.min(expensesAfterCredits, donations) / denominator) * 100;
  const remainingCreditsWidth = (remainingCredits / denominator) * 100;
  const remainingDonationsWidth = (remainingDonations / denominator) * 100;
  const remainingExpensesWidth = (remainingExpenses / denominator) * 100;

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
        {remainingExpenses > 0 && (
          <div
            style={{ width: `${remainingExpensesWidth}%` }}
            className="filler"
          />
        )}
      </div>
      <div className="donations-bar">
        <div className="used-credits" style={{ width: `${usedCreditsWidth}%` }}>
          <DonationLabel>Expenses covered by credits</DonationLabel>
        </div>
        <div className="paid" style={{ width: `${paidWidth}%` }}>
          <DonationLabel>Expenses covered by donations</DonationLabel>
        </div>
        {remainingCredits !== 0 && (
          <div
            className="extra-credits"
            style={{ width: `${remainingCreditsWidth}%` }}
          >
            <DonationLabel>Remaining credits</DonationLabel>
          </div>
        )}
        {remainingDonations !== 0 && (
          <div
            className="extra-donations"
            style={{ width: `${remainingDonationsWidth}%` }}
          >
            <DonationLabel>Remaining donations</DonationLabel>
          </div>
        )}
        {remainingExpenses !== 0 && (
          <div
            className="remaining-expenses"
            style={{ width: `${remainingExpensesWidth}%` }}
          >
            <DonationLabel>Remaining expenses</DonationLabel>
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
        {remainingExpenses !== 0 && (
          <div style={{ width: `${remainingExpensesWidth}%` }}>
            {formatDollarString(remainingExpenses)}
          </div>
        )}
      </div>
    </div>
  );
}

DonationsBar.propTypes = {
  donations: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  remainingCredits: PropTypes.number.isRequired,
  usedCredits: PropTypes.number.isRequired,
};
