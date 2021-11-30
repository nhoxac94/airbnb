import { createStore, combineReducers, applyMiddleware} from "redux"
import { composeWithDevTools } from "redux-devtools-extension" 
import datePickerReducer from 'components/DatePicker/reducer'
import guestReducer from "components/Guests/reducer"
import locationReducer from "components/Header/reducer"
import loginReducer from "layout/Login/reducer"
import thunk from "redux-thunk"
import modalReducer from "containers/admin/reducer"
import bgHeaderReducer from "containers/reducer/BgHeaderReducer"
import airbnbUserReducer from "containers/auth/reducer"
import idRoomSelectedReducer from "containers/client/RoomDetails.jsx/ReviewRoom/reducer"




const appReducer = combineReducers({
    datePickerReducer,
    guestReducer,
    locationReducer,
    loginReducer,
    modalReducer,
    bgHeaderReducer,
    airbnbUserReducer,
    idRoomSelectedReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_REDUX') {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))

);

export default store;