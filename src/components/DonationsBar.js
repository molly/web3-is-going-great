import PropTypes from "prop-types";
import useWindowWidth from "../hooks/useWindowWidth";

export default function DonationsBar({ donations, totalExpenses }) {
  const windowWidth = useWindowWidth();

  const formatUSD = (num) => {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  if (donations >= totalExpenses) {
    const paidWidth = (totalExpenses / donations) * 100;
    const extraWidth = ((donations - totalExpenses) / donations) * 100;
    return (
      <div className="donations-bar-wrapper">
        <div className="text-bar">
          <div style={{ width: `${paidWidth}%` }}>
            {formatUSD(totalExpenses)}
          </div>
          {extraWidth !== 0 && (
            <div style={{ width: `${extraWidth}%` }}>
              {formatUSD(donations - totalExpenses)}
            </div>
          )}
        </div>
        <div className="donations-bar">
          <div className="paid" style={{ width: `${paidWidth}%` }}>
            {windowWidth !== "sm" ? "Expenses" : null}
          </div>
          {extraWidth !== 0 && (
            <div
              className="extra-donations"
              style={{ width: `${extraWidth}%` }}
            >
              {windowWidth !== "sm" ? "Remaining donations" : null}
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
          <div style={{ width: `${paidWidth}%` }}>{formatUSD(donations)}</div>
          <div style={{ width: `${remainderWidth}%` }}>
            {formatUSD(totalExpenses - donations)}
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
};
