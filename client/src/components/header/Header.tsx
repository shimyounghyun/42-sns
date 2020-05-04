import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import RoundButton from '../common/RoundButton';
import Button from '../common/Button';
import useHeader from './hooks/useHeader';
import {logo_42nomad} from '../../static/image';
import HeaderUserIcon from './HeaderUserIcon';
import HeaderUserMenu from './HeaderUserMenu';
import useToggle from '../../lib/hooks/useToggle';
import { Link } from 'react-router-dom';
import {MdToday, MdLocalAirport} from 'react-icons/md';

export type MainHeaderProps = {};
// const handleLink = () => {
//   document.location.href="/";  
// }

function Header(props: MainHeaderProps) {
  const {onLoginClick, isLoggedIn, user, onLogout, onSearchClick, search} = useHeader();

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
          <div style={{display:'flex', alignItems:"center"}}>
            <MdLocalAirport size={20} style={{marginRight:"0.5rem"}} color="rgb(113, 113, 113)"/>
            <Button 
              color={'lightGray'} 
              size={'large'} 
              style={{minWidth:'5rem'}}
              onClick={onSearchClick}
            >{search?.location?.name ? search?.location?.name : '여행지'}
            </Button>
            <Divider/>
            <MdToday size={20} style={{marginRight:"0.5rem"}} color="rgb(113, 113, 113)"/>
            <Button 
              color={'lightGray'} 
              size={'large'} 
              style={{minWidth:'5rem'}}
              onClick={onSearchClick}
            >{search?.date?.startDate ? search.date.startDate.format("M월 D일") : '' }
              {search?.date?.endDate ? ' - ' + search.date.endDate.format("M월 D일") : '' }
              {!search?.date?.startDate && !search?.date?.endDate && '여행 일자'}
            </Button>
          </div>
          {isLoggedIn == true && user
            ? <Right>
                <RoundButton color="lightGray" style={{margin:"1rem"}}>
                    여행지 만들기
                </RoundButton>
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

const Divider = styled.div`
    align-self: center;
    border-right: 1px solid #DDDDDD;
    flex: 0 1 0px;
    height: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
`;

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