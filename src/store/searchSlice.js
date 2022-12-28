import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//searchSlice for getting all countries data from api
export const getsearch = createAsyncThunk(
  "api/getSearch",
  async (category, getState) => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all",
        category
      );

      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    getdata: [],
    error: ""
  },
  reducers: {
    getdata: (state, action) => {
      state.getdata = {};
    }
  },
  extraReducers: {
    [getsearch.fulfilled]: (state, action) => {
      state.getdata = action.payload;
      state.loading = false;
    },
    [getsearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getsearch.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { clearState } = searchSlice.actions;
export default searchSlice.reducer;
