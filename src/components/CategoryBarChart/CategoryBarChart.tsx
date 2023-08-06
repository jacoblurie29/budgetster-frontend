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

const CategoryBarChart = ({ bars }: CategoryBarChartProps) => {
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
      <BarChart width={600} height={300} data={bars}>
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
