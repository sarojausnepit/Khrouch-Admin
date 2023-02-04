import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./my-app.css";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Helpers/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Institute from "./Pages/EducationManagement/Institute/Institute";
import ConsultancyCountries from "./Pages/ConsultancyManagement/ConsultancyCountries/ConsultancyCountries";
import ConsultancyCourses from "./Pages/ConsultancyManagement/ConsultancyCourses/ConsultancyCourses";
import ClientManagement from "./Pages/ClientManagement/ClientManagement";
import AppointmentManagement from "./AppointmentManagement/AppointmentManagement";
import Courses from "./Pages/EducationManagement/Courses/Courses";
import Support from "./Pages/Support/Support";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/institute"
          element={
            <PrivateRoute>
              <Institute />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-management"
          element={
            <PrivateRoute>
              <ClientManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="/support-management"
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/consultancy-institute"
          element={
            <PrivateRoute>
              <ConsultancyInstitute />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/consultancy-courses"
          element={
            <PrivateRoute>
              <ConsultancyCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultancy-countries"
          element={
            <PrivateRoute>
              <ConsultancyCountries />
            </PrivateRoute>
          }
        />
        <Route
          path="/support-management"
          element={
            <PrivateRoute>
              <ConsultancyCountries />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/Appointment-management"
          element={
            <PrivateRoute>
              <AppointmentManagement />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
