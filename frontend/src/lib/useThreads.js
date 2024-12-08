import {useState, useContext, useCallback,useMemo} from "react";
import axios from "./axios.js";
import {UserContext} from "../UserContext.jsx"

function useThreads(){
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false)
    const [threads, setThreads] = useState([])
    const [like,setLike] = useState(false)
    const [dislike,setDislike] = useState(false)

    const getThreads = useCallback(async () =>{
        setLoading(true);
        try{
            const res = await axios.get(`./thread`,{params:{id:user._id}})
            setThreads(res.data)
            setLoading(false)
        }catch (error){
            setLoading(false)
            console.error(error.response)
        }
    },[])

    const createThread = (title,text) =>{
        setLoading(true)
        try{
            const res = axios.post("./thread",{title,text})
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.error(error.response)
        }
        
    }
    //FIXING ISSUE WITH USER ID NOT BEING REMOVED FROM LIKE ARRAY
    const likeThread = async (thread,add) =>{
        setLoading(true);
        try{
            const res = await axios.post("./thread/like",{add,id:thread,userid:user._id})
            setLoading(false);
            res.status(200).send("sent")
        } catch (error) {
            setLoading(false);
            console.error(error.response);
        }

    }

    const dislikeThread = async (thread,add) => {
        setLoading(true);
        try{
            const res = await axios.post("./thread/dislike",{add,id:thread,userid:user._id})
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.response);
        }

    }

    const checkLikeThread = (thread) => {
        
    }

    return {loading,threads, getThreads,likeThread,dislikeThread}

}

export default useThreads;
