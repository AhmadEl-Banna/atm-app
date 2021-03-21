
import styled from 'styled-components';


const BaseButton = styled.button<{ gridArea?: string }>`
  grid-area: ${({gridArea}) => gridArea};
  background: #2bbed3;
  color: white;
  font-size: 40px;
  border: 1px solid white;
  transition: background 0.3s, color 0.3s;
   :active, :hover {
    background: white;
    color: #2bbed3;
  }
`

export const NumPadButton= styled(BaseButton)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

export const BackButton = styled(NumPadButton)`
  justify-self: start;
  align-self: start;
`

export const SubmitButton = styled(BaseButton)`
width: 200px;
border-radius: 25px;
justify-self: center;
align-self: center;
`