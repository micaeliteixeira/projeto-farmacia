import { configureStore } from '@reduxjs/toolkit';

import loginSlice from './login/loginSlice';
import medicationsListSlice from './medications-list/medicationsListSlice';
import createMedicationSlice from './create-medications/createMedications';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    medications: medicationsListSlice,
    create: createMedicationSlice,
  },
});

export default store;
