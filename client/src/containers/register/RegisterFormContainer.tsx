import * as React from 'react';
import RegisterForm from '../../components/register/RegisterForm';
import useRequest from '../../lib/hooks/useRequest';
import {useLocation, RouteComponentProps, withRouter} from 'react-router-dom';
import {
  SIGN_UP,
  LOGUSER_IN,
  SignUpIntraMutationArgs,
  SignUpIntraResponse,
  UserBasicInfo  
} from '../../lib/graphql/user';
import {useMutation, useQuery} from '@apollo/react-hooks';

interface RegisterFormContainerProps<> extends RouteComponentProps<{},any,{
  userBasicInfo : UserBasicInfo;
  token : string;
}> {}


const {useEffect, useState} = React;

const RegisterFormContainer: React.FC<RegisterFormContainerProps> = ({
  location,
  history
}) => {
  
  const {userBasicInfo, token} = location.state;
  const [error, setError] = useState<null | string>(null);
  const [signUp] = useMutation<SignUpIntraResponse>(SIGN_UP);
  const [signIn] = useMutation(LOGUSER_IN);

  const onSubmit = async (form: SignUpIntraMutationArgs & {password_confirm : string}) => {
    setError(null);
    const {
      email, 
      userName,
      firstName,
      lastName,
      profilePhoto,
      intraId,
      password,
      id,
      token,
      password_confirm
    } = form;

    const validation = {
      password : (text:string) => {
        if (text.length < 3){
          return '패스워드는 3글자 이상 입력해야합니다.';
        }
      },
      password_confirm : (text:string) => {
        if (password != text) {
          return '비밀번호가 일치하지 않습니다.';
        }
      }
    }

    const error =
      validation.password(form.password) || 
      validation.password_confirm(password_confirm) || null;
    
    if (error){
      setError(error);
      return;
    }

    const result = await signUp({
      variables: form
    });

    if (result.data && result.data.result && result.data.token){
      await signIn({variables:{token : result.data.token}});
      window.location.href="/";
    }
  }
  return (
    <>
      <RegisterForm
        userBasicInfo={userBasicInfo}
        token={token}
        error={error}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default (withRouter)(RegisterFormContainer);