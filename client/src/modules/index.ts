/*
 modules 역할
 - 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식. Ducks 패턴이라고 한다.
*/
import {combineReducers} from 'redux';
import  core,{CoreState} from './core';

export type RootState = {
    core: CoreState
}

const rootReducer = combineReducers({
    core
});

export default rootReducer;