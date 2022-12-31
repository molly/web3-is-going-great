import { endOfDay, startOfMonth, endOfYear, startOfYear } from "date-fns";
import { createStaticRanges } from "react-date-range";

const START_YEAR = 2021;
export const MIN_DATE = new Date("2021-01-01T12:00:00"); // TZ hack to avoid off-by-one

const getPastYears = () => {
  const years = [];
  let year = new Date().getFullYear() - 1;
  while (year >= START_YEAR) {
    const yearDate = new Date(`${year}-01-01T12:00:00`);
    years.push({
      label: year.toString(),
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
    label: "All time",
    range: () => ({ startDate: MIN_DATE, endDate: endOfDay(new Date()) }),
  },
  {
    label: "This month",
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "This year to date",
    range: () => ({
      startDate: startOfYear(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  ...getPastYears(),
]);
