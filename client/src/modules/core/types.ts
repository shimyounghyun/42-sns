/*
    types.ts 역할
    - 리덕스에 사용되는 타입 정의
*/
import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export type AuthMode = 'REGISTER' | 'LOGIN';
export type CoreAction = ActionType<typeof actions>;

export type CoreState = {
    layer: boolean;
    auth: {
        visible: boolean;
        mode: AuthMode;
    };
    user: null;
};