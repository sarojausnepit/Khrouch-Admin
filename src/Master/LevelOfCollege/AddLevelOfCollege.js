import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;

const AddLevelOfCollege = ({
  isAddLevelOfCollegeModalVisible,
  setIsAddLevelOfCollegeModalVisible,
}) => {
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
  const addLevelOfCollegeSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `/level-of-college/add`,
          attempt: "ADD_LEVEL_OF_COLLEGE_REQUEST",
          success: "ADD_LEVEL_OF_COLLEGE_REQUEST_SUCCESS",
          failure: "ADD_LEVEL_OF_COLLEGE_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchAdminDropdown();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_LEVEL_OF_COLLEGE_REQUEST",
    //   payload: { id: 1, formData },
    // });
    form.resetFields();
    setIsAddLevelOfCollegeModalVisible(false);
  };
  return (
    <Modal
      title="Add Level of College"
      open={isAddLevelOfCollegeModalVisible}
      onCancel={() => {
        setIsAddLevelOfCollegeModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addLevelOfCollegeSubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Level of College"
          name={"levelName"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter level of college!",
            },
          ]}
        >
          <Input placeholder="College Level" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Level of College
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLevelOfCollege;
