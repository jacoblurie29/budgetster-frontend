import { TimePeriod } from "../../types/types";
import { MONTHS_SHORT, MONTHS } from "../../util/constants/constants";
import { isViewable } from "../../util/helpers/monetaryItem.util";
import type { ChartBarType, MonetaryItem } from "../../types/types";

/**
 * @interface CategoryBarChartProps
 * @description The props for the category bar chart component
 * @param {ChartBarType[]} bars The bars that contain a name and value for the chart
 */
export interface CategoryBarChartProps {
  bars: ChartBarType[];
}

/**
 * Creates the chart bars for the category bar chart using the monetary items.
 *
 * @param data Data from the graphQL query
 * @param year The year from redux
 * @param range The range from redux
 * @returns The chart bars formatted with the name and value based on the range and year
 */
export const createChartBars = (
  data: MonetaryItem[],
  year: number,
  range: Omit<TimePeriod, "weekly">
): ChartBarType[] => {
  let chartData: ChartBarType[] = [];

  if (range === TimePeriod.MONTHLY) {
    // create an array of 12 undefined values
    chartData = Array(12).fill(undefined);

    // fill the chart data with empty values
    chartData = chartData.reduce((acc: ChartBarType[], _, index) => {
      acc.push({
        name: MONTHS_SHORT[index],
        value: 0,
      });
      return acc;
    }, []);

    // populate the chart data with the monetary items
    chartData.forEach((_, index) => {
      data.forEach((item: MonetaryItem) => {
        if (isViewable(item, index, year, TimePeriod.MONTHLY)) {
          chartData[index].value += item.value;
        }
      });
    });
  } else {
    // fill an array with 4 years before and after the current year
    const years = Array(9)
      .fill(undefined)
      .map((_, index) => year - 4 + index);

    // fill the chart data with empty values
    chartData = Array(9).fill(undefined);

    // fill the chart data with empty values
    chartData = chartData.reduce((acc: ChartBarType[], _, index) => {
      acc.push({
        name: years[index].toString(),
        value: 0,
      });
      return acc;
    }, []);

    // populate the chart for each year
    chartData.forEach((_, index) => {
      data.forEach((item: MonetaryItem) => {
        MONTHS.forEach((_, monthIndex) => {
          if (isViewable(item, monthIndex, years[index], TimePeriod.MONTHLY)) {
            chartData[index].value += item.value;
          }
        });
      });
    });
  }

  return chartData;
};
