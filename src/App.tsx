import './App.css';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { amountActions, selectAmount } from './features/atm/amountSlice';
import { notesSelectors } from './features/notes-coins/notesSlice';

function App() {
  const dispatch = useDispatch();
  const amount = useSelector(selectAmount);
  const selectedNotes = useSelector(notesSelectors.selectRequestedAmountNotes);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={amount} onChange={(e) => {
          dispatch(amountActions.setAmount(parseInt(e.target.value)));
        }} />
        
        {JSON.stringify(selectedNotes)}
        
      </header>
    </div>
  );
}

export default App;
