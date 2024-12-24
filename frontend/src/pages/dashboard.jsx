/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  setUser,
  updateUser,
  logout,
  setLoading,
  setError,
} from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const logged = useSelector((state) => state.user.logged);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("dashboard loadeed", userInfo);

  useEffect(() => {
    // console.log('dashboard effect ran')
    const token = localStorage.getItem("token");
    if (!token) {
              dispatch(logout());

    }
  }, [navigate,logged,dispatch]);

  return (
    <div className="h-screen w-screen select-none flex flex-col justify-between pb-2 px-8">
      <AppBar/>
      <div className="mx-4 pb-2 space-y-4 shadow-sm flex-grow">
        <Balance/>
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
