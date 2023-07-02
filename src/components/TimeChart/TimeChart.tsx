import { MONTHS_SHORTER } from "../../util/constants/constants";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeChartProps } from "./TimeChart.definitions";

const TimeChart = ({ values }: TimeChartProps) => {
  // make an array of line series values
  const data = values.map((value, index) => ({
    name: index,
    amount: value,
    xLabel: MONTHS_SHORTER[index],
  }));
  return (
    <LineChart width={350} height={220} data={data}>
      <CartesianGrid stroke="#ccc" vertical={false} />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#8ae2e8"
        strokeWidth={"2px"}
      />
      <XAxis dataKey="xLabel" tick={{ fontSize: 10 }} />
      <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 10 }} />
      <Tooltip
        formatter={(value) => `$${value}`}
        contentStyle={{
          backgroundColor: "#2f2f2f",
          border: "none",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "12px",
          padding: "10px",
          textAlign: "center",
        }}
      />
    </LineChart>
  );
};

export default TimeChart;
