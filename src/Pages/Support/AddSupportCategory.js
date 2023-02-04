import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { act } from "react-dom/test-utils";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;

const AddSupportCategory = ({
  isAddSupportCategoryModalVisible,
  setIsAddSupportCategoryModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const addSupportCategorySubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        {},
        {
          method: "post",
          endPoint: `/support/category/add`,
          attempt: "ADD_SUPPORT_CATEGORY_REQUEST",
          success: "ADD_SUPPORT_CATEGORY_REQUEST_SUCCESS",
          failure: "ADD_SUPPORT_CATEGORY_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({ type: "ADD_SUPPORT_CATEGORY_REQUEST", payload: formData });
    form.resetFields();
    setIsAddSupportCategoryModalVisible(false);
  };
  return (
    <Modal
      title="Add Support Category"
      open={isAddSupportCategoryModalVisible}
      onCancel={() => {
        setIsAddSupportCategoryModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addSupportCategorySubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Category Name"
          name={"categoryName"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter category name!",
            },
          ]}
        >
          <Input placeholder="Category Name" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Support Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSupportCategory;
