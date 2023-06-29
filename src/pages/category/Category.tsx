import { dataGridStyles } from "./Category.definitions";
import TopBar from "../../layout/topbar/TopBar";

import { capitalizeFirstLetter } from "../../util/helpers/string.util";

import {
  CreateMonetaryItemMutation,
  DeleteMonetaryItemsMutation,
  GetMonetaryItemsByTypeQuery,
  UpdateMonetaryItemMutation,
} from "../../graphql/MonetaryItem.gql";
import { TimePeriod } from "../../types/types";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Alert, Snackbar } from "@mui/material";

import type { AlertProps } from "@mui/material";
import type { GridAlignment, GridRowId } from "@mui/x-data-grid";

import "./Category.styles.css";
import type { CategoryProps, AmountParamsProps } from "./Category.definitions";
import type { MonetaryItem } from "../../types/types";

/**
 * @component Category - Displays the monetary items of a given category
 * @param {MonetaryItemCategory} category - The category of the monetary items to be displayed
 */
const Category = ({ category }: CategoryProps) => {
  const [rows, setRows] = useState([] as MonetaryItem[]);
  const [selectedRowIds, setSelectedRowsIds] = useState([] as string[]);

  // const apiRef = useGridApiContext();

  // Query for monetary items of the given category
  const { loading, data, refetch } = useQuery(GetMonetaryItemsByTypeQuery, {
    variables: { type: category },
  });

  useEffect(() => {
    if (data) {
      setRows(data.getMonetaryItemsByType as MonetaryItem[]);
    }
  }, [data]);

  // Mutation for updating monetary items
  const [updateMonetaryItem] = useMutation(UpdateMonetaryItemMutation);
  const [addMonetaryItem] = useMutation(CreateMonetaryItemMutation);
  const [deleteMonetaryItems] = useMutation(DeleteMonetaryItemsMutation);

  // Snackbar state and handler
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  // Update monetary item
  const handleUpdateMonetaryItem = async (newRow: MonetaryItem) => {
    const response = await updateMonetaryItem({
      variables: {
        monetaryItem: {
          _id: newRow._id,
          name: newRow.name,
          value: newRow.value,
          date: newRow.date,
          repeat: newRow.repeat,
          repeatPeriod: newRow.repeatPeriod,
          repeatEndDate: newRow.repeatEndDate,
          type: category,
        },
      },
    });

    // Display success message
    setSnackbar({
      children: capitalizeFirstLetter(category) + " updated successfully!",
      severity: "success",
    });

    return response.data.updateMonetaryItem as MonetaryItem;
  };

  // Add monetary item to the grid and set it to edit mode
  const handleAddMonetaryItem = async (oldRows: MonetaryItem[]) => {
    const response = await addMonetaryItem({
      variables: {
        monetaryItem: {
          name: "New " + category,
          value: 0,
          date: new Date().toISOString(),
          repeat: false,
          repeatPeriod: TimePeriod.MONTHLY,
          repeatEndDate: new Date().toISOString(),
          type: category,
        },
      },
    });

    console.log(response.data.createMonetaryItem);
    setRows([...oldRows, response.data.createMonetaryItem as MonetaryItem]);

    // Display success message
    setSnackbar({
      children:
        capitalizeFirstLetter(category) + " added successfully! Click to edit.",
      severity: "success",
    });
  };

  // Delete monetary item
  const handleDeleteMonetaryItems = async () => {
    console.log(selectedRowIds);

    const response = await deleteMonetaryItems({
      variables: {
        _ids: selectedRowIds,
      },
    });

    // remove deleted monetary item from the grid
    setRows(rows.filter((row) => !selectedRowIds.includes(row._id)));

    // Clear selected rows
    setSelectedRowsIds([]);

    // Display success message
    setSnackbar({
      children:
        response.data.deleteMonetaryItems.deletedCount +
        " " +
        category +
        (response.data.deleteMonetaryItems.deletedCount > 1 ? "s" : "") +
        " deleted successfully!",
      severity: "success",
    });
  };

  // Display error from updating monetary item
  const handleUpdatedMonetaryItemError = (error: Error) => {
    setSnackbar({
      children: "Failed to update " + category + "!",
      severity: "error",
    });

    console.log("❌ [API]: ", error);
  };

  // Format category name for display
  const firstColumnTitle = category.endsWith("s")
    ? capitalizeFirstLetter(category.slice(0, -1))
    : capitalizeFirstLetter(category);

  // Refetch monetary items on mount
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueGetter: (params: any) => new Date(params.row.repeatEndDate),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="category-container">
      <TopBar title={category} hasTimeControl />
      <div className="category-chart">
        <DataGrid
          getRowId={(row) => row._id}
          columns={columns}
          rows={rows}
          checkboxSelection
          density="standard"
          sx={dataGridStyles}
          slots={{
            columnMenu: () => <div>Loading...</div>,
          }}
          onRowSelectionModelChange={(newSelection: GridRowId[]) => {
            console.log(newSelection);
            setSelectedRowsIds(
              newSelection.length === 0
                ? ([] as string[])
                : newSelection.toString().split(",")
            );
          }}
          onProcessRowUpdateError={handleUpdatedMonetaryItemError}
          processRowUpdate={handleUpdateMonetaryItem}
        />
        <div className="category-add-button-container">
          <button
            className="category-add-button"
            onClick={() => handleAddMonetaryItem(rows)}
          >
            Add {category}
          </button>
          {selectedRowIds.length > 0 && (
            <button
              className="category-delete-button"
              onClick={() => handleDeleteMonetaryItems()}
            >
              {"Delete " +
                selectedRowIds.length.toString() +
                " " +
                (selectedRowIds.length > 1 ? category + "s" : category)}
            </button>
          )}
        </div>
      </div>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default Category;
