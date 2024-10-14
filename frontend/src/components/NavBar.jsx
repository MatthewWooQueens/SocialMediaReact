import { NavLink } from "react-router-dom";
import logo from '/images/Placeholder_logo.png';
import prof from '/images/Profile_avatar_placeholder_large.png';

export const NavBar = () => {
    return (
        <div className="sticky top-0 z-40 w-full flex-none bg-gray-900 bg-opacity-90 border-b">
          <div className="max-w-8x1 mx-auto">
            <div className="py-4 lg:px-8 mx-4">
              <nav className="relative flex items-center">
                    <NavLink to="/" className='mr-3 ${isActive ? "bg-red-500": "bg-black-500"}'>
                        <img src={logo} alt="Logo" className = "w-40 max-h-5"/>
                    </NavLink>

                    <div className="relative px-3">
                      v0.01
                    </div>
                    <NavLink to="/" className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3">
                      Create Employee
                    </NavLink>
                    <div className="relative flex item-center ml-auto">
                      {/*Dark Mode*/}
                      <div className = 'inline-flex items-center px-3'>
                        Dark Mode
                      </div>
                      {/*Profile Icon*/}
                      <div className='px-3'>
                        <NavLink to="/logout">
                          <img src={prof} alt='Profile Picture'className="w-10"/>
                        </NavLink>
                      </div>        
                    </div>
              </nav>
            </div>
          </div>
        </div>
      );
}
