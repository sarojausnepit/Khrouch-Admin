import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";
import TableSkeleton from "../../../Helpers/TableSkeleton/tableSkelaton";
import { allActions } from "../../../Redux/myActions";
const columns = [
  {
    title: "Document ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "Document Name",
    dataIndex: "documentName",
    align: "center",
  },
  {
    title: "",
    dataIndex: "download",
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const ManageInstituteDocuments = ({
  record,
  isAddInstituteDocumentsModelVisible,
  setIsAddInstituteDocumentsModelVisible,
}) => {
  const instituteDocumentsState = useSelector(
    (state) => state.InstituteReducer
  );

  const actions = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAddInstituteDocumentsModelVisible === true) {
      actions(
        allActions([...record?.documents], {
          method: "",
          endPoint: ``,
          attempt: "UPDATE_INSTITUTE_DOCUMENTS_REQUEST",
          success: "UPDATE_INSTITUTE_DOCUMENTS_REQUEST_SUCCESS",
          failure: "UPDATE_INSTITUTE_DOCUMENTS_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        })
      );
      // dispatch({
      //   type: "UPDATE_INSTITUTE_DOCUMENTS_REQUEST",
      //   payload: [...record?.documents],
      // });
    }
  }, [isAddInstituteDocumentsModelVisible]);
  const data = instituteDocumentsState.instituteDocuments.map((dataObj) => {
    return {
      key: dataObj.id,
      id: dataObj.id,
      documentName: dataObj.documentName,
      download: dataObj.documentUrl && (
        <a href={dataObj.documentUrl}>Download</a>
      ),

      actions: (
        <Space size="middle">
          <Tooltip title="Delete instituteDocuments">
            <Popconfirm
              title="Are you sure to delete this instituteDocuments?"
              onConfirm={() => {
                actions(
                  allActions(
                    {},
                    {
                      method: "delete",
                      endPoint: `/institute/delete-document/${dataObj.id}`,
                      attempt: "DELETE_INSTITUTE_DOCUMENT_REQUEST",
                      success: "DELETE_INSTITUTE_DOCUMENT_REQUEST_SUCCESS",
                      failure: "DELETE_INSTITUTE_DOCUMENT_REQUEST_FAILURE",
                      //   navigateTo: null,
                      //   successInternalState: (data) => {
                      //     navigation.navigate("LeadDetails", { item });
                      //   },
                      saveBearerToken: true,
                    }
                  )
                );
                // dispatch({
                //   type: "DELETE_INSTITUTE_DOCUMENT_REQUEST",
                //   payload: { id: dataObj.id },
                // });
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
          </Tooltip>
        </Space>
      ),
    };
  });

  console.log("from instituteDocuments state", instituteDocumentsState);
  console.log("from instituteDocuments record", record);
  return (
    <Drawer
      title="Manage Institute Documents"
      placement="right"
      open={isAddInstituteDocumentsModelVisible}
      onClose={() => {
        setIsAddInstituteDocumentsModelVisible(false);
      }}
      width={1163}
      footer={null}
    >
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <Form.Item
            label="Add Documents"
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
              onChange={(e) => {
                const instituteDocumentFormData = new FormData();
                e.target.files[0] &&
                  instituteDocumentFormData.append(
                    "document",
                    e.target.files[0]
                  );
                actions(
                  allActions(instituteDocumentFormData, {
                    method: "post",
                    endPoint: `/institute/update-institute-document/${record.id}`,
                    attempt: "UPLOAD_INSTITUTE_DOCUMENT_REQUEST",
                    success: "UPLOAD_INSTITUTE_DOCUMENT_REQUEST_SUCCESS",
                    failure: "UPLOAD_INSTITUTE_DOCUMENT_REQUEST_FAILURE",
                    //   navigateTo: null,
                    //   successInternalState: (data) => {
                    //     navigation.navigate("LeadDetails", { item });
                    //   },
                    multipartFormData: true,
                    saveBearerToken: true,
                  })
                );
                // dispatch({
                //   type: "UPLOAD_INSTITUTE_DOCUMENT_REQUEST",
                //   payload: {
                //     id: record.id,
                //     formData: instituteDocumentFormData,
                //   },
                // });
                form.resetFields(["file"]);
              }}
            />
          </Form.Item>
        </div>
        <div style={{ marginTop: "4rem" }}>
          {instituteDocumentsState.isLoading ? (
            <TableSkeleton />
          ) : (
            <Table bordered columns={columns} dataSource={data} />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default ManageInstituteDocuments;
