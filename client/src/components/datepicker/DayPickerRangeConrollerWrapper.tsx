import React,{useState} from 'react';
import {Omit} from 'react-redux';
import 'react-dates/initialize';
import './datepicker.css';
import moment from 'moment';

import {
    DayPickerRangeController,
    DayPickerRangeControllerShape,
    FocusedInputShape
} from 'react-dates';

export enum TYPE {
    START_DATE = "startDate",
    END_DATE = "endDate",
    HORIZONTAL_ORIENTATION = "horizontal",
    VERTICAL_ORIENTATION = "vertical",
    VERTICAL_SCROLLABLE = "verticalScrollable"
}
interface onDatesChangeArgs {
  startDate : moment.Moment | null;
  endDate : moment.Moment | null;
}

interface DatePickerRangeWrapperProps 
    extends Omit<DayPickerRangeControllerShape,
        'startDate' | 'endDate' | 'focusedInput' | 
        'onFocusChange' | 'onDatesChange' | 'hideKeyboardShortcutsPanel'>{
            autoFocus?: boolean;
            autoFocusEndDate?: boolean;
            stateDateWrapper?: Function;
            initialStartDate?: moment.Moment;
            initialEndDate?: moment.Moment;
            daysViolatingMinNightsCanBeClicked?: boolean;
            hideKeyboardShortcutsPanel?: boolean;
            onChangeDate:({startDate, endDate}:any) => void;
}

interface DatePickerRangeWrapperState {
    focusedInput: FocusedInputShape;
    startDate:moment.Moment | null;
    endDate:moment.Moment | null;
}

class DayPickerRangeControllerWrapper extends React.Component<DatePickerRangeWrapperProps, DatePickerRangeWrapperState>{

    constructor(props:DatePickerRangeWrapperProps) {
      super(props);
  
      this.state = {
        focusedInput : TYPE.START_DATE,
        startDate: props.initialStartDate || null,
        endDate: props.initialEndDate || null
      };
  
      this.onDatesChange = this.onDatesChange.bind(this);
      this.onFocusChange = this.onFocusChange.bind(this);
    }
  
    onDatesChange({ startDate, endDate } : onDatesChangeArgs) {
    //   const { stateDateWrapper } = this.props;
      const { daysViolatingMinNightsCanBeClicked=false,minimumNights=1 } = this.props;
      let doesNotMeetMinNights = false;
      if (daysViolatingMinNightsCanBeClicked && startDate && endDate) {
        const dayDiff = endDate.diff(startDate.clone().startOf('day').hour(12), 'days');
        doesNotMeetMinNights = dayDiff < minimumNights && dayDiff >= 0;
      }
      this.setState({
        startDate,
        endDate: doesNotMeetMinNights ? null : endDate
      });
      if(this.props.onChangeDate)
        this.props.onChangeDate({
          startDate : startDate && startDate.format('M월 D일'),
          endDate : endDate && endDate.format('M월 D일'),
        });
    }
  
    onFocusChange(focusedInput : FocusedInputShape | null) {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? TYPE.START_DATE : focusedInput,
          });
    }
  
    render() {
        const { 
            renderCalendarInfo: renderCalendarInfoProp,
            hideKeyboardShortcutsPanel=true
        } = this.props;
        const {
            focusedInput,
            startDate,
            endDate,
          } = this.state;
        const startDateString = startDate && startDate.format('M월 D일');
        const endDateString = endDate && endDate.format('M월 D일');
        const renderCalendarInfo = renderCalendarInfoProp;
        
        const propsObj = {...this.props};
        delete propsObj['onChangeDate'];
      return (
          <DayPickerRangeController
            {...propsObj}
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            renderCalendarInfo={renderCalendarInfo}
            hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          />
      );
    }
  }


export default DayPickerRangeControllerWrapper;