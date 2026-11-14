import axios from "axios";
import useAuthStore from "./../store/useAuthStore";

const authAxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BURL}`,
    headers: {
        "Accept-Language": "en",
    }
});

authAxiosInstance.interceptors.request.use((config)=>{
const token = useAuthStore.getState().token;
if(token){
    config.headers.Authorization =`Bearer ${token}`
}
return config;
})
export default authAxiosInstance;