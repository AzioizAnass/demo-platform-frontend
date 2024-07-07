import { axiosInstance } from "../../shared/utils/instance";
import { refreshToken } from "../authentification/useRefreshToken";
import { useQuery } from "react-query";

const getArticlesByPage = async (pageSize, pageNumber, keyword) => {
  const token = localStorage.getItem("userToken");
  const requestHeaders = {
    Authorization: "Bearer " + token,
  };
  try{
  const resp = await axiosInstance.get(
    `/articles/search/${pageSize}/${pageNumber}?keyword=${keyword}`,
    {
      headers: requestHeaders
    }
  );
  return resp.data;}catch(e){console.log(e)}
};

export const useGetArticlesPage = (pageSize, pageNumber, searchQuery) => {
  const {
    isLoading,
    isError,
    error,
    data: articlePage,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["articlesByPage", pageNumber, searchQuery, pageSize],
    () => getArticlesByPage(pageSize, pageNumber - 1, searchQuery),
    {
      keepPreviousData: true,
    }
  );

  return { articlePage, isError, isLoading };
};
