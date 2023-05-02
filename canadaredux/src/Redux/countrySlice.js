import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CountryService from "../Services/CountryService";


export const getCountryList = createAsyncThunk(
  "manage/getCountryList",
  async () => {
    try {
      const response = await CountryService.getCountryList();
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);
export const updateCountry = createAsyncThunk(
  "manage/updateCountry",
  async ({id, values}) => {
    try {
      const response = await CountryService.updateCountry(id, values);
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
      state.countryList = action?.payload?.data;
    });
    builder.addCase(getCountryList.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default CountrySlice.reducer;
