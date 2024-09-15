import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <div>
          <nav className="flex justify-between items-center mb-6">
                <NavLink to={"/"} className='no-underline hover:underline text-gray-300 hover:text-emerald-400 transition duration-300
					 ease-in-out ${isActive ? "bg-red-500": "bg-black-500"}'>
                    <h1 className = 'text-gray-50'>
                      Hello
                    </h1>
                </NavLink>
    
            <NavLink to={"/"} className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3">
              Create Employee
            </NavLink>

            <NavLink className={({ isActive, isPending, isTransitioning }) =>
                [
                  "px-2 py-2.5",
                  "hover:bg-cprimary-300 hover:text-csecond-100",
                  isPending ? "pending" : "",
                  isActive ? "text-gray-300" : "text-gray-50",
                  isTransitioning ? "transitioning" : "",
                ].join(" ")
              }>
                Testing
              </NavLink>
          </nav>
        </div>
      );
}