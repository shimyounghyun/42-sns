import * as React from 'react';
import Loading from '../components/common/Loading';
import qs from 'qs';
import {Redirect} from 'react-router-dom';
import {IntraConnectResponse, INTRA_CONNECT, ConnectType, LOGUSER_IN} from '../lib/graphql/user';
import {useMutation} from '@apollo/react-hooks';

const {useEffect, useState} = React;

const LoadingPage: React.FC<any> = ({location}) => {
    const query: {code?: string, error?:string} = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
    const {code, error} = query;
    const [intraConnect] = useMutation(INTRA_CONNECT);
    const [signIn] = useMutation(LOGUSER_IN);
    const [type, setType] = useState<ConnectType | null>(null);
    const [data, setData] = useState<IntraConnectResponse | null>(null);    
    useEffect(() => {
        if (!code || error)
            return;
        const fetchData = async () => {
            const result = await intraConnect({variables:{code}});
            if (result.data){
                const response:IntraConnectResponse = result.data.IntraConnect;
                setData(response);
                setType(response.type);
            } else {
                setData(null);
                setType("ERROR");
            }
        }
            fetchData();
    },[]);

    useEffect(() => {
        if (type == "LOGIN"){
            signIn({variables:{token:data?.token}});
            window.location.href="/";
        }
    },[type]);

    if (error){
        console.log("로딩페이지 에러 발생");
        return(<Redirect exact={true} to="/" />);
    }else if (type == "REGIST"){
        return (
            <Redirect 
                to={{
                    pathname: '/regist',
                    state : {
                        userBasicInfo : data?.data, 
                        token : data?.token
                    }
                }}/>
            );
    }
    return (
        <>
            {
                type != "ERROR"
                ? <Loading/>
                : <>에러남</>
            }
        </>
    ); 
}

export default LoadingPage;