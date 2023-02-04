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
  Image,
  Card,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { dateAndTime } from "../../../Helpers/HelperFunction";
import moment from "moment";
import AddCountry from "../../../Master/Country/AddCountry";
import AddLevelOfCollege from "../../../Master/LevelOfCollege/AddLevelOfCollege";
import { allActions } from "../../../Redux/myActions";
const { TextArea } = Input;
const { Option } = Select;

const UpdateInstitute = ({
  record,
  isUpdateInstituteModelVisible,
  setIsUpdateInstituteModelVisible,
}) => {
  const [instituteData, setInstituteData] = useState({
    instituteName: record?.instituteName,
    location: record?.location,
    description: record?.description,
    email: record?.email,
    contact: record?.contact,
    universityUrl: record?.universityUrl,
    tradingName: record?.tradingName,
    agreementStartDate: record?.agreementStartDate,
    agreementExpiryDate: record?.agreementExpiryDate,
    contactPersonName: record?.contactPersonName,
    abn: record?.abn,
    country: record?.country?.id,
    type:
      record?.onshore === true && record?.offshore === true
        ? "BOTH"
        : record?.onshore === true
        ? "ONSHORE"
        : record?.offshore === true
        ? "OFFSHORE"
        : "ONSHORE",
    rtoNumber: record?.rtoNumber,
    crisco: record?.crisco,
    levelOfCollege: record?.levelOfCollege?.id,
  });
  const addInstituteState = useSelector((state) => state.InstituteReducer);
  const [selectedInstituteImage, setSelectedInstituteImage] = useState(null);

  const [isAddLevelOfCollegeModalVisible, setIsAddLevelOfCollegeModalVisible] =
    useState(false);
  const [isAddCountryModalVisible, setIsAddCountryModalVisible] =
    useState(false);
  const [isBonus, setIsBonus] = useState(false);

  const actions = useDispatch();
  const [form] = Form.useForm();

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
  const fetchAllInstitute = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/institute/get-all-institute`,
          attempt: "FETCH_INSTITUTES_REQUEST",
          success: "FETCH_INSTITUTES_REQUEST_SUCCESS",
          failure: "FETCH_INSTITUTES_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  const fetchActiveInstitute = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/institute/get-all-active-institute`,
          attempt: "FETCH_ACTIVE_INSTITUTES_REQUEST",
          success: "FETCH_ACTIVE_INSTITUTES_REQUEST_SUCCESS",
          failure: "FETCH_ACTIVE_INSTITUTES_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: false,
        }
      )
    );
  };
  const uploadInstituteImageAndDocument = (response) => {
    const imageFormData = new FormData();
    imageFormData.append("image", selectedInstituteImage);
    if (selectedInstituteImage !== null) {
      if (selectedInstituteImage) {
        console.log("from add institute post payload image", imageFormData);

        actions(
          allActions(imageFormData, {
            method: "post",
            endPoint: `/institute/update-institute-image/${record?.id}`,
            attempt: "UPLOAD_INSTITUTE_IMAGE_REQUEST",
            success: "UPLOAD_INSTITUTE_IMAGE_REQUEST_SUCCESS",
            failure: "UPLOAD_INSTITUTE_IMAGE_REQUEST_FAILURE",
            //   navigateTo: null,
            successInternalState: (data) => {
              fetchAllInstitute();
              fetchActiveInstitute();
            },
            multipartFormData: true,
            saveBearerToken: true,
          })
        );
        // dispatch({
        //   type: "UPLOAD_INSTITUTE_IMAGE_REQUEST",
        //   payload: { id: response?.data?.id, formData: imageFormData },
        // });
        return;
      }
    }
  };
  useEffect(() => {
    if (isUpdateInstituteModelVisible === true) {
      fetchAdminDropdown();
      //   dispatch({ type: "FETCH_LEADS_DROPDOWN_REQUEST" });
    }
    if (record?.bonus?.length > 0) {
      setIsBonus(true);
      setBonus([...record.bonus]);
    }

    setInstituteData({
      instituteName: record?.instituteName,
      location: record?.location,
      description: record?.description,
      email: record?.email,
      contact: record?.contact,
      universityUrl: record?.universityUrl,
      tradingName: record?.tradingName,
      agreementStartDate: record?.agreementStartDate,
      agreementExpiryDate: record?.agreementExpiryDate,
      contactPersonName: record?.contactPersonName,
      abn: record?.abn,
      country: record?.country?.id,
      type:
        record?.onshore === true && record?.offshore === true
          ? "BOTH"
          : record?.onshore === true
          ? "ONSHORE"
          : record?.offshore === true
          ? "OFFSHORE"
          : "ONSHORE",
      rtoNumber: record?.rtoNumber,
      crisco: record?.crisco,
      levelOfCollege: record?.levelOfCollege?.id,
    });
  }, [isUpdateInstituteModelVisible]);
  useEffect(() => {
    if (selectedInstituteImage !== null) {
      uploadInstituteImageAndDocument();
    }
  }, [selectedInstituteImage]);
  const updateInstituteSubmitHandler = (values) => {
    let onshore, offshore, both;
    if (instituteData.type === "ONSHORE") {
      onshore = true;
      offshore = false;
      both = false;
    } else if (instituteData.type === "OFFSHORE") {
      onshore = false;
      offshore = true;
      both = false;
    } else {
      onshore = false;
      offshore = false;
      both = true;
    }
    console.log(values);
    const formData = {
      ...values,
      onshore,
      offshore,
      both,
      bonus: bonus,
      agreementExpiryDate: dateAndTime(values.agreementExpiryDate),
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `institute/update-institute/${record.id}`,
          attempt: "UPDATE_INSTITUTE_REQUEST",
          success: "UPDATE_INSTITUTE_REQUEST_SUCCESS",
          failure: "UPDATE_INSTITUTE_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchActiveInstitute();
            fetchAllInstitute();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "UPDATE_INSTITUTE_REQUEST",
    //   payload: {
    //     id: record.id,
    //     values: formData,
    //   },
    // });
    setBonus([]);
    form.resetFields();
    setIsUpdateInstituteModelVisible(false);
  };

  const [bonus, setBonus] = useState(
    record.bonus?.length !== 0
      ? [...record.bonus]
      : [
          {
            offshoreToWhen: null,
            offshoreFromWhen: null,
            isOffshorePercentage: false,
            isOffshoreFlat: true,
            offshorePrice: null,
            onshoreToWhen: null,
            onshoreFromWhen: null,
            isOnshorePercentage: false,
            isOnshoreFlat: true,
            onshorePrice: null,
          },
        ]
  );
  console.log(bonus, "bonus");
  const removeBonusInput = (index) => {
    const list = [...bonus];
    list.splice(index, 1);
    setBonus(list);
  };
  const addBonusInput = () => {
    setBonus([
      ...bonus,
      {
        offshoreToWhen: null,
        offshoreFromWhen: null,
        isOffshorePercentage: false,
        isOffshoreFlat: true,
        offshorePrice: null,
        onshoreToWhen: null,
        onshoreFromWhen: null,
        isOnshorePercentage: false,
        isOnshoreFlat: true,
        onshorePrice: null,
      },
    ]);
  };
  const handleOnshoreBonusToWhenChange = (e, index) => {
    console.log(e, index);
    const list = [...bonus];
    list[index].onshoreToWhen = e.target.value;
    setBonus(list);
  };
  const handleOnshoreBonusFromWhenChange = (e, index) => {
    console.log(e, index, "from handle shchedule start time");
    const list = [...bonus];
    list[index].onshoreFromWhen = e.target.value;
    setBonus(list);
  };
  const handleOnshoreBonusIsPercentageChange = (e, index) => {
    console.log(e, index, "from handle percentage");
    const list = [...bonus];
    list[index].isOnshorePercentage = e;
    setBonus(list);
  };
  const handleOnshoreBonusIsFlatChange = (e, index) => {
    console.log(e, index, "from handle isflat");
    const list = [...bonus];
    list[index].isOnshoreFlat = e;
    setBonus(list);
  };
  const handleOnshoreBonusPriceChange = (e, index) => {
    console.log(e, index, "from handle shchedule start time");
    const list = [...bonus];
    list[index].onshorePrice = e.target.value;
    setBonus(list);
  };

  const handleOffshoreBonusToWhenChange = (e, index) => {
    console.log(e, index);
    const list = [...bonus];
    list[index].offshoreToWhen = e.target.value;
    setBonus(list);
  };
  const handleOffshoreBonusFromWhenChange = (e, index) => {
    console.log(e, index, "from handle shchedule start time");
    const list = [...bonus];
    list[index].offshoreFromWhen = e.target.value;
    setBonus(list);
  };
  const handleOffshoreBonusIsPercentageChange = (e, index) => {
    console.log(e, index, "from handle percentage");
    const list = [...bonus];
    list[index].isOffshorePercentage = e;
    setBonus(list);
  };
  const handleOffshoreBonusIsFlatChange = (e, index) => {
    console.log(e, index, "from handle isflat");
    const list = [...bonus];
    list[index].isOffshoreFlat = e;
    setBonus(list);
  };
  const handleOffshoreBonusPriceChange = (e, index) => {
    console.log(e, index, "from handle shchedule start time");
    const list = [...bonus];
    list[index].offshorePrice = e.target.value;
    setBonus(list);
  };
  console.log("Record from update institute", record);
  console.log("Bonus from update institute", bonus);
  return (
    <Drawer
      title="Update Institute"
      open={isUpdateInstituteModelVisible}
      onClose={() => {
        setIsUpdateInstituteModelVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <Card loading={addInstituteState?.isLoading}>
        <Form
          layout="vertical"
          onFinish={updateInstituteSubmitHandler}
          colon={true}
          form={form}
          className="drawerStyle"
          fields={[
            {
              name: ["instituteName"],
              value: instituteData.instituteName,
            },
            {
              name: ["location"],
              value: instituteData.location,
            },
            {
              name: ["description"],
              value: instituteData.description,
            },
            {
              name: ["email"],
              value: instituteData.email,
            },
            {
              name: ["contact"],
              value: instituteData.contact,
            },
            {
              name: ["universityUrl"],
              value: instituteData.universityUrl,
            },
            {
              name: ["tradingName"],
              value: instituteData.tradingName,
            },
            {
              name: ["agreementStartDate"],
              value: instituteData.agreementStartDate
                ? moment.utc(instituteData.agreementStartDate).local()
                : "",
            },
            {
              name: ["agreementExpiryDate"],
              value: instituteData.agreementExpiryDate
                ? moment.utc(instituteData.agreementExpiryDate).local()
                : "",
            },
            {
              name: ["contactPersonName"],
              value: instituteData.contactPersonName,
            },
            {
              name: ["abn"],
              value: instituteData.abn,
            },
            {
              name: ["country"],
              value: instituteData.country,
            },
            {
              name: ["type"],
              value: instituteData.type,
            },
            {
              name: ["rtoNumber"],
              value: instituteData?.rtoNumber,
            },
            {
              name: ["crisco"],
              value: instituteData?.crisco,
            },
            {
              name: ["levelOfCollege"],
              value: instituteData?.levelOfCollege,
            },
            {
              name: ["isBonus"],
              value: isBonus,
            },
          ]}
        >
          <div
            className="flexRowWithoutStyle"
            style={{ justifyContent: "space-between", gap: "1rem" }}
          >
            <Form.Item
              label="Institute Name"
              name={"instituteName"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter institute name!",
                },
              ]}
            >
              <Input
                placeholder="Institute name"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      instituteName: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Location"
              name={"location"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter location!",
                },
              ]}
            >
              <Input
                placeholder="Location"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      location: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
          </div>
          <div
            className="flexRowWithoutStyle"
            style={{ justifyContent: "space-between", gap: "1rem" }}
          >
            <Form.Item
              label="Email"
              name={"email"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter email!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="e.g. institute@domain.com"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      email: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Contact Number"
              name={"contact"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter contact number!",
                },
                {
                  pattern: /^[\d]{9,11}$/,
                  message: "Phone number should contain 9 to 11 numbers",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Contact number!"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      contact: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
          </div>

          <div
            className="flexRowWithoutStyle"
            style={{ justifyContent: "space-between", gap: "1rem" }}
          >
            <Form.Item
              label="Trading Name"
              name={"tradingName"}
              style={{ width: "100%" }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Please enter trading name!",
              //   },
              // ]}
            >
              <Input
                placeholder="Trading name"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      tradingName: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
            <div
              className="flexRowWithoutStyle"
              style={{
                justifyContent: "space-between",
                gap: "1rem",
                width: "100%",
              }}
            >
              <Form.Item
                label="Agreement Start Date"
                style={{ width: "100%" }}
                name={"agreementStartDate"}
                //   rules={[
                //     {
                //       required: true,
                //       message: "Please enter agreement expiry date!",
                //     },
                //   ]}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  // disabledDate={(cd) => {
                  //   const d = new Date();
                  //   return cd > d;
                  // }}
                  onChange={(e) => {
                    setInstituteData((previousData) => {
                      return {
                        ...previousData,
                        agreementStartDate: e,
                      };
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Agreement Expiry Date"
                style={{ width: "100%" }}
                name={"agreementExpiryDate"}
                //   rules={[
                //     {
                //       required: true,
                //       message: "Please enter agreement expiry date!",
                //     },
                //   ]}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  disabledDate={(cd) => {
                    const d = new Date();
                    return cd < d;
                  }}
                  onChange={(e) => {
                    setInstituteData((previousData) => {
                      return {
                        ...previousData,
                        agreementExpiryDate: e.target.value,
                      };
                    });
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div
            className="flexRowWithoutStyle"
            style={{ justifyContent: "space-between", gap: "1rem" }}
          >
            <Form.Item
              label="Contact Person Name"
              name={"contactPersonName"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter contact person's name!",
                },
              ]}
            >
              <Input
                placeholder="Contact person's name"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      contactPersonName: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="ABN"
              name={"abn"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter abn!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="abn"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      abn: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
          </div>
          <div
            className="flexRowWithoutStyle"
            style={{ justifyContent: "space-between", gap: "1rem" }}
          >
            {/* <Form.Item
          label="Country"
          name={"country"}
          //   rules={[
          //     {
          //       required: true,
          //       message: "Please enter country!",
          //     },
          //   ]}
        >
          <Input placeholder="Country" />
        </Form.Item> */}
            <Form.Item
              label="University URL"
              name={"universityUrl"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter university url!",
                },
                {
                  type: "url",
                  message: "Please enter valid url!",
                },
              ]}
            >
              <Input
                placeholder="University url"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      universityUrl: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
            <div
              className="flexRowWithoutStyle"
              style={{ gap: "0.3rem", width: "100%" }}
            >
              <Form.Item
                label="Country"
                name={"country"}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter country!",
                  },
                ]}
              >
                <Select>
                  {addInstituteState.adminDropdown?.country?.map((dataObj) => {
                    return (
                      <Option key={dataObj.id} value={dataObj.id}>
                        <div
                          onClick={(e) => {
                            setInstituteData((previousData) => {
                              return {
                                ...previousData,
                                country: dataObj.id,
                              };
                            });
                          }}
                        >
                          {dataObj.countryName}
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <a
                className="plusButton"
                onClick={() => {
                  setIsAddCountryModalVisible(true);
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
            <Form.Item label="Type" name={"type"} style={{ width: "100%" }}>
              <Radio.Group
                onChange={(e) => {
                  console.log(e, "from institute");
                  // setType(e.target.value);
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      type: e.target.value,
                    };
                  });
                }}
              >
                <Radio value={"ONSHORE"}>Onshore</Radio>
                <Radio value={"OFFSHORE"}>Offshore</Radio>
                <Radio value={"BOTH"}>Both</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="RTO Number"
              name={"rtoNumber"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter rto number!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="RTO Number"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      rtoNumber: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
          </div>
          <div
            className="flexRowWithoutStyle"
            style={{ justifyContent: "space-between", gap: "1rem" }}
          >
            <Form.Item label="CRICOS" name={"crisco"} style={{ width: "100%" }}>
              <Input
                placeholder="CRICOS"
                onChange={(e) => {
                  setInstituteData((previousData) => {
                    return {
                      ...previousData,
                      crisco: e.target.value,
                    };
                  });
                }}
              />
            </Form.Item>
            <div
              className="flexRowWithoutStyle"
              style={{ gap: "0.3rem", width: "100%" }}
            >
              <Form.Item
                label="Level of College"
                name={"levelOfCollege"}
                style={{ width: "100%" }}
              >
                <Select>
                  {addInstituteState.adminDropdown?.levelOfCollege?.map(
                    (dataObj) => {
                      return (
                        <Option key={dataObj.id} value={dataObj.id}>
                          <div
                            onClick={(e) => {
                              setInstituteData((previousData) => {
                                return {
                                  ...previousData,
                                  levelOfCollege: dataObj.id,
                                };
                              });
                            }}
                          >
                            {dataObj.levelName}
                          </div>
                        </Option>
                      );
                    }
                  )}
                </Select>
              </Form.Item>
              <a
                className="plusButton"
                onClick={() => {
                  setIsAddLevelOfCollegeModalVisible(true);
                }}
              >
                <AiOutlinePlus className="iconColor" />
              </a>
            </div>
          </div>
          <Form.Item
            name={"isBonus"}
            valuePropName="checked"
            style={{ width: "100%" }}
          >
            <Checkbox
              onChange={(e) => {
                setIsBonus(e.target.checked);
                console.log("frm bonus", e);
              }}
            >
              Is Bonus
            </Checkbox>
          </Form.Item>

          {isBonus ? (
            <>
              <div
                style={{
                  backgroundColor: "#eeeeee55",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                }}
              >
                <h3>Bonus:</h3>
                {bonus?.map((singleBonus, index) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                        }}
                      >
                        {instituteData.type === "ONSHORE" ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  label="Onshore Bonus From"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="onshoreFromWhen"
                                    type="number"
                                    value={bonus[index].onshoreFromWhen}
                                    onChange={(value) => {
                                      handleOnshoreBonusFromWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="From"
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="Onshore Bonus To"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="onshoreFromWhen"
                                    value={bonus[index].onshoreToWhen}
                                    type="number"
                                    onChange={(value) => {
                                      handleOnshoreBonusToWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="To"
                                  />
                                </Form.Item>
                              </div>

                              <Form.Item
                                label="Onshore Amount"
                                style={{ width: "100%" }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select a day!",
                                  },
                                ]}
                              >
                                <Input
                                  name="onshorePrice"
                                  value={bonus[index].onshorePrice}
                                  onChange={(value) => {
                                    handleOnshoreBonusPriceChange(value, index);
                                  }}
                                />
                              </Form.Item>
                              <div
                                className="flexRowWithoutStyle"
                                style={{
                                  justifyContent: "space-between",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please pick a type!",
                                    },
                                  ]}
                                >
                                  <Radio.Group
                                    value={
                                      bonus[index].isOnshoreFlat
                                        ? "isFlat"
                                        : bonus[index].isOnshorePercentage
                                        ? "isPercentage"
                                        : null
                                    }
                                    onChange={(e) => {
                                      console.log(e, "from radion");
                                      handleOnshoreBonusIsFlatChange(
                                        e.target.value === "isFlat"
                                          ? true
                                          : false,
                                        index
                                      );
                                      handleOnshoreBonusIsPercentageChange(
                                        e.target.value === "isPercentage"
                                          ? true
                                          : false,
                                        index
                                      );
                                    }}
                                  >
                                    <Radio value={"isFlat"}>Is Flat</Radio>
                                    <Radio value={"isPercentage"}>
                                      Is Percentage
                                    </Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {instituteData.type === "OFFSHORE" ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  label="Offshore Bonus From"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="offshoreFromWhen"
                                    value={bonus[index].offshoreFromWhen}
                                    type="number"
                                    onChange={(value) => {
                                      handleOffshoreBonusFromWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="From"
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="Offshore Bonus To"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="offshoreFromWhen"
                                    type="number"
                                    value={bonus[index].offshoreToWhen}
                                    onChange={(value) => {
                                      handleOffshoreBonusToWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="To"
                                  />
                                </Form.Item>
                              </div>

                              <Form.Item
                                label="Offshore Amount"
                                style={{ width: "100%" }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select a day!",
                                  },
                                ]}
                              >
                                <Input
                                  name="offshorePrice"
                                  value={bonus[index].offshorePrice}
                                  onChange={(value) => {
                                    handleOffshoreBonusPriceChange(
                                      value,
                                      index
                                    );
                                  }}
                                />
                              </Form.Item>
                              <div
                                className="flexRowWithoutStyle"
                                style={{
                                  justifyContent: "space-between",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please pick a type!",
                                    },
                                  ]}
                                >
                                  <Radio.Group
                                    value={
                                      bonus[index].isOffshoreFlat
                                        ? "isFlat"
                                        : bonus[index].isOffshorePercentage
                                        ? "isPercentage"
                                        : null
                                    }
                                    onChange={(e) => {
                                      console.log(e, "from radion");
                                      handleOffshoreBonusIsFlatChange(
                                        e.target.value === "isFlat"
                                          ? true
                                          : false,
                                        index
                                      );
                                      handleOffshoreBonusIsPercentageChange(
                                        e.target.value === "isPercentage"
                                          ? true
                                          : false,
                                        index
                                      );
                                    }}
                                  >
                                    <Radio value={"isFlat"}>Is Flat</Radio>
                                    <Radio value={"isPercentage"}>
                                      Is Percentage
                                    </Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {instituteData.type === "BOTH" ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  label="Onshore Bonus From"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="onshoreFromWhen"
                                    value={bonus[index].onshoreFromWhen}
                                    type="number"
                                    onChange={(value) => {
                                      handleOnshoreBonusFromWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="From"
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="Onshore Bonus To"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="onshoreFromWhen"
                                    value={bonus[index].onshoreToWhen}
                                    type="number"
                                    onChange={(value) => {
                                      handleOnshoreBonusToWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="To"
                                  />
                                </Form.Item>
                              </div>

                              <Form.Item
                                label="Onshore Amount"
                                style={{ width: "100%" }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select a day!",
                                  },
                                ]}
                              >
                                <Input
                                  name="onshorePrice"
                                  value={bonus[index].onshorePrice}
                                  onChange={(value) => {
                                    handleOnshoreBonusPriceChange(value, index);
                                  }}
                                />
                              </Form.Item>
                              <div
                                className="flexRowWithoutStyle"
                                style={{
                                  justifyContent: "space-between",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please pick a type!",
                                    },
                                  ]}
                                >
                                  <Radio.Group
                                    value={
                                      bonus[index].isOnshoreFlat
                                        ? "isFlat"
                                        : bonus[index].isOnshorePercentage
                                        ? "isPercentage"
                                        : null
                                    }
                                    onChange={(e) => {
                                      console.log(e, "from radion");
                                      handleOnshoreBonusIsFlatChange(
                                        e.target.value === "isFlat"
                                          ? true
                                          : false,
                                        index
                                      );
                                      handleOnshoreBonusIsPercentageChange(
                                        e.target.value === "isPercentage"
                                          ? true
                                          : false,
                                        index
                                      );
                                    }}
                                  >
                                    <Radio value={"isFlat"}>Is Flat</Radio>
                                    <Radio value={"isPercentage"}>
                                      Is Percentage
                                    </Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  label="Offshore Bonus From"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="offshoreFromWhen"
                                    type="number"
                                    value={bonus[index].offshoreFromWhen}
                                    onChange={(value) => {
                                      handleOffshoreBonusFromWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="From"
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="Offshore Bonus To"
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a day!",
                                    },
                                  ]}
                                >
                                  <Input
                                    name="offshoreFromWhen"
                                    value={bonus[index].offshoreToWhen}
                                    type="number"
                                    onChange={(value) => {
                                      handleOffshoreBonusToWhenChange(
                                        value,
                                        index
                                      );
                                    }}
                                    placeholder="To"
                                  />
                                </Form.Item>
                              </div>

                              <Form.Item
                                label="Offshore Amount"
                                style={{ width: "100%" }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select a day!",
                                  },
                                ]}
                              >
                                <Input
                                  name="offshorePrice"
                                  value={bonus[index].offshorePrice}
                                  onChange={(value) => {
                                    handleOffshoreBonusPriceChange(
                                      value,
                                      index
                                    );
                                  }}
                                />
                              </Form.Item>
                              <div
                                className="flexRowWithoutStyle"
                                style={{
                                  justifyContent: "space-between",
                                  gap: "1rem",
                                }}
                              >
                                <Form.Item
                                  style={{ width: "100%" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please pick a type!",
                                    },
                                  ]}
                                >
                                  <Radio.Group
                                    value={
                                      bonus[index].isOffshoreFlat
                                        ? "isFlat"
                                        : bonus[index].isOffshorePercentage
                                        ? "isPercentage"
                                        : null
                                    }
                                    onChange={(e) => {
                                      console.log(e, "from radion");
                                      handleOffshoreBonusIsFlatChange(
                                        e.target.value === "isFlat"
                                          ? true
                                          : false,
                                        index
                                      );
                                      handleOffshoreBonusIsPercentageChange(
                                        e.target.value === "isPercentage"
                                          ? true
                                          : false,
                                        index
                                      );
                                    }}
                                  >
                                    <Radio value={"isFlat"}>Is Flat</Radio>
                                    <Radio value={"isPercentage"}>
                                      Is Percentage
                                    </Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                          </>
                        ) : null}

                        {bonus.length > 1 && (
                          <Button
                            color="red"
                            onClick={() => removeBonusInput(index)}
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
                      {bonus.length - 1 === index && (
                        <Button block type="dashed" onClick={addBonusInput}>
                          <PlusOutlined />
                          Add Bonus
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
          <div
            className="flexColumnWithoutStyle"
            style={{
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <Form.Item
              label="Institute Image"
              style={{ width: "100%" }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Please select some file!",
              //   },
              // ]}
            >
              <Input
                type="file"
                placeholder="Image"
                onChange={(e) => {
                  setSelectedInstituteImage(e.target.files[0]);
                }}
              />
            </Form.Item>
            {record.image ? (
              <Image
                src={record.image}
                style={{
                  height: "100px",
                  width: "100px",
                  border: "1px solid #ccc",
                }}
              />
            ) : null}
          </div>

          <Form.Item
            label="Description"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Please enter Description!",
              },
            ]}
          >
            <TextArea placeholder="Write about institute" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Update Institute
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {isAddCountryModalVisible && (
        <AddCountry
          isAddCountryModalVisible={isAddCountryModalVisible}
          setIsAddCountryModalVisible={setIsAddCountryModalVisible}
        />
      )}
      {isAddLevelOfCollegeModalVisible && (
        <AddLevelOfCollege
          isAddLevelOfCollegeModalVisible={isAddLevelOfCollegeModalVisible}
          setIsAddLevelOfCollegeModalVisible={
            setIsAddLevelOfCollegeModalVisible
          }
        />
      )}
    </Drawer>
  );
};

export default UpdateInstitute;
