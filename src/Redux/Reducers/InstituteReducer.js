import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  institutes: {
    data: [],
    totalPage: 0,
    pageNumber: 0,
    totalData: 0,
  },
  activeInstitutes: {
    data: [],
    totalPage: 0,
    pageNumber: 0,
    totalData: 0,
  },
  levelOfCollege: [],
  instituteDocuments: [],
  adminDropdown: {},
};

const InstituteReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_INSTITUTE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Company added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_INSTITUTE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to add company.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_ADMIN_DROPDOWN": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_ADMIN_DROPDOWN_SUCCESS": {
      return {
        ...state,
        adminDropdown: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ADMIN_DROPDOWN_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to .");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_INSTITUTE_IMAGE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPLOAD_INSTITUTE_IMAGE_REQUEST_SUCCESS": {
      action.payload?.response?.data?.message
        ? message.success(action.payload?.response?.data?.message)
        : message.success("Success! Institute image uploaded.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_INSTITUTE_IMAGE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to upload institute image.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_INSTITUTE_DOCUMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPLOAD_INSTITUTE_DOCUMENT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Institute document uploaded.");
      const newInstituteDocuments = [
        ...state.instituteDocuments,
        action.payload,
      ];

      return {
        ...state,
        instituteDocuments: newInstituteDocuments,
        isLoading: false,
      };
    }
    case "UPLOAD_INSTITUTE_DOCUMENT_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to upload institute document.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_INSTITUTE_DOCUMENTS_REQUEST": {
      return {
        ...state,
        instituteDocuments: action.payload,
      };
    }
    case "DELETE_INSTITUTE_DOCUMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_INSTITUTE_DOCUMENT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Institute document deleted.");
      const newInstituteDocuments = state.instituteDocuments.filter(
        (dataObj) => {
          return dataObj.id !== action.payload.id;
        }
      );
      return {
        ...state,
        instituteDocuments: newInstituteDocuments,
        isLoading: false,
      };
    }
    case "DELETE_INSTITUTE_DOCUMENT_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to delete institute document.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_INSTITUTES_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_INSTITUTES_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        institutes: action.payload,
        isLoading: false,
      };
    }

    case "FETCH_INSTITUTES_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_INSTITUTES_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_ACTIVE_INSTITUTES_REQUEST_SUCCESS": {
      console.log("from active reducer", action.payload);
      return {
        ...state,
        activeInstitutes: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_INSTITUTES_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to load active institutes.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_COUNTRY_IMAGE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPLOAD_COUNTRY_IMAGE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Country image uploaded .");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_COUNTRY_IMAGE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to upload country image.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COUNTRY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_COUNTRY_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Country added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COUNTRY_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to add country.");

      return {
        ...state,
        isLoading: false,
      };
    }

    case "ADD_LEVEL_OF_COLLEGE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_LEVEL_OF_COLLEGE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! add cCollege leveed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_LEVEL_OF_COLLEGE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to add college level.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_INSTITUTE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Institute updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_INSTITUTE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to update institute.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_INSTITUTE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_INSTITUTE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Institute deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_INSTITUTE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to delete institute.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_INSTITUTE_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_INSTITUTE_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Institute status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_INSTITUTE_STATUS_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to change institute status.");

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

export default InstituteReducer;
