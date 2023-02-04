import moment from "moment";
export const date = (date) => {
  return moment.utc(date).local().format("YYYY-MM-DD");
};
export const date00Time = (date) => {
  return (
    moment.utc(date).local().format("YYYY-MM-DD") +
    "T" +
    moment.utc(time).local().format("00:00:00")
  );
};
export const time = (time) => {
  return moment.utc(time).local().format("HH:mm:ss");
};

export const dateAndTime = (date, time) => {
  return (
    moment.utc(date).local().format("YYYY-MM-DD") +
    "T" +
    moment.utc(time).local().format("HH:mm:ss")
  );
};

export const formattedDate = (date) => {
  return date ? moment.utc(date).local().format("DD-MM-YYYY") : "";
};
export const YYYYMMDD = (date) => {
  return date ? moment.utc(date).local().format("YYYY-MM-DD") : "";
};
export const formattedDateTime = (dateTime) => {
  return dateTime
    ? moment.utc(dateTime).local().format("DD-MM-YYYY HH:mm:ss")
    : "";
};

export function getTimeZone() {
  var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
  return (
    (offset < 0 ? "+" : "-") +
    ("00" + Math.floor(o / 60)).slice(-2) +
    ":" +
    ("00" + (o % 60)).slice(-2)
  );
}

export const threeTagResponses = (dataObj, status1, status2, status3) => {
  let status;
  if (dataObj === status1) {
    status = <p className="orangeTag">{status1}</p>;
  } else if (dataObj === status2) {
    status = <p className="blueTag">{status2}</p>;
  } else if (dataObj === status3) {
    status = <p className="greenTag">{status3}</p>;
  }
  return status;
};
export const twoTagResponses = (dataObj, status1, status2) => {
  let status;
  if (dataObj === status1) {
    status = <p className="greenTag">YES</p>;
  } else if (dataObj === status2) {
    status = <p className="redTag">NO</p>;
  }
  return status;
};
export const twoTagResponsesWithStatuses = (dataObj, status1, status2) => {
  let status;
  if (dataObj === status1) {
    status = <p className="greenTag">{status1}</p>;
  } else if (dataObj === status2) {
    status = <p className="redTag">{status2}</p>;
  }
  return status;
};
