import { MONTHS, MONTHS_SHORTER } from "../../util/constants/constants";
import {
  CartesianGrid,
  DefaultTooltipContent,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeChartProps } from "./TimeChart.definitions";

const TimeChart = ({ values }: TimeChartProps) => {
  // Custom tooltip is needed to add the label prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = (props: any) => {
    if (!props.active) {
      return null;
    }

    // Add the new label here with the label prop
    return (
      <DefaultTooltipContent
        {...props}
        label={props.payload[0].payload.label}
      />
    );
  };

  // make an array of line series values
  const data = values.map((value, index) => ({
    name: index,
    Amount: value,
    xLabel: MONTHS_SHORTER[index],
    label: MONTHS[index],
  }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" vertical={false} />
        <Line
          type="monotone"
          dataKey="Amount"
          stroke="#8ae2e8"
          strokeWidth={"2px"}
        />
        <XAxis dataKey="xLabel" tick={{ fontSize: 10 }} />
        <YAxis
          tickFormatter={(value) =>
            value < 0 ? `-$${Math.abs(value)}` : `$${value}`
          }
          tick={{ fontSize: 10 }}
        />
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
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeChart;
