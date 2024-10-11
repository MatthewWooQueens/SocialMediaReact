import {useEffect, useState, useCallback} from "react";
import axios from "./axios.js";



function  useAuth(){
    const [user, setUser] = useState(null)
    const [checkingAuth, setcheckingAuth] = useState(false)
    const [loading, setLoading] = useState(false)


    const checkAuth = useCallback(async () =>{
        setcheckingAuth(true);
        try{ 
            const res = await axios.get("./authenticate/profile");
            console.log(res.data)
            setUser(res.data);
            setcheckingAuth(false);
        } catch (error) {
            console.log(error.message)
            setcheckingAuth(false);
            setUser(null);
        }
    },[])

    const login = async (email, password) =>{
        setLoading(true);
        try{
            const res = await axios.post("./authenticate/login",{email,password});
            console.log(res)
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message);
        }
    }

    const signup = async (email,username,password) =>{
        setLoading(true);
        try{
            const res = await axios.post("./authenticate/signup",{email,username,password});
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setUser(null);
            setLoading(false);
            console.error(error.message);
        }
    }

    const logout = async () =>{
        setLoading(true);
        try{
            await axios.post("./authenticate/logout");
            setUser(null);
        }catch (error){
            console.error(error.message);
        }
    }

    const refreshToken = useCallback(async() =>{
        if (checkingAuth) return;
        setcheckingAuth(true);
        try{
            const res = await axios.get("./authenticate/refresh");
            setcheckingAuth(false);
            return res.data;
        } catch (error){
            setUser(null);
            setcheckingAuth(false)
            throw error;
        }
    },[])


    return {user,checkingAuth,loading,checkAuth,signup,login,logout,refreshToken}
}


export default useAuth;
