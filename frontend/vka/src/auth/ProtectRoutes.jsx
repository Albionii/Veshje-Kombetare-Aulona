import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectRoutes() {
  const [auth, setAuth] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_BASE_URL + "/auth/check-auth", { withCredentials: true })
      .then(() => {
        console.log("auth : " + auth);
        setAuth(true)
      })
      .catch((error) => {
        if (error.response.status == 401){
          setAuth(false)
        }else {
          console.log("Error during authentication");
        }
      });
  }, []);

  if (auth == null) {
    return <div>Loading ...</div>
  }

  return auth ? <Outlet/> : <Navigate to={"/login"}/>
}
