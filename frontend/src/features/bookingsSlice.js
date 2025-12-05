import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookings = createAsyncThunk(
  "bookings/fetch",
  async (token, { getState }) => {
    const pageSize = 50;  // small to test pagination
    const params = { pageSize };
    
    if (token) {
      params.nextPageToken = token;
    }
    const response = await axios.get("http://localhost:4000/getBookings", {
      params
    });
    return response.data;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    nextPageToken: null,
    loading: false,
    error: null
  },
    reducers: {
    resetBookings: (state) => {
      state.items = [];
      state.nextPageToken = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.bookings];
        state.nextPageToken = action.payload.nextPageToken;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const { resetBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
