import { MONTHS_SHORT } from "../../util/constants/constants";
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

  // fill the chart data with empty values
  const chartData = Array(12)
    .fill(undefined)
    .map((_, index) => ({
      name: MONTHS_SHORT[index],
      value: 0,
    }));

  // populate the chart data with the monetary items
  chartData.forEach((_, index) => {
    data.forEach((item: MonetaryItem) => {
      if (isViewable(item, index, year, TimePeriod.MONTHLY)) {
        chartData[index].value += item.value;
      }
    });
  });

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
    <div>
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
            // Change the style of the hover
            cursor={{ fill: "transparent" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
