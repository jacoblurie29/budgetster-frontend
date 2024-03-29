import LargeCategoryCard from "../../components/LargeCategoryCard/LargeCategoryCard";
import LargeCountCard from "../../components/LargeCountCard/LargeCountCard";
import { TimePeriod, MonetaryItemCategory } from "../../types/types";
import "./Dashboard.styles.css";
import DashboardTopBar from "../../components/DashboardTopBar/DashboardTopBar";
import { AllMonetaryItemsQuery } from "../../graphql/MonetaryItem.gql";
import TimeChart from "../../components/TimeChart/TimeChart";
import { useAppSelector } from "../../state/store/configureStore";
import { isViewable } from "../../util/helpers/monetaryItem.util";
import FullPageLoadingIndicator from "../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import { GetUserQuery } from "../../graphql/Auth.gql";
import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import type { MonetaryItem } from "../../types/types";

const Dashboard = () => {
  const [chartValues, setChartValues] = useState<number[]>(Array(12).fill(0));
  const {
    loading: monetaryItemsLoading,
    data: monetaryItemsData,
    refetch: monetaryItemsRefetch,
    error: monetaryItemsError,
  } = useQuery(AllMonetaryItemsQuery, {
    // fetchPolicy: "cache-and-network",
  });

  const {
    loading: userLoading,
    data: userData,
    refetch: userRefetch,
    error: userError,
  } = useQuery(GetUserQuery, {
    // fetchPolicy: "cache-and-network",
  });

  // Current month, year, and range state
  const month = useAppSelector((state) => state.time.month);
  const year = useAppSelector((state) => state.time.year);
  const range = useAppSelector((state) => state.time.range);

  const outlookValue = Math.round(chartValues.reduce((a, b) => a + b, 0) / 12);

  // Refetch monetary items on mount
  useEffect(() => {
    try {
      monetaryItemsRefetch();
      userRefetch();
      console.log("✅ [API]: ", monetaryItemsData);
    } catch (error) {
      console.log("❌ [API]: ", error);
    }
  }, []);

  // Update chart values when monetary items change
  useEffect(() => {
    if (monetaryItemsData?.getMonetaryItems === undefined) return;

    const chartData = Array(12).fill(0);

    chartData.forEach((_, index) => {
      monetaryItemsData.getMonetaryItems.forEach((item: MonetaryItem) => {
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
  }, [month, year, monetaryItemsData]);

  return (
    <div className="dashboard-container">
      <DashboardTopBar title={"Dashboard"} hasTimeControl />
      <div className="dashboard-container-no-header">
        {monetaryItemsLoading ||
        monetaryItemsError ||
        userLoading ||
        userError ? (
          <FullPageLoadingIndicator />
        ) : (
          <>
            <div className="dashboard-top-information">
              <div className="dashboard-largecountcards-container">
                <LargeCountCard
                  title="Spending Budget"
                  value={userData.getUser.budget || 0}
                  subtitle="per month"
                  variant="large"
                />
                <div className="dashboard-largecountcards-spacer" />
                <LargeCountCard
                  title="Current Outlook"
                  value={outlookValue}
                  subtitle="per month"
                  variant="large"
                  isValueCard
                />
              </div>
              <div className="dashboard-timechart-container">
                <TimeChart values={chartValues} />
              </div>
            </div>

            <LargeCategoryCard
              title="Expenses"
              values={
                monetaryItemsData.getMonetaryItems.filter(
                  // filter for date
                  (item: MonetaryItem) =>
                    item.type === MonetaryItemCategory.EXPENSE &&
                    isViewable(item, month, year, range)
                ) as MonetaryItem[]
              }
              timePeriod={range as TimePeriod}
              category={MonetaryItemCategory.EXPENSE}
            />
            <LargeCategoryCard
              title="Income"
              values={
                monetaryItemsData.getMonetaryItems.filter(
                  (item: MonetaryItem) =>
                    item.type === MonetaryItemCategory.INCOME &&
                    isViewable(item, month, year, range)
                ) as MonetaryItem[]
              }
              timePeriod={range as TimePeriod}
              category={MonetaryItemCategory.INCOME}
            />
            <LargeCategoryCard
              title="Investments"
              values={
                monetaryItemsData.getMonetaryItems.filter(
                  (item: MonetaryItem) =>
                    item.type === MonetaryItemCategory.INVESTMENT &&
                    isViewable(item, month, year, range)
                ) as MonetaryItem[]
              }
              timePeriod={range as TimePeriod}
              category={MonetaryItemCategory.INVESTMENT}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
