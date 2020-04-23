import * as React from 'react';
import styled from 'styled-components';
import palette, {buttonColorMap} from '../../lib/styles/palette';

const LoginFormBlock = styled.form`
    width: 100%;
    line-height: 1.43;
    font-size: 1rem;
    display: flex;
    flex-direction:column;
    .foot {
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
    }
`;

const LoginInput = styled.input.attrs({
    placeholder:'아이디',
    type:'text'
})`
    radius: 4px;
    height: 1.5rem;
    border: 1px solid ${palette.gray3};
    font-size: 1rem;
    font-weight: normal;
    padding: 1rem;
    margin-bottom:1rem;
    &::placeholder {
        color: ${palette.gray6};
    }
    &:disabled {
        background: ${palette.gray1};
    }
`;

const LoginPassword = styled.input.attrs({
    placeholder:'비밀번호',
    type:'password'
})`
    radius: 4px;
    height: 1.5rem;
    padding: 1rem;
    margin-bottom:1rem;
    border: 1px solid ${palette.gray3};
    font-size: 1rem;
    font-weight: normal;
    &::placeholder {
        color: ${palette.gray6};
    }
    &:disabled {
        background: ${palette.gray1};
    }
`;

const LoginButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border:none;
  align-items: center;
  justify-content: center;
  display:flex;
  outline:none;
  color:${buttonColorMap.red.color};
  background-color:${buttonColorMap.red.background};
  &:hover,
  &:focus {
    background:${buttonColorMap.red.hoverBackground}
  }
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

const AuthLoginForm = () => {
    return(
        <LoginFormBlock>
            <Divider><span>또는</span></Divider>
            <LoginInput/>
            <LoginPassword/>
            <LoginButton>로그인</LoginButton>         
        </LoginFormBlock>
    );
}

export default AuthLoginForm;