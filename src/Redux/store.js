import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { rootReducer } from "./rootReducers";
import { rootEpic } from "./rootReducers";

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware, logger))
);
epicMiddleware.run(rootEpic);

export default store;
