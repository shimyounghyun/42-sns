import * as React from 'react';
import styled from 'styled-components';
import RoundButton from '../common/RoundButton';
import palette from '../../lib/styles/palette';
import { RouteComponentProps } from 'react-router';
import RegisterDate from './RegisterDate';
import RegisterPlace from './RegisterPlace';
import RegisterExtra from './RegisterExtra';
import {
    AddPlaceMutationArgs,
    AddDatesMutationArgs
} from '../../lib/graphql/trip';
import Skeleton from '../common/Skeleton';

const {useState,useCallback} = React;

const RegisterFormBlock = styled.div`
    width:100%;
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
    margin-top:5rem;
    .form-bottom {
        margin-top: 6rem;
        display:flex;
    }
    .error {
        margin-bottom: 1rem;
        font-size: 1.125rem;
        line-height: 1.5;
        color: ${palette.red5};
        font-weight: bold;
    }
`;
// export type RegisterStep = "PLACE" | "DATE" | "EXTRA";
// export enum STEP {
//     PLACE = "PLACE",
//     DATE = "DATE",
//     EXTRA = "EXTRA"
// }
export enum STEP {
    PLACE,
    DATE,
    EXTRA
}

export interface RegisterTrip extends RouteComponentProps {}

const RegisterTrip: React.FC<RegisterTrip> = ({
    history,
    location,
}) => {
    const [step, setStep] = useState<number>(STEP.PLACE);
    const [place, setPlace] = useState<AddPlaceMutationArgs | null>(null);
    const [date, setDate] = useState<AddDatesMutationArgs | null>(null);

    const changePlace = useCallback((place : AddPlaceMutationArgs | null)=>{
        setPlace(place);
    },[]);

    const changeDate = useCallback((date : AddDatesMutationArgs | null)=>{
        setDate(date);
        console.log("날짜 state :",date);
    },[]);

    const nextStep = () => {
        if (step == STEP.EXTRA){
            window.location.href="/";
        } else {
            setStep(step+1);
        }
    }

    const prevStep = () => {
        if (step == STEP.PLACE){
            window.location.href="/";
        } else {
            setStep(step-1);
        }
    }
    return (
        <RegisterFormBlock>            
            {step == STEP.PLACE
            ? <RegisterPlace
                changePlace={changePlace}
                place={place}
                />
            : null}
            {step == STEP.DATE
            ? <RegisterDate
                date={date}
                changeDate={changeDate}
                />
            : null}
            {step == STEP.EXTRA
            ? <RegisterExtra/>
            : null}
            <div className="form-bottom">
                <RoundButton 
                    inline 
                    color="lightGray"
                    size="DEFAULT"
                    onClick={prevStep}>
                    이전
                </RoundButton>
                <RoundButton
                    inline
                    size="DEFAULT"
                    onClick={nextStep}
                    >
                    다음
                </RoundButton>
            </div>
        </RegisterFormBlock>
    );
}

export default RegisterTrip;