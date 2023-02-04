import React, { useEffect } from "react";
import SiderDemo from "../../components/Siderdemo";
import { getCookie } from "../../Helpers/FrontendHelper";

const Dashboard = () => {
  useEffect(() => {
    const token = getCookie("accessToken");
    console.log(token, "token");
  }, []);
  return <SiderDemo>Dashboard</SiderDemo>;
};

export default Dashboard;
