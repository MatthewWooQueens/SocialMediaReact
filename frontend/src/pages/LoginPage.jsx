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
            <div className="min-h-screen bg-gray-900">
                <div className='top-0 max-w-8x1 mx-auto'>
                        <span className="flex flex-row py-4 px-4">
                            <h1 className="text-gray-300">Logo</h1>
                        </span>
                </div>
                <div className='flex flex-col items-center justify-center mt-[100px]'>
                        <div className="text-white items-center mb-4">Login</div>
                        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
                            <span className="mr-0 ml-auto">
                                <a className="text-white">Email: </a>
                                <input id='email'
                                    type='email'
                                    required
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                                    placeholder='you@example.com'
                                />
                            </span>
                            <span className="mr-0 ml-auto">
                                <a className="text-white">Password: </a>
                                <input id='password'
                                    type='password'
                                    required
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className = 'bg-gray-700 text-white text-sm w-72 px-4 mx-2'
                                    placeholder='••••••••'
                                />
                            </span>
                            {error?<a className="bg-red-400 mx-20">{error}</a>:<></>}
                            <button className='bg-slate-600 text-white mx-32 active:hover:border-blue-600 border-2 border-gray-900' type='submit' disabled={loading}>
                                {loading? <>Loading...</>:<>Login</>}
                            </button>
                        </form>
                    <span className=" text-white mt-8">
                        <a>Don't have an account?</a>
                        <a href="/signup" className="hover:text-zinc-400 underline pl-2">Signup</a>
                    </span>
                </div>
            </div>
    );
};

export default Login;
