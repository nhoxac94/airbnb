
const initialState = {
    startDate: null,
    endDate: null,
}

const datePickerReducer = (state = initialState, {type, payload}) => {
    switch ( type) {
        case "DATE_PICKER": 
        return {...state, startDate : payload.startDate, endDate : payload.endDate };
        default :
        return state
    }
}

export default datePickerReducer;