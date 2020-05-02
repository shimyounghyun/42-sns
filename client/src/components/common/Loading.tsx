import * as React from 'react';
import Lottie from 'react-lottie';
import {loading} from '../../static/json';
import styled from 'styled-components';

const Layer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(249, 249, 249, 0.85);
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    z-index:10;
`;

const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData:loading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    }
}

const Loading = () => {
    return(
        <>
        <Layer>
            <Lottie 
                options={lottieOptions}
                height={200}
                width={200}
                isStopped={false}
                isPaused={false}
            />
            <h1>잠시만 기다려주세요..</h1>
        </Layer>
        </>
    );
}

export default Loading;