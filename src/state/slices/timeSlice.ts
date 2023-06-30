import { TimePeriod } from "../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TimeState {
  month: number;
  year: number;
  range: Omit<TimePeriod, "weekly">;
}

const initialState: TimeState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  range: TimePeriod.MONTHLY,
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setRange: (state, action: PayloadAction<Omit<TimePeriod, "weekly">>) => {
      state.range = action.payload;
    },
  },
});

export const { setMonth, setYear, setRange } = timeSlice.actions;
