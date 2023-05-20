import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo', 'isAdmin', 'isLogin']);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = cookies.userInfo;
    const _isAdmin = cookies.isAdmin;
    const _isLogin = cookies.isLogin;
    
    setUser(userInfo);
    if(_isAdmin) setIsAdmin(JSON.parse(_isAdmin));
    if(_isLogin) setIsLogin(JSON.parse(_isLogin));

  }, []);

  const handleLogin = (userInfo, isAdmin = false) => {
    setUser(userInfo);
    setIsAdmin(isAdmin);
    setIsLogin(true);

    const expirationTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    setCookie('userInfo', JSON.stringify(userInfo), { expires: expirationTime });
    setCookie('isAdmin', JSON.stringify(isAdmin), { expires: expirationTime });
    setCookie('isLogin', JSON.stringify(true), { expires: expirationTime });
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setIsLogin(false);

    removeCookie('userInfo');
    removeCookie('isAdmin');
    removeCookie('isLogin');
  };


  const value = {
    user,
    isAdmin,
    isLogin,
    handleLogin,
    handleLogout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
