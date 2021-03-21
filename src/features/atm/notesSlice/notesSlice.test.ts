import { v4 as uuid } from 'uuid';

import { store } from '../../../app/store';
import { CurrencyType, initialNotes, notesActions, notesSelectors, Currency } from '.';

describe('Notes store', () => {
  it('should have the initialState', () => {
    expect(notesSelectors.selectAll(store.getState())).toEqual(initialNotes);
  });

  it('should add coins', () => {
    const coinToAdd: Currency = {
      id: uuid(),
      value: 5000,
      type: CurrencyType.NOTE
    };
    store.dispatch(notesActions.addCoin(coinToAdd));
    expect(notesSelectors.selectById(store.getState(),coinToAdd.id)).toEqual(coinToAdd);
  })
});