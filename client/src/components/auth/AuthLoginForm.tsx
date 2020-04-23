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
    type:'passowrd'
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

const AuthLoginForm = () => {
    return(
        <LoginFormBlock>
            <LoginInput/>
            <LoginPassword/>
            <LoginButton>로그인</LoginButton>
            <div className="foot">
                <span>아직 회원이 아니신가요?</span>
                <div className="link">회원가입</div>
            </div>            
        </LoginFormBlock>
    );
}

export default AuthLoginForm;