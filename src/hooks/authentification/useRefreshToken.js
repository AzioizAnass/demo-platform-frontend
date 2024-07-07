import { axiosInstance } from "../../shared/utils/instance";
import { useMutation } from "react-query";

const refreshToken = async () => {
  const token = localStorage.getItem("userToken");
  const requestHeaders = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axiosInstance.post(
    "/api/v1/auth/refresh-token",
    requestHeaders
  );
  console.log("token ; " + JSON.stringify(response))
  localStorage.setItem("userToken",response.data.access_token)
  return response.data;
};

export {refreshToken}