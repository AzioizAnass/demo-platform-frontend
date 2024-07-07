import {axiosInstance} from "../../shared/utils/instance"
import { useMutation } from "react-query"
import { useRouter } from "next/navigation"
import Alert from '@mui/material/Alert';

const login = async (user) =>{
    const resp = await axiosInstance.post('/api/v1/auth/authenticate',user); 
    return resp.data
}

export const useLogin = () =>{
    const router  = useRouter() ; 
    const { error,isError, isLoading, isSuccess, mutate, mutateAsync, reset, status} = useMutation(login , {
        onSuccess:(data)=>{
        router.push('/dashboard')
        localStorage.setItem("userToken",data.access_token) },
        onError :  (e) => { <Alert severity="error">{e}</Alert> }
    })

    return { error, isError, isLoading, isSuccess, mutate }
}