/* eslint-disable no-unused-vars */
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import SendMoney from "./pages/sendMoney";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, logout, setLoading, setError } from "./store/userSlice";
import axios from "axios";
import Transferred from "./pages/transferred";

export default function App() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("App loaded");

    if (!token) {
      dispatch(logout());
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(response.data.userInfo));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(logout());
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={logged ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/send"
        element={logged ? <SendMoney /> : <Navigate to="/login" />}
      />
      <Route
        path="/transferred"
        element={logged ? <Transferred /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={logged ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
