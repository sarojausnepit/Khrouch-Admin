import { Button, Checkbox, Form, Input } from "antd";
import React, { Fragment } from "react";
import { VscLock } from "react-icons/vsc";
import classes from "./Login.module.css";
import logoImage from "./../../Assets/khrouch3.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { allActions } from "../../Redux/myActions";

const Login = () => {
  const loginState = useSelector((state) => state.LoginReducer);
  const actions = useDispatch();
  const loginSubmitHandler = (values) => {
    actions(
      allActions(values, {
        method: "post",
        endPoint: `/authenticate`,
        attempt: "ADMIN_AUTHENTICATION_REQUEST",
        success: "ADMIN_AUTHENTICATION_REQUEST_SUCCESS",
        failure: "ADMIN_AUTHENTICATION_REQUEST_FAILURE",
        //   navigateTo: null,
        //   successInternalState: (data) => {
        //     navigation.navigate("LeadDetails", { item });
        //   },
        saveBearerToken: true,
      })
    );
    // dispatch({ type: "ADMIN_AUTHENTICATION_REQUEST", payload: values });
  };
  console.log("Is authenticated", loginState.isAuthenticated);
  return (
    <Fragment>
      {loginState.isAuthenticated ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
        <div className={classes.loginContainer}>
          <div className={classes.formContainer}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={logoImage} style={{ width: "30%" }} />
            </div>
            <p style={{ textAlign: "center", color: "black" }}>Admin Login</p>
            <Form
              layout="vertical"
              className={classes.loginForm}
              onFinish={loginSubmitHandler}
            >
              <div className={classes.emailAndPassword}>
                <Form.Item
                  name={"userName"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Username"
                    size="large"
                    prefix={<UserOutlined />}
                    style={{ borderRadius: "25px" }}
                  />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    size="large"
                    prefix={<VscLock />}
                    style={{ borderRadius: "25px" }}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="flexColumnwithoutStyle">
                    <Button type="primary" htmlType="submit">
                      LOG IN
                    </Button>
                    {/* <Link
                      to={"/password_reset"}
                      style={{ textAlign: "center", marginTop: "6px" }}
                    >
                      Forgot Password?
                    </Link> */}
                  </div>
                </Form.Item>
              </div>
            </Form>
            {/* <div style={{ textAlign: "center" }}>
              Don't have an account? <Link to={"/register"}>Register here</Link>
            </div> */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
