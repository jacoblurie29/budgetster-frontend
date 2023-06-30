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
