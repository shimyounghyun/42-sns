import {deprecated} from 'typesafe-actions'; 
import {updateKey, createReducer} from '../lib/utils';
import produce from 'immer';
import moment from 'moment';

const {createStandardAction} = deprecated;

export enum FOCUS {
    LOCATION = "location",
    DATE = "date"
}

export type FocusType = "location" | "date" | null;

export type SearchState = {
    visible: boolean;
    focus : FocusType;
    location : LocationType;
    date : DateType;
}

export type LocationType = {
    lat : number | null;
    lng : number | null;
    name : string | null;
}

export type DateType = {
    startDate: moment.Moment | null;
    endDate:moment.Moment | null
}

const initialState:SearchState = {
    visible: false,
    focus : null,
    location : {
        lat:null,
        lng:null,
        name:null
    },
    date : {
        startDate:null,
        endDate:null
    }
}

const SET_LOCATION = 'search/SET_LOCATION';
const SET_DATE = 'search/SET_DATE';
const SET_VISIBLE = 'search/SET_LAYER';
const SET_FOCUS = 'search/SET_FOCUS';

export const setLocation = createStandardAction(SET_LOCATION)<LocationType>();
export const setDate = createStandardAction(SET_DATE)<DateType>();
export const setVisible = createStandardAction(SET_VISIBLE)<boolean>();
export const setFocus = createStandardAction(SET_FOCUS)<FocusType>();

const search = createReducer({
    [SET_LOCATION] : (state, action) =>
        produce(state, draft => {
            draft.location.lat = action.payload.lat;
            draft.location.lng = action.payload.lng
            draft.location.name = action.payload.name
        }),
    [SET_DATE] : (state, action) =>
        produce(state, draft => {
            draft.date.startDate = action.payload.startDate;
            draft.date.endDate = action.payload.endDate
        }),
    [SET_VISIBLE]: (state, action) => ({
        ...state,
        visible: action.payload,
      }),
    [SET_FOCUS] : (state, action) => ({
        ...state,
        focus: action.payload,
    })
},initialState);

export default search;