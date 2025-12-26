import axios from "axios"
export const axiosInstance=axios.create({
    baseURL:import.meta.env.mode==="devlopment" ?"http:/localhost:300/api":"/api",
    withCredentials:true,

})