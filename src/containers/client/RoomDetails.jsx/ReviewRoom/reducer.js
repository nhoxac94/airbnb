const initialState = {
    idRoomSelected : ""
}

const idRoomSelectedReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case "SELECT_ROOM_ID":
        return { ...state, idRoomSelected : payload }

    default:
        return state
    }
}

export default idRoomSelectedReducer;