import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  clients: {},
  clientInstitute: {},
};

const ClientReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_ALL_CLIENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_ALL_CLIENTS_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        clients: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ALL_CLIENTS_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        clientInstitute: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default ClientReducer;
