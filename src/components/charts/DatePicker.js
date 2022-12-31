import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { DateRangePicker } from "react-date-range";

import { MIN_DATE, STATIC_RANGES } from "../../js/datepicker";
import { endOfDay, format, formatISO } from "date-fns";

export default function DatePicker({ setDateRange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState([
    { startDate: MIN_DATE, endDate: endOfDay(new Date()), key: "selection" },
  ]);
  const [buttonLabel, setButtonLabel] = useState("All time");

  const datePickerRef = useRef(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -1],
        },
      },
    ],
  });

  useEffect(() => {
    const outsideClickHandler = (evt) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(evt.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [datePickerRef, isMenuOpen]);

  const getButtonLabel = (selection) => {
    for (const preset of STATIC_RANGES) {
      if (preset.isSelected(selection)) {
        return preset.label;
      }
    }
    return `${format(selection.startDate, "MMM d, yyyy")} – ${format(
      selection.endDate,
      "MMM d, yyyy"
    )}`;
  };

  return (
    <div className="date-picker" ref={datePickerRef}>
      <label>Date range:</label>
      <button
        className="date-picker-toggle-button"
        type="button"
        ref={setReferenceElement}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {buttonLabel}
      </button>

      {isMenuOpen && (
        <div
          ref={setPopperElement}
          className="date-picker-menu"
          style={styles.popper}
          {...attributes.popper}
        >
          <DateRangePicker
            color="#FFFFFF"
            rangeColors={["#5948a4"]}
            ranges={selectedRange}
            inputRanges={[]}
            staticRanges={STATIC_RANGES}
            minDate={MIN_DATE}
            editableDateInputs={true}
            shownDate={selectedRange[0].endDate}
            onChange={(item) => {
              const rangeText = getButtonLabel(item.selection);
              setSelectedRange([item.selection]);
              setButtonLabel(rangeText);
              if (rangeText === "All time") {
                setDateRange(null);
              } else {
                setDateRange({
                  startDate: formatISO(item.selection.startDate, {
                    representation: "date",
                  }),
                  endDate: formatISO(item.selection.endDate, {
                    representation: "date",
                  }),
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

DatePicker.propTypes = {
  setDateRange: PropTypes.func.isRequired,
};
