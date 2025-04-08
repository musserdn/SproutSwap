import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

// This component flashes on the screen while the logout() function is running, 
// and then it redirects to the /login page
export default function() {
  const navigate = useNavigate();

  useEffect(()=>{
    logout();
    navigate('/login');
  }, [])
}