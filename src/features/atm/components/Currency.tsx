import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { notesSelectors } from "../notesSlice"
import { CurrencyType } from '../notesSlice/index';
import { RootState } from '../../../app/store';

const Container = styled.div`
 display: flex;
 flex-direction: row;
 font-size: 40px;
 border: 1px solid white;
 justify-content: space-space-evenly;
 margin: 3px;
`

const NoteImage = styled.img`
  height :50px;
  margin: 4px;
`

const CoinIcon = styled.div`
 height :50px;
 width: 92px;
 background-color: transparent;
 margin: 4px;
 align-items: center;
 .innerCircle {
  border: 1px solid white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
 }
`;



const Currency: FunctionComponent<{ id: string, count: number }> = ({ id ,count}) => {
  const currency = useSelector((state : RootState) => notesSelectors.selectById(state,id));
  if (!currency) return null;
  return (<Container>
    { currency.type === CurrencyType.NOTE ?
      (<NoteImage src="./500-bill.png" alt="Note" />) :
      (<CoinIcon><div className="innerCircle"></div></CoinIcon>)
    }
    <div>{count} X {currency.value}</div>
  </Container>)
}
  

  export default Currency