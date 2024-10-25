import {useMemo, useState,useRef} from "react";
import {ProfileHoverCard} from "./ProfileHoverCard.jsx";

export const UserProfile = (props) => {
    const targetRef = useRef(null);
    const timeRef = useRef(null)
    const [show, setShow] = useState(false)
    const [properties,setProperties] = useState({top:0, left:0})
    console.log("render");

    const handleMouseEnter = () => {
        if (timeRef.current){
            clearTimeout(timeRef.current);
            timeRef.current=null
        }else{
            timeRef.current = setTimeout(()=>{
                setProperties({
                    top:targetRef.current.getBoundingClientRect().width/2,
                    left:targetRef.current.getBoundingClientRect().height})
                setShow(true)
                timeRef.current = null
            },500)
        }

    }
    const handleMouseLeave = () => {
        if (timeRef.current){
            clearTimeout(timeRef.current);
            timeRef.current=null
        }else{
            timeRef.current = setTimeout(()=>{
                setShow(false)
                timeRef.current = null
            }, 150)
        }
        
    }

    return (
        <span className="flex justify-between text-12 min-h-[32px]" ref={targetRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src="/images/Profile_avatar_placeholder_large.png" alt="profile" className="h-7 w-7 rounded-full"/>
            <a className="px-2">{props.username}</a>
            <ProfileHoverCard top={properties.right} left={properties.left} userid={props.userid} show={show}/>
        </span>
    )
}
