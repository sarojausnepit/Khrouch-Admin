import React, { useState } from "react";
import {
  Form,
  Select,
  Drawer,
  Avatar,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Image,
  Tooltip,
} from "antd";
import institute from "../../../Assets/Company.png";
import activeInstitutes from "../../../Assets/activeCompanies.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AiOutlineEye, AiOutlinePlus, AiOutlinePoweroff } from "react-icons/ai";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { BiBlock } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import SiderDemo from "../../../components/Siderdemo";
import { allActions } from "../../../Redux/myActions";
import AddConsultancyInstitute from "./AddConsultancyInstitute";
import { useEffect } from "react";
const { Option } = Select;
const columns = [
  {
    title: "Institute Name",
    dataIndex: "instituteName",
    width: 250,
    align: "center",
  },
  {
    title: "Image",
    dataIndex: "image",
    width: 250,
    align: "center",
  },
  {
    title: "Location",
    dataIndex: "location",
    width: 250,
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 250,
    align: "center",
  },

  {
    title: "University URL",
    dataIndex: "universityUrl",
    width: 250,
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 250,
    align: "center",
  },
];

const ConsultancyInstitute = ({
  instituteRecord,
  isManageInstitutesModalVisible,
  setIsManageInstitutesModalVisible,
}) => {
  const instituteState = useSelector((state) => state.ClientReducer);

  const [form] = Form.useForm();

  const [isAddInstituteModalVisible, setIsAddInstituteModalVisible] =
    useState(false);
  const [isUpdateInstituteModelVisible, setIsUpdateInstituteModelVisible] =
    useState(false);
  const [
    isAddCourseFrmInstituteModelVisible,
    setIsAddCourseFrmInstituteModelVisible,
  ] = useState(false);
  const [
    isAddInstituteDocumentsModelVisible,
    setIsAddInstituteDocumentsModelVisible,
  ] = useState(false);
  const [isInstituteDetailsModelVisible, setIsInstituteDetailsModelVisible] =
    useState(false);
  const [record, setRecord] = useState({});
  const actions = useDispatch();

  const fetchAllInstitute = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/institute/get-all/${instituteRecord.id}`,
          attempt: "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST",
          success: "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST_SUCCESS",
          failure: "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };

  useEffect(() => {
    fetchAllInstitute();
  }, []);

  // const data = instituteState.institutes.data.map((dataObj) => {
  //   return {
  //     key: dataObj.id,

  //     instituteName: dataObj.instituteName ?? "N/A",
  //     image: dataObj.image ? (
  //       <Image
  //         src={dataObj.image}
  //         style={{ height: "50px", width: "50px", border: "1px solid #ccc" }}
  //       />
  //     ) : (
  //       "N/A"
  //     ),
  //     location: dataObj.location ?? "N/A",
  //     email: dataObj.email ?? "N/A",
  //     commission: dataObj.percentage,
  //     universityUrl: dataObj.universityUrl ?? "N/A",
  //     status:
  //       dataObj.status === "ACTIVE" ? (
  //         <p className="greenTag">ACTIVE</p>
  //       ) : (
  //         <p className="redTag">INACTIVE</p>
  //       ),
  //     actions: (
  //       <Space size="middle">
  //         <Tooltip title="Add Course">
  //           <a>
  //             <div
  //               className="bordered"
  //               onClick={() => {
  //                 setRecord(dataObj);
  //                 setIsAddCourseFrmInstituteModelVisible(true);
  //               }}
  //             >
  //               <AiOutlinePlus />
  //             </div>
  //           </a>
  //         </Tooltip>
  //         <Tooltip title="Update Institute">
  //           <a>
  //             <div
  //               className="bordered"
  //               onClick={() => {
  //                 setIsUpdateInstituteModelVisible(true);
  //                 setRecord(dataObj);
  //               }}
  //             >
  //               <EditOutlined />
  //             </div>
  //           </a>
  //         </Tooltip>
  //         <Tooltip title="Manage Institute Documents">
  //           <a>
  //             <div
  //               className="bordered"
  //               onClick={() => {
  //                 setIsAddInstituteDocumentsModelVisible(true);
  //                 setRecord(dataObj);
  //               }}
  //             >
  //               <HiOutlineDocumentPlus />
  //             </div>
  //           </a>
  //         </Tooltip>
  //         <Tooltip title="Delete Institute">
  //           <Popconfirm
  //             title="Are you sure to delete this Institute?"
  //             onConfirm={() => {
  //               actions(
  //                 allActions(
  //                   {},
  //                   {
  //                     method: "delete",
  //                     endPoint: `/institute/delete-institute/${dataObj.id}`,
  //                     attempt: "DELETE_INSTITUTE_REQUEST",
  //                     success: "DELETE_INSTITUTE_REQUEST_SUCCESS",
  //                     failure: "DELETE_INSTITUTE_REQUEST_FAILURE",
  //                     successInternalState: () => {
  //                       fetchAllInstitute();
  //                     },
  //                     //   navigateTo: null,
  //                     //   successInternalState: (data) => {
  //                     //     navigation.navigate("LeadDetails", { item });
  //                     //   },
  //                     saveBearerToken: false,
  //                   }
  //                 )
  //               );
  //             }}
  //             onCancel={() => {}}
  //             okText="Yes"
  //             cancelText="No"
  //           >
  //             <a>
  //               <div className="bordered">
  //                 <DeleteOutlined />
  //               </div>
  //             </a>
  //           </Popconfirm>
  //         </Tooltip>
  //         <Tooltip title="Institute Details">
  //           <a>
  //             <div
  //               className="bordered"
  //               onClick={() => {
  //                 setIsInstituteDetailsModelVisible(true);
  //                 setRecord(dataObj);
  //               }}
  //             >
  //               <AiOutlineEye />
  //             </div>
  //           </a>
  //         </Tooltip>
  //         {dataObj.status === "INACTIVE" && (
  //           <Tooltip title="Activate Institute">
  //             <a>
  //               <div
  //                 className="bordered"
  //                 onClick={() => {
  //                   const actionStatus =
  //                     dataObj.status === "INACTIVE" ? "active" : "inactive";
  //                   actions(
  //                     allActions(
  //                       {},
  //                       {
  //                         method: "patch",
  //                         endPoint: `/institute/change-institute-status/${actionStatus}/${dataObj.id}`,
  //                         attempt: "TOGGLE_INSTITUTE_STATUS_REQUEST",
  //                         success: "TOGGLE_INSTITUTE_STATUS_REQUEST_SUCCESS",
  //                         failure: "TOGGLE_INSTITUTE_STATUS_REQUEST_FAILURE",
  //                         //   navigateTo: null,
  //                         successInternalState: (data) => {
  //                           // navigation.navigate("LeadDetails", { item });
  //                           fetchAllInstitute();
  //                         },
  //                         saveBearerToken: false,
  //                       }
  //                     )
  //                   );
  //                 }}
  //               >
  //                 <AiOutlinePoweroff />
  //               </div>
  //             </a>
  //           </Tooltip>
  //         )}
  //         {dataObj.status === "ACTIVE" && (
  //           <Tooltip title="Deactivate Institute">
  //             <a style={{ color: "red" }}>
  //               <div
  //                 className="bordered"
  //                 onClick={() => {
  //                   const actionStatus =
  //                     dataObj.status === "INACTIVE" ? "active" : "inactive";
  //                   actions(
  //                     allActions(
  //                       {},
  //                       {
  //                         method: "patch",
  //                         endPoint: `/institute/change-institute-status/${actionStatus}/${dataObj.id}`,
  //                         attempt: "TOGGLE_INSTITUTE_STATUS_REQUEST",
  //                         success: "TOGGLE_INSTITUTE_STATUS_REQUEST_SUCCESS",
  //                         failure: "TOGGLE_INSTITUTE_STATUS_REQUEST_FAILURE",
  //                         //   navigateTo: null,
  //                         successInternalState: (data) => {
  //                           // navigation.navigate("LeadDetails", { item });

  //                           fetchAllInstitute();
  //                         },
  //                         saveBearerToken: false,
  //                       }
  //                     )
  //                   );
  //                 }}
  //               >
  //                 <BiBlock />
  //               </div>
  //             </a>
  //           </Tooltip>
  //         )}
  //       </Space>
  //     ),
  //   };
  // });

  return (
    <Drawer
      title="Manage Institute"
      open={isManageInstitutesModalVisible}
      onClose={() => {
        setIsManageInstitutesModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddInstituteModalVisible(true);
            }}
          >
            <span>Add Institute</span>
          </button>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <Table bordered columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default ConsultancyInstitute;
