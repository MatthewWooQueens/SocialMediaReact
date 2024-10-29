import {useRef, useState, useEffect, useCallback} from "react";
import { UserContext } from "../UserContext.jsx";
import { useContext } from "react";
import axios from "./axios.js";



function  useAuth(){
    //const [user, setUser] = useState(null);
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [checkingAuth,setcheckingAuth] = useState(true);
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
            if (error.response){
                console.error(error.response.data);
                setError(error.response.data);
            }else{
                setError('Error: Network Error')
            }
        }
    }

    const signup = async (email,email_retype,username,password,password_retype) =>{
        setLoading(true);
        const email_regex = /^\S+@\S+\.\S+$/

        if (!(email.length < 255) || !email_regex.test(email)){
            setLoading(false)
            setError("Invalid Email")
            return
        }

        if (email !== email_retype){
            setLoading(false)
            setError("Email's are not the same")
            return
        }

        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\w\W]{8,}$/;
        if (!(password.length < 16 && password.length>7) || !reg.test(password)){
            setLoading(false);
            setError("Invalid Password");
            return;
        }

        if (password !== password_retype){
            setLoading(false);
            setError("Password's are not the same");
            return;
        }

        try{
            const res = await axios.post("./authenticate/signup",{email,username,password});
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message);
            setError(error.response.data);
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

    useEffect(() =>{
		checkAuth();
		console.log(`checkingauth${checkingAuth}`)
	}, [checkAuth]);


    return {user,checkingAuth,loading,error,checkAuth,signup,login,logout,refreshToken}
}


export default useAuth;
