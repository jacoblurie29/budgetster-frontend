import { dataGridStyles } from "./Category.definitions";
import TopBar from "../../layout/topbar/TopBar";

import { capitalizeFirstLetter } from "../../util/helpers/string.util";

import { AllMonetaryItemsQuery } from "../../graphql/AllMonetaryItems";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import type { MonetaryItem } from "../../types/types";
import type { GridAlignment } from "@mui/x-data-grid";

import "./Category.styles.css";
import type { CategoryProps, AmountParamsProps } from "./Category.definitions";

/**
 * @component Category - Displays the monetary items of a given category
 * @param {MonetaryItemCategory} category - The category of the monetary items to be displayed
 */
const Category = ({ category }: CategoryProps) => {
  const { loading, data, refetch } = useQuery(AllMonetaryItemsQuery);

  // Format category name for display
  const firstColumnTitle = category.endsWith("s")
    ? capitalizeFirstLetter(category.slice(0, -1))
    : capitalizeFirstLetter(category);

  useEffect(() => {
    try {
      refetch();
    } catch (error) {
      console.log("❌ [API]: ", error);
    }
  }, []);

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
      // convert string to date
      valueGetter: (params: any) => new Date(params.row.date),
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
      valueGetter: (params: any) => new Date(params.row.date),
    },
  ];

  if (loading) return <div>Loading...</div>;

  console.log("DATE: ", data.getMonetaryItems[0].date);

  return (
    <div className="category-container">
      <TopBar title={category} hasTimeControl />
      <div className="category-chart">
        <DataGrid
          getRowId={(row) => row._id}
          columns={columns}
          rows={data.getMonetaryItems as MonetaryItem[]}
          checkboxSelection
          density="standard"
          sx={dataGridStyles}
        />
      </div>
    </div>
  );
};

export default Category;
