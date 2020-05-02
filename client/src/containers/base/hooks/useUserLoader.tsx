import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CurrentUser, GET_CURRENT_USER} from '../../../lib/graphql/user';
import {setUser} from '../../../modules/core';
import {useQuery} from '@apollo/react-hooks';
import { RootState } from '../../../modules';

type CurrentUserResponse = {
    GetMyProfile : {
        result : boolean;
        error : string | null | undefined;
        user : CurrentUser | null | undefined;
    }
}

const useUserLoader = () => {
    const dispatch = useDispatch();
    const getCurrentUser = useQuery<CurrentUserResponse>(GET_CURRENT_USER);
    const prevUser = useSelector((state:RootState)=>state.core.user);

    const user = 
        (getCurrentUser.data && getCurrentUser.data.GetMyProfile)
        ? getCurrentUser.data.GetMyProfile.user
        : undefined;


    useEffect(()=>{
        console.log("useUserLoader",user);
        if (user){
            dispatch(setUser(user));            
        }            
    },[user]);
    
    useEffect(()=>{
        if (user === undefined) return;
        if (prevUser !== user) {
            dispatch(setUser(user));
        }
    }, [dispatch, prevUser, user]);
}

export default useUserLoader;