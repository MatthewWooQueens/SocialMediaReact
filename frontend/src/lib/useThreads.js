import {useState, useEffect, useCallback} from "react";
import axios from "./axios.js";

function useThreads(){
    const [loading, setLoading] = useState(false)
    const [threads, setThreads] = useState([])

    const getThreads = useCallback(async () =>{
        setLoading(true);
        try{
            const res = await axios.get("./thread")
            console.log(res.data)
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

    return {loading,threads, getThreads}



}

export default useThreads;
