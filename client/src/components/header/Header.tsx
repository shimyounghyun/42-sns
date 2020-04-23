import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import RoundButton from '../common/RoundButton';
import useHeader from './hooks/useHeader';

export type MainHeaderProps = {};
// const handleLink = () => {
//   document.location.href="/";  
// }

function Header(props: MainHeaderProps) {
  const {onLoginClick} = useHeader();
  
  return (
    <Block>
      <Inner>
          <a href="/">
           <HeaderLogo/>
          </a>
          <Right>
              <RoundButton color="darkGray" onClick={onLoginClick}>
                Login
              </RoundButton>              
          </Right>          
      </Inner>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

const HeaderLogo = styled.img.attrs({src:'./logo_42nomad.png'})`
  width: 90px;
  height: 30px;
`

const Inner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export default Header;