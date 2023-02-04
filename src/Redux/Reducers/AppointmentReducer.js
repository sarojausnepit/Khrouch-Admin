import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
};

const AppointmentReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_APPOINTMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_APPOINTMENT_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        institutes: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_APPOINTMENT_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default AppointmentReducer;
