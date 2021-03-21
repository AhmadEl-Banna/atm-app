import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { notesSelectors } from '../notesSlice';
import MoneyBox from './Box';

const Container = styled.div<{ gridArea?: string }>`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 grid-area: ${({gridArea}) => gridArea};
 font-size: 80px;
 align-self: center;
 justify-self: center;
`



const MoneyBoxes: FunctionComponent<{ gridArea?: string }> = ({ gridArea }) => {
  const keys = useSelector(notesSelectors.selectBoxesKeys);

  return (<Container gridArea={gridArea} >
    {keys.map((key) => {
      return <MoneyBox key={key} currencyType={key}/>
    })}
  </Container>)
}
  

  export default MoneyBoxes