import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

interface AmountState {
  value: number;
}

const initialState: AmountState = {
  value: 0,
};

export const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    setAmount(state: AmountState, { payload }: PayloadAction<number>) {
      state.value = payload;
    },
  },
});

export const amountActions = amountSlice.actions;

export const selectAmount = (state: RootState) => state.amount.value;

export default amountSlice.reducer;
