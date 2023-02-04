import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Comment,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  List,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formattedDateTime } from "../../Helpers/HelperFunction";
const { Option } = Select;
const { TextArea } = Input;

const ViewSupportTicket = ({
  record,
  isViewSupportTicketModalVisible,
  setIsViewSupportTicketModalVisible,
}) => {
  const store = useSelector((state) => {
    return {
      viewTicketState: state.SupportReducer,
      profileState: state.ProfileReducer,
    };
  });
  console.log(store, "store from the support");
  console.log("from view ticket", store.profileState.profile);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  useEffect(() => {
    if (isViewSupportTicketModalVisible === true) {
      dispatch({
        type: "FETCH_TICKET_BY_ID_REQUEST",
        payload: { id: record.id },
      });
    }
  }, [isViewSupportTicketModalVisible]);
  console.log("From record tic", record);
  const replyToSupportTicketSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };

    dispatch({ type: "REPLY_TO_SUPPORT_TICKET_REQUEST", payload: formData });
    form.resetFields();
    setIsViewSupportTicketModalVisible(false);
  };
  let ticketStatus;
  if (store.viewTicketState?.individualTicket?.status === "OPEN") {
    ticketStatus = <p className="greenTag">OPEN</p>;
  } else if (store.viewTicketState?.individualTicket?.status === "PENDING") {
    ticketStatus = <p className="pendingTag">OPEN</p>;
  } else if (store.viewTicketState?.individualTicket?.status === "ASSIGNED") {
    ticketStatus = <p className="assignedTag">ASSIGNED</p>;
  } else if (store.viewTicketState?.individualTicket?.status === "CLOSE") {
    ticketStatus = <p className="pendingTag">CLOSE</p>;
  }
  const updateSupportSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    dispatch({
      type: "REPLY_TO_TICKET_REQUEST",
      payload: { id: record.id, values: value },
    });
    form.resetFields();
  };
  const detailFun = (title, value) => {
    return (
      <div style={{ width: "100%" }}>
        <div className="flexRowSpaceBetween">
          {title}:<span>{value}</span>
        </div>
        <Divider orientationMargin="0" style={{ margin: "0.5rem" }} />
      </div>
    );
  };
  console.log("for profile state view support ticket", store.profileState);

  console.log("From view support ticket", store.viewTicketState);
  return (
    <Drawer
      title="Support Ticket Description"
      open={isViewSupportTicketModalVisible}
      onClose={() => {
        setIsViewSupportTicketModalVisible(false);
      }}
      width={1163}
      footer={null}
    >
      {/* style={{
          border: "2px solid #ccc",
          borderRadius: "15px",
          width: "90%",
          margin: "0 auto",
          padding: "2rem",
        }} */}
      <div
        style={{
          borderRadius: "15px",
          width: "90%",
          margin: "0 auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            borderRadius: "1.5rem",
            padding: "0.8rem",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
          }}
        >
          {detailFun(
            "Created by",
            `${
              store.viewTicketState?.individualTicket?.createdBy?.emailId ??
              "N/A"
            }`
          )}
          {detailFun(
            "Problem Category",
            `${
              store.viewTicketState?.individualTicket?.ticketTitle
                ?.categoryName ?? "N/A"
            }`
          )}
          {detailFun(
            "Submitted",
            `${
              store.viewTicketState?.individualTicket?.addedTime
                ? formattedDateTime(
                    store.viewTicketState?.individualTicket?.addedTime
                  )
                : "N/A"
            }`
          )}
          {detailFun(
            "Ticket Status",

            ticketStatus
          )}
          {detailFun(
            "Ticket Description",
            `${
              store.viewTicketState.individualTicket?.ticketDescription ?? "N/A"
            }`
          )}
        </div>
        <div
          style={{
            borderRadius: "1.5rem",
            padding: "0.8rem",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
            border: "1px solid #ddd",
          }}
        >
          <List
            className="comment-list"
            header={`${store.viewTicketState.individualTicket?.replies?.length} replies`}
            itemLayout="horizontal"
            dataSource={store.viewTicketState.individualTicket?.replies}
            renderItem={(dataObj) => (
              <li key={dataObj.id}>
                {console.log("from list render", dataObj)}
                <Comment
                  key={dataObj.id}
                  actions={() => {}}
                  author={<a>{dataObj.replyAddedBy}</a>}
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "blue",
                        verticalAlign: "middle",
                      }}
                      size="large"
                    >
                      {dataObj.replyAddedBy.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  content={
                    <div>
                      <p>{dataObj.replyDescription}</p>
                    </div>
                  }
                  datetime={
                    <Tooltip>
                      <span>{formattedDateTime(dataObj.replyAddedTime)}</span>
                    </Tooltip>
                  }
                />
              </li>
            )}
          />

          <Comment
            avatar={
              <Avatar
                style={{
                  backgroundColor: "blue",
                  verticalAlign: "middle",
                }}
                size="large"
              >
                {store.profileState?.profile?.userName?.charAt(0).toUpperCase()}
              </Avatar>
            }
            content={
              <>
                <Form
                  layout="vertical"
                  onFinish={updateSupportSubmitHandler}
                  colon={true}
                  form={form}
                >
                  <Form.Item name={"supportReply"}>
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" onClick={() => {}} type="primary">
                      Reply
                    </Button>
                  </Form.Item>
                </Form>
              </>
            }
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ViewSupportTicket;
