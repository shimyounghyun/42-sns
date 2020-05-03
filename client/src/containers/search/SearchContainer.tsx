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
    setFocus
  } from '../../modules/search';
import {setLayer} from '../../modules/core';
import {connect, useDispatch} from 'react-redux';
import { useLocation} from 'react-router-dom';
import {RootState} from '../../modules';
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

    const changeDate = ({startDate, endDate}:DateType) => {
        dispatch(setDate({startDate, endDate}));
    }

    const onOutsideClick = useCallback(
        (e: React.MouseEvent) => {
            dispatch(setLayer(false));
            dispatch(setVisible(false));
        },[]
    );

    return(
        <Search
            visible={visible}
            onOutsideClick={onOutsideClick}
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
