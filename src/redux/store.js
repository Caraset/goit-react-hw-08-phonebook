import { configureStore } from '@reduxjs/toolkit';
import { filter } from './reducers';
import { contactsApi } from './phonebook';
import authReducer from 'redux/authSlice';

export const store = configureStore({
  reducer: {
    filter,
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: authReducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
