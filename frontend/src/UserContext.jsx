import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const UserContext = createContext(null)

export const UserContextProvider = () => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user,setUser}}>
            <Outlet/>
        </UserContext.Provider>
    )
}
