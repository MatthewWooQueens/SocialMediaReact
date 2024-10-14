import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./lib/axios";
import { NavBar } from "./components/NavBar.jsx";
import { SideBar } from "./components/SideBars.jsx";
import { Loading } from "./components/Loading.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import useAuth from "./lib/useAuth.js";
import  './index.css';

function App() {
	const {user,checkingAuth,checkAuth, refreshToken,logout} = useAuth();
	console.log("rerender")
	useEffect(() =>{
		checkAuth();
		console.log(`checkingauth${checkingAuth}`)
	}, [checkAuth]);

	let isrefresh = null;
	axios.interceptors.response.use(
		(response)=>response,
		async (error) => {
			console.log("intercepted")
			const origin = error.config;
			console.log(origin._retry);
			if (error.response?.status === 401 && !origin._retry){
				origin._retry=true

				try{
					if(isrefresh){
						await isrefresh
						return axios(origin);
					}
					isrefresh = await refreshToken()
					console.log(isrefresh.data)
					isrefresh = null;
					return axios(origin);
				} catch (err){
					console.log(err.message);
					await logout()
					return Promise.reject(err);
				}
			}
			return Promise.reject(error)
		}
	);

	console.log(`checkingauth${checkingAuth}`)
	if (checkingAuth) return <Loading/>;


	return (
		<div className='min-h-screen bg-gray-900 text-white relative'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gray-900' />
				</div>
			</div>
			<div className = 'relative z-50'>
				<NavBar />
				<SideBar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}/>
					<Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>
					<Route path="/logout" element={<Logout/>}/>
				</Routes>
			</div>
		</div>
		
	)
}

export default App
