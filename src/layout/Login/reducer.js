const initialState = {
  loginActive: true,
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_ACTIVE":
      return { ...state, loginActive: payload };
    default:
      return state;
  }
};

export default loginReducer;