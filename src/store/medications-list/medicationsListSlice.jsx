import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const urlApi = 'https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1';

export const listMedications = createAsyncThunk(
  'medications/listMedications',
  async (values) => {
    const params = values[0].params;
    const { data } = await axios.get(`${urlApi}/medications`, {
      params,
      headers: {
        Authorization: `Bearer ${values[0].token}`,
      },
    });
    return data;
  }
);

const medicationsListSlice = createSlice({
  name: 'list',
  initialState: {
    list: [],
    error: false,
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(listMedications.fulfilled, (state, action) => {
      (state.list = action.payload),
        (state.error = false),
        (state.loading = false);
    });
    builder.addCase(listMedications.rejected, (state) => {
      (state.list = ''), (state.error = true), (state.loading = false);
      builder.addCase(listMedications.pending, (state) => {
        (state.list = ''), (state.error = true), (state.loading = true);
      });
    });
  },
});

export default medicationsListSlice.reducer;
