import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { allActions } from "../../Redux/myActions";

const AddCountry = ({
  isAddCountryModalVisible,
  setIsAddCountryModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
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
  const countryAddResponseToAddImage = (response) => {
    let formData = new FormData();
    formData.append("image", selectedFile);
    selectedFile !== undefined &&
      selectedFile !== null &&
      actions(
        allActions(formData, {
          method: "post",
          endPoint: `/country/upload-image?countryId=${response?.id}`,
          attempt: "UPLOAD_COUNTRY_IMAGE_REQUEST",
          success: "UPLOAD_COUNTRY_IMAGE_REQUEST_SUCCESS",
          failure: "UPLOAD_COUNTRY_IMAGE_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchAdminDropdown();
          },
          multipartFormData: true,
          saveBearerToken: true,
        })
      );

    //   dispatch({
    //     type: "UPLOAD_COUNTRY_IMAGE_REQUEST",
    //     payload: { id: response?.data?.id, formData },
    //   });
    setSelectedFile(null);
  };

  const addCountrySubmitHandler = (value) => {
    actions(
      allActions(
        { ...value },
        {
          method: "post",
          endPoint: `/country/add`,
          attempt: "ADD_COUNTRY_REQUEST",
          success: "ADD_COUNTRY_REQUEST_SUCCESS",
          failure: "ADD_COUNTRY_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            countryAddResponseToAddImage(data);
            fetchAdminDropdown();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_COUNTRY_REQUEST",
    //   payload: value,
    //   payload2: countryAddResponseToAddImage,
    // });
    form.resetFields();
    setIsAddCountryModalVisible(false);
    console.log(value);
  };
  return (
    <Modal
      title="Add Country"
      open={isAddCountryModalVisible}
      onCancel={() => {
        setIsAddCountryModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addCountrySubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Country Name"
          name={"countryName"}
          rules={[
            {
              required: true,
              message: "Please enter country name",
            },
          ]}
        >
          <Input placeholder="Country Name" />
        </Form.Item>
        <Form.Item
          label="Calling Code"
          name={"callingCode"}
          rules={[
            {
              required: true,
              message: "Please enter country calling code",
            },
          ]}
        >
          <Input type="number" placeholder="E.g. 977" />
        </Form.Item>
        <Form.Item label="Country Image">
          <Input
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Country
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCountry;
