import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  courses: {
    data: [],
    totalPage: 0,
    pageNumber: 0,
    totalData: 0,
  },
  activeCourses: {
    data: [],
    totalPage: 0,
    pageNumber: 0,
    totalData: 0,
  },
  documents: {
    data: [],
    pageNumber: "",
    totalData: "",
    totalPage: "",
  },
};

const CoursesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_COURSE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_COURSE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Company added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COURSE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to add course.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_COURSE_DOCUMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPLOAD_COURSE_DOCUMENT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Course document uploaded.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPLOAD_COURSE_DOCUMENT_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to upload course document.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_COURSES_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_COURSES_DOCUMENTS_REQUEST_SUCCESS": {
      return {
        ...state,
        documents: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_COURSES_DOCUMENTS_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to load documents.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success! Course document added.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to add documents.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success! Course document updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to update documents.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_COURSES_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_COURSES_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        courses: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_COURSES_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to load courses.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_COURSES_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_ACTIVE_COURSES_REQUEST_SUCCESS": {
      console.log("from active reducer", action.payload);
      return {
        ...state,
        activeCourses: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_COURSES_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to load active courses.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_COURSE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_COURSE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Company course.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_COURSE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to update course.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_COURSE_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_COURSE_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Company deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_COURSE_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to delete company.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_COURSE_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_COURSE_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Course status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_COURSE_STATUS_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to change course status.");

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

export default CoursesReducer;
