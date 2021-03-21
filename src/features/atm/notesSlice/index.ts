import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from '../../../app/store';
import { selectAmount } from '../amountSlice';

// I remove the condition of  less than or equal to 20mm and replace it with COIN_SMAll
// the type should be calculated a head based on coin size else where like a reducer
// or back-end
export enum CurrencyType {
  COIN_SMAll = 'COIN_SMAll',
  COIN_BIG = 'COIN_BIG',
  NOTE = 'NOTE',
}

export interface Currency {
  id: string;
  value: number;
  type: CurrencyType;
}

const noteCoinEntity = createEntityAdapter<Currency>({
  selectId: (noteCoin) => noteCoin.id,
  sortComparer: (left, right) => {
    if (left.value < right.value) return 1;
    if (left.value > right.value) return -1;
    return 0;
  },
});

export const initialNotes: Currency[] = [
  { id: uuid(), value: 1000, type: CurrencyType.NOTE },
  { id: uuid(), value: 500, type: CurrencyType.NOTE },
  { id: uuid(), value: 200, type: CurrencyType.NOTE },
  { id: uuid(), value: 100, type: CurrencyType.NOTE },
  { id: uuid(), value: 50, type: CurrencyType.NOTE },
  { id: uuid(), value: 20, type: CurrencyType.COIN_BIG },
  { id: uuid(), value: 10, type: CurrencyType.COIN_SMAll },
  { id: uuid(), value: 5, type: CurrencyType.COIN_BIG },
  { id: uuid(), value: 2, type: CurrencyType.COIN_BIG },
  { id: uuid(), value: 1, type: CurrencyType.COIN_SMAll },
];

const initialState = noteCoinEntity.addMany(noteCoinEntity.getInitialState(), initialNotes);

export const notesSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    addCoin(state, { payload }: PayloadAction<Currency>) {
      noteCoinEntity.addOne(state, payload);
    },
  },
});

const selectors = noteCoinEntity.getSelectors<RootState>((state) => state.notes);

export const notesActions = notesSlice.actions;

interface MoneyCount {
  id: string;
  count: number;
}

export interface MoneyBoxes {
  [CurrencyType.COIN_BIG]?: MoneyCount[];
  [CurrencyType.NOTE]?: MoneyCount[];
  [CurrencyType.COIN_SMAll]?: MoneyCount[];
}

const selectRequestedAmountNotes = createSelector(selectors.selectAll, selectAmount, (notes, amount) => {
  return getCoins(amount, notes);
});

// get least number of coins using the greedy algorithm
// if the coins changed in the future to be like [9, 6 , 5 , 3, 1] the output will not be
// optimal if the value 11 the output coins will be [ (1 x 9) , (2 x 1)] the optimal should
// be [(1 x 6) , (1 x 5)], in this case I suggest using dynamic programming
// for more https://www.geeksforgeeks.org/dynamic-programming/
// https://www.geeksforgeeks.org/coin-change-dp-7/
const getCoins = (amount: number, notes: Currency[]): MoneyBoxes => {
  // a map to store grouped results based on type : CurrencyType as key
  // value will be an array of Currency
  const moneyBox: MoneyBoxes = {};

  for (let i = 0; i < notes.length; i++) {
    // break the loop if amount is 0
    if (amount === 0) break;
    const note = notes[i];
    if (amount >= note.value) {
      // get required count by ignoring decimal
      const count = Math.floor(amount / note.value);
      // calculate the remaining amount
      amount = amount - count * note.value;
      assignCoinToBox(note, moneyBox, count);
    }
  }
  return moneyBox;
};

// put the coin in a group of the same type large coin small coin or note
function assignCoinToBox(note: Currency, moneyBoxes: MoneyBoxes, count: number) {
  if (moneyBoxes[note.type]) {
    moneyBoxes[note.type]?.push({ id: note.id, count });
  } else {
    moneyBoxes[note.type] = [{ id: note.id, count }];
  }
}

// select the available boxes this will return the available keys
const selectBoxesKeys = createSelector(selectRequestedAmountNotes, (boxes) => {
  return Object.keys(boxes) as CurrencyType[];
});

// this will get the currencies inside a certain box
const selectBoxContent = (key: CurrencyType) => createSelector(selectRequestedAmountNotes, (boxes) => boxes[key]);

export const notesSelectors = { ...selectors, selectRequestedAmountNotes, selectBoxesKeys, selectBoxContent };

export default notesSlice.reducer;
