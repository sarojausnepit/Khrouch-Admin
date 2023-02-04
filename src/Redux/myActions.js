export const allActions = (
  payload = {},
  type = {
    method: "post",
    endPoint: "delivery-user/login",
    attempt: "LOGIN_FETCHING_DATA_ATTEMPT",
    success: "LOGIN_FETCHING_DATA_SUCCESS",
    failure: "LOGIN_FETCHING_DATA_FAILURE",
    navigateTo: "ABC",

    saveBearerToken: false,
    successInternalState: () => console.log("hello"),
    failureInternalState: () => console.log("adf"),
  }
) => ({ type: type.attempt, type_data: type, payload });

export const updateProfilePictureAction = (payload = 0) => ({
  type: "IMAGE_UPLOAD_FETCHING_DATA_ATTEMPT",
  payload,
});
