/*
    reducer.ts 역할
    - 초기 상태 정의
    - 리듀서 함수 생성
*/
import { createReducer } from 'typesafe-actions';
import {CoreAction, CoreState} from './types';
import produce from 'immer';
import {
    SET_LAYER,
    SHOW_AUTH_MODAL,
    CLOSE_AUTH_MODAL,
    CHANGE_AUTH_MODAL_MODE,
    SET_USER
} from './actions';
import {updateKey} from '../../lib/utils';

const initialState: CoreState = {
    layer: false,
    auth: {
        visible : false,
        mode: 'LOGIN'
    },
    user: null
}

// createReducer : 리듀서를 switch문이 아닌 객체 형태로 작성 할 수 있게 해준다. 
// produce : 복잡한 깊이를 가진 객체/배열/함수의 불변성 유지를 위해 -> 좀 더 간단한 코드로 데이터를 안전하게 보호
const core = createReducer<CoreState, CoreAction>(initialState, {
    [SET_LAYER]: (state, action) => ({
        ...state,
        layer: action.payload,
    }),
    [SHOW_AUTH_MODAL]: (state, action) => 
        produce(state, draft => {
        draft.auth.mode = action.payload;
        draft.auth.visible = true;
        draft.layer = true;
    }),
    [CHANGE_AUTH_MODAL_MODE]: (state, action) =>
        produce(state, draft => {
            draft.auth.mode = action.payload;
    }),
    [CLOSE_AUTH_MODAL]: state =>
    produce(state, draft => {
        draft.auth.visible = false;
        draft.layer = false;
    }),
    [SET_USER]: (state, {payload: user}) => updateKey(state, 'user', user)
});

export default core;