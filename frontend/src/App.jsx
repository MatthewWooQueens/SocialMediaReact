import { Navigate, Route, Routes } from "react-router-dom"

import { NavBar } from "./components/NavBar.jsx";
import { SideBar } from "./components/SideBars.jsx";
import  './index.css';
function App() {

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
		{/* Background gradient */}
		<div className='absolute inset-0 overflow-hidden'>
			<div className='absolute inset-0'>
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gray-900' />
			</div>
		</div>
		<NavBar />
		<SideBar />
		<Routes>
			<Route path="/"/>
		</Routes>
	</div>
    
  )
}

export default App
