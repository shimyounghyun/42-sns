import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import RoundButton from '../common/RoundButton';
import useHeader from './hooks/useHeader';
import {logo_42nomad} from '../../static/image';
import HeaderUserIcon from './HeaderUserIcon';
import HeaderUserMenu from './HeaderUserMenu';
import useToggle from '../../lib/hooks/useToggle';
import { Link } from 'react-router-dom';

export type MainHeaderProps = {};
// const handleLink = () => {
//   document.location.href="/";  
// }

function Header(props: MainHeaderProps) {
  const {onLoginClick, isLoggedIn, user, onLogout} = useHeader();
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;
      toggleUserMenu();
    },
    [toggleUserMenu],
  );

  return (
    <Block>
      <Inner>
          <Link to="/">
           <HeaderLogo/>
          </Link>
          {isLoggedIn == true && user
            ? <Right>
                <div ref={ref}>
                  <HeaderUserIcon user={user} onClick={toggleUserMenu}/>
                </div>
                <HeaderUserMenu
                  onClose={onOutsideClick}
                  onLogout={onLogout}
                  visible={userMenu}
                />
              </Right> 
            : <Right>
                  <RoundButton color="darkGray" onClick={onLoginClick}>
                    Login
                  </RoundButton>        
              </Right>
          }
      </Inner>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

const HeaderLogo = styled.img.attrs({src:logo_42nomad})`
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