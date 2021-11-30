const initialState = {
  modalName: "",
  status: false,
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHANGE_STATUS_MODAL":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default modalReducer
