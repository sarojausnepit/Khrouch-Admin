import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  supports: {},
  individualTicket: {
    addedTime: "",
    createdBy: {},
    id: null,
    replies: [],
    status: "",
    ticketDescription: "",
    ticketTitle: "",
  },
  activeSupportCategory: {},
};

const SupportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_SUPPORT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_SUPPORT_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        supports: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_SUPPORT_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST_SUCCESS": {
      return {
        ...state,
        activeSupportCategory: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to load support category.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_SUPPORT_CATEGORY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_SUPPORT_CATEGORY_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Support category added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_SUPPORT_CATEGORY_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to add support category.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_TICKET_BY_ID_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_TICKET_BY_ID_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        individualTicket: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_TICKET_BY_ID_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_SUPPORT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_SUPPORT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Support added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_SUPPORT_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to add Support.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "REPLY_TO_TICKET_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "REPLY_TO_TICKET_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Support updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "REPLY_TO_TICKET_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to update Support.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_SUPPORT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_SUPPORT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Support deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_SUPPORT_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to delete Support.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_SUPPORT_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_SUPPORT_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Support status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_SUPPORT_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to change Support status.");

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

export default SupportReducer;
