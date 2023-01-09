import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/LoginForm";
import Signup from "./pages/Signup/SignUpForm";
import Profile from "./pages/AdminProfile/AdminProfile";
import { createContext, useEffect, useState } from "react";

// context for avoiding prop drilling
export const UniversalContext = createContext();

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("isLoggedin")
  );

  // for holding the original data of a user
  const [orgData, setOrgData] = useState(
    JSON.parse(localStorage.getItem("orgData")) || {}
  );

  // for checking that the user has modified the data or not
  const [isModified, setIsModified] = useState(false);

  const navigator = useNavigate();

  // redirecting the user to login page if not logged in
  useEffect(() => {
    if (!isLoggedin) navigator("/login");
  }, [isLoggedin]);

  return (
    <UniversalContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        orgData,
        setOrgData,
        isModified,
        setIsModified,
      }}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </UniversalContext.Provider>
  );
};

export default App;
