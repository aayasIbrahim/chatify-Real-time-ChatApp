import{create} from "zustand";
export const useAuthStore=create(()=>({
    login:()=>{
        console.log("login")
    },
    isloading:false
}))