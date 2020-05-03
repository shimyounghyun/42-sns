import React from 'react';
import styled from 'styled-components';
import DayPickerRangeConrollerWrapper from '../datepicker/DayPickerRangeConrollerWrapper';
import { FocusType, FOCUS, DateType } from '../../modules/search';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';
const MenuWrapper = styled.div`
    display: inline-flex;
    width:100%;
    padding: 16px 22px;
    border-color: rgb(34, 34, 34);
`;

const Menu = styled.div`
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
        cursor: pointer;
    }
`;
const DatePickerWrapper = styled.div`
    display: flex;
    position: absolute;
    height: 300px;
    top: 100px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
`;

interface DateMenuProps {
    onFocus: (el:FocusType)=> void;
    focus:FocusType;
    onChangeDate : ({startDate, endDate}:any) => void;
}

const DateMenu:React.FC<DateMenuProps> = ({
    onFocus,
    focus,
    onChangeDate
}) => {
    const onClick = () => onFocus(FOCUS.DATE);
    const {startDate, endDate} = useSelector((state:RootState) => state.search.date);
    return (
        <MenuWrapper onClick={onClick}>
            <Menu>
                <div className="item-descript">날짜</div>
                <div className="item-input">
                    {startDate ? startDate : ''}
                    {endDate ? ' - '+endDate : ''}
                    {!startDate && !endDate && '기간을 선택해주세요.'}
                </div>
            </Menu>
            {
                focus == FOCUS.DATE 
                ? <DatePickerWrapper>
                    <DayPickerRangeConrollerWrapper
                        numberOfMonths={3}
                        noBorder
                        onChangeDate={onChangeDate}
                    />
                </DatePickerWrapper>
                : null
            }
        </MenuWrapper>
    );
}

export default DateMenu;