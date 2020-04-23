/*
    actions.ts 역할
     - 액션 타입 정의
        - 액션 타입은 대문자로 정의하고, '모듈 이름/액션 이름'과 같은 형태로 작성한다. 모듈 이름으로 중복을 방지
     - 액션 생성 함수 생성
*/
import {deprecated} from 'typesafe-actions';
import {AuthMode} from './types';

const {createStandardAction} = deprecated;

export const SET_LAYER = 'core/SET_LAYER';
export const SHOW_AUTH_MODAL = 'core/SHOW_AUTH_MODAL';
export const CHANGE_AUTH_MODAL_MODE = 'core/CHANGE_AUTH_MODAL_MODE';
export const CLOSE_AUTH_MODAL = 'core/CLOSE_AUTH_MODAL';

export const setLayer = createStandardAction(SET_LAYER)<boolean>();
export const showAuthModal = createStandardAction(SHOW_AUTH_MODAL)<AuthMode>();
export const changeAuthModalMode = createStandardAction(CHANGE_AUTH_MODAL_MODE)<AuthMode>();
export const closeAuthModal = createStandardAction(CLOSE_AUTH_MODAL)();
