import * as React from 'react';
import Search from '../../components/search/Search';
import {useSelector} from 'react-redux';
import {
    setDate,
    setLocation,
    setVisible,
    LocationType,
    DateType,    
    SearchState,
    setFocus,
    FocusType
  } from '../../modules/search';
import {setLayer} from '../../modules/core';
import {connect, useDispatch} from 'react-redux';
import { useLocation} from 'react-router-dom';
import {RootState} from '../../modules';
import {usePlaceAutocomplete, getGeocode, getLatLng} from '../../lib/api/googleMap';
const { useCallback } = React;

interface OwnProps {}

interface DispatchProps {
    setDate : typeof setDate;
    setLocation : typeof setLocation;
    setVisible : typeof setVisible;
    setFocus : typeof setFocus;
}

type SearchContainerProps = OwnProps & SearchState & DispatchProps;

const SearchContainer: React.FC<SearchContainerProps> = ({
    visible,
    location,
    date,
    focus,
    setDate,
    setVisible,
    setLocation,
    setFocus    
}) => {
    const dispatch = useDispatch();
    const {keyword,setKeyword, autocompleteResult, status} = usePlaceAutocomplete();
    const onChangeDate = ({startDate, endDate}:DateType) => {
        dispatch(setDate({startDate, endDate}));
    }

    const onOutsideClick = useCallback(
        (e: React.MouseEvent) => {
        dispatch(setLayer(false));
        dispatch(setVisible(false));
    },[]);

    const onFocus = useCallback((el:FocusType)=>{
        dispatch(setFocus(el));
    },[]);

    const onSearch = useCallback((keyword:string)=>{
        if (!keyword)
            return;
        setKeyword(keyword);
    },[]);

    const onSelect = useCallback((placeId:string, name:string)=>{
        getGeocode({placeId})
        .then((r)=>getLatLng(r[0]))
        .then((r)=>{
            const {lat, lng} = r;
            dispatch(setLocation({name, lat, lng}));
        })
    },[]);

    return(
        <Search
            visible={visible}
            onOutsideClick={onOutsideClick}
            onFocus={onFocus}
            focus={focus}
            onChangeDate={onChangeDate}
            initial={keyword || ''}
            onSearch={onSearch}
            searchResult={autocompleteResult}
            onSelect={onSelect}
        />
    );
}

export default connect<SearchState, DispatchProps, OwnProps, RootState>(
    state => ({
        visible : state.search.visible,
        location : state.search.location,
        date : state.search.date,
        focus : state.search.focus
    }),
    {setDate, setVisible, setLocation, setFocus},
)(SearchContainer);
