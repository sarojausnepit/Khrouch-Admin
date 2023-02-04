import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
};

const ConsultancyReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_CONSUTANCY_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_CONSUTANCY_INSTITUTE_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        consultancyInstitutes: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_CONSUTANCY_INSTITUTE_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_CONSUTANCY_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_CONSUTANCY_INSTITUTE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Consultancy added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_CONSUTANCY_INSTITUTE_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to add Consultancy.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_CONSUTANCY_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_CONSUTANCY_INSTITUTE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Consultancy updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_CONSUTANCY_INSTITUTE_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to update Consultancy.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_CONSUTANCY_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_CONSUTANCY_INSTITUTE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Consultancy deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_CONSUTANCY_INSTITUTE_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to delete Consultancy.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_CONSUTANCY_INSTITUTE_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_CONSUTANCY_INSTITUTE_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Consultancy status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_CONSUTANCY_INSTITUTE_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to change Consultancy status.");

      message.error("error");
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default ConsultancyReducer;
