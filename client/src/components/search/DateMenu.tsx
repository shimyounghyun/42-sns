import React from 'react';
import styled from 'styled-components';

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

interface DateMenuProps {}

const DateMenu:React.FC<DateMenuProps> = () => {
    return (
        <MenuWrapper>
            <div className="content">
                <div className="item-descript">날짜</div>
                <div className="item-input">7월 30일 - 8월 9일</div>
            </div>
        </MenuWrapper>
    );
}

export default DateMenu;