import {useEffect,useState} from "react";
import {Navigate,useNavigate} from "react-router-dom";
import useThreads from "../lib/useThreads.js";
import {Loading} from "./Loading.jsx";
import {UserProfile} from "./UserProfile.jsx";
import {LikeButton} from "./LikeButtonThread.jsx";

//HAVE TO GET
export const ThreadsPrev = () => {
    const {loading,threads,getThreads} = useThreads();
    const navigate = useNavigate()
    useEffect(()=>{
        getThreads();
    },[]);

    if (loading) return <Loading/>

    console.log(threads)
    
    const handleClick = (e)=>{
        const id = e.currentTarget.dataset.threadid
        console.log(id)
        navigate(`/threads/${id}`)
    }

    return (
        <>
            {threads?.map((thread) => (
                <div className="rounded-2xl cursor-pointer hover:bg-neutral-700" data-threadid={thread._id} onClick={handleClick}>
                    <article className="w-full m-0">
                        <div className="block px-4 py-2 my-2">
                            <span className="flex flex-wrap items-center relative" onClick={(e) => e.stopPropagation()}>
                                <UserProfile username={thread.username} userid={thread.userId}/>
                            </span>
                            <a className="block font-semibold text-[20px]">
                                {thread.title}
                            </a>
                            <a className="text-ellipsis text-[14px] line-clamp-6 pb-3">
                                {thread.textBody}
                            </a>
                            <span onClick={(e) => e.stopPropagation()}>
                                <LikeButton id={thread._id} liked={thread.liked} amount={thread.likes}/>
                            </span>
                        </div>
                    </article>
                    <hr className="border-0 border-b border-solid"/>
                </div>
            ))}
        </>
    );
}
