import React, { useEffect, useState } from "react";
import {
  Avatar,
  Form,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import course from "../../../Assets/course.png";
import activeCourse from "../../../Assets/courseActive.png";
import { MdOutlineDisabledVisible } from "react-icons/md";
import {
  AiOutlineEye,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlinePoweroff,
} from "react-icons/ai";

import { BiBlock } from "react-icons/bi";
import { allActions } from "../../../Redux/myActions";
import SiderDemo from "../../../components/Siderdemo";
import TableSkeleton from "../../../Helpers/TableSkeleton/tableSkelaton";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";

const columns = [
  {
    title: "Course Name",
    dataIndex: "name",
    width: 200,
    align: "center",
  },
  {
    title: "Degree",
    dataIndex: "degree",
    width: 100,
    align: "center",
  },
  {
    title: "Course Duration",
    dataIndex: "courseDuration",
    width: 100,
    align: "center",
  },

  {
    title: "Institute Name",
    dataIndex: "institute",
    width: 250,
    align: "center",
  },

  {
    title: "Status",
    dataIndex: "isActive",
    width: 250,
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 50,
    align: "center",
  },
];
const Courses = () => {
  const coursesState = useSelector((state) => state.CoursesReducer);
  const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
  const [isUpdateCourseModelVisible, setIsUpdateCourseModelVisible] =
    useState(false);
  const [isOffshoreChecklistModelVisible, setIsOffshoreChecklistModelVisible] =
    useState(false);
  const [isOnshoreChecklistModelVisible, setIsOnshoreChecklistModelVisible] =
    useState(false);
  const [isCourseDetailsModelVisible, setIsCourseDetailsModelVisible] =
    useState(false);
  const [courseType, setCourseType] = useState("get-all-courses");
  const [record, setRecord] = useState({});
  const actions = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    if (courseType === "get-active-courses") {
      fetchActiveCourses();
      // dispatch({
      //   type: "FETCH_ACTIVE_COURSES_REQUEST",
      // });
    } else {
      fetchAllCourses();
      // dispatch({ type: "FETCH_COURSES_REQUEST" });
    }
  }, [courseType]);

  const fetchAllCourses = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/course/get-all`,
          attempt: "FETCH_COURSES_REQUEST",
          success: "FETCH_COURSES_REQUEST_SUCCESS",
          failure: "FETCH_COURSES_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };

  const fetchActiveCourses = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/course/get-all-active`,
          attempt: "FETCH_ACTIVE_COURSES_REQUEST",
          success: "FETCH_ACTIVE_COURSES_REQUEST_SUCCESS",
          failure: "FETCH_ACTIVE_COURSES_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };

  let data = [];
  if (courseType === "get-all-courses") {
    console.log("from courses all data", coursesState.courses.data);
    data = coursesState.courses.data?.map((dataObj) => {
      console.log("courses map", dataObj);
      return {
        key: dataObj.id,
        name: dataObj.name,
        degree: dataObj?.name?.degree,
        courseDuration:
          dataObj.courseDuration + " " + dataObj.courseAccordingTo,
        institute: dataObj.institute?.name,
        degree: dataObj.degree?.name,
        isActive: dataObj.isActive ? (
          <p className="greenTag">ACTIVE</p>
        ) : (
          <p className="redTag">INACTIVE</p>
        ),
        actions: (
          <Space size="middle">
            {/* <Tooltip title="Update Course">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsUpdateCourseModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <EditOutlined />
                </div>
              </a>
            </Tooltip> */}
            <Tooltip title="Update Course">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsUpdateCourseModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <EditOutlined />
                </div>
              </a>
            </Tooltip>
            {/* <Tooltip title="Delete Course">
              <Popconfirm
                title="Are you sure to delete this course?"
                onConfirm={() => {
                  dispatch({
                    type: "DELETE_COURSE_REQUEST",
                    payload: { id: dataObj.id },
                  });
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <a>
                  <div className="bordered">
                    <DeleteOutlined />
                  </div>
                </a>{" "}
              </Popconfirm>
            </Tooltip> */}

            <Tooltip title="Offshore Checklist">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsOffshoreChecklistModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <AiOutlineFullscreen />
                </div>
              </a>
            </Tooltip>
            <Tooltip title="Onshore Checklist">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsOnshoreChecklistModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <AiOutlineFullscreenExit />
                </div>
              </a>
            </Tooltip>
            <Tooltip title="Course Details">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsCourseDetailsModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <AiOutlineEye />
                </div>
              </a>
            </Tooltip>
            {dataObj.isActive === true && (
              <Tooltip title="Deactivate Course">
                <a style={{ color: "red" }}>
                  <div
                    className="bordered"
                    onClick={() => {
                      const actionStatus = dataObj.isActive
                        ? "inactive"
                        : "active";
                      actions(
                        allActions(
                          {},
                          {
                            method: "patch",
                            endPoint: `/course/change-status/${actionStatus}/${dataObj.id}`,
                            attempt: "TOGGLE_COURSE_STATUS_REQUEST",
                            success: "TOGGLE_COURSE_STATUS_REQUEST_SUCCESS",
                            failure: "TOGGLE_COURSE_STATUS_REQUEST_FAILURE",
                            //   navigateTo: null,
                            successInternalState: (data) => {
                              fetchAllCourses();
                            },
                            saveBearerToken: true,
                          }
                        )
                      );
                      // dispatch({
                      //   type: "TOGGLE_COURSE_STATUS_REQUEST",
                      //   payload: { id: dataObj.id, actionStatus },
                      // });
                    }}
                  >
                    <BiBlock />
                  </div>
                </a>
              </Tooltip>
            )}
            {dataObj.isActive === false && (
              <Tooltip title="Activate Course">
                <a>
                  <div
                    className="bordered"
                    onClick={() => {
                      const actionStatus = dataObj.isActive
                        ? "inactive"
                        : "active";
                      actions(
                        allActions(
                          {},
                          {
                            method: "patch",
                            endPoint: `/course/change-status/${actionStatus}/${dataObj.id}`,
                            attempt: "TOGGLE_COURSE_STATUS_REQUEST",
                            success: "TOGGLE_COURSE_STATUS_REQUEST_SUCCESS",
                            failure: "TOGGLE_COURSE_STATUS_REQUEST_FAILURE",
                            //   navigateTo: null,
                            successInternalState: (data) => {
                              fetchAllCourses();
                            },
                            saveBearerToken: true,
                          }
                        )
                      );
                      // dispatch({
                      //   type: "TOGGLE_COURSE_STATUS_REQUEST",
                      //   payload: { id: dataObj.id, actionStatus },
                      // });
                    }}
                  >
                    <AiOutlinePoweroff />
                  </div>
                </a>
              </Tooltip>
            )}
          </Space>
        ),
      };
    });
  } else if (courseType === "get-active-courses") {
    console.log("form institute active", coursesState);
    data = coursesState.activeCourses?.data?.map((dataObj) => {
      return {
        key: dataObj.id,
        name: dataObj.name,
        degree: dataObj?.name?.degree,
        courseDuration:
          dataObj.courseDuration + " " + dataObj.courseAccordingTo,
        institute: dataObj.institute?.name,
        degree: dataObj.degree?.name,
        isActive: dataObj.isActive ? (
          <p className="greenTag">ACTIVE</p>
        ) : (
          <p className="redTag">INACTIVE</p>
        ),
        actions: (
          <Space size="middle">
            <Tooltip title="Update Course">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsUpdateCourseModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <EditOutlined />
                </div>
              </a>
            </Tooltip>
            {/* <Tooltip title="Delete Course">
              <Popconfirm
                title="Are you sure to delete this course?"
                onConfirm={() => {
                  dispatch({
                    type: "DELETE_COURSE_REQUEST",
                    payload: { id: dataObj.id },
                  });
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <a>
                  <div className="bordered">
                    <DeleteOutlined />
                  </div>
                </a>{" "}
              </Popconfirm>
            </Tooltip> */}

            <Tooltip title="Course Details">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setIsCourseDetailsModelVisible(true);
                    setRecord(dataObj);
                  }}
                >
                  <AiOutlineEye />
                </div>
              </a>
            </Tooltip>
            {dataObj.isActive === true && (
              <Tooltip title="Deactivate Course">
                <a style={{ color: "red" }}>
                  <div
                    className="bordered"
                    onClick={() => {
                      const actionStatus = dataObj.isActive
                        ? "inactive"
                        : "active";
                      actions(
                        allActions(
                          {},
                          {
                            method: "patch",
                            endPoint: `/course/change-status/${actionStatus}/${dataObj.id}`,
                            attempt: "TOGGLE_COURSE_STATUS_REQUEST",
                            success: "TOGGLE_COURSE_STATUS_REQUEST_SUCCESS",
                            failure: "TOGGLE_COURSE_STATUS_REQUEST_FAILURE",
                            //   navigateTo: null,
                            successInternalState: (data) => {
                              fetchActiveCourses();
                            },
                            saveBearerToken: true,
                          }
                        )
                      );
                      // dispatch({
                      //   type: "TOGGLE_COURSE_STATUS_REQUEST",
                      //   payload: { id: dataObj.id, actionStatus },
                      // });
                    }}
                  >
                    <BiBlock />
                  </div>
                </a>
              </Tooltip>
            )}
            {dataObj.isActive === false && (
              <Tooltip title="Activate Course">
                <a>
                  <div
                    className="bordered"
                    onClick={() => {
                      const actionStatus = dataObj.isActive
                        ? "inactive"
                        : "active";
                      actions(
                        allActions(
                          {},
                          {
                            method: "patch",
                            endPoint: `/course/change-status/${actionStatus}/${dataObj.id}`,
                            attempt: "TOGGLE_COURSE_STATUS_REQUEST",
                            success: "TOGGLE_COURSE_STATUS_REQUEST_SUCCESS",
                            failure: "TOGGLE_COURSE_STATUS_REQUEST_FAILURE",
                            //   navigateTo: null,
                            successInternalState: (data) => {
                              fetchActiveCourses();
                            },
                            saveBearerToken: true,
                          }
                        )
                      );
                      // dispatch({
                      //   type: "TOGGLE_COURSE_STATUS_REQUEST",
                      //   payload: { id: dataObj.id, actionStatus },
                      // });
                    }}
                  >
                    <AiOutlinePoweroff />
                  </div>
                </a>
              </Tooltip>
            )}
          </Space>
        ),
      };
    });
  }

  console.log("from course state", coursesState);
  return (
    <SiderDemo>
      <div className="flexColumn">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddCourseModalVisible(true);
            }}
          >
            <span>Add Course</span>
          </button>
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar src={activeCourse} size={20} shape="square" />
                    <div>All Courses</div>
                  </div>
                ),
                value: "get-all-courses",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar src={course} size={20} shape="square" />
                    <div>Active Courses</div>
                  </div>
                ),
                value: "get-active-courses",
              },
            ]}
            onChange={(value) => {
              setCourseType(value);
              console.log(value);
            }}
          />
        </div>
        {coursesState.isLoading ? (
          <TableSkeleton />
        ) : (
          <Table bordered columns={columns} dataSource={data} />
        )}
      </div>
      {/* ADD courses */}
      {isAddCourseModalVisible && (
        <AddCourse
          isAddCourseModalVisible={isAddCourseModalVisible}
          setIsAddCourseModalVisible={setIsAddCourseModalVisible}
        />
      )}
      {/* UPDATE courses */}
      {isUpdateCourseModelVisible && (
        <UpdateCourse
          record={record}
          isUpdateCourseModelVisible={isUpdateCourseModelVisible}
          setIsUpdateCourseModelVisible={setIsUpdateCourseModelVisible}
        />
      )}
      {/* {isCourseDetailsModelVisible && (
        <CoursesDetail
          record={record}
          isCourseDetailsModelVisible={isCourseDetailsModelVisible}
          setIsCourseDetailsModelVisible={setIsCourseDetailsModelVisible}
        />
      )} */}
      {/* {isOffshoreChecklistModelVisible && (
        <AddOffshoreDocumentChecklist
          workflowRecord={record}
          isOnshore={false}
          isAddOffshoreDocumentListModalVisible={
            isOffshoreChecklistModelVisible
          }
          setIsAddOffshoreDocumentListModalVisible={
            setIsOffshoreChecklistModelVisible
          }
        />
      )}
      {isOnshoreChecklistModelVisible && (
        <AddOnshoreDocumentChecklist
          workflowRecord={record}
          isOnshore={true}
          isAddOnshoreDocumentListModalVisible={isOnshoreChecklistModelVisible}
          setIsAddOnshoreDocumentListModalVisible={
            setIsOnshoreChecklistModelVisible
          }
        />
      )} */}
    </SiderDemo>
  );
};

export default Courses;
