import {
  categoryColumns,
  dataGridStyles,
  noRowsStackStyles,
} from "./Category.definitions";
import DashboardTopBar from "../../components/DashboardTopBar/DashboardTopBar";

import {
  capitalizeFirstLetter,
  formatTitle,
} from "../../util/helpers/string.util";

import {
  CreateMonetaryItemMutation,
  DeleteMonetaryItemsMutation,
  GetMonetaryItemsByTypeQuery,
  UpdateMonetaryItemMutation,
} from "../../graphql/MonetaryItem.gql";
import { TimePeriod } from "../../types/types";
import { useAppSelector } from "../../state/store/configureStore";
import { createChartBars } from "../../components/CategoryBarChart/CategoryBarChart.definitions";
import {
  compareMonetaryItems,
  isViewable,
} from "../../util/helpers/monetaryItem.util";
import FullPageLoadingIndicator from "../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import CategoryBarChart from "../../components/CategoryBarChart/CategoryBarChart";
import LargeCountCard from "../../components/LargeCountCard/LargeCountCard";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ResponsiveContainer } from "recharts";
import { Alert, Snackbar, Stack } from "@mui/material";
import type { AlertProps } from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import type { CategoryProps } from "./Category.definitions";
import type { MonetaryItem, ChartBarType } from "../../types/types";

import "./Category.styles.css";

/**
 * @component Category - Displays the monetary items of a given category
 * @param {MonetaryItemCategory} category - The category of the monetary items to be displayed
 */
const Category = ({ category }: CategoryProps) => {
  const [rows, setRows] = useState([] as MonetaryItem[]);
  const [selectedRowIds, setSelectedRowsIds] = useState([] as string[]);
  const [chartData, setChartData] = useState([] as MonetaryItem[]);

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

  useEffect(() => {
    if (data) {
      // Filter the monetary items using the month and/or year
      const filteredData = data.getMonetaryItemsByType.filter(
        (item: MonetaryItem) => isViewable(item, month, year, range)
      );

      setRows(filteredData as MonetaryItem[]);
      setChartData(data.getMonetaryItemsByType as MonetaryItem[]);
    }
  }, [data, month, year, range]);

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

    await refetch();

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

    await refetch();
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

    await refetch();
  };

  // Display error from updating monetary item
  const handleUpdatedMonetaryItemError = (error: Error) => {
    setSnackbar({
      children: "Failed to update " + category + "!",
      severity: "error",
    });

    console.log("❌ [API]: ", error);
  };

  const chartBars: ChartBarType[] = createChartBars(chartData, year, range);

  // Calculate the average value of the chart bars, ignoring the bars with zero value
  const averageValue = Math.round(
    chartBars
      .filter((bar) => bar.value !== 0)
      .reduce((acc, bar) => acc + bar.value, 0) /
      chartBars.filter((bar) => bar.value !== 0).length
  );

  // calculate the average change bar to bar ignoring the bars with zero value
  const averageChange = Math.round(
    chartBars
      .filter((bar) => bar.value !== 0)
      .reduce((acc, bar, index, array) => {
        if (index === 0) return acc;
        return acc + bar.value - array[index - 1].value;
      }, 0) / chartBars.filter((bar) => bar.value !== 0).length
  );

  return (
    <div className="category-container">
      <DashboardTopBar title={category} hasTimeControl />
      <div className="category-container-no-header">
        {loading || error ? (
          <FullPageLoadingIndicator />
        ) : (
          <div className="category-chart">
            <ResponsiveContainer width={"100%"} height={"100%"}>
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
            </ResponsiveContainer>
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
            <div className="category-information-container">
              <div className="category-information-container-left">
                <CategoryBarChart bars={chartBars} />
              </div>
              <div className="category-information-container-right">
                <LargeCountCard
                  title={"Average " + formatTitle(category)}
                  value={averageValue || 0}
                  variant="small"
                  subtitle={
                    "per" + (range === TimePeriod.MONTHLY ? " month" : " year")
                  }
                />
                <LargeCountCard
                  title={"Current Trend"}
                  value={averageChange || 0}
                  variant="small"
                  subtitle={
                    "per" + (range === TimePeriod.MONTHLY ? " month" : " year")
                  }
                  isValueCard
                />
              </div>
            </div>
          </div>
        )}
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
