import TopBar from "../../layout/topbar/TopBar";
import { testExpensesData } from "../../util/testing/testData";
import { capitalizeFirstLetter } from "../../util/helpers/string.util";
import { DataGrid } from "@mui/x-data-grid";
import type { MonetaryItemCategory } from "../../types/types";
import "./Category.styles.css";

interface CategoryProps {
  category: MonetaryItemCategory;
}

const Category = ({ category }: CategoryProps) => {
  // Format category name for display
  const firstColumnTitle = category.endsWith("s")
    ? capitalizeFirstLetter(category.slice(0, -1))
    : capitalizeFirstLetter(category);

  // TODO: replace with real data
  const data = testExpensesData.map((expense) => ({
    id: expense.id,
    name: expense.name,
    value: expense.value,
    date: expense.date ? expense.date.toLocaleDateString() : "",
    repeat: expense.repeat ? "Yes" : "No",
    repeatPeriod: expense.repeatPeriod,
    repeatEndDate: expense.repeatEndDate
      ? expense.repeatEndDate?.toLocaleDateString()
      : "",
  }));

  // Define columns for the data grid
  const columns = [
    {
      field: "name",
      headerName: firstColumnTitle,
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "value",
      headerName: "Amount",
      flex: 1,
      editable: true,
      type: "number",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "repeat",
      headerName: "Repeat",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    {
      field: "repeatPeriod",
      headerName: "Repeat Period",
      flex: 1,
      editable: true,
      type: "select",
      valueOptions: ["Weekly", "Monthly", "Yearly"],
    },
    {
      field: "repeatEndDate",
      headerName: "End Date",
      flex: 1,
      editable: true,
      type: "string",
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
          editMode="row"
          sx={{
            fontFamily: "Lexend",
            border: "2px solid",
            borderColor: "#BBBBBB",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "1.4rem",
              fontWeight: "500",
              color: "#FFFFFF",
            },
            "& .MuiDataGrid-row": {
              fontSize: "1.2rem",
              color: "#8F8F8F",
              backgroundColor: "#EDFFF5",
              "&.Mui-selected": {
                backgroundColor: "#E4FAFC",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#E4FAFC",
                fontSize: "1.2rem",
              },
            },
            "& .MuiDataGrid-row:hover": {
              fontSize: "1.2rem",
              backgroundColor: "#E4FAFC",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#D9D9D9",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Category;
