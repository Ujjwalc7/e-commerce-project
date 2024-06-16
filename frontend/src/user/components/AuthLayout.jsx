import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../store/slice/authSlice";

const AuthLayout = ({ children, authentication }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const jwt = localStorage.getItem('jwt');
  const dispatch = useDispatch();
  const location = useLocation();

  const checkJwtExpiry = (jwt) => {
    const decode = jwtDecode(jwt);

    //expiry timestamp of jwt
    const {exp} = decode;

    //converting expiry timestamp to a JS object
    const expiryDate = new Date(exp * 1000);

    if(expiryDate < new Date()){
        localStorage.removeItem('jwt');
        dispatch(logout());
        navigate('/login');
        return;
    }

  }

  useEffect(() => {
    // check if user is logged in and the component is protected. if logged in and authenticated then return the content

    if (authentication && authStatus !== authentication) {
      navigate("/login", {state: location.pathname});
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    if(jwt){
        checkJwtExpiry(jwt);
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return !loading && <div>{children}</div>;
};

export default AuthLayout;