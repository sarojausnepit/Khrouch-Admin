import { ofType } from "redux-observable";
import { catchError, switchMap, mergeMap, delay } from "rxjs/operators";
import { from, of } from "rxjs";
import { Api } from "../Helpers/BaseUrlProvider";
// import { AllApi, findAsyncToken, ImageApi } from "./AllApi";

// import { navigate "} from "../constants/RootNavigation";
// import { errorConsole } from "../functions/HelperFuntion";
// import { CustomAlert } from "../functions/HelperFunction";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const AllEpic = (action$) =>
  action$.pipe(
    ofType(
      "ADMIN_AUTHENTICATION_REQUEST",
      "FETCH_ACTIVE_INSTITUTES_REQUEST",
      "FETCH_INSTITUTES_REQUEST",
      "TOGGLE_INSTITUTE_STATUS_REQUEST",
      "DELETE_INSTITUTE_REQUEST",
      "FETCH_ALL_CLIENTS_REQUEST",
      "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST",
      "FETCH_ADMIN_DROPDOWN",
      "UPLOAD_INSTITUTE_DOCUMENT_REQUEST",
      "UPLOAD_INSTITUTE_IMAGE_REQUEST",
      "ADD_INSTITUTE_REQUEST",
      "ADD_LEVEL_OF_COLLEGE_REQUEST",
      "ADD_COUNTRY_REQUEST",
      "UPLOAD_COUNTRY_IMAGE_REQUEST",
      "UPDATE_INSTITUTE_REQUEST",
      "FETCH_COURSES_REQUEST",
      "FETCH_ACTIVE_COURSES_REQUEST",
      "FETCH_SUPPORT_REQUEST",
      "ADD_SUPPORT_CATEGORY_REQUEST",
      "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST",
      "UPLOAD_INSTITUTE_DOCUMENT_REQUEST",
      "DELETE_INSTITUTE_DOCUMENT_REQUEST",
      "ADD_COURSE_REQUEST",
      "UPLOAD_COURSE_DOCUMENT_REQUEST",
      "ADD_DEGREE_REQUEST",
      "UPDATE_COURSE_REQUEST"
    ),
    mergeMap((action) =>
      from(Api(action)).pipe(
        mergeMap((response) => {
          console.log(response, "allepicsss");
          //   if (action.type_data.navigateTo != null) {
          //     navigate(action.type_data.navigateTo, action.type_data.params);
          //   }
          if (action.type_data.successInternalState) {
            action.type_data.successInternalState(response.data);
          }
          return of({
            type: action.type_data.success,
            payload: response.data,
          });
        }),
        catchError((err) => {
          console.warn(err);
          if (action.type_data.failureInternalState) {
            action.type_data.failureInternalState(err?.response?.data);
          }
          return of({ type: action.type_data.failure, payload: err.response });
        })
      )
    )
  );

export const historyEpic = (action$) =>
  action$.pipe(
    ofType("HISTORY_FETCHING_DATA_ATTEMPT"),

    switchMap((action) =>
      from(Api(action)).pipe(
        mergeMap((response) => {
          console.log(response, "allepicsss");
          //   if (action.type_data.navigateTo != null) {
          //     navigate(action.type_data.navigateTo, action.type_data.params);
          //   }
          if (action.type_data.successInternalState) {
            action.type_data.successInternalState(response.data);
          }
          return of({
            type: action.type_data.success,
            payload: response.data,
          });
        }),
        catchError((err) => {
          console.warn(err);
          if (action.type_data.failureInternalState) {
            action.type_data.failureInternalState(err?.response?.data);
          }
          return of({ type: action.type_data.failure, payload: err.response });
        })
      )
    )
  );
