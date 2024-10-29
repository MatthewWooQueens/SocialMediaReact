import {useRef} from 'react';
import useAuth from "../lib/useAuth.js";
import {Navigate} from "react-router-dom"

const Signup = () =>{
    const email = useRef('');
    const email_retype = useRef('');
    const password = useRef('');
    const password_retype = useRef('');
    const username = useRef('');
    const {user,loading,error,signup} = useAuth();


    if(user) return <Navigate to="/home"/>
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email.current,email_retype.current,username.current,password.current,password_retype.current);
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className='top-0 max-w-8x1 mx-auto'>
                <span className="flex flex-row py-4 px-4">
                    <h1 className="text-gray-300">Logo</h1>
                </span>
            </div>
            <div className='flex flex-col items-center justify-start mt-[100px]'> 
                <div className="text-white pb-2">Signup</div>
                <form onSubmit={handleSubmit} className='space-y-6 flex flex-col'>
                    <span className="mr-0 ml-auto">
                        <a className="text-white">Email Address:<a className="text-red-500"> *</a></a>
                        <input
                            type='text' 
                            required 
                            onChange={(e)=>email.current = e.target.value}
                            className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                            placeholder='you@example.com'
                        />
                    </span> 
                    <span className="mr-0 ml-auto">
                    <a className="text-white">Retype Email Address:<a className="text-red-500"> *</a></a>
                        <input
                            type='text'
                            required
                            onChange={(e)=>email_retype.current = e.target.value}
                            className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                            placeholder='you@example.com'
                        />
                    </span>
                    <span className="mr-0 ml-auto">
                    <a className="text-white">Password:<a className="text-red-500"> *</a></a>
                        <input
                            type='password'
                            required
                            onChange={(e)=>password.current = e.target.value}
                            className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                            placeholder='••••••••'
                        />
                    </span>
                    <div className="bg-sky-300 text-sky-800 text-xs w-4/6 px-2 mt-2 ml-36">
                        <li>Password must contain atleast 8 characters</li>
                        <li>Password must contain no more than 16 characters</li>
                        <li>Password must contain at least one digit</li>
                        <li>Password must not contain any whitespace</li>
                    </div>
                    <span className="mr-0 ml-auto">
                    <a className="text-white">Retype Password:<a className="text-red-500"> *</a></a>
                        <input
                            type='password'
                            required
                            onChange={(e)=>password_retype.current = e.target.value}
                            className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                            placeholder='••••••••'
                        />
                    </span>
                    <span className="mr-0 ml-auto">
                        <a className="text-white">Username:<a className="text-red-500"> *</a></a>
                        <input
                            type='text'
                            required
                            onChange={(e)=>username.current = e.target.value}
                            className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                            placeholder='username'
                        />
                    </span>
                    {error?<a className="bg-red-400 mx-20">{error}</a>:<></>}
                    <button className='bg-slate-600 text-white mx-32 active:hover:border-blue-600 border-2 border-gray-900' type='submit' disabled={loading}>
                        {loading? <>Loading...</>:<>Create Account</>}
                    </button>
                </form>
                <span className=" text-white mt-8">
                    <a>Already have an account?</a>
                    <a href="/login" className="hover:text-zinc-400 underline pl-2">Login</a>
                </span>
            </div>
    </div>
    );
};

export default Signup;
