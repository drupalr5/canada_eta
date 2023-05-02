import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CountryService from "../Services/CountryService";


export const getCountryList = createAsyncThunk(
  "manage/getCountryList",
  async (params) => {
    try {
      const response = await CountryService.getCountryList(params);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);
export const updateCountry = createAsyncThunk(
  "manage/updateCountry",
  async (params) => {
    try {
      const response = await CountryService.updateCountry(params);
      console.log(response);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);

const CountrySlice = createSlice({
  name: "country",
  initialState: {
    loading: false,
    error: null,
    countryList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountryList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountryList.fulfilled, (state, action) => {
      state.loading = false;
      state.countryList = action?.payload;
    });
    builder.addCase(getCountryList.rejected, (state, action) => {
      state.loading = false;
    });
    // builder.addCase(getTeamMembers.pending, (state) => {
    //   state.loading = true;
    //   state.manage = [];
    // });
    // builder.addCase(getTeamMembers.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.list = action?.payload;
    // });
    // builder.addCase(getTeamMembers.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export default CountrySlice.reducer;
