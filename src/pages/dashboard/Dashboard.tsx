import LargeCategoryCard from "../../components/LargeCategoryCard/LargeCategoryCard";
import LargeCountCard from "../../components/LargeCountCard/LargeCountCard";
import { TimePeriod, MonetaryItemCategory } from "../../types/types";
import "./Dashboard.styles.css";
import TopBar from "../../layout/topbar/TopBar";
import { AllMonetaryItemsQuery } from "../../graphql/MonetaryItem.gql";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import type { MonetaryItem } from "../../types/types";

const Dashboard = () => {
  const { loading, data, refetch } = useQuery(AllMonetaryItemsQuery);

  // Refetch monetary items on mount
  useEffect(() => {
    try {
      refetch();
      console.log("✅ [API]: ", data);
    } catch (error) {
      console.log("❌ [API]: ", error);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  const outlookValue = data.getMonetaryItems.reduce(
    (a: number, b: MonetaryItem) => {
      if (b.type === MonetaryItemCategory.INCOME) {
        return a + b.value;
      } else {
        return a - b.value;
      }
    },
    0
  );

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
      </div>
      <LargeCategoryCard
        title="Expenses"
        values={
          data.getMonetaryItems.filter(
            (item: MonetaryItem) => item.type === MonetaryItemCategory.EXPENSE
          ) as MonetaryItem[]
        }
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.EXPENSE}
      />
      <LargeCategoryCard
        title="Income"
        values={
          data.getMonetaryItems.filter(
            (item: MonetaryItem) => item.type === MonetaryItemCategory.INCOME
          ) as MonetaryItem[]
        }
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.INCOME}
      />
      <LargeCategoryCard
        title="Investments"
        values={
          data.getMonetaryItems.filter(
            (item: MonetaryItem) =>
              item.type === MonetaryItemCategory.INVESTMENT
          ) as MonetaryItem[]
        }
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.INVESTMENT}
      />
    </div>
  );
};

export default Dashboard;
