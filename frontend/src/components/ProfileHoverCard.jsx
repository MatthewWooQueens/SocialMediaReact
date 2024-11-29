import {useState,useMemo, useEffect, useCallback} from "react";
import axios from "../lib/axios.js";
import { Loading } from "./Loading.jsx";


export const ProfileHoverCard = (props) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const content = async () =>{
        try{
            const res = await axios.get(`./user/${props.userid}`)
            setUser(res.data)
            setLoading(false)
        }catch (error){
            console.error(error)
            setLoading(false)
            throw error;
        }
    }
    useEffect(()=>{
        if(props.show && !user){
            content();
        }
    },[props.show])


    return (
        <div className={props.show?"block":"hidden"}>
            {/*top-500*/}
            <div className={`absolute transform -translate-x-1/4 translate-y-[40px] z-30`}>
                <div className={`max-w-[352px] min-w-[272px] h-auto bg-slate-800 drop-shadow-2xl shadow-slate-800 rounded-2xl`}>
                    {loading?<Loading/>:
                        <div className="flex flex-col flex-wrap">
                            <div className="mb-2 flex flex-row justify-items-start items-center">
                            <img src="/images/Profile_avatar_placeholder_large.png" alt="profile" className="ml-4 mt-4 mr-3 h-[64px] w-[64px] rounded-full"/>
                                <a>u/{user.username}</a>
                            </div>
                            <a>Threads:{user.thread_count}</a>
                            <a>Comments:{user.comment_count}</a>
                        </div>}
                </div>
            </div>
        </div>
    )
}
