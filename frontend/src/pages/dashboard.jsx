/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Users } from "../components/Users";
import { Balance } from "../components/Balance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function Dashboard() {
  // useAuth();
  const [username, setUsername] = useState("User");

  return (
    <div className="h-screen w-screen select-none flex flex-col justify-between pb-2">
      <AppBar username={username} />
      <div className="px-4 mx-4 pb-2 shadow-sm flex-grow">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
