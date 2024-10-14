import {useRef, useState, useCallback} from "react";
import axios from "./axios.js";



function  useAuth(){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [checkingAuth,setcheckingAuth] = useState(true)
    const checkingAuthRef = useRef(checkingAuth);

    const updateCheckingAuth = (value) => {
        setcheckingAuth(value);
        checkingAuthRef.current = value
        console.log(`ref${checkingAuthRef.current}`)
    };

    const checkAuth = useCallback(async () =>{
        updateCheckingAuth(true)
        console.log(checkingAuth.current)
        try{ 
            const res = await axios.get("./authenticate/profile");
            console.log(res.data)
            setUser(res.data);
            updateCheckingAuth(false)
        } catch (error) {
            console.log(error.message)
            updateCheckingAuth(false)
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
        try{
            await axios.post("./authenticate/logout");
            setUser(null);
        }catch (error){
            console.error(error.message);
        }
    }

    const refreshToken = useCallback(async() =>{
        console.log(checkingAuth.current)
        if (checkingAuth.current) return;
        updateCheckingAuth(true)
        try{
            const res = await axios.get("./authenticate/refresh");
            updateCheckingAuth(false)
            return res.data;
        } catch (error){
            setUser(null);
            updateCheckingAuth(false)
            throw error;
        }
    },[])


    return {user,checkingAuth,loading,checkAuth,signup,login,logout,refreshToken}
}


export default useAuth;
