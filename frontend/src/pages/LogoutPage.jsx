import {Navigate} from "react-router-dom";
import useAuth from "../lib/useAuth.js";
import {useEffect} from "react";

const Logout = () => {
    const {logout,user} = useAuth();
    useEffect(()=>{
        logout();
    },[logout])

    if (!user) return <Navigate to="/login"/>

    return(
        <div className='flex items-center justify-center min-h-screen bg-gray-900'>
			<div className='relative'>
                <div className=" text-white">Loading....</div>
            </div>
        </div>
    )
}

export default Logout;
