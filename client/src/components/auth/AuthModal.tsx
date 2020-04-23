import * as React from 'react';
import styled, {css} from 'styled-components';
import palette, {buttonColorMap} from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import transitions from '../../lib/styles/transitions';
import {MdClose} from 'react-icons/md';
import AuthLoginForm from './AuthLoginForm';

const {useState, useEffect} = React;

const AuthModalBlock = styled.div<{ visible: boolean }>`
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
    height: 480px;
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
    .gray-block {
      width: 216px;
      background: ${palette.gray1};
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .welcome {
        font-size: 1.75rem;
        margin-top: 1.5rem;
        color: ${palette.gray7};
        text-align: center;
        font-weight: 600;
      }
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
const FortyTwoImg = styled.img.attrs({
  src:'./logo_42_white.svg'
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

const Divider = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  text-align:center;
  span {
    position:relative;
    font-size:14px;
    font-weight:600;
    color:rgb(118, 118, 118);
    padding-bottom: var(--spacing-rule-text-vertical, 16px);
    padding-top: var(--spacing-rule-text-vertical, 16px);
    padding-left: var(--spacing-rule-text-horizontal, 16px);
    padding-right: var(--spacing-rule-text-horizontal, 16px);
  }
  span::before{
    content:"";
    border-bottom-style:solid;
    border-bottom-color:#e4e4e4;
    border-bottom-width: var(--border-rule-border-width, 1px);
    position: absolute;
    top:50%;
    right:100%;
    width:5000px;
  }
  span::after{
    content:"";
    border-bottom-style:solid;
    border-bottom-color:#e4e4e4;
    border-bottom-width: var(--border-rule-border-width, 1px);
    position: absolute;
    top:50%;
    left:100%;
    width:5000px;
  }
`;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  children,
  onClose,
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

  return (
    <AuthModalBlock visible={visible}>
      <div className="wrapper">
        {/* <div className="gray-block">
          <div>
            <div className="welcome">환영합니다!</div>
          </div>
        </div> */}        
        <div className="white-block">
          <div className="exit-wrapper">
            <MdClose onClick={onClose} tabIndex={1} />
          </div>
          <div className="block-content">
            {children}
            <FortyTwoButton>
              <FortyTwoImg/>
              인트라 계정으로 로그인
            </FortyTwoButton>
            <Divider><span>또는</span></Divider>
            <AuthLoginForm/>
          </div>
        </div>
      </div>
    </AuthModalBlock>
  );
};

export default AuthModal;