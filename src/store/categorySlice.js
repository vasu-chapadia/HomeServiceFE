import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Integrate backend category api
export const getAllCategory = createAsyncThunk(
  "getAllCategory",
  async (getState) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getAllCategory"
      );
      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);

export const getCategoriesByMainTitleID = createAsyncThunk(
  "getCategoriesByMainTitleID",
  async (id, getState) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getCategoriesByMainTitleID/${id}`
      );
      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);

export const getSubCategoriesByCategoryID = createAsyncThunk(
  "getSubCategoriesByCategoryID",
  async (id, getState) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getSubCategoriesByCategoryID/${id}`
      );
      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);

export const searchCategory = createAsyncThunk(
  "searchCategory",
  async (search, getState) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/search`,
        search
      );
      console.log("searchdata...", response.data);
      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    getdata: [],
    getDataByCategory: [],
    getDataBySubCategory: [],
    selectedCatgory: null,
    search: "",
    error: ""
  },
  reducers: {
    getdata: (state, action) => {
      state.getdata = [];
    },
    selectCategory: (state, action) => {
      state.selectedCatgory = action.payload;
    },
    clearSearch: (state, action) => {
      state.search = "";
    }
  },
  extraReducers: {
    [getAllCategory.fulfilled]: (state, action) => {
      state.getdata = action.payload;
      state.loading = false;
    },
    [getAllCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getSubCategoriesByCategoryID.fulfilled]: (state, action) => {
      state.getDataBySubCategory = action.payload;
      state.loading = false;
    },
    [getSubCategoriesByCategoryID.pending]: (state, action) => {
      state.loading = true;
    },
    [getSubCategoriesByCategoryID.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getCategoriesByMainTitleID.fulfilled]: (state, action) => {
      state.getDataByCategory = action.payload;
      state.loading = false;
    },
    [getCategoriesByMainTitleID.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoriesByMainTitleID.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [searchCategory.fulfilled]: (state, action) => {
      state.search = action.payload;
      state.loading = false;
    },
    [searchCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [searchCategory.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { clearState, selectCategory, clearSearch } =
  categorySlice.actions;
export default categorySlice.reducer;
