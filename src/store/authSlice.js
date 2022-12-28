import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Integrate backend auth api
export const loginAPI = createAsyncThunk(
  "auth/loginAPI",
  async (user, getState) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        user
      );
      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);

export const signUpAPI = createAsyncThunk(
  "auth/signUpAPI",
  async (user, getState) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        user
      );
      return response.data;
    } catch (e) {
      return getState.rejectWithValue(e.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userData: {},
    isAuthenticated: false,
    token: "",
    isLogin: false,
    error: ""
  },
  reducers: {
    clearState: (state, action) => {
      state.isLogin = false;
      state.error = "";
      state.userData = {};
      state.isAuthenticated = false;
      state.token = "";
    }
  },
  extraReducers: {
    [loginAPI.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.loading = false;
      state.isLogin = true;
    },
    [loginAPI.pending]: (state, action) => {
      state.loading = true;
    },
    [loginAPI.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [signUpAPI.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.isLogin = true;
    },
    [signUpAPI.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpAPI.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
