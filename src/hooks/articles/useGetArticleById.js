import {axiosInstance} from "../../shared/utils/instance"
import { useQuery } from "react-query"

const getArticleById = async (id) =>{
    const token = localStorage.getItem("userToken")
    const requestHeaders = {
        headers: {
            'Authorization': 'Bearer ' +token
        }}
    const resp = await axiosInstance.get(`/articles/getById/${id}`,requestHeaders); 
    return resp.data
}

export const useGetArticleById = (articleId) =>{
    const { 
        isLoading,
        isError,
        data: article,} = useQuery( ['articlesByPage',articleId], () => getArticleById(articleId),{
        keepPreviousData: true
    }
    )

    return { article, isError, isLoading }
}