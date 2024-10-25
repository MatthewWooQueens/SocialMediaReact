import {useState,useContext} from "react";
import {Navigate} from "react-router-dom"
import useAuth from "../lib/useAuth.js";
import {UserContext} from "../UserContext.jsx"

const Login = () => {
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState("")
    const {loading, error,login} = useAuth();
    const {user} = useContext(UserContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password);
        login(email,password);

    };
    console.log("rerender")
    console.log(password)
    if(user) return <Navigate to="/home"/>

    return (
            <div className='flex items-center justify-center min-h-screen bg-gray-900'>
                <div className='relative'>
                    {error?<div className="text-red-500">{error}</div>:<div className="text-white">Login</div>}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <input id='email' 
                            type='email' 
                            required 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                            className = 'bg-gray-700 px-4 mx-2'
                            placeholder='you@example.com'
                        />
                        <input id='password' 
                            type='password' 
                            required 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            className = 'bg-gray-700 px-4 mx-2'
                            placeholder='••••••••'
                        />
                        <button className='text-white mx-2' type='submit' disabled={loading}>
                            {loading? <>Loading...</>:<>Login</>}
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default Login;
