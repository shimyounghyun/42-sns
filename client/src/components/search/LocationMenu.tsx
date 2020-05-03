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

interface LocationMenuProps {}

const LocationMenu:React.FC<LocationMenuProps> = () => {
    return (
        <MenuWrapper>
            <div className="content">
                <div className="item-descript">위치</div>
                <input className="item-input" type="text" placeholder="장소를 입력해주세요."/>
            </div>
        </MenuWrapper>
    );
}

export default LocationMenu;