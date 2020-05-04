import React, { useCallback, useEffect, useState } from 'react';
import styled, {css} from 'styled-components';
import zIndexes from '../../lib/styles/zIndexes';
import transitions from '../../lib/styles/transitions';
import LocationMenu from './LocationMenu';
import DateMenu from './DateMenu';
import palette from '../../lib/styles/palette';
import OutsideClickHandler from 'react-outside-click-handler';
import {FocusType, FOCUS} from '../../modules/search';

const Wrapper = styled.div<{visible: boolean}>`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    z-index:10;
    .wrapper {
        z-index:0;
        ${props =>
            props.visible
            ? css`
                animation: ${transitions.slideDown} 0.1s forwards ease-in-out;
                `
            : css`
                animation: ${transitions.slideUp} 0.1s forwards ease-in-out;
            `} 
        display:flex;
        background-color: rgb(255,255,255);
        box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px !important;
        min-height:500px;
        .content-block {
            width:100%;
            padding-left:80px;
            padding-top:24px;
            padding-right:80px;
            padding-bottom:64px;
            
            .menu-block {
                border: 1px solid #F7F7F7 !important;
                border-radius: 12px !important;
                background-color: #FFFFFF !important;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08) !important;
                color: #222222 !important;
                display: inline-flex;
                width: 100%;
                position: relative;

                .search-block {
                    margin-left:2px;
                    padding:11px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
            }
        }
    }
`;

const SearchMenuBlock = styled.div`
    display: inline-flex;
    width:100%;
    border-color: rgb(34, 34, 34);
`;

const Divider = styled.div`
    align-self: center;
    border-right: 1px solid #DDDDDD;
    flex: 0 1 0px;
    height: 44px;
`;

const SearchButton = styled.button`
    padding-top: 14px ;
    padding-bottom: 14px;
    padding-left: 24px ;
    padding-right: 24px ;
    display: inline-block;

    background: ${palette.teal6};
    color: white;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius:8px;
    width: 6rem;
    word-break: keep-all;
    cursor: pointer;
    &:hover,
    &:focus {
      background: ${palette.teal5};
    }
    &:disabled {
      background: ${palette.gray5};
      color: ${palette.gray3};
      cursor: default;
    }
`;

interface SearchProps {
    visible : boolean;
    onOutsideClick: (e: React.MouseEvent) => void;
    onFocus: (el:FocusType)=> void;
    focus:FocusType;
    onChangeDate: ({startDate, endDate}:any) => void;
    onSearch: (keyword:string) => void;
    initial: string;
    searchResult?:any[];
    onSelect: (placeId:string, name:string) => void;
}

const Search: React.FC<SearchProps> = ({
    visible,
    onOutsideClick,
    onFocus,
    focus,
    onChangeDate,
    onSearch,
    initial,
    searchResult,
    onSelect
}) => {
    const [closed, setClosed] = useState(true);
    useEffect(() => {
        let timeoutId: number | null = null;
        if (visible) {
            setClosed(false);
        } else {
            timeoutId = setTimeout(() => {
                setClosed(true);
            }, 100);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [visible]);

    if (!visible && closed) return null;

    return (
        <Wrapper visible={visible}>
            <OutsideClickHandler onOutsideClick={onOutsideClick}>
                <div className="wrapper">
                    <div className="content-block">
                        <div className="menu-block">
                            <SearchMenuBlock>
                                <LocationMenu
                                    onFocus={onFocus}
                                    onSearch={onSearch}
                                    focus={focus}
                                    initial={initial}
                                    searchResult={searchResult}
                                    onSelect={onSelect}
                                />
                                <Divider/>            
                                <DateMenu 
                                    onFocus={onFocus}
                                    focus={focus}
                                    onChangeDate={onChangeDate}
                                />                     
                            </SearchMenuBlock>
                            <div className="search-block">
                                <SearchButton>검색</SearchButton>
                            </div>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>            
        </Wrapper>
    );
}

export default Search;

