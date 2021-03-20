import { store } from '../../app/store';
import {Coin, initialNotes, Note, notesActions, notesSelectors} from './notesSlice'

describe('Notes store', () => {
  it('should have the initialState', () => {
    expect(notesSelectors.selectAll(store.getState())).toEqual(initialNotes);
  });

  it('should add coins', () => {
    const coinToAdd = new Coin(5, 22);
    store.dispatch(notesActions.addCoin(coinToAdd));
    expect(notesSelectors.selectById(store.getState(),coinToAdd.id)).toEqual(coinToAdd);
  })
  it('should add notes', () => {
    const noteToAdd = new Note(5000);
    store.dispatch(notesActions.addNote(noteToAdd));
    expect(notesSelectors.selectById(store.getState(), noteToAdd.id)).toEqual(noteToAdd);
  })
});