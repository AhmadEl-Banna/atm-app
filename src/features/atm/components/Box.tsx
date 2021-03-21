import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { notesSelectors } from "../notesSlice"
import { CurrencyType } from '../notesSlice/index';
import Currency from './Currency';

const Container = styled.div`
 display: flex;
 flex-direction: column;
 font-size: 80px;
 justify-content: flex-start;
 align-self: stretch;
 justify-self: center;
 margin: 5px;
`



const MoneyBox: FunctionComponent<{ currencyType: CurrencyType }> = ({ currencyType }) => {
  const currencies = useSelector(notesSelectors.selectBoxContent(currencyType));

  return (<Container>
    {currencies ? currencies.map((currency) => {
     return <Currency id={currency.id} count={ currency.count}/>
    }) : null}
  </Container>)
}
  

  export default MoneyBox