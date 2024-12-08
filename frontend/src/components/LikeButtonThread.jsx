import useThreads from '../lib/useThreads.js';
import {useState,useCallback} from 'react';

export const LikeButton = (props) => {
    const [likeButton,setLikeButton] = useState(props.liked);
    const [likeAmount,setLikeAmount] = useState(props.amount);
    const {likeThread,dislikeThread} = useThreads()

    const clickLike = (e)=>{
        if (likeButton===true){
            likeThread(props.id,false)
            setLikeButton(null)
            setLikeAmount(likeAmount-1)
        }else{
            likeThread(props.id,true)
            setLikeButton(true)
            setLikeAmount(likeAmount+1)
        }
    }
    const clickDislike = (e)=>{
        if (likeButton===false){
            dislikeThread(props.id,true)
            setLikeButton(null)
        }else{
            dislikeThread(props.id,false)
            if(likeButton===true){
                setLikeAmount(likeAmount-1)
            }
            setLikeButton(false)
        }
    }

    //amount = 2
    /*
    null to true = 3

    */
    return (
        <span className="flex flex-row items-center">
            <a className="bg-gray-700  hover:bg-gray-400 h-8 max-w-max flex items-center rounded-l-2xl pl-2" onClick={clickLike}>
                <svg className={`stroke-[2px] ${likeButton===true?"stroke-none":"fill-none"}`} fill='white' stroke="white" width="20" height="20" viewBox="0 0 24 24"
 xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.39062 18.4907V8.33071C8.39062 7.93071 8.51062 7.54071 8.73062 7.21071L11.4606 3.15071C11.8906 2.50071 12.9606 2.04071 13.8706 2.38071C14.8506 2.71071 15.5006 3.81071 15.2906 4.79071L14.7706 8.06071C14.7306 8.36071 14.8106 8.63071 14.9806 8.84071C15.1506 9.03071 15.4006 9.15071 15.6706 9.15071H19.7806C20.5706 9.15071 21.2506 9.47071 21.6506 10.0307C22.0306 10.5707 22.1006 11.2707 21.8506 11.9807L19.3906 19.4707C19.0806 20.7107 17.7306 21.7207 16.3906 21.7207H12.4906C11.8206 21.7207 10.8806 21.4907 10.4506 21.0607L9.17062 20.0707C8.68062 19.7007 8.39062 19.1107 8.39062 18.4907Z"/>
                    <path d="M5.21 6.37891H4.18C2.63 6.37891 2 6.97891 2 8.45891V18.5189C2 19.9989 2.63 20.5989 4.18 20.5989H5.21C6.76 20.5989 7.39 19.9989 7.39 18.5189V8.45891C7.39 6.97891 6.76 6.37891 5.21 6.37891Z"/>
                </svg>
                <div className='pl-2 select-none'>
                    {likeAmount}
                </div>
                <div className="justify-end w-[1px] h-6 ml-4 bg-slate-500"></div>
            </a>
            <a className="bg-gray-700  hover:bg-gray-400 h-8 max-w-max flex items-center rounded-r-2xl px-2" onClick={clickDislike}>
                <svg className={`stroke-[2px] ${likeButton===false?"stroke-none":"fill-none"}`} fill='white' stroke='white' width="20" height="20" viewBox="0 0 24 24" transform="scale(-1,-1)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.39062 18.4907V8.33071C8.39062 7.93071 8.51062 7.54071 8.73062 7.21071L11.4606 3.15071C11.8906 2.50071 12.9606 2.04071 13.8706 2.38071C14.8506 2.71071 15.5006 3.81071 15.2906 4.79071L14.7706 8.06071C14.7306 8.36071 14.8106 8.63071 14.9806 8.84071C15.1506 9.03071 15.4006 9.15071 15.6706 9.15071H19.7806C20.5706 9.15071 21.2506 9.47071 21.6506 10.0307C22.0306 10.5707 22.1006 11.2707 21.8506 11.9807L19.3906 19.4707C19.0806 20.7107 17.7306 21.7207 16.3906 21.7207H12.4906C11.8206 21.7207 10.8806 21.4907 10.4506 21.0607L9.17062 20.0707C8.68062 19.7007 8.39062 19.1107 8.39062 18.4907Z"/>
                    <path d="M5.21 6.37891H4.18C2.63 6.37891 2 6.97891 2 8.45891V18.5189C2 19.9989 2.63 20.5989 4.18 20.5989H5.21C6.76 20.5989 7.39 19.9989 7.39 18.5189V8.45891C7.39 6.97891 6.76 6.37891 5.21 6.37891Z"/>
                </svg>
            </a>
        </span>
    )
}