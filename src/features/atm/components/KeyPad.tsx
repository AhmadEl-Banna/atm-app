import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import AmountValue from './AmountValue';
import { BackButton, NumPadButton, SubmitButton } from './buttons';

const Container = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: auto auto auto;
row-gap: 30px;
grid-template-areas:
 "amount"
 "numpad"
 "submit"
`

const KeyPadContainer = styled.div`
display: grid;
height: fit-content;
width: fit-content;
align-self: center;
justify-self: center;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-gap: 10px;
grid-template-areas:
 "num-1 num-2 num-3"
 "num-4 num-5 num-6"
 "num-7 num-8 num-9"
 "remove num-0 .";

 grid-area: numpad;
`

interface KeyPadProps {
  onSubmit: (amount: number) => void;
}

const KeyPad: FunctionComponent<KeyPadProps> = ({onSubmit}) => {
  const [amount, setAmount] = useState(0)
  const onKeyClick = (number: number) => {
    setAmount(parseInt(`${amount}${number}`, 10))
  }

  const onRemoveClick = () => {
    if (amount.toString().length === 1) {
      setAmount(0);
      return;
    }
    setAmount(parseInt(`${amount.toString().slice(0, -1)}`, 10))
  }
  return (<Container>
    <AmountValue gridArea="amount" isEditing amount={amount} />
    <KeyPadContainer>
    <NumPadButton gridArea="num-1" onClick={()=>{
        onKeyClick(1);
    }}>1</NumPadButton>
    <NumPadButton gridArea="num-2" onClick={()=>{
        onKeyClick(2);
    }}>2</NumPadButton>
    <NumPadButton gridArea="num-3" onClick={()=>{
        onKeyClick(3);
    }}>3</NumPadButton>
    <NumPadButton gridArea="num-4" onClick={()=>{
        onKeyClick(4);
    }}>4</NumPadButton>
    <NumPadButton gridArea="num-5" onClick={()=>{
        onKeyClick(5);
    }}>5</NumPadButton>
    <NumPadButton gridArea="num-6" onClick={()=>{
        onKeyClick(6);
    }}>6</NumPadButton>
    <NumPadButton gridArea="num-7" onClick={()=>{
        onKeyClick(7);
    }}>7</NumPadButton>
    <NumPadButton gridArea="num-8" onClick={()=>{
        onKeyClick(8);
    }}>8</NumPadButton>
    <NumPadButton gridArea="num-9" onClick={()=>{
        onKeyClick(9);
    }}>9</NumPadButton>
    <NumPadButton gridArea="num-0" onClick={()=>{
        onKeyClick(0);
    }}>0</NumPadButton>
    <BackButton gridArea="remove" onClick={onRemoveClick}>
      <i className="material-icons md-32">arrow_back</i>
    </BackButton>
    </KeyPadContainer>
    <SubmitButton disabled={amount === 0} gridArea="submit" onClick={()=>{onSubmit(amount)}} >submit</SubmitButton>
  </Container>)
}
  

export default KeyPad