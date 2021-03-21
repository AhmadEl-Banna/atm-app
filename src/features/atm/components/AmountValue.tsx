import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div<{ gridArea?: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  font-size: 80px;
  align-self: center;
  justify-self: center;
`;

const blinkAnimation = keyframes`
  from, to {
    color: transparent;
  }
  50% {
    color: white;
  }
`;

const BlinkingCursor = styled.span`
  animation-name: ${blinkAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const AmountValue: FunctionComponent<{ amount: number; isEditing: boolean; gridArea?: string }> = ({
  amount,
  isEditing,
  gridArea,
}) => {
  return (
    <Container gridArea={gridArea}>
      <span>£ </span>
      <span>{amount}</span>
      {isEditing ? <BlinkingCursor>|</BlinkingCursor> : null}
    </Container>
  );
};

export default AmountValue;
