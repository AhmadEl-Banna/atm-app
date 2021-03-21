import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import amountReducer from '../features/atm/amountSlice';
import notesReducer from '../features/atm/notesSlice'

export const store = configureStore({
  reducer: {
    amount: amountReducer,
    notes: notesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
