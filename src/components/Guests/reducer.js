const initialState = {
  adults: 0,
  children: 0,
  infants: 0,
};

const guestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_NUMBER_GUESTS":
      return { ...state, ...payload};
    default:
      return state;
  }
};

export default guestReducer;
