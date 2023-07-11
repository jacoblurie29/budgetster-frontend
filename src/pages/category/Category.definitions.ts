import { TimePeriod } from "../../types/types";
import { capitalizeFirstLetter } from "../../util/helpers/string.util";
import type { MonetaryItemCategory } from "../../types/types";

/**
 * @interface CategoryProps - The props for the category page
 * @param {MonetaryItemCategory} category - The category of the monetary items to be displayed
 */
export interface CategoryProps {
  category: MonetaryItemCategory;
}

/**
 * @interface AmountParamsProps - The props for the amount column in the data grid (for the valueFormatter)
 * @param {number} value - The value of the monetary item
 */
export interface AmountParamsProps {
  value: number;
}

/**
 * @constant categoryColumns - The columns for the data grid
 * @param {string} category - The category of the monetary items to be displayed
 */
export const categoryColumns = (category: string) => [
  {
    field: "name",
    headerName: category.endsWith("s")
      ? capitalizeFirstLetter(category.slice(0, -1))
      : capitalizeFirstLetter(category),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    type: "singleSelect",
    defaultValue: TimePeriod.MONTHLY,
    valueOptions: [
      TimePeriod.MONTHLY,
      TimePeriod.YEARLY,
      TimePeriod.WEEKLY,
      {
        value: null,
        label: "-",
      },
    ],
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
    headerAlign: "center" as GridAlignment,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueGetter: (params: any) =>
      params.row.repeatEndDate ? new Date(params.row.repeatEndDate) : null,
  },
];

/**
 * @type GridAlignment - The alignment of the data grid (from MUI)
 */
export type GridAlignment = "left" | "right" | "center";

export const dataGridStyles = {
  fontFamily: "Lexend",
  borderRadius: "17px",
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "1.6rem",
    fontWeight: "500",
    color: "#FFFFFF",
  },
  "& .MuiDataGrid-editInputCell": {
    fontFamily: "Lexend",
    fontSize: "1.4rem",
    color: "#8F8F8F",
  },
  "& .MuiDataGrid-cell--editing": {
    backgroundColor: "#EDFFF5 !important",
  },
  "& .MuiDataGrid-row": {
    fontSize: "1.4rem",
    color: "#8F8F8F",
    backgroundColor: "#EDFFF5",
    "&.Mui-selected": {
      backgroundColor: "#E4FAFC",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#E4FAFC",
      fontSize: "1.4rem",
    },
  },
  "& .MuiDataGrid-row:hover": {
    fontSize: "1.4rem",
    backgroundColor: "#E4FAFC",
  },
  "& .MuiDataGrid-columnHeaders": {
    background: "linear-gradient(90deg, #76e7aa, #8ae2e8)",
    borderRadius: "15px 15px 0px 0px",
  },
  "& .MuiDataGrid-footerContainer": {
    background: "linear-gradient(90deg, #76e7aa, #8ae2e8)",
    height: "fit-content",
    borderRadius: "0px 0px 15px 15px",
  },
  "& .MuiTablePagination-selectLabel": {
    color: "#FFFFFF !important",
    margin: "0px",
    fontSize: "1.1rem",
    fontFamily: "Lexend, sans-serif",
  },
  "& .MuiTablePagination-displayedRows": {
    color: "#FFFFFF !important",
    margin: "0px",
    fontSize: "1.1rem",
    fontFamily: "Lexend, sans-serif",
  },
  "& .MuiTablePagination-select": {
    color: "#FFFFFF !important",
    margin: "0px",

    fontSize: "1.1rem",
    fontFamily: "Lexend, sans-serif",
  },
  "& .MuiTablePagination-actions": {
    padding: "0px",
    margin: "0px",
  },
  "& .MuiDataGrid-selectedRowCount": {
    color: "#FFFFFF !important",
    fontSize: "1.1rem",
    fontFamily: "Lexend, sans-serif",
  },
  "& .MuiSelect-select": {
    paddingTop: "10px !important",
  },
  "& .MuiDataGrid-overlayWrapper": {
    height: "52px",
    backgroundColor: "#EDFFF5 !important",
  },
};

export const noRowsStackStyles = { backgroundColor: "#EDFFF5 !important" };
