/* eslint-disable no-unused-vars */

import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./../pages/dashboard";
import { Navigate } from "react-router-dom";
import {
  setUser,
  updateUser,
  logout,
  setLoading,
  setError,
} from "../store/userSlice";

export default function Transferred() {
  // console.log("tras");
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");
  const lastName = searchParams.get("lastName");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoHome = () => {
    navigate("/Dashboard");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
    dispatch(logout());
    return;
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="text-3xl font-semibold text-green-600">
          Transfer Successful !
        </h2>
        <p className="text-sm text-gray-500 mb-2 pl-1">
          Your transaction was completed successfully.
        </p>
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-md font-semibold text-green-600">
              Amount Transferred:{" "}
            </p>
            <p className="text-2xl font-semibold text-slate-500">{amount}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-md font-semibold text-green-600">To: </p>
            <p className="text-xl text-slate-500 font-semibold">
              {name} {lastName}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleGoHome}
            className="px-6 py-2 text-white bg-green-500 rounded-full hover:bg-green-600 transition duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
