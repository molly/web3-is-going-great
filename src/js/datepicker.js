import {
  endOfDay,
  startOfMonth,
  endOfYear,
  startOfYear,
  format,
  isValid,
  clamp,
} from "date-fns";
import find from "lodash.find";
import { createStaticRanges } from "react-date-range";

const START_YEAR = 2021;
export const MIN_DATE = new Date("2021-01-01T12:00:00"); // TZ hack to avoid off-by-one

const getPastYears = () => {
  const years = [];
  let year = new Date().getFullYear() - 1;
  while (year >= START_YEAR) {
    const yearDate = new Date(`${year}-01-01T12:00:00`);
    const yearStr = `${year}`;
    years.push({
      label: yearStr,
      shortLabel: yearStr,
      range: () => ({
        startDate: startOfYear(yearDate),
        endDate: endOfYear(yearDate),
      }),
    });
    year -= 1;
  }
  return years;
};

export const STATIC_RANGES = createStaticRanges([
  {
    label: "From January 2021",
    shortLabel: "all",
    range: () => ({ startDate: MIN_DATE, endDate: endOfDay(new Date()) }),
  },
  {
    label: "This month",
    shortLabel: "month",
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "This year to date",
    shortLabel: `${new Date().getFullYear()}`,
    range: () => ({
      startDate: startOfYear(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  ...getPastYears(),
]);

export const staticRangeToPreset = (range) => {
  const { startDate, endDate } = range.range();
  return {
    label: range.label,
    shortLabel: range.shortLabel,
    startDate,
    endDate,
    key: "selection",
  };
};

export const ALL_TIME = staticRangeToPreset(STATIC_RANGES[0]);

export const getPreset = (selection) => {
  for (const preset of STATIC_RANGES) {
    if (preset.isSelected(selection)) {
      return preset;
    }
  }
  return null;
};

export const getCustomButtonLabel = (selection) => {
  return `${format(selection.startDate, "MMM d, yyyy")} – ${format(
    selection.endDate,
    "MMM d, yyyy"
  )}`;
};

export const getDateRangeFromQueryParams = ({
  startDate,
  endDate,
  dateRange,
}) => {
  if (dateRange) {
    const staticRange = find(
      STATIC_RANGES,
      (range) => range.shortLabel === dateRange
    );
    if (staticRange) {
      return staticRangeToPreset(staticRange) || ALL_TIME;
    }
  }
  if (startDate && endDate) {
    let startDateObj = new Date(`${startDate}T12:00:00`);
    let endDateObj = new Date(`${endDate}T12:00:00`);
    if (isValid(startDateObj) && isValid(endDateObj)) {
      startDateObj = clamp(startDateObj, { start: MIN_DATE, end: new Date() });
      endDateObj = clamp(endDateObj, { start: MIN_DATE, end: new Date() });
      const dateRangeObj = { startDate: startDateObj, endDate: endDateObj };
      const preset = getPreset(dateRangeObj);
      if (preset) {
        return staticRangeToPreset(preset);
      }
      return {
        ...dateRangeObj,
        key: "selection",
        label: getCustomButtonLabel(dateRangeObj),
      };
    }
  }
  return ALL_TIME;
};
