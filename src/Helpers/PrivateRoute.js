import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuth } from "./FrontendHelper";

const PrivateRoute = ({ children }) => {
  const authed = isAuth(); // isauth() returns true or false based on localStorage
  console.log(isAuth());
  return authed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
