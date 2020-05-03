import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  showAuthModal,
  setLayer
} from '../../../modules/core';
import {
  setVisible
} from '../../../modules/search';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {IS_LOGGED_IN, LOGUSER_IN, LOGUSER_OUT} from '../../../lib/graphql/user';
import { RootState } from '../../../modules';

export default function useHeader() {
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.core.user);
    const [logout] = useMutation(LOGUSER_OUT);
    const {data} = useQuery(IS_LOGGED_IN);
    const isLoggedIn = data ? data.auth.isLoggedIn : false;
//onSearchClick
    const onLoginClick =useCallback(()=>{
      dispatch(setLayer(true));
      dispatch(setVisible(true));
    },[dispatch]);

    const onSearchClick = useCallback(() => {
      dispatch(showAuthModal('LOGIN'));    
    }, [dispatch]);

    const onLogout = useCallback(async ()=>{
      try{
        await logout();
      }catch{}
      window.location.href='/';
    },[]);
  
    return { user, onLoginClick,  onLogout ,isLoggedIn, onSearchClick};
  }
