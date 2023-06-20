import { dataGridStyles } from "./Category.definitions";
import TopBar from "../../layout/topbar/TopBar";
import {
  testExpensesData,
  testIncomesData,
  testSavingsInvestmentsData,
} from "../../util/testing/testData";
import { capitalizeFirstLetter } from "../../util/helpers/string.util";
import { MonetaryItemCategory } from "../../types/types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridAlignment } from "@mui/x-data-grid";

import "./Category.styles.css";
import type { CategoryProps, AmountParamsProps } from "./Category.definitions";

/**
 * @component Category - Displays the monetary items of a given category
 * @param {MonetaryItemCategory} category - The category of the monetary items to be displayed
 */
const Category = ({ category }: CategoryProps) => {
  // Format category name for display
  const firstColumnTitle = category.endsWith("s")
    ? capitalizeFirstLetter(category.slice(0, -1))
    : capitalizeFirstLetter(category);

  const testDataByCategory =
    category === MonetaryItemCategory.EXPENSE
      ? testExpensesData
      : category === MonetaryItemCategory.INCOME
      ? testIncomesData
      : testSavingsInvestmentsData;

  // TODO: replace with real data
  const data = testDataByCategory.map((expense) => ({
    id: expense.id,
    name: expense.name,
    value: expense.value,
    date: expense.date,
    repeat: expense.repeat,
    repeatPeriod: expense.repeatPeriod,
    repeatEndDate: expense.repeatEndDate,
  }));

  // Define columns for the data grid
  const columns = [
    {
      field: "name",
      headerName: firstColumnTitle,
      flex: 1.5,
      editable: true,
      type: "string",
      align: "left" as GridAlignment,
      headerAlign: "left" as GridAlignment,
    },
    {
      field: "value",
      headerName: "Amount",
      flex: 1,
      editable: true,
      type: "number",
      align: "center" as GridAlignment,
      headerAlign: "center" as GridAlignment,
      valueFormatter: ({ value }: AmountParamsProps) => "$" + value.toFixed(0),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: true,
      type: "date",
      align: "center" as GridAlignment,
      headerAlign: "center" as GridAlignment,
    },
    {
      field: "repeat",
      headerName: "Repeat",
      flex: 1,
      editable: true,
      type: "boolean",
      align: "center" as GridAlignment,
      headerAlign: "center" as GridAlignment,
    },
    {
      field: "repeatPeriod",
      headerName: "Repeat Period",
      flex: 1,
      editable: true,
      type: "select",
      valueOptions: ["Weekly", "Monthly", "Yearly"],
      align: "center" as GridAlignment,
      headerAlign: "center" as GridAlignment,
    },
    {
      field: "repeatEndDate",
      headerName: "End Date",
      flex: 1,
      editable: true,
      type: "date",
      align: "center" as GridAlignment,
    },
  ];

  return (
    <div className="category-container">
      <TopBar title={category} hasTimeControl />
      <div className="category-chart">
        <DataGrid
          columns={columns}
          rows={data}
          checkboxSelection
          density="standard"
          sx={dataGridStyles}
        />
      </div>
    </div>
  );
};

export default Category;
