import {Outlet} from "react-router-dom";


const ProtectedLayout = () => {
    return(
        <div className='min-h-screen bg-gray-900 text-white relative'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gray-900' />
				</div>
			</div>
			<div className = 'relative z-50'>
				<NavBar />
				<SideBar />
				<Outlet/>
			</div>
		</div>
    )
}

export default ProtectedLayout;
