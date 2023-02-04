import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddSupportCategory from "./AddSupportCategory";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;
const { TextArea } = Input;

const AddSupport = ({
  isaddSupportModalVisible,
  setIsaddSupportModalVisible,
}) => {
  const supportState = useSelector((state) => state.SupportReducer);
  const actions = useDispatch();
  const [
    isAddSupportCategoryModalVisible,
    setIsAddSupportCategoryModalVisible,
  ] = useState(false);
  useEffect(() => {
    if (isaddSupportModalVisible === true) {
      actions(
        allActions(
          {},
          {
            method: "get",
            endPoint: `/support/category/get-all-active`,
            attempt: "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST",
            success: "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST_SUCCESS",
            failure: "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST_FAILURE",
            //   navigateTo: null,
            //   successInternalState: (data) => {
            //     navigation.navigate("LeadDetails", { item });
            //   },
            saveBearerToken: true,
          }
        )
      );

      // dispatch({ type: "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST" });
    }
  }, [isaddSupportModalVisible]);
  const [form] = Form.useForm();
  const addSupportSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        {},
        {
          method: "post",
          endPoint: `/institute/get-all-institute`,
          attempt: "ADD_SUPPORT_REQUEST",
          success: "ADD_SUPPORT_REQUEST_SUCCESS",
          failure: "ADD_SUPPORT_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );

    // dispatch({ type: "ADD_SUPPORT_REQUEST", payload: formData });
    form.resetFields();
    setIsaddSupportModalVisible(false);
  };
  console.log("fromsadd support ", supportState);
  return (
    <Modal
      title="Add Support"
      open={isaddSupportModalVisible}
      onCancel={() => {
        setIsaddSupportModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addSupportSubmitHandler}
        colon={true}
        form={form}
      >
        <div
          className="flexRowWithoutStyle"
          style={{ gap: "0.3rem", width: "100%" }}
        >
          <Form.Item
            label="Problem Category"
            name={"problemCategory"}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter your problem category!",
              },
            ]}
          >
            <Select>
              {supportState?.activeSupportCategory?.data?.map((dataObj) => {
                return <Option key={dataObj.id}>{dataObj.categoryName}</Option>;
              })}
            </Select>
          </Form.Item>
          <a
            className="plusButton"
            onClick={() => {
              setIsAddSupportCategoryModalVisible(true);
            }}
          >
            <AiOutlinePlus className="iconColor" />
          </a>
        </div>

        <Form.Item      
          label="Problem Description"
          name={"problemDescription"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Write about your problem!",
            },
          ]}
        >
          <TextArea placeholder="problemDescription" rows={10} />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Support
          </Button>
        </Form.Item>
      </Form>
      {isAddSupportCategoryModalVisible && (
        <AddSupportCategory
          isAddSupportCategoryModalVisible={isAddSupportCategoryModalVisible}
          setIsAddSupportCategoryModalVisible={
            setIsAddSupportCategoryModalVisible
          }
        />
      )}
    </Modal>
  );
};

export default AddSupport;
