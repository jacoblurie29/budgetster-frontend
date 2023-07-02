import LargeCategoryCard from "../../components/LargeCategoryCard/LargeCategoryCard";
import LargeCountCard from "../../components/LargeCountCard/LargeCountCard";
import { TimePeriod, MonetaryItemCategory } from "../../types/types";
import "./Dashboard.styles.css";
import TopBar from "../../layout/topbar/TopBar";
import { AllMonetaryItemsQuery } from "../../graphql/MonetaryItem.gql";
import TimeChart from "../../components/TimeChart/TimeChart";
import { useAppSelector } from "../../state/configureStore";
import { isViewable } from "../../util/helpers/monetaryItem.util";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import type { MonetaryItem } from "../../types/types";

const Dashboard = () => {
  const [chartValues, setChartValues] = useState<number[]>(Array(12).fill(0));
  const { loading, data, refetch } = useQuery(AllMonetaryItemsQuery, {
    fetchPolicy: "cache-and-network",
  });

  // Current month, year, and range state
  const month = useAppSelector((state) => state.time.month);
  const year = useAppSelector((state) => state.time.year);
  const range = useAppSelector((state) => state.time.range);

  const outlookValue = chartValues.reduce((a, b) => a + b, 0) / 12;

  // Refetch monetary items on mount
  useEffect(() => {
    try {
      refetch();
      console.log("✅ [API]: ", data);
    } catch (error) {
      console.log("❌ [API]: ", error);
    }
  }, []);

  // Update chart values when monetary items change
  useEffect(() => {
    if (data?.getMonetaryItems === undefined) return;

    const filteredMonetaryItems = data.getMonetaryItems.filter(
      // filter for date
      (item: MonetaryItem, index: number) =>
        item.type === MonetaryItemCategory.EXPENSE &&
        isViewable(item, index, year, TimePeriod.YEARLY)
    );

    const chartData = Array(12).fill(0);

    chartData.forEach((_, index) => {
      filteredMonetaryItems.forEach((item: MonetaryItem) => {
        if (isViewable(item, index, year, TimePeriod.MONTHLY)) {
          if (item.type === MonetaryItemCategory.INCOME) {
            chartData[index] += item.value;
          } else {
            chartData[index] -= item.value;
          }
        }
      });
    });

    setChartValues(chartData);
  }, [month, year, data]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <TopBar title={"Dashboard"} hasTimeControl />
      <div className="app-largecountcards-container">
        <LargeCountCard
          title="Spending Budget"
          value={180}
          subtitle="per month"
        />
        <LargeCountCard
          title="Current Outlook"
          value={outlookValue}
          subtitle="per month"
          isValueCard
        />
        <TimeChart values={chartValues} />
      </div>
      <LargeCategoryCard
        title="Expenses"
        values={
          data.getMonetaryItems.filter(
            // filter for date
            (item: MonetaryItem, index: number) =>
              item.type === MonetaryItemCategory.EXPENSE &&
              isViewable(item, index, year, range)
          ) as MonetaryItem[]
        }
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.EXPENSE}
      />
      <LargeCategoryCard
        title="Income"
        values={
          data.getMonetaryItems.filter(
            (item: MonetaryItem, index: number) =>
              item.type === MonetaryItemCategory.INCOME &&
              isViewable(item, index, year, range)
          ) as MonetaryItem[]
        }
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.INCOME}
      />
      <LargeCategoryCard
        title="Investments"
        values={
          data.getMonetaryItems.filter(
            (item: MonetaryItem, index: number) =>
              item.type === MonetaryItemCategory.INVESTMENT &&
              isViewable(item, index, year, range)
          ) as MonetaryItem[]
        }
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.INVESTMENT}
      />
    </div>
  );
};

export default Dashboard;
