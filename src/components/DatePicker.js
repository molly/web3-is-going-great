import PropTypes from "prop-types";
import clsx from "clsx";

import { useSelect } from "downshift";

import {
  startOfMonth,
  endOfMonth,
  formatISO,
  startOfYear,
  endOfYear,
} from "date-fns";

const START_YEAR = 2021;

const getPastYearOptions = () => {
  const years = [];
  let year = new Date().getFullYear() - 1;
  while (year >= START_YEAR) {
    years.push({ text: year.toString(), value: year });
    year -= 1;
  }
  return years;
};

const DATE_OPTIONS = [
  { text: "All time", value: "all-time" },
  { text: "This month", value: "this-month" },
  { text: "This year to date", value: "ytd" },
  ...getPastYearOptions(),
  { text: "Custom range", value: "custom" },
];

export default function DatePicker({ setDateRange }) {
  const onSelectedItemChange = ({ selectedItem: { value: selectedRange } }) => {
    const now = new Date();
    const fmtOpts = { representation: "date" };
    let dateRange = {
      startDate: null,
      endDate: formatISO(now, fmtOpts),
    };
    if (selectedRange === "all-time") {
      dateRange = null;
    } else if (selectedRange === "this-month") {
      dateRange.startDate = formatISO(startOfMonth(now), fmtOpts);
    } else if (selectedRange === "ytd") {
      dateRange.startDate = formatISO(startOfYear(now), fmtOpts);
    } else if (Number.isInteger(selectedRange)) {
      const selectedYear = new Date(`${selectedRange}-01-01T12:00:00`); // Avoid off-by-one error with TZs
      dateRange.startDate = formatISO(selectedYear, fmtOpts);
      dateRange.endDate = formatISO(endOfYear(selectedYear), fmtOpts);
    } else if (selectedRange === "custom") {
      // Pass
    }
    console.log(dateRange);
    setDateRange(dateRange);
  };

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    id: "date-picker",
    items: DATE_OPTIONS,
    initialSelectedItem: { text: "All time", value: "all-time" },
    itemToString: (item) => (item ? item.text : ""),
    onSelectedItemChange,
  });

  return (
    <div className="date-picker">
      <label {...getLabelProps()}>Date range:</label>
      <div className="date-picker-control">
        <button {...getToggleButtonProps()}>{selectedItem.text}</button>
        <div {...getMenuProps()}>
          {isOpen && (
            <ul className="date-picker-menu">
              {DATE_OPTIONS.map((item, index) => (
                <li
                  key={item.value}
                  className={clsx({
                    "highlighted-item": highlightedIndex === index,
                  })}
                  {...getItemProps({ item, index })}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

DatePicker.propTypes = {
  setDateRange: PropTypes.func.isRequired,
};
