import * as React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import DayPickerRangeConrollerWrapper from '../../components/datepicker/DayPickerRangeConrollerWrapper';
import {DateType} from '../../modules/search';
import {AddDatesMutationArgs} from '../../lib/graphql/trip';
import moment from 'moment';

const {useState} = React;
interface RegisterDateProps {
    date : AddDatesMutationArgs | null;
    changeDate : (place: AddDatesMutationArgs | null) => void;
}

const RegisterDate: React.FC<RegisterDateProps> = ({
    date,
    changeDate
}) => {
    console.log(moment(date?.startAt));
    const [inputDate, setInputDate] = useState<string>(
        ( 
        date?.startAt 
            ? moment(date?.startAt).format('M월 D일')
            : ''
        ) + ( 
        date?.endAt 
         ? ' - ' + moment(date?.endAt).format('M월 D일')
         : ''
        )
    );
    const onChangeDate = ({startDate, endDate}:DateType) => {
        const startDateString =  (startDate && startDate.format('M월 D일')) || '';
        const endDateString =  (endDate && ' - ' + endDate.format('M월 D일')) || '';
        setInputDate(startDateString+endDateString);
        changeDate({
            name: '',
            startAt: (startDate && startDate.format('YYYY-MM-DD')) || '',
            endAt: (endDate && endDate.format('YYYY-MM-DD')) || '',
            isFav: false
        });
    }
    return (
        <DatePickerBlock>
            <LabelInput
                name="date"
                label="여행 기간을 선택해주세요."
                placeholder="시작일 - 종료일"
                autoComplete="off"
                readOnly
                value={inputDate}
            />
            <DayPickerRangeConrollerWrapper
                numberOfMonths={3}
                onChangeDate={onChangeDate}
                initialStartDate={moment(date?.startAt)}
                initialEndDate={moment(date?.endAt)}
            />
        </DatePickerBlock>
    );
}

const DatePickerBlock = styled.div`
    
`;
export default RegisterDate;