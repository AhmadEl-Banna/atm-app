import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { amountActions } from './features/atm/amountSlice';
import KeyPad from './features/atm/components/KeyPad';
import ResultComponent from './features/atm/components/ResultComponent';
import AppHeader from './features/layout/components/AppHeader';

const AppContainer = styled.div`
display: grid;
grid-template-rows: 100px 1fr;
grid-gap: 10px
`

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useDispatch();
  const onSubmit = useCallback((amount) => {
    setIsSubmitted(true);
    dispatch(amountActions.setAmount(amount));
  }, [setIsSubmitted, dispatch])
  
  const onBack = useCallback(() => {
    setIsSubmitted(false);
  } , [setIsSubmitted])

  return (
    <AppContainer>
      <AppHeader showBackButton={isSubmitted} title={!isSubmitted ? 'Select amount' : 'Depositing'} onBack={onBack}/>
      {!isSubmitted ?
        (<KeyPad onSubmit={onSubmit} />) :
        (<ResultComponent />)
        }
    </AppContainer>
  );
}

export default App;
