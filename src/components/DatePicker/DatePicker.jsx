import React, {useState} from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'


const DatePicker = () => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [focusedInput, setFocusedInput] = useState('startDate')
    const handleOnDatesChange = (startDate, endDate) => {
        setStartDate(startDate)
        setEndDate(endDate)
        dispatch({type: "DATE_PICKER", payload : {startDate,endDate}})

    }
    const handleFocusChange = focusedInput => {
        setFocusedInput(focusedInput || 'endDate')
    }

    const datePicker = useSelector(state => state.datePickerReducer)
    

    const isBeforeDay = (a, b) => {
        if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
        const aYear = a.year();
        const aMonth = a.month();
        const bYear = b.year();
        const bMonth = b.month();
        const isSameYear = aYear === bYear;
        const isSameMonth = aMonth === bMonth;
        if (isSameYear && isSameMonth) return a.date() < b.date();
        if (isSameYear) return aMonth < bMonth;
        return aYear < bYear;
    }
    const isInclusivelyAfterDay = (a, b) => {
        if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
        return !isBeforeDay(a, b);
    }
    return (
        <div>
            <DayPickerRangeController
                startDate={datePicker.startDate} // momentPropTypes.momentObj or null,
                endDate={datePicker.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) => handleOnDatesChange(startDate, endDate)} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => handleFocusChange(focusedInput)} // PropTypes.func.isRequired,
                initialVisibleMonth={() => moment().add(0, "M")} // PropTypes.func or null,
                numberOfMonths={2}
                isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
                hideKeyboardShortcutsPanel={true}
            />
        </div>
    );
}

export default DatePicker;
