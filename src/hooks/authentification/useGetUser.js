import { axiosInstance } from "../../shared/utils/instance";
import { useQuery } from "react-query";

const getUser = async () => {
  const token = localStorage.getItem("userToken");

  console.log("token: " + token);
  const requestHeaders = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axiosInstance.get(
    "/api/v1/users/getfromtoken",
    requestHeaders
  );
  return response.data;
};

export const useGetUser = () => {
  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(["user"], getUser, {
    keepPreviousData: true,
  });

  return { user, isError, isLoading, error };
};
