import React, { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;

const AddDegree = ({ isAddDegreeModalVisible, setIsAddDegreeModalVisible }) => {
  const store = useSelector((state) => {
    return {
      caseState: state.InstituteReducer,
    };
  });
  const actions = useDispatch();
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
  useEffect(() => {
    fetchAdminDropdown();
    // dispatch({ type: "FETCH_ADMIN_DROPDOWN" });
  }, []);
  const [form] = Form.useForm();
  const addDegreeSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { degreeName: value.degreeName },
        {
          method: "post",
          endPoint: `/degree/add/${value.institute}`,
          attempt: "ADD_DEGREE_REQUEST",
          success: "ADD_DEGREE_REQUEST_SUCCESS",
          failure: "ADD_DEGREE_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchAdminDropdown();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({ type: "ADD_DEGREE_REQUEST", payload: formData });
    form.resetFields();
    setIsAddDegreeModalVisible(false);
  };
  return (
    <Modal
      title="Add Degree"
      open={isAddDegreeModalVisible}
      onCancel={() => {
        setIsAddDegreeModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addDegreeSubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Institute"
          name={"institute"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please select an institute!",
            },
          ]}
        >
          <Select>
            {store.caseState.adminDropdown?.institute?.map((dataObj) => {
              return <Option key={dataObj.id}>{dataObj.instituteName}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Degree Name"
          name={"degreeName"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter degree name!",
            },
          ]}
        >
          <Input placeholder="Degree Name" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Degree
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDegree;
