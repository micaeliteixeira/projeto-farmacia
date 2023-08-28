import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const urlApi = 'https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1';

function transformDateFormat(inputDate, inputTime) {
  const [year, month, day] = inputDate.split('-');
  const [hours, minutes, seconds] = inputTime.split(':');

  const newDate = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  );

  const formattedDate = newDate.toISOString();

  return formattedDate;
}

const transformObject = (body) => {
  const { issued_on, expires_on, ...rest } = body;
  const transformedInssuedON = transformDateFormat(issued_on, '00:00:00');
  const transformedExpiredON = transformDateFormat(expires_on, '00:00:00');

  return {
    issued_on: transformedInssuedON,
    expires_on: transformedExpiredON,
    ...rest,
  };
};

export const createMedications = createAsyncThunk(
  'create/listMedications',
  async (values, token) => {
    const results = transformObject(values);
    const { data } = await axios.post(
      `${urlApi}/medications`,
      { results },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);

export const getManufacturers = createAsyncThunk(
  'create/manufacturers',
  async (token) => {
    const { data } = await axios.get(`${urlApi}/manufacturers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

const createMedicationSlice = createSlice({
  name: 'create',
  initialState: {
    success: '',
    manufacturers: '',
  },

  extraReducers: (builder) => {
    builder.addCase(getManufacturers.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
    });
    builder.addCase(createMedications.rejected, (state) => {
      state.success = '400';
    });

    builder.addCase(createMedications.fulfilled, (state) => {
      state.success = '201';
    });
  },
  reducers: {
    logout: (state) => {
      state.success = [];
      state.manufacturers = false;
    },
  },
});
export const { logout } = createMedicationSlice.actions;
export default createMedicationSlice.reducer;
