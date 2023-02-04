import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  isAuthenticated: false,
};

const LoginReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADMIN_AUTHENTICATION_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADMIN_AUTHENTICATION_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    }
    case "ADMIN_AUTHENTICATION_REQUEST_FAILURE": {
      if (action.payload.response?.data?.message) {
        message.error(action.payload.response?.data?.message);
      } else if ((action.payload.message = "Network Error!")) {
        message.error("Network Error");
      } else {
        message.error("Error! Unable to login.");
      }
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default LoginReducer;
