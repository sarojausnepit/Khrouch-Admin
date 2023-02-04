import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import khrouchLogo from "./../Assets/khrouch.png";
import khrouchLogo2 from "./../Assets/khrouch3.png";
import profile from "./../Assets/profile.png";
import { Divider, Dropdown, Layout, Menu, Tooltip } from "antd";
import { IoIosArrowDown, IoIosNotificationsOutline } from "react-icons/io";
import { GoDashboard } from "react-icons/go";
import {
  AiOutlineClockCircle,
  AiOutlineContacts,
  AiOutlineDatabase,
  AiOutlineKey,
} from "react-icons/ai";
import { TiFlowChildren } from "react-icons/ti";
import { BsBell, BsFlag, BsPlayCircle } from "react-icons/bs";
import { FaRegBuilding, FaSearchLocation } from "react-icons/fa";
import { RiTodoLine, RiVisaLine } from "react-icons/ri";
import { SlGraduation } from "react-icons/sl";
import { TbCertificate } from "react-icons/tb";
import { TfiBookmarkAlt } from "react-icons/tfi";
import { BsBuilding } from "react-icons/bs";
import {
  HiOutlineBookOpen,
  HiOutlinePaperAirplane,
  HiOutlineUsers,
} from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import classes from "./SiderDemo.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiBuildingHouse, BiLayer, BiSupport, BiUser } from "react-icons/bi";
import { GrNotification, GrResources, GrUserAdmin } from "react-icons/gr";
import { VscDebugStart, VscTypeHierarchySuper } from "react-icons/vsc";
const { Header, Sider, Content } = Layout;
const SiderDemo = ({ children, organizationalSettings }) => {
  const loginState = useSelector((state) => state.ProfileReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );
  const [stateChange, setStateChange] = useState({
    hell: "vutvut",
  });
  console.table(stateChange, "changing the state");
  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE_REQUEST" });
  }, []);
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);
  const [collapsed, setCollapsed] = useState(false);
  const handleClick = (e) => {
    console.log(current);
    setCurrent(e.key);
  };
  const logoutHandler = () => {
    dispatch({
      type: "LOGOUT_CONSULTANCY_REQUEST",
    });
  };
  const menu = (
    <div
      style={{
        background: "white",
        padding: "5px 15px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",

        color: "black",
      }}
    >
      <Link to={"/my-profile"}>
        <p style={{ cursor: "pointer" }}>
          <UserOutlined /> Profile
        </p>
      </Link>
      {/* <Link to={"/change-password"}>
          {" "}
          <p style={{ cursor: "pointer" }}>
            <RiLockPasswordFill /> Change Password
          </p>
        </Link>
        <Link to={"/register-admin"}>
          {" "}
          <p style={{ cursor: "pointer" }}>
            <UserAddOutlined /> Register Admin
          </p>
        </Link>
        <Link to={"/admin-list"}>
          {" "}
          <p style={{ cursor: "pointer" }}>
            <RiAdminFill /> Admin List
          </p>
        </Link> */}
      <Link to={"/roles-and-permission"}>
        <p style={{ cursor: "pointer" }}>
          <AiOutlineKey /> Roles & Permissions
        </p>
      </Link>
      {/* <Link to={"/settings"}>
          <p style={{ cursor: "pointer" }}>
            <FiSettings /> Settings
          </p>
        </Link> */}
      <a>
        <p onClick={logoutHandler} style={{ cursor: "pointer" }}>
          <LogoutOutlined /> Log out
        </p>
      </a>
    </div>
  );
  console.log("organizationalSettings from siderdemo", organizationalSettings);
  return (
    <Layout hasSider={true}>
      <Sider
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "white",
          height: "100vh",

          position: "sticky",
          overflow: "scroll",
          backgroundColor: "#1D1C40",
          overflow: "hidden",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="logo"
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            fontSize: "1.2rem",
            height: "64px",
          }}
        >
          {collapsed ? (
            <img src={khrouchLogo2} style={{ width: "100%" }} />
          ) : (
            <img src={khrouchLogo} style={{ width: "100%" }} />
          )}
        </div>
        <Divider
          style={{
            margin: "0",
            height: "15px",
            borderTop: "1.5px solid rgb(221, 218, 218)",
          }}
        />
        <Menu
          theme="light"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
          items={[
            {
              key: "1",
              icon: <GoDashboard />,
              label: <Link to={"/dashboard"}>Dashboard</Link>,
            },
            {
              key: "2",
              icon: <SlGraduation />,
              label: "Education",
              children: [
                {
                  key: "3",
                  icon: <BsBuilding />,
                  label: <Link to={"/institute"}>Institute/College</Link>,
                },
                {
                  key: "4",
                  icon: <TfiBookmarkAlt />,
                  label: <Link to={"/courses"}>Courses</Link>,
                },
              ],
            },

            // {
            //   key: "5",
            //   icon: <SlGraduation />,
            //   label: "Consultancy Management",
            //   children: [
            //     {
            //       key: "6",
            //       icon: <BsBuilding />,
            //       label: <Link to={"/consultancy-institute"}>Institute</Link>,
            //     },
            //     {
            //       key: "7",
            //       icon: <TfiBookmarkAlt />,
            //       label: <Link to={"/consultancy-courses"}>Courses</Link>,
            //     },
            //     {
            //       key: "8",
            //       icon: <TfiBookmarkAlt />,
            //       label: <Link to={"/consultancy-countries"}>Country</Link>,
            //     },
            //   ],
            // },
            {
              key: "9",
              icon: <HiOutlineUsers />,
              label: <Link to={"/client-management"}>Client Management</Link>,
            },
            {
              key: "10",
              icon: <BiSupport />,
              label: <Link to={"/support-management"}>Support Management</Link>,
            },
            // {
            //   key: "10",
            //   icon: <AiOutlineClockCircle />,
            //   label: (
            //     <Link to={"/Appointment-management"}>
            //       Appointment Management
            //     </Link>
            //   ),
            // },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              style: {
                fontSize: "20px",
              },
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          {/* <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Tooltip title="Notification">
                <Link to={"/organizationalSettings"}>
                  <BsBell className="headerIcons" />
                </Link>
              </Tooltip>
              <Tooltip title="Organization Settings">
                <Link to={"/organizationalSettings"}>
                  <FiSettings className="headerIcons" />
                </Link>
              </Tooltip>
            </div> */}

          <Dropdown overlay={menu}>
            <div
              className=""
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={profile}
                alt=""
                style={{
                  width: "50px",
                  borderRadius: "50%",
                  border: "2px solid #999",
                }}
              />
              <div style={{ color: "black" }}>
                <span>Super Admin</span>
              </div>
              <IoIosArrowDown style={{ color: "black" }} />
            </div>
          </Dropdown>
          {/* </div> */}
        </Header>
        {organizationalSettings === true ? (
          <Content
            className="site-layout-background"
            style={{
              // margin: "24px 16px",
              // padding: 24,
              // minHeight: 280,
              backgroundColor: "#f0f2f5",
              // width: "100%",
            }}
          >
            {children}
          </Content>
        ) : (
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 0px 24px 16px",
              padding: 24,
              minHeight: 280,
              // backgroundColor: "#f0f2f5",
              // width: "100%",
            }}
          >
            {children}
          </Content>
        )}
      </Layout>
    </Layout>
  );
};
export default SiderDemo;
