import { configureStore } from '@reduxjs/toolkit';

import loginSlice from './login/loginSlice';
import medicationsListSlice from './medications-list/medicationsListSlice';

export const store = configureStore({
  reducer: { login: loginSlice, medications: medicationsListSlice },
});

export default store;
