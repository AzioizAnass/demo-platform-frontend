import {axiosInstance} from "../../shared/utils/instance"
import { useMutation } from "react-query"
import { useRouter } from "next/navigation"

const signup = async (user) =>{
    const resp = await axiosInstance.post('/api/v1/auth/register',user); 
    return resp.data
}

export const useSignUp = () =>{
    const router  = useRouter() ; 
    const { error,isError, isLoading, isSuccess, mutate, mutateAsync, reset, status} = useMutation(signup , {
        onSuccess:(data)=>{
        router.push('/dashboard')
        localStorage.setItem("userToken",data.access_token) },
        onError :  (e) => { console.log('err', e) }
    })

    return { error, isError, isLoading, isSuccess, mutate }
}