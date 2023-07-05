import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { DateRangePicker } from "react-date-range";

import {
  MIN_DATE,
  STATIC_RANGES,
  getCustomButtonLabel,
  getPreset,
  staticRangeToPreset,
} from "../../js/datepicker";
import { useRouter } from "next/router";
import { formatISO } from "date-fns";

export default function DatePicker({ dateRange, setDateRange }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState([dateRange]);

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

  return (
    <div className="date-picker" ref={datePickerRef}>
      <label>Date range:</label>
      <button
        className="date-picker-toggle-button"
        id="date-picker-toggle-button"
        type="button"
        ref={setReferenceElement}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        role="button"
        aria-controls="date-picker-menu"
        aria-expanded={isMenuOpen}
      >
        {dateRange?.label}
      </button>

      {isMenuOpen && (
        <div
          ref={setPopperElement}
          className="date-picker-menu"
          id="date-picker-menu"
          aria-labelledby="date-picker-toggle-button"
          role="region"
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
              let range;
              let staticRange = getPreset(item.selection);
              if (!staticRange) {
                range = {
                  startDate: item.selection.startDate,
                  endDate: item.selection.endDate,
                  label: getCustomButtonLabel(item.selection),
                };
                router.push(
                  {
                    query: {
                      ...router.query,
                      startDate: formatISO(range.startDate, {
                        representation: "date",
                      }),
                      endDate: formatISO(range.endDate, {
                        representation: "date",
                      }),
                    },
                  },
                  null,
                  { shallow: true }
                );
              } else {
                range = staticRangeToPreset(staticRange);
                router.push(
                  { query: { ...router.query, dateRange: range.shortLabel } },
                  null,
                  {
                    shallow: true,
                  }
                );
              }
              setSelectedRange([item.selection]);
              setDateRange(range);
            }}
          />
        </div>
      )}
    </div>
  );
}

DatePicker.propTypes = {
  setDateRange: PropTypes.func.isRequired,
  dateRange: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    label: PropTypes.string.isRequired,
    shortLabel: PropTypes.string,
  }),
};
