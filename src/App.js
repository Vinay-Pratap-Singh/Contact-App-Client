import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import Login from "./pages/Login/LoginForm";
import Signup from "./pages/Signup/SignUpForm";
import Profile from "./pages/AdminProfile/AdminProfile";
import { createContext, useEffect, useState } from "react";

// context for handling the logged in state of user
export const AuthContext = createContext();

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("isLoggedin") || null
  );

  const navigator = useNavigate();

  // redirecting the user to login page if not logged in
  useEffect(() => {
    navigator("/login");
  }, [isLoggedin]);

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedin }}>
      <Routes>
        {isLoggedin && <Route path="/" element={<Dashboard />} />}
        {isLoggedin && <Route path="/profile" element={<Profile />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
