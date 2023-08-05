import { MONTHS, MONTHS_SHORT } from "../../util/constants/constants";
import { isViewable } from "../../util/helpers/monetaryItem.util";
import { TimePeriod } from "../../types/types";
import { useAppSelector } from "../../state/store/configureStore";
import {
  Bar,
  BarChart,
  CartesianGrid,
  DefaultTooltipContent,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import "./CategoryBarChart.styles.css";

import type { CategoryBarChartProps } from "./CategoryBarChart.definitions";
import type { MonetaryItem } from "../../types/types";

const CategoryBarChart = ({ data }: CategoryBarChartProps) => {
  // Get the year from the redux store
  const year = useAppSelector((state) => state.time.year);
  const range = useAppSelector((state) => state.time.range);

  let chartData: { name: string; value: number }[] = [];

  if (range === TimePeriod.MONTHLY) {
    // create an array of 12 undefined values
    chartData = Array(12).fill(undefined);

    // fill the chart data with empty values
    chartData = chartData.reduce(
      (acc: { name: string; value: number }[], _, index) => {
        acc.push({
          name: MONTHS_SHORT[index],
          value: 0,
        });
        return acc;
      },
      []
    );

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
    chartData = chartData.reduce(
      (acc: { name: string; value: number }[], _, index) => {
        acc.push({
          name: years[index].toString(),
          value: 0,
        });
        return acc;
      },
      []
    );

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

  // Custom tooltip is needed to add the label prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = (props: any) => {
    if (!props.active) {
      return null;
    }

    // Add the new label here with the label prop
    return <DefaultTooltipContent {...props} label={""} />;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={600} height={300} data={chartData}>
        <defs>
          {/* Make it vertical */}
          <linearGradient id="colorUv" x1="1" y1="0" x2="1" y2="1">
            <stop stopColor="#76e7aa" offset="0%" />
            <stop offset="100%" stopColor="#8ae2e8" />
          </linearGradient>
        </defs>
        <XAxis dataKey={"name"} />
        <CartesianGrid vertical={false} />
        <Bar dataKey="value" fill={"url(#colorUv)"} />
        <Tooltip
          content={<CustomTooltip />}
          formatter={(value: number) =>
            value < 0 ? `-$${Math.abs(value)}` : `$${value}`
          }
          contentStyle={{
            backgroundColor: "#2f2f2f",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "12px",
            padding: "10px",
            textAlign: "center",
          }}
          cursor={{ fill: "transparent" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryBarChart;
