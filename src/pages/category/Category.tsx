import {
  categoryColumns,
  dataGridStyles,
  noRowsStackStyles,
} from "./Category.definitions";
import DashboardTopBar from "../../components/DashboardTopBar/DashboardTopBar";

import { capitalizeFirstLetter } from "../../util/helpers/string.util";

import {
  CreateMonetaryItemMutation,
  DeleteMonetaryItemsMutation,
  GetMonetaryItemsByTypeQuery,
  UpdateMonetaryItemMutation,
} from "../../graphql/MonetaryItem.gql";
import { TimePeriod } from "../../types/types";
import { useAppSelector } from "../../state/store/configureStore";
import { compareMonetaryItems } from "../../util/helpers/monetaryItem.util";
import FullPageLoadingIndicator from "../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Alert, Snackbar, Stack } from "@mui/material";

import type { AlertProps } from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import type { CategoryProps } from "./Category.definitions";
import type { MonetaryItem } from "../../types/types";

import "./Category.styles.css";
/**
 * @component Category - Displays the monetary items of a given category
 * @param {MonetaryItemCategory} category - The category of the monetary items to be displayed
 */
const Category = ({ category }: CategoryProps) => {
  const [rows, setRows] = useState([] as MonetaryItem[]);
  const [selectedRowIds, setSelectedRowsIds] = useState([] as string[]);

  // Get the month and year from the redux store
  const month = useAppSelector((state) => state.time.month);
  const year = useAppSelector((state) => state.time.year);
  const range = useAppSelector((state) => state.time.range);

  // Query for monetary items of the given category
  const { loading, data, refetch, error } = useQuery(
    GetMonetaryItemsByTypeQuery,
    {
      variables: { type: category },
      // fetchPolicy: "cache-and-network",
    }
  );

  const isViewable = (item: MonetaryItem) => {
    // Get the start date of the item
    const startDateFromObject = new Date(item.date);

    // Reset the start date to the first of the month (for comparison)
    const startDate = new Date(
      startDateFromObject.getFullYear(),
      startDateFromObject.getMonth(),
      1
    );

    // Get the current date of the time control from redux
    const currentDate = new Date(year, month, 1);

    // filter by year if the range is yearly or if the item is repeating
    if (range === TimePeriod.YEARLY) {
      return (
        startDate.getFullYear() === year ||
        (item.repeat &&
          item.repeatEndDate &&
          startDate.getFullYear() <= year &&
          new Date(item.repeatEndDate).getFullYear() >= year)
      );

      // filter by month if the range is monthly or if the item is repeating
    } else {
      return (
        (!item.repeat &&
          startDate.getMonth() === month &&
          startDate.getFullYear() === year) ||
        (item.repeat &&
          item.repeatEndDate &&
          startDate <= currentDate &&
          new Date(item.repeatEndDate) >= currentDate)
      );
    }
  };

  useEffect(() => {
    if (data) {
      // Filter the monetary items using the month and/or year
      const filteredData = data.getMonetaryItemsByType.filter(
        (item: MonetaryItem) => isViewable(item)
      );

      setRows(filteredData as MonetaryItem[]);
    }
  }, [data, month, year]);

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

  const renderNoRowsOverlay = () => (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      sx={noRowsStackStyles}
    >
      <div className="category-no-rows-overlay">No {category}s to display</div>
    </Stack>
  );
  // Update monetary item
  const handleUpdateMonetaryItem = async (
    newRow: MonetaryItem,
    oldRow: MonetaryItem
  ) => {
    // If the monetary item has not changed, return the old row
    if (compareMonetaryItems(newRow, oldRow)) {
      return oldRow;
    }

    // If the item is now repeating, set the repeat period to monthly and the repeat end date to today
    if (!oldRow.repeat && newRow.repeat) {
      newRow.repeatPeriod = TimePeriod.MONTHLY;
      newRow.repeatEndDate = new Date().toISOString();
    }

    // Show an error if the user tries to repeat an item without selecting a repeat end date
    if (newRow.repeatPeriod === null && newRow.repeat) {
      setSnackbar({
        children: "Please select a repeat period!",
        severity: "error",
      });
      return oldRow;
    }

    // Show an error if the repeat end date is null and the item is repeating
    if (newRow.repeatEndDate === null && newRow.repeat) {
      setSnackbar({
        children: "Please select a repeat end date!",
        severity: "error",
      });
      return oldRow;
    }

    // If the item is no longer repeating, set the repeat end date and period to undefined
    if (!newRow.repeat) {
      newRow.repeatEndDate = undefined;
      newRow.repeatPeriod = undefined;
    }

    // Update monetary item
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

    console.log("✅ [API]: ", response.data.updateMonetaryItem);

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
          repeat: true,
          repeatPeriod: TimePeriod.MONTHLY,
          repeatEndDate: new Date().toISOString(),
          type: category,
        },
      },
    });

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

  // Refetch monetary items on mount
  useEffect(() => {
    try {
      refetch();
    } catch (error) {
      console.log("❌ [API]: ", error);
    }
  }, []);

  if (loading || error) return <FullPageLoadingIndicator />;

  return (
    <div className="category-container">
      <DashboardTopBar title={category} hasTimeControl />
      <div className="category-container-no-header">
        <div className="category-chart">
          <DataGrid
            getRowId={(row) => row._id}
            columns={categoryColumns(category)}
            rows={rows}
            checkboxSelection
            disableRowSelectionOnClick
            density="standard"
            loading={loading}
            sx={dataGridStyles}
            slots={{
              noRowsOverlay: renderNoRowsOverlay,
              noResultsOverlay: renderNoRowsOverlay,
            }}
            onRowSelectionModelChange={(newSelection: GridRowId[]) => {
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
    </div>
  );
};

export default Category;
