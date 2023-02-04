import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { AllEpic } from "./myEpics";
import LoginReducer from "./Reducers/Login";
import InstituteReducer from "./Reducers/InstituteReducer";
import ClientReducer from "./Reducers/ClientReducer";
import CoursesReducer from "./Reducers/CoursesReducer";
import SupportReducer from "./Reducers/SupportReducer";

export const rootReducer = combineReducers({
  LoginReducer,
  InstituteReducer,
  ClientReducer,
  CoursesReducer,
  SupportReducer,
});

export const rootEpic = combineEpics(AllEpic);
