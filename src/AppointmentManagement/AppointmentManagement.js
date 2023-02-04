import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Form,
  Input,
  Popconfirm,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineHistory } from "react-icons/ai";
import { GrHistory } from "react-icons/gr";
import { MdOutlineDisabledVisible, MdPreview } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import SiderDemo from "../components/Siderdemo";
import {
  dateAndTime,
  formattedDate,
  formattedDateTime,
  threeTagResponses,
} from "../Helpers/HelperFunction";
import TableSkeleton from "../Helpers/TableSkeleton/tableSkelaton";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "Full Name",
    dataIndex: "firstName",
    align: "center",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    align: "center",
  },
  {
    title: "Appointment Date",
    dataIndex: "bookingDate",
    align: "center",
  },
  // {
  //   title: "Booking Day",
  //   dataIndex: "bookingDay",
  //   align: "center",
  // },
  // {
  //   title: "Session Time",
  //   dataIndex: "sessionTime",
  //   align: "center",
  // },
  // {
  //   title: "Session Duration",
  //   dataIndex: "sessionDuration",
  //   align: "center",
  // },

  // {
  //   title: "Consultant",
  //   dataIndex: "consultant",
  //   align: "center",
  // },

  {
    title: "Appointment Status",
    dataIndex: "appointmentStatus",
    align: "center",
  },
  {
    title: "Lead Status",
    dataIndex: "leadStatus",
    align: "center",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const AppointmentManagement = () => {
  const AppointmentState = useSelector((state) => state.AppointmentsReducer);
  const [isAddAppointmentModelVisible, setIsAddAppointmentModelVisible] =
    useState(false);
  const [isUpdateAppointmentModelVisible, setIsUpdateAppointmentModelVisible] =
    useState(false);
  const [
    isAppointmentDetailsModalVisible,
    setIsAppointmentDetailsModalVisible,
  ] = useState();
  const [appointmentType, setAppointmentType] = useState("allAppointments");
  const [record, setRecord] = useState({});
  const dispatch = useDispatch();
  const [isStatusHistoryModelVisible, setIsStatusHistoryModelVisible] =
    useState(false);
  const [isStartCounsellingModelVisible, setIsStartCounsellingModelVisible] =
    useState(false);
  useEffect(() => {
    dispatch({ type: "FETCH_APPOINTMENTS_REQUEST" });
  }, []);

  let data = [];
  //   if (appointmentType === "allAppointments") {
  //     data = AppointmentState.appointments?.data?.map((dataObj) => {
  //       let appointmentStatus;
  //       if (dataObj.appointmentStatus === "PENDING") {
  //         appointmentStatus = <p className="orangeTag">PENDING</p>;
  //       } else if (dataObj.appointmentStatus === "COMPLETED") {
  //         appointmentStatus = <p className="blueTag">COMPLETED</p>;
  //       } else {
  //         appointmentStatus = <p className="greenTag">CONFIRMED</p>;
  //       }

  //       return {
  //         key: dataObj.id,
  //         id: dataObj.id,
  //         firstName: dataObj.firstName + " " + dataObj.lastName,
  //         appointmentStatus: appointmentStatus,
  //         mobileNumber: dataObj.mobileNumber,
  //         bookingDate: dataObj.appointmentDate
  //           ? formattedDate(dataObj.appointmentDate)
  //           : dataObj.counsellingBooking !== null &&
  //             dataObj.counsellingBooking?.bookingDate !== null
  //           ? `${dataObj.counsellingBooking?.bookingDate} ${dataObj.counsellingBooking?.startTime}`
  //           : "N/A",
  //         bookingDay: dataObj.counsellingBooking?.bookingDay,
  //         sessionDuration: dataObj.counsellingBooking?.sessionTime,
  //         sessionTime:
  //           dataObj.counsellingBooking?.startTime +
  //           "-" +
  //           dataObj.counsellingBooking?.endTime,
  //         email: dataObj.email,
  //         consultant: dataObj.counsellingBooking?.consultant?.emailId,
  //         leadStatus: dataObj.leadStatus ? (
  //           <Tag color={dataObj.leadStatusColorCode}>{dataObj.leadStatus}</Tag>
  //         ) : (
  //           ""
  //         ),

  //         actions: (
  //           <Space size="middle">
  //             {dataObj.appointmentStatus === "COMPLETED" ||
  //             dataObj.appointmentStatus === "CONFIRMED" ? (
  //               <Tooltip
  //                 title={`${
  //                   dataObj.isSessionStarted
  //                     ? "View Counselling"
  //                     : "Start Counselling"
  //                 }`}
  //               >
  //                 <a>
  //                   <div
  //                     className="bordered"
  //                     onClick={() => {
  //                       setIsStartCounsellingModelVisible(true);
  //                       setRecord(dataObj);
  //                       dispatch({
  //                         type: "START_COUNSELLING_REQUEST",
  //                         payload: {
  //                           id: dataObj.id,
  //                           formData: {
  //                             confirmationText: "",
  //                           },
  //                         },
  //                       });
  //                     }}
  //                   >
  //                     {dataObj.isSessionStarted ? (
  //                       <MdPreview />
  //                     ) : (
  //                       <VscDebugStart />
  //                     )}
  //                   </div>
  //                 </a>
  //               </Tooltip>
  //             ) : null}

  //             <Tooltip title="Update Appointment">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateAppointmentModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Appointment Details">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsAppointmentDetailsModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EyeOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete Appointment">
  //               <Popconfirm
  //                 title="Are you sure to delete this appointment?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_APPOINTMENT_REQUEST",
  //                     payload: { id: dataObj.id },
  //                   });
  //                 }}
  //                 onCancel={() => {}}
  //                 okText="Yes"
  //                 cancelText="No"
  //               >
  //                 <a>
  //                   <div className="bordered">
  //                     <DeleteOutlined />
  //                   </div>
  //                 </a>{" "}
  //               </Popconfirm>
  //             </Tooltip>
  //             <Tooltip title="View status History">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsStatusHistoryModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <AiOutlineHistory />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             {/* <Tooltip title="Change appointment status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus = dataObj.isActive ? "inactive" : "active";
  //                     dispatch({
  //                       type: "CHANGE_APPOINTMENT_STATUS_REQUEST",
  //                       payload: { id: dataObj.id, actionStatus },
  //                     });
  //                   }}
  //                 >
  //                   <MdOutlineDisabledVisible />
  //                 </div>
  //               </a>
  //             </Tooltip> */}
  //           </Space>
  //         ),
  //       };
  //     });
  //   } else if (appointmentType === "pendingAppointments") {
  //     data = AppointmentState.pendingAppointments?.data?.map((dataObj) => {
  //       return {
  //         key: dataObj.id,
  //         id: dataObj.id,
  //         firstName: dataObj.firstName + " " + dataObj.lastName,
  //         appointmentStatus: threeTagResponses(
  //           dataObj.appointmentStatus,
  //           "PENDING",
  //           "COMPLETED",
  //           "CONFIRMED"
  //         ),
  //         // dataObj.appointmentStatus

  //         mobileNumber: dataObj.mobileNumber,
  //         bookingDate: dataObj.appointmentDate
  //           ? formattedDate(dataObj.appointmentDate)
  //           : dataObj.counsellingBooking?.bookingDate !== null
  //           ? `${dataObj.counsellingBooking?.bookingDate} ${dataObj.counsellingBooking?.startTime}`
  //           : "N/A",
  //         bookingDay: dataObj.counsellingBooking?.bookingDay,
  //         sessionDuration: dataObj.counsellingBooking?.sessionTime,
  //         sessionTime:
  //           dataObj.counsellingBooking?.startTime +
  //           "-" +
  //           dataObj.counsellingBooking?.endTime,
  //         email: dataObj.email,
  //         consultant: dataObj.counsellingBooking?.consultant?.emailId,
  //         leadStatus: dataObj.leadStatus ? (
  //           <Tag color={dataObj.leadStatusColorCode}>{dataObj.leadStatus}</Tag>
  //         ) : (
  //           ""
  //         ),

  //         actions: (
  //           <Space size="middle">
  //             <Tooltip title="Update Appointment">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateAppointmentModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Appointment Details">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsAppointmentDetailsModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EyeOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete Appointment">
  //               <Popconfirm
  //                 title="Are you sure to delete this appointment?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_APPOINTMENT_REQUEST",
  //                     payload: { id: dataObj.id },
  //                   });
  //                 }}
  //                 onCancel={() => {}}
  //                 okText="Yes"
  //                 cancelText="No"
  //               >
  //                 <a>
  //                   <div className="bordered">
  //                     <DeleteOutlined />
  //                   </div>
  //                 </a>{" "}
  //               </Popconfirm>
  //             </Tooltip>
  //             <Tooltip title="View status History">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsStatusHistoryModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <AiOutlineHistory />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             {/* <Tooltip title="Change appointment status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus = dataObj.isActive ? "inactive" : "active";
  //                     dispatch({
  //                       type: "CHANGE_APPOINTMENT_STATUS_REQUEST",
  //                       payload: { id: dataObj.id, actionStatus },
  //                     });
  //                   }}
  //                 >
  //                   <MdOutlineDisabledVisible />
  //                 </div>
  //               </a>
  //             </Tooltip> */}
  //           </Space>
  //         ),
  //       };
  //     });
  //   } else if (appointmentType === "confirmedAppointments") {
  //     data = AppointmentState.confirmedAppointments?.data?.map((dataObj) => {
  //       return {
  //         key: dataObj.id,
  //         id: dataObj.id,
  //         firstName: dataObj.firstName + " " + dataObj.lastName,
  //         appointmentStatus: threeTagResponses(
  //           dataObj.appointmentStatus,
  //           "PENDING",
  //           "COMPLETED",
  //           "CONFIRMED"
  //         ),

  //         mobileNumber: dataObj.mobileNumber,
  //         bookingDate: dataObj.appointmentDate
  //           ? formattedDate(dataObj.appointmentDate)
  //           : dataObj.counsellingBooking?.bookingDate !== null
  //           ? `${dataObj.counsellingBooking?.bookingDate} ${dataObj.counsellingBooking?.startTime}`
  //           : "N/A",
  //         bookingDay: dataObj.counsellingBooking?.bookingDay,
  //         sessionDuration: dataObj.counsellingBooking?.sessionTime,
  //         sessionTime:
  //           dataObj.counsellingBooking?.startTime +
  //           "-" +
  //           dataObj.counsellingBooking?.endTime,
  //         email: dataObj.email,
  //         consultant: dataObj.counsellingBooking?.consultant?.emailId,
  //         leadStatus: dataObj.leadStatus ? (
  //           <Tag color={dataObj.leadStatusColorCode}>{dataObj.leadStatus}</Tag>
  //         ) : (
  //           ""
  //         ),

  //         actions: (
  //           <Space size="middle">
  //             <Tooltip
  //               title={`${
  //                 dataObj.isSessionStarted
  //                   ? "View Counselling"
  //                   : "Start Counselling"
  //               }`}
  //             >
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsStartCounsellingModelVisible(true);
  //                     setRecord(dataObj);
  //                     dispatch({
  //                       type: "START_COUNSELLING_REQUEST",
  //                       payload: {
  //                         id: dataObj.id,
  //                         formData: {
  //                           confirmationText: "",
  //                         },
  //                       },
  //                     });
  //                   }}
  //                 >
  //                   {dataObj.isSessionStarted ? <MdPreview /> : <VscDebugStart />}
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Update Appointment">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateAppointmentModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Appointment Details">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsAppointmentDetailsModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EyeOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete Appointment">
  //               <Popconfirm
  //                 title="Are you sure to delete this appointment?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_APPOINTMENT_REQUEST",
  //                     payload: { id: dataObj.id },
  //                   });
  //                 }}
  //                 onCancel={() => {}}
  //                 okText="Yes"
  //                 cancelText="No"
  //               >
  //                 <a>
  //                   <div className="bordered">
  //                     <DeleteOutlined />
  //                   </div>
  //                 </a>{" "}
  //               </Popconfirm>
  //             </Tooltip>
  //             <Tooltip title="View status History">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsStatusHistoryModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <AiOutlineHistory />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             {/* <Tooltip title="Change appointment status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus = dataObj.isActive ? "inactive" : "active";
  //                     dispatch({
  //                       type: "CHANGE_APPOINTMENT_STATUS_REQUEST",
  //                       payload: { id: dataObj.id, actionStatus },
  //                     });
  //                   }}
  //                 >
  //                   <MdOutlineDisabledVisible />
  //                 </div>
  //               </a>
  //             </Tooltip> */}
  //           </Space>
  //         ),
  //       };
  //     });
  //   } else if (appointmentType === "completedAppointments") {
  //     data = AppointmentState.completedAppointments?.data?.map((dataObj) => {
  //       return {
  //         key: dataObj.id,
  //         id: dataObj.id,
  //         firstName: dataObj.firstName + " " + dataObj.lastName,
  //         appointmentStatus: threeTagResponses(
  //           dataObj.appointmentStatus,
  //           "PENDING",
  //           "COMPLETED",
  //           "CONFIRMED"
  //         ),

  //         mobileNumber: dataObj.mobileNumber,
  //         bookingDate: dataObj.appointmentDate
  //           ? formattedDate(dataObj.appointmentDate)
  //           : dataObj.counsellingBooking?.bookingDate
  //           ? `${dataObj.counsellingBooking?.bookingDate} ${dataObj.counsellingBooking?.startTime}`
  //           : "N/A",
  //         bookingDay: dataObj.counsellingBooking?.bookingDay,
  //         sessionDuration: dataObj.counsellingBooking?.sessionTime,
  //         sessionTime:
  //           dataObj.counsellingBooking?.startTime +
  //           "-" +
  //           dataObj.counsellingBooking?.endTime,
  //         email: dataObj.email,
  //         consultant: dataObj.counsellingBooking?.consultant?.emailId,
  //         leadStatus: dataObj.leadStatus ? (
  //           <Tag color={dataObj.leadStatusColorCode}>{dataObj.leadStatus}</Tag>
  //         ) : (
  //           ""
  //         ),

  //         actions: (
  //           <Space size="middle">
  //             <Tooltip
  //               title={`${
  //                 dataObj.isSessionStarted
  //                   ? "View Counselling"
  //                   : "Start Counselling"
  //               }`}
  //             >
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsStartCounsellingModelVisible(true);
  //                     setRecord(dataObj);
  //                     dispatch({
  //                       type: "START_COUNSELLING_REQUEST",
  //                       payload: {
  //                         id: dataObj.id,
  //                         formData: {
  //                           confirmationText: "",
  //                         },
  //                       },
  //                     });
  //                   }}
  //                 >
  //                   {dataObj.isSessionStarted ? <MdPreview /> : <VscDebugStart />}
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Update Appointment">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateAppointmentModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Appointment Details">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsAppointmentDetailsModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EyeOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete Appointment">
  //               <Popconfirm
  //                 title="Are you sure to delete this appointment?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_APPOINTMENT_REQUEST",
  //                     payload: { id: dataObj.id },
  //                   });
  //                 }}
  //                 onCancel={() => {}}
  //                 okText="Yes"
  //                 cancelText="No"
  //               >
  //                 <a>
  //                   <div className="bordered">
  //                     <DeleteOutlined />
  //                   </div>
  //                 </a>{" "}
  //               </Popconfirm>
  //             </Tooltip>
  //             <Tooltip title="View status History">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsStatusHistoryModelVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <AiOutlineHistory />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             {/* <Tooltip title="Change appointment status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus = dataObj.isActive ? "inactive" : "active";
  //                     dispatch({
  //                       type: "CHANGE_APPOINTMENT_STATUS_REQUEST",
  //                       payload: { id: dataObj.id, actionStatus },
  //                     });
  //                   }}
  //                 >
  //                   <MdOutlineDisabledVisible />
  //                 </div>
  //               </a>
  //             </Tooltip> */}
  //           </Space>
  //         ),
  //       };
  //     });
  //   }

  console.log("from Appointment", AppointmentState);
  return (
    <SiderDemo>
      <div className="flexColumn">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddAppointmentModelVisible(true);
            }}
          >
            <span>Add Appointment</span>
          </button>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {AppointmentState.isLoading ? (
            <TableSkeleton />
          ) : (
            <Table bordered columns={columns} />
          )}
        </div>
      </div>
      {/* <AddAppointment
        isAddAppointmentModalVisible={isAddAppointmentModelVisible}
        setIsAddAppointmentModelVisible={setIsAddAppointmentModelVisible}
      />
      <UpdateAppointment
        record={record}
        isUpdateAppointmentModelVisible={isUpdateAppointmentModelVisible}
        setIsUpdateAppointmentModelVisible={setIsUpdateAppointmentModelVisible}
      />
      <AppointmentDetails
        record={record}
        isAppointmentDetailsModalVisible={isAppointmentDetailsModalVisible}
        setIsAppointmentDetailsModalVisible={
          setIsAppointmentDetailsModalVisible
        }
      />
      <StatusHistory
        type={"APPOINTMENT"}
        appointmentRecord={record}
        record={record?.leadResponse}
        isStatusHistoryModalVisible={isStatusHistoryModelVisible}
        setIsStatusHistoryModalVisible={setIsStatusHistoryModelVisible}
      />
      <StartCounselling
        record={record}
        isStartCounsellingModalVisible={isStartCounsellingModelVisible}
        setIsStartCounsellingModalVisible={setIsStartCounsellingModelVisible}
      /> */}
    </SiderDemo>
  );
};

export default AppointmentManagement;
