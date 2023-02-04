import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddSupport from "./AddSupport";
import UpdateSupport from "./UpdateSupport";
import { BsReply } from "react-icons/bs";
import { GrFormView, GrView } from "react-icons/gr";
import ViewSupportTicket from "./ViewSupportTicket";
import { formattedDateTime } from "../../Helpers/HelperFunction";
import { AiOutlineEye } from "react-icons/ai";
import SiderDemo from "../../components/Siderdemo";
import { allActions } from "../../Redux/myActions";
const columns = [
  {
    title: "Support Category",
    dataIndex: "supportCategory",
    align: "center",
  },
  {
    title: "Added Date/Time",
    dataIndex: "addedTime",
    align: "center",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    align: "center",
  },
  {
    title: "Ticket Status",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const Support = () => {
  const supportState = useSelector((state) => state.SupportReducer);
  const [isAddSupportModalVisible, setIsAddSupportModalVisible] =
    useState(false);
  const [isUpdateSupportModalVisible, setIsUpdateSupportModalVisible] =
    useState(false);
  const [isViewSupportModalVisible, setIsViewSupportModalVisible] =
    useState(false);
  const [record, setRecord] = useState({});
  const [supportType, setSupportType] = useState("get-all-ticket");
  const actions = useDispatch();

  const fetchAllSupport = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/support-get-all`,
          attempt: "FETCH_SUPPORT_REQUEST",
          success: "FETCH_SUPPORT_REQUEST_SUCCESS",
          failure: "FETCH_SUPPORT_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  const fetchOpenSupport = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/support-get-all`,
          attempt: "FETCH_OPEN_SUPPORT_REQUEST",
          success: "FETCH_OPEN_SUPPORT_REQUEST_SUCCESS",
          failure: "FETCH_OPEN_SUPPORT_REQUEST_FAILURE",
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
    fetchAllSupport();
    // dispatch({ type: "FETCH_SUPPORT_REQUEST" });
  }, [supportType]);
  useEffect(() => {
    if (
      isAddSupportModalVisible === false ||
      isUpdateSupportModalVisible === false
    ) {
      fetchAllSupport();
      // dispatch({ type: "FETCH_SUPPORT_REQUEST" });
    }
  }, [isAddSupportModalVisible, isUpdateSupportModalVisible]);
  const data = supportState.supports?.data?.map((dataObj) => {
    let ticketStatus;
    if (dataObj.status === "OPEN") {
      ticketStatus = <p className="greenTag">OPEN</p>;
    } else if (dataObj.status === "PENDING") {
      ticketStatus = <p className="pendingTag">PENDING</p>;
    } else if (dataObj.status === "ASSIGNED") {
      ticketStatus = <p className="assignedTag">ASSIGNED</p>;
    } else if (dataObj.status === "CLOSE") {
      ticketStatus = <p className="pendingTag">CLOSE</p>;
    }

    return {
      key: dataObj.id,
      supportCategory: dataObj?.supportCategory?.categoryName,
      addedTime: formattedDateTime(dataObj.addedTime),
      createdBy: dataObj.createdBy?.emailId,
      status: ticketStatus,

      actions: (
        <Space size="middle">
          <Tooltip title="Reply to Ticket">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setIsUpdateSupportModalVisible(true);
                  setRecord(dataObj);
                }}
              >
                <BsReply size={20} />
              </div>
            </a>
          </Tooltip>

          <Tooltip title="View Ticket">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setRecord(dataObj);
                  setIsViewSupportModalVisible(true);
                }}
              >
                <AiOutlineEye />
              </div>
            </a>
          </Tooltip>
          {/* <Tooltip title="View Ticket">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setRecord(dataObj);
                  setIsViewSupportModalVisible(true);
                }}
              >
                <AiOutlineEye />
              </div>
            </a>
          </Tooltip> */}
        </Space>
      ),
    };
  });

  //  else {
  //     data = supportState.activeSupports?.data?.map((dataObj) => {
  //       return {
  //     key: dataObj.id,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //         : dataObj.? (
  //           <Tag color="#00ff00aa">YES</Tag>
  //         ) : (
  //           <Tag color="#ff0000aa">NO</Tag>
  //         ),
  //         :
  //           dataObj.=== "ACTIVE" ? (
  //             <p className="greenTag">{dataObj.}</p>
  //           ) : (
  //             <p className="redTag">{dataObj.}</p>
  //           ),
  //         actions: (
  //           <Space size="middle">
  //             <Tooltip title="Update support">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateSupportModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete support">
  //               <Popconfirm
  //                 title="Are you sure to delete this support?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_SUPPORT_REQUEST",
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
  //             <Tooltip title="Toggle support status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus =
  //                       dataObj.=== "INACTIVE" ? "active" : "inactive";
  //                     dispatch({
  //                       type: "TOGGLE_SUPPORT_STATUS_REQUEST",
  //                       payload: { id: dataObj.id, actionStatus },
  //                     });
  //                   }}
  //                 >
  //                   <MdOutlineDisabledVisible />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //           </Space>
  //         ),
  //       };
  //     });
  //   }
  // console.log("from support state", supportState);
  return (
    <SiderDemo>
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddSupportModalVisible(true);
            }}
          >
            <span>Add Support</span>
          </button>
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>ALL</div>
                  </div>
                ),
                value: "ALL",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>OPEN </div>
                  </div>
                ),
                value: "OPEN ",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>PENDING </div>
                  </div>
                ),
                value: "PENDING ",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>ASSIGNED </div>
                  </div>
                ),
                value: "ASSIGNED ",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>CLOSED </div>
                  </div>
                ),
                value: "CLOSE ",
              },
            ]}
            onChange={(value) => {
              setSupportType(value);
              console.log(value);
            }}
          />
        </div>
        <div style={{ marginTop: "4rem" }}>
          <Table bordered columns={columns} dataSource={data} />
        </div>
      </div>
      {isAddSupportModalVisible && (
        <AddSupport
          isaddSupportModalVisible={isAddSupportModalVisible}
          setIsaddSupportModalVisible={setIsAddSupportModalVisible}
        />
      )}
      {isUpdateSupportModalVisible && (
        <UpdateSupport
          record={record}
          isUpdateSupportModalVisible={isUpdateSupportModalVisible}
          setIsUpdateSupportModalVisible={setIsUpdateSupportModalVisible}
        />
      )}
      {isViewSupportModalVisible && (
        <ViewSupportTicket
          record={record}
          isViewSupportTicketModalVisible={isViewSupportModalVisible}
          setIsViewSupportTicketModalVisible={setIsViewSupportModalVisible}
        />
      )}
    </SiderDemo>
  );
};

export default Support;
