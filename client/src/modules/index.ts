/*
 modules 역할
 - 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식. Ducks 패턴이라고 한다.
*/
import {combineReducers} from 'redux';
import  core,{CoreState} from './core';
import search,{SearchState} from './search';
export type RootState = {
    core: CoreState;
    search: SearchState;
}

const rootReducer = combineReducers({
    core,
    search
});

export default rootReducer;