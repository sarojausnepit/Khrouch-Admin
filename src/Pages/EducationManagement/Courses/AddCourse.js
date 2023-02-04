import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import AddDegree from "../../../Master/Degree/AddDegree";
import { allActions } from "../../../Redux/myActions";
const { TextArea } = Input;
const { Option } = Select;

const AddCourse = ({
  record,
  isAddCourseModalVisible,
  setIsAddCourseModalVisible,
}) => {
  const store = useSelector((state) => {
    return {
      // leadState: state.LeadReducer,
      caseState: state.InstituteReducer,
    };
  });
  const actions = useDispatch();
  const [form] = Form.useForm();
  const [isAddDegreeModalVisible, setIsAddDegreeModalVisible] = useState(false);
  const [isScholarshipAllowed, setIsScholarshipAllowed] = useState(false);
  const [onshoreIsDiscountAllowed, setonshoreIsDiscountAllowed] =
    useState(false);
  const [offshoreIsDiscountAllowed, setoffshoreIsDiscountAllowed] =
    useState(false);
  const [onshoreIsScholarshipAllowed, setonshoreIsScholarshipAllowed] =
    useState(false);
  const [offshoreIsScholarshipAllowed, setoffshoreIsScholarshipAllowed] =
    useState(false);
  const [courseDocument, setCourseDocument] = useState();
  const [courseData, setCourseData] = useState({
    instituteId: record?.id,
    instituteName: record?.instituteName,
  });
  const fetchAdminDropdown = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/institute/get-all-dropdown`,
          attempt: "FETCH_ADMIN_DROPDOWN",
          success: "FETCH_ADMIN_DROPDOWN_SUCCESS",
          failure: "FETCH_ADMIN_DROPDOWN_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
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
  useEffect(() => {
    if (isAddCourseModalVisible === true) {
      fetchAdminDropdown();
      setCourseData({
        instituteId: record?.id,
        instituteName: record?.instituteName,
      });
      setIntake([
        {
          intakeSessionName: "",
          description: "",
        },
      ]);
    }
  }, [isAddCourseModalVisible]);

  const [courseType, setCourseType] = useState();
  const uploadCourseDocumentFn = (response) => {
    const courseDocumentFormData = new FormData();
    courseDocumentFormData.append("document", courseDocument);
    courseDocument !== undefined &&
      courseDocument !== null &&
      actions(
        allActions(courseDocumentFormData, {
          method: "post",
          endPoint: `/course/document/add/${response.id}`,
          attempt: "UPLOAD_COURSE_DOCUMENT_REQUEST",
          success: "UPLOAD_COURSE_DOCUMENT_REQUEST_SUCCESS",
          failure: "UPLOAD_COURSE_DOCUMENT_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchActiveCourses();
            fetchAllCourses();
          },
          multipartFormData: true,
          saveBearerToken: true,
        })
      );

    // dispatch({
    //   type: "UPLOAD_COURSE_DOCUMENT_REQUEST",
    //   payload: { id: response.data.id, formData: courseDocumentFormData },
    // });
  };
  const addCourseSubmitHandler = (values) => {
    let onshore, offshore, both;
    if (values.type === "ONSHORE") {
      onshore = true;
      offshore = false;
      both = false;
    } else if (values.type === "OFFSHORE") {
      onshore = false;
      offshore = true;
      both = false;
    } else {
      onshore = false;
      offshore = false;
      both = true;
    }
    const formData = {
      ...values,
      createIntakeRequestList: intake,
      onshore,
      offshore,
      both,
    };
    console.log(values);

    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `/course/add/${values.instituteId}`,
          attempt: "ADD_COURSE_REQUEST",
          success: "ADD_COURSE_REQUEST_SUCCESS",
          failure: "ADD_COURSE_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            uploadCourseDocumentFn(data);
            fetchActiveCourses();
            fetchAllCourses();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_COURSE_REQUEST",
    //   payload: {
    //     id: values.instituteId,
    //     formData,
    //   },
    //   payload2: uploadCourseDocumentFn,
    // });
    setCourseDocument(null);
    form.resetFields();
    form.resetFields(["file"]);
    setIntake(null);
    setIsAddCourseModalVisible(false);
  };
  const [intake, setIntake] = useState([
    {
      intakeSessionName: "",
      description: "",
    },
  ]);
  const removeIntakeInput = (index) => {
    const list = [...intake];
    list.splice(index, 1);
    setIntake(list);
  };
  const addIntake = () => {
    setIntake([
      ...intake,
      {
        intake: "",
        description: "",
      },
    ]);
  };
  const handleIntakeNameChange = (e, index) => {
    console.log(e, index);
    const list = [...intake];
    list[index].intakeSessionName = e;
    setIntake(list);
  };
  const handleIntakeDescriptionChange = (e, index) => {
    console.log(e, index, "from handle intake description");
    const list = [...intake];
    list[index].description = e;
    setIntake(list);
  };

  console.log("window location,", window.location);
  console.log("intake,", intake);
  return (
    <Drawer
      title="Add Course"
      open={isAddCourseModalVisible}
      onClose={() => {
        setIsAddCourseModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <Form
        layout="vertical"
        onFinish={addCourseSubmitHandler}
        colon={true}
        form={form}
        className="drawerStyle"
        fields={[
          {
            name: ["instituteId"],
            value: courseData.instituteId,
          },
        ]}
      >
        <Form.Item
          label="Select Institute"
          name={"instituteId"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter institute id!",
            },
          ]}
        >
          <Select>
            {store.caseState.adminDropdown?.institute?.map((dataObj) => {
              return (
                <Option key={dataObj.id} value={dataObj.id}>
                  <div
                    onClick={() => {
                      setCourseData((previousData) => {
                        return {
                          instituteId: dataObj.id,
                          instituteName: dataObj.instituteName,
                        };
                      });
                    }}
                  >
                    {dataObj.instituteName}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label="Course Name"
            name={"name"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter course name!",
              },
            ]}
          >
            <Input placeholder="Course name" />
          </Form.Item>
          <div
            className="flexRowWithoutStyle"
            style={{ gap: "0.3rem", width: "100%" }}
          >
            <Form.Item
              label="Course Degree"
              name={"degree"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter degree!",
                },
              ]}
            >
              <Select>
                {store.caseState.adminDropdown?.degrees?.map((dataObj) => {
                  return <Option key={dataObj.id}>{dataObj.degreeName}</Option>;
                })}
              </Select>
            </Form.Item>
            <a
              className="plusButton"
              onClick={() => {
                setIsAddDegreeModalVisible(true);
              }}
            >
              <AiOutlinePlus className="iconColor" />
            </a>
          </div>
        </div>
        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label="Course Code"
            name={"courseCode"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter course code!",
              },
            ]}
          >
            <Input placeholder="Course Code" />
          </Form.Item>
          <Form.Item
            label="Course Duration"
            name={"courseDuration"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter course duration!",
              },
            ]}
          >
            <Input type="number" placeholder="Course Duration" />
          </Form.Item>
        </div>
        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label="Academic Duration"
            name={"courseAccordingTo"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please select a course type",
              },
            ]}
          >
            <Select>
              <Option value={"WEEKLY"}>Weekly</Option>
              <Option value={"MONTHLY"}>Monthly</Option>
              <Option value={"SEMESTER"}>Semester</Option>
              <Option value={"TRIMESTER"}>Trimester</Option>
              <Option value={"YEARLY"}>Yearly</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Type"
            name={"type"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter description!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                console.log("from chang type", e.target.value);
                setCourseType(e.target.value);
              }}
            >
              <Radio value={"ONSHORE"}>Onshore</Radio>
              <Radio value={"OFFSHORE"}>Offshore</Radio>
              <Radio value={"BOTH"}>Both</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        {courseType === "BOTH" && (
          <>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Onshore Fee"
                name={"onShoreFee"}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter onshore Fee!",
                  },
                ]}
              >
                <Input type="number" placeholder="Onshore Fee" />
              </Form.Item>
              <Form.Item
                label="Commission (%) (Onshore)"
                name={"onshoreCommission"}
                style={{ width: "100%" }}

                //   rules={[
                //     {
                //       required: true,
                //       message: "Please enter commission!",
                //     },
                //   ]}
              >
                <Input
                  type="number"
                  placeholder="commission"
                  max={999}
                  min={0}
                />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"onshoreIsDiscount"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setonshoreIsDiscountAllowed(e.target.checked);
                  }}
                >
                  is Discount Allowed?
                </Checkbox>
              </Form.Item>
              {onshoreIsDiscountAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Onshore Discount"
                    name={"onshoreDiscountAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Onshore Discount" />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"onshoreDiscountType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"onshoreIsScholarship"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setonshoreIsScholarshipAllowed(e.target.checked);
                  }}
                >
                  is Scholarship Allowed?
                </Checkbox>
              </Form.Item>
              {onshoreIsScholarshipAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Onshore Scholarship"
                    name={"onshoreScholarshipAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Onshore Scholarship" />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"onshoreScholarshipType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>

            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Onshore Material Fee"
                name={"onshoreMaterialFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Onshore Material Fee" />
              </Form.Item>
              <Form.Item
                label="Onshore Application Fee"
                name={"onshoreApplicationFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Onshore Application Fee" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Onshore Additional Fee"
                name={"onshoreAdditionalFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Onshore Additional Fee" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Offshore Fee"
                name={"offShoreFee"}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter offshore fee!",
                  },
                ]}
              >
                <Input type="number" placeholder="Offshore Fee" />
              </Form.Item>
              <Form.Item
                label="Commission (%) (Offshore)"
                name={"offshoreCommission"}
                style={{ width: "100%" }}

                //   rules={[
                //     {
                //       required: true,
                //       message: "Please enter commission!",
                //     },
                //   ]}
              >
                <Input type="number" placeholder="commission" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"offshoreIsDiscount"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setoffshoreIsDiscountAllowed(e.target.checked);
                  }}
                >
                  is Discount Allowed?
                </Checkbox>
              </Form.Item>
              {offshoreIsDiscountAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Offshore Discount"
                    name={"offshoreDiscountAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Offshore Discount " />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"offshoreDiscountType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"offshoreIsScholarship"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setoffshoreIsScholarshipAllowed(e.target.checked);
                  }}
                >
                  is Scholarship Allowed?
                </Checkbox>
              </Form.Item>
              {offshoreIsScholarshipAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Offshore Scholarship"
                    name={"offshoreScholarshipAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Offshore Scholarship" />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"offshoreScholarshipType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>

            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Offshore Material Fee"
                name={"offshoreMaterialFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Offshore Material Fee" />
              </Form.Item>
              <Form.Item
                label="Offshore Application Fee"
                name={"offshoreApplicationFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Offshore Application Fee" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Offshore Additional Fee"
                name={"offshoreAdditionalFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Offshore Additional Fee" />
              </Form.Item>
            </div>
          </>
        )}
        {courseType === "ONSHORE" && (
          <>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Onshore Fee"
                name={"onShoreFee"}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter onshore Fee!",
                  },
                ]}
              >
                <Input type="number" placeholder="Onshore Fee" />
              </Form.Item>
              <Form.Item
                label="Commission (%) (Onshore)"
                name={"onshoreCommission"}
                style={{ width: "100%" }}

                //   rules={[
                //     {
                //       required: true,
                //       message: "Please enter commission!",
                //     },
                //   ]}
              >
                <Input type="number" placeholder="commission" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"onshoreIsDiscount"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setonshoreIsDiscountAllowed(e.target.checked);
                  }}
                >
                  is Discount Allowed?
                </Checkbox>
              </Form.Item>
              {onshoreIsDiscountAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Onshore Discount"
                    name={"onshoreDiscountAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Onshore Discount" />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"onshoreDiscountType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"onshoreIsScholarship"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setonshoreIsScholarshipAllowed(e.target.checked);
                  }}
                >
                  is Scholarship Allowed?
                </Checkbox>
              </Form.Item>
              {onshoreIsScholarshipAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Onshore Scholarship"
                    name={"onshoreScholarshipAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Onshore Scholarship" />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"onshoreScholarshipType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>

            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Onshore Material Fee"
                name={"onshoreMaterialFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Onshore Material Fee" />
              </Form.Item>
              <Form.Item
                label="Onshore Application Fee"
                name={"onshoreApplicationFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Onshore Application Fee" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Onshore Additional Fee"
                name={"onshoreAdditionalFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Onshore Additional Fee" />
              </Form.Item>
            </div>
          </>
        )}
        {courseType === "OFFSHORE" && (
          <>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Offshore Fee"
                name={"offShoreFee"}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter offshore fee!",
                  },
                ]}
              >
                <Input type="number" placeholder="Offshore Fee" />
              </Form.Item>
              <Form.Item
                label="Commission (%) (Offshore)"
                name={"offshoreCommission"}
                style={{ width: "100%" }}

                //   rules={[
                //     {
                //       required: true,
                //       message: "Please enter commission!",
                //     },
                //   ]}
              >
                <Input type="number" placeholder="commission" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"offshoreIsDiscount"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setoffshoreIsDiscountAllowed(e.target.checked);
                  }}
                >
                  is Discount Allowed?
                </Checkbox>
              </Form.Item>
              {offshoreIsDiscountAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Offshore Discount"
                    name={"offshoreDiscountAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Offshore Discount " />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"offshoreDiscountType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                name={"offshoreIsScholarship"}
                valuePropName="checked"
                style={{ width: "100%" }}
              >
                <Checkbox
                  onChange={(e) => {
                    setoffshoreIsScholarshipAllowed(e.target.checked);
                  }}
                >
                  is Scholarship Allowed?
                </Checkbox>
              </Form.Item>
              {offshoreIsScholarshipAllowed ? (
                <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
                  <Form.Item
                    label="Offshore Scholarship"
                    name={"offshoreScholarshipAmount"}
                    style={{ width: "100%" }}
                  >
                    <Input type="number" placeholder="Offshore Scholarship" />
                  </Form.Item>
                  <Form.Item
                    label={"Type"}
                    name={"offshoreScholarshipType"}
                    style={{ width: "100%" }}
                  >
                    <Radio.Group>
                      <Radio value={"FLAT"}>is Flat</Radio>
                      <Radio value={"PERCENTAGE"}>is Percentage</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ) : null}
            </div>

            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Offshore Material Fee"
                name={"offshoreMaterialFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Offshore Material Fee" />
              </Form.Item>
              <Form.Item
                label="Offshore Application Fee"
                name={"offshoreApplicationFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Offshore Application Fee" />
              </Form.Item>
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <Form.Item
                label="Offshore Additional Fee"
                name={"offshoreAdditionalFee"}
                style={{ width: "100%" }}
              >
                <Input type="number" placeholder="Offshore Additional Fee" />
              </Form.Item>
            </div>
          </>
        )}
        <div
          style={{
            backgroundColor: "#eeeeee55",
            borderRadius: "0.5rem",
            padding: "0.5rem",
          }}
        >
          <h3>Intake:</h3>
          {intake?.map((singleIntake, index) => {
            return (
              <div key={index}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div
                      className="flexRowWithoutStyle"
                      style={{ justifyContent: "space-between", gap: "1rem" }}
                    >
                      <Form.Item
                        label="Intake Name"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a intake!",
                          },
                        ]}
                      >
                        <Select
                          name="intake"
                          onChange={(e) => {
                            handleIntakeNameChange(e, index);
                          }}
                        >
                          <Option value="January">January</Option>
                          <Option value="February">February</Option>
                          <Option value="March">March</Option>
                          <Option value="April">April</Option>
                          <Option value="May">May</Option>
                          <Option value="June">June</Option>
                          <Option value="July">July</Option>
                          <Option value="August">August</Option>
                          <Option value="September">September</Option>
                          <Option value="October">October</Option>
                          <Option value="November">November</Option>
                          <Option value="December">December</Option>
                        </Select>
                        {/* <Input
                          name="intake"
                          placeholder="Intake"
                          onChange={(e) => {
                            handleIntakeNameChange(e.target.value, index);
                          }}
                        /> */}
                      </Form.Item>
                      <Form.Item
                        label="Intake Description"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please write something!",
                          },
                        ]}
                      >
                        <TextArea
                          placeholder="Something about intake"
                          onChange={(e) => {
                            handleIntakeDescriptionChange(
                              e.target.value,
                              index
                            );
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {intake.length > 1 && (
                    <Button
                      color="red"
                      onClick={() => removeIntakeInput(index)}
                      style={{
                        padding: "0",
                        borderRadius: "50%",
                        height: "1.5rem",
                        width: "1.5rem",
                      }}
                    >
                      <CloseOutlined />
                    </Button>
                  )}
                </div>
                {intake.length - 1 === index && (
                  <Button
                    block
                    type="dashed"
                    onClick={addIntake}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <PlusOutlined />
                    Add Intake
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        {/* <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label="Onshore Fee"
            name={"onshoreFee"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter onshore Fee!",
              },
            ]}
          >
            <Input type="number" placeholder="Onshore Fee" />
          </Form.Item>
          <Form.Item
            label="Offshore Fee"
            name={"offshoreFee"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter offshore fee!",
              },
            ]}
          >
            <Input type="number" placeholder="Offshore Fee" />
          </Form.Item>
        </div> */}

        <Form.Item
          label="Upload Document"
          name="skjl"
          style={{ width: "100%" }}
        >
          <Input
            type="file"
            placeholder="Upload Document"
            onChange={(e) => {
              setCourseDocument(e.target.files[0]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Course Description"
          name={"description"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter description!",
            },
          ]}
        >
          <TextArea placeholder="Course description" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Course
          </Button>
        </Form.Item>
      </Form>
      {isAddDegreeModalVisible && (
        <AddDegree
          isAddDegreeModalVisible={isAddDegreeModalVisible}
          setIsAddDegreeModalVisible={setIsAddDegreeModalVisible}
        />
      )}
    </Drawer>
  );
};
export default AddCourse;
