import { store } from '../../../app/store';
import {amountActions, selectAmount} from '.'

describe('Amount store', () => {
  it('should have the initialState of 0', () => {
    expect(selectAmount(store.getState())).toEqual(0);
  })

  it('should change if set action dispatch', () => {
    store.dispatch(amountActions.setAmount(5000));
    expect(selectAmount(store.getState())).toEqual(5000);
  })
});