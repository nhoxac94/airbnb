const initialState = {
  page: "",
};

const userManagement = (state = initialState, { type, payload }) => {
  switch (type) {
    case "a":
      return { ...state };
    default:
      return state;
  }
};

export default userManagement