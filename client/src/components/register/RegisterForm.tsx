import * as React from 'react';
import styled from 'styled-components';
import RoundButton from '../common/RoundButton';
import palette from '../../lib/styles/palette';
import LabelInput from '../common/LabelInput';
import {UserBasicInfo, SignUpIntraMutationArgs} from '../../lib/graphql/user';
import useInputs from '../../lib/hooks/useInputs';

const RegisterFormBlock = styled.div`
    margin-top: 3rem;
    margin-bottom: 3rem;
    .form-bottom {
    margin-top: 6rem;
    }
    .error {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${palette.red5};
    font-weight: bold;
    }
`;

export interface RegisterFormProps {
    onSubmit: (form : SignUpIntraMutationArgs & {password_confirm : string}) => any;
    userBasicInfo : UserBasicInfo;
    error : string | null | undefined;
    token : string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  userBasicInfo,
  onSubmit,
  token,
  error
}) => {
    const [form, onChange] = useInputs({
      ...userBasicInfo,
      password : '',
      password_confirm : '',
      token
    });
    return(
        <RegisterFormBlock>
        <LabelInput
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={userBasicInfo?.email}
          disabled={true}
          size={25}
        />
        <LabelInput
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          size={25}
          type="password"
          onChange={onChange}
        />
        <LabelInput
          name="password_confirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          size={25}
          type="password"
          onChange={onChange}
        />
      <div className="form-bottom">
        {error && <div className="error">{error}</div>}
        <div className="buttons">
          <RoundButton inline color="lightGray" to="/" size="LARGE">
            취소
          </RoundButton>
          <RoundButton
            inline
            type="submit"
            size="LARGE"
            onClick={()=>{
              onSubmit({...form});
            }}
          >
            다음
          </RoundButton>
        </div>
      </div>
    </RegisterFormBlock>
    );
};

export default RegisterForm;