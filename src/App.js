import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/LoginForm";
import Signup from "./pages/Signup/SignUpForm";
import Profile from "./pages/AdminProfile/AdminProfile";
import { createContext, useEffect, useState } from "react";

// context for handling the logged in state of user
export const AuthContext = createContext();

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("isLoggedin"));

  const navigator = useNavigate();

  // redirecting the user to login page if not logged in
  useEffect(() => {
    if(!isLoggedin) navigator("/login");
  }, [isLoggedin]);

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedin }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
