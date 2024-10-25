import { createBrowserRouter, Navigate } from 'react-router-dom';

import Home from "./pages/HomePage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Profile from "./pages/ProfilePage.jsx";
import Logout from "./pages/LogoutPage.jsx";
import Thread from "./pages/ThreadPage.jsx";

import AuthLayout from "./components/layouts/AuthLayout.jsx";
import {UserContextProvider} from "./UserContext.jsx";

import App from './App.jsx';



export const router = createBrowserRouter([
     {
        element:<UserContextProvider/>,
        children:[  
        {
            path:"/",
            element: <App />,
            children: [
                {
                    index:true,
                    element:<Navigate to="/home"/> 
                },
                {
                    path:"/home",
                    element:<Home/>
                },
                {
                    path:"/profile",
                    element:<Profile/>
                },
                {
                    path:"/threads/:id",
                    element:<Thread/>
                }
            ],
        },
        {
            element:<AuthLayout/>,
            children:[ 
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path:"/signup",
                    element:<Signup/>
                }
            ]
        },
        {
            path:"/logout",
            element:<Logout/>,
        }
    ]} 
])
