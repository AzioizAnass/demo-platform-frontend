import {axiosInstance} from "../../shared/utils/instance"
import { useMutation } from "react-query"

const saveComment = async (comment) =>{
    const token = localStorage.getItem("userToken")
    const requestHeaders = {
        headers: {
            'Authorization': 'Bearer ' +token
        }}
    const resp =await axiosInstance.post('comments/save',comment,requestHeaders); 
    return resp.data
}

export const useComment = () =>{
    const { error,isError, isLoading, isSuccess, mutate:comment} = useMutation(saveComment , {
        onSuccess:(data)=>{
        console.log(data) },
        onError :  (e) => { console.log('err', e) }
    })

    return { error, isError, isLoading, isSuccess, comment }
}