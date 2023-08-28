import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const urlApi = 'https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1';

export const sendLogin = createAsyncThunk('login/sendLogin', async (values) => {
  const { data } = await axios.post(
    `${urlApi}/login`,
    {
      username: values.username,
      password: values.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(sendLogin.fulfilled, (state, action) => {
      (state.token = action.payload.token), (state.error = false);
    });

    builder.addCase(sendLogin.rejected, (state) => {
      (state.token = ''), (state.error = true);
    });
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.error = false;
    },
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
