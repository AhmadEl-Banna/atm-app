import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ArrowBackButton } from '../../atm/components/buttons';


const Header = styled.header<{ showBackButton: boolean }>`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
   ${({ showBackButton }) => showBackButton ? '"back-button header-title ."' : '". header-title ."'};
`


const Title = styled.span`
  grid-area: header-title;
  justify-self: center;
  align-self: center;
  font-size: 40px;
`

const BackButton = styled(ArrowBackButton)`
  justify-self: center;
  align-self: center;
  margin-left: 5px;
`

const AppHeader: FunctionComponent<{ title: string; showBackButton: boolean , onBack :()=> void}> = ({ title, showBackButton, onBack }) => {
  return (<Header showBackButton={showBackButton}>
    {showBackButton ? <BackButton gridArea="back-button" onClick={onBack}>
      <i className="material-icons md-32">arrow_back</i>
    </BackButton> : null}

    <Title>{ title }</Title>
  </Header>)
}
  

  export default AppHeader