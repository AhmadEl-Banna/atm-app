import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAmount } from '../amountSlice';

import AmountValue from './AmountValue';
import MoneyBoxes from './MoneyBoxes';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  row-gap: 30px;
  grid-template-areas:
    'amount'
    'results'
    'submit';
`;

const Thanks = styled.p`
  font-size: 40px;
  align-self: center;
  justify-self: center;
  text-align: center;
`;

const ResultComponent: FunctionComponent = () => {
  const amount = useSelector(selectAmount);

  return (
    <Container>
      <AmountValue gridArea="amount" isEditing={false} amount={amount} />
      <MoneyBoxes gridArea="results" />
      <Thanks>
        Thank you for using
        <br />
        Enalyzer ATM
      </Thanks>
    </Container>
  );
};

export default ResultComponent;
