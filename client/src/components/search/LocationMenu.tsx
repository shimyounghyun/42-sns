import React, {useMemo,useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { FocusType, FOCUS} from '../../modules/search';
import {debounce} from 'throttle-debounce';
import useInput from '../../lib/hooks/useInput';
import { RouteComponentProps } from 'react-router';

const MenuWrapper = styled.div`
display: inline-flex;
width:100%;
padding: 16px 22px;
border-color: rgb(34, 34, 34);
.content{
    position: relative;
    flex: 1 0;
    cursor:pointer;
    display:block;
    .item-descript {
        font-size: 10px; 
        line-height: 12px; 
        font-weight: 800; 
        letter-spacing: 0.04em; 
        text-transform: uppercase; 
        padding-bottom: 4px; 
    }
    .item-input {
        border: 0px;
        margin: 0px;
        padding: 0px;
        width: 100%;
        outline: none;
        background: none;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        color: #222222;
        text-overflow: ellipsis;
        cursor: text;
    }
}
`;

const AutocompleteList = styled.ul`
    min-width:500px;
    position: absolute;
    padding:12px 0px 0px;
    margin-top:100px;
`;

const AutocompleteItem = styled.li`
    cursor: pointer !important;
    list-style-type: none !important;
    width: 100% !important;
    display: flex !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    padding-left: 32px !important;
    padding-right: 16px !important;

    &:hover {
        background-color:rgb(247,247,247);
    }
    .location-img {
        -webkit-box-pack: center !important;
        -webkit-box-align: center !important;
        font-size: 17px !important;
        background-color: rgb(241, 241, 241) !important;
        min-width: 48px !important;
        height: 48px !important;
        margin-right: 16px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-width: 1px !important;
        border-style: solid !important;
        border-color: rgba(176, 176, 176, 0.2) !important;
        border-image: initial !important;
        border-radius: 8px !important;
    }

    .location-name{
        -webkit-box-pack: center !important;
        -webkit-box-direction: normal !important;
        -webkit-box-orient: vertical !important;
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        font-size: 16px !important;
        line-height: 20px !important;
        font-weight: 400 !important;
        color: rgb(34, 34, 34) !important;
        max-height: 120px !important;
        text-overflow: ellipsis !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 6 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
    }
`;

interface LocationMenuProps{
    onFocus: (el:FocusType)=> void;
    focus:FocusType;
    onSearch: (keyword: string) => void;
    initial: string;
    onSelect: (placeId:string, name:string) => void;
    searchResult?:any[];
}

const LocationMenu:React.FC<LocationMenuProps> = ({
    onFocus,
    focus,
    onSearch,
    initial,
    searchResult,
    onSelect
}) => {
    const [keyword, setKeyword] = useInput(initial);
    const onClick = () => onFocus(FOCUS.LOCATION);
    
    const debouncedSearch = useMemo(() => {
        return debounce(300, (keyword: string) => {
            onSearch(keyword);
        });
    },[]);

    useEffect(()=>{
        debouncedSearch(keyword);
    },[keyword]);
    return (
        <MenuWrapper onClick={onClick}>
            <div className="content">
                <div className="item-descript">위치</div>
                <input 
                    className="item-input" 
                    type="text" 
                    placeholder="장소를 입력해주세요."
                    onChange={setKeyword}
                    value={keyword}/>
            </div>
            {searchResult && focus == FOCUS.LOCATION
            ? (<AutocompleteList>
                {searchResult.map((data)=>
                    <AutocompleteItem 
                        key={data.place_id}
                        onClick={()=>onSelect(data.place_id, data.description)}
                    >
                        <div className="location-img"></div>
                        <div className="location-name">{data.description}</div>
                    </AutocompleteItem>
                )}
                </AutocompleteList>
                )
            : null}
        </MenuWrapper>
    );
}

export default LocationMenu;