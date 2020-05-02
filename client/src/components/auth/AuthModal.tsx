import * as React from 'react';
import styled, {css} from 'styled-components';
import palette, {buttonColorMap} from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import transitions from '../../lib/styles/transitions';
import {MdClose} from 'react-icons/md';
import AuthLoginForm from './AuthLoginForm';
import {AuthMode} from '../../modules/core';
import {logo_42_white} from '../../static/svg';

const {useState, useEffect} = React;

const AuthModalBlock = styled.div<{ visible: boolean, mode: AuthMode }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndexes.AuthModal};
  .wrapper {
    width: 606px;
    ${props =>
        props.mode === 'LOGIN'
          ? css`height: 480px;`
          : css`height: 250px;`
    }    
    ${props =>
      props.visible
        ? css`
            animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
          `
        : css`
            animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
          `}
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
    display: flex;
    }
    .white-block {
      flex: 1;
      background: white;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      .exit-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1.5rem;
        color: ${palette.gray6};
        margin-bottom: 2.25rem;
        svg {
          cursor: pointer;
        }
      }
      .block-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const Footer = styled.div`
  margin-top:1.5rem;
  padding: 1.5rem 0 0 0;
  border-top:1px solid #e4e4e4;
  .link {
      display: inline-block;
      font-weight: bold;
      color: #00babc;
      cursor: pointer;
  &hover {
      text-decoration: underline;
  }
`;
const FortyTwoImg = styled.img.attrs({
  src:logo_42_white
})`
  width:20px;
  height:20px;
  margin-right:4px;
`;

const FortyTwoButton = styled.button`
  cursor: pointer;
  height: 3rem;
  font-size: 1rem;
  color:#fff;
  font-weight: 600;
  border:none;
  background-color: #00babc;
  display:flex;
  alin-items:center;
  outline:none;
  justify-content: center;
`;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onToggleMode: () => void;
  mode : AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  children,
  onClose,
  onToggleMode,
  mode
}) => {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    let timeoutId: number | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!visible && closed) return null;

  const modText = mode === 'LOGIN' ? '로그인' : '회원가입';

  return (
    <AuthModalBlock visible={visible} mode={mode}>
      <div className="wrapper">
        <div className="white-block">
          <div className="exit-wrapper">
            <MdClose onClick={onClose} tabIndex={1} />
          </div>
          <div className="block-content">
            {children}
            <FortyTwoButton onClick={go42Auth}>
              <FortyTwoImg/>
              인트라 계정으로 {modText}
            </FortyTwoButton>
            {mode === 'LOGIN' 
              ? <AuthLoginForm/> 
              : null
            }
            <Footer>
                <span>
                    {mode === 'LOGIN' 
                        ? '아직 회원이 아니신가요?'
                        : '계정이 이미 있으신가요?'}                 
                </span>
                <div 
                    className="link"
                    onClick={onToggleMode}
                >
                    {mode === 'LOGIN' 
                        ? '회원가입'
                        : '로그인'}
                </div>
              </Footer> 
          </div>
        </div>
      </div>
    </AuthModalBlock>
  );
};

const go42Auth = () =>{
  document.location.href="https://api.intra.42.fr/oauth/authorize?client_id=5502eb0a16b9d4e2c52efa25d4a97437462c649ea3e3f5e0ad8ef5e0c24a700e&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fauth&response_type=code";
}
export default AuthModal;