import useAuth from "../lib/useAuth.js";
import {useEffect} from "react";

const Logout = () => {
    const {logout} = useAuth();
    useEffect(()=>{
        logout();
    },[logout])
    return(
        <div className='flex items-center justify-center min-h-screen bg-gray-900'>
			<div className='relative'>
                <div className=" text-white">Loading....</div>
            </div>
        </div>
    )
}

export default Logout;
