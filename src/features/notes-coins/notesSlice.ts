import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid'

import { RootState } from '../../app/store';
import { selectAmount } from '../atm/amountSlice';


export enum CurrencyType {
  COIN = 'COIN',
  NOTE = 'NOTE'
}

export abstract class NoteCoinTdoBase {
  constructor(value: number, type: CurrencyType) {
    this.type = type;
    this.value = value;
    this.id = uuid();
  }
  id: string;
  value: number;
  type :CurrencyType
}

export class Note extends NoteCoinTdoBase {
  constructor(value: number) {
    super(value, CurrencyType.NOTE)
  }
}

export class Coin extends NoteCoinTdoBase {
  constructor(value: number,size: number) {
    super(value, CurrencyType.COIN)
    this.size = size
  }
  size: number;
}


const noteCoinEntity = createEntityAdapter<NoteCoinTdoBase>({
  selectId: (noteCoin) => noteCoin.id,
  sortComparer: (left, right) => {
    if (left.value < right.value) return 1;
    if (left.value > right.value) return -1;
    return 0;
  }
})



export const initialNotes = [new Note(1000), new Note(500), new Note(200), new Note(100), new Note(50), new Coin(20, 40), new Coin(10, 20), new Coin(5, 50), new Coin(2, 30), new Coin(1, 10)];

const initialState = noteCoinEntity.addMany(noteCoinEntity.getInitialState(), initialNotes);

export const notesSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    addCoin(state, { payload }:PayloadAction<Coin>){
      noteCoinEntity.addOne(state, payload)
    },
    addNote(state, { payload }:PayloadAction<Note>){
      noteCoinEntity.addOne(state, payload)
    }
  },
});

const selectors = noteCoinEntity.getSelectors<RootState>(
  (state) => state.notes
)

export const notesActions = notesSlice.actions;

interface MoneyCount {
  [noteId: string]: number;
}

export interface MoneyBoxes {
  notes: MoneyCount[],
  bigCoins: MoneyCount[],
  smallCoins: MoneyCount[]
}

const selectRequestedAmountNotes = createSelector(selectors.selectAll, selectAmount, (notes, amount) => {
  const moneyBoxes: MoneyBoxes = {
    notes:[] as MoneyCount[],
    bigCoins:[] as MoneyCount[],
    smallCoins:[]as MoneyCount[],
  }
  return getCoins(amount, notes, moneyBoxes);
});

const getCoins = (amount: number, notes: NoteCoinTdoBase[], moneyBoxes: MoneyBoxes) => {
  for (let i = 0; i < notes.length; i++) {
    if (amount === 0) break;
    const note = notes[i];
    if (amount >= note.value) {
      const count = Math.floor(amount / note.value);
      amount = amount - count * note.value; 
      assignCoinToBox(note, moneyBoxes, count);
    }
  }
  return moneyBoxes;
}

export const notesSelectors = {...selectors, selectRequestedAmountNotes};

export default notesSlice.reducer;

function assignCoinToBox(note: NoteCoinTdoBase, moneyBoxes: MoneyBoxes, count: number) {
  if (note.type === CurrencyType.NOTE) {
    moneyBoxes.notes.push({ [note.id]: count });
  } else {
    const coin = note as Coin;
    if (coin.size > 20) {
      moneyBoxes.bigCoins.push({ [note.id]: count });
    } else {
      moneyBoxes.smallCoins.push({ [note.id]: count });
    }
  }
}

