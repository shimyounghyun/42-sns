import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {showAuthModal} from '../../../modules/core';

export default function useHeader() {
    const dispatch = useDispatch();
  
    const onLoginClick = useCallback(() => {
      dispatch(showAuthModal('LOGIN'));
    }, [dispatch]);
  
    return { onLoginClick};
  }
