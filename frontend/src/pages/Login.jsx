import {useState} from "react";
import axios from "../lib/axios.js";
import useAuth from "../lib/useAuth.js";

const Login = () => {
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState("")
    const {loading, login} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password);
        login(email,password);
    }

    return (
        <div>
            <div className='flex items-center justify-center min-h-screen bg-gray-900'>
                <div className='relative'>
                    <div>Login</div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <input id='email' 
                            type='email' 
                            required 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                            className = 'bg-gray-700'
                            placeholder='you@example.com'
                        />
                        <input id='password' 
                            type='password' 
                            required 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            className = 'bg-gray-700'
                            placeholder='••••••••'
                        />
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
