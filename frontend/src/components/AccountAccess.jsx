/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import { Route, Routes} from "react-router-dom";

export default function AccountAccess() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUp
                firstName={firstName}
                lastName={lastName}
                password={password}
                email={email}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPassword={setPassword}
                setEmail={setEmail}
                navigate={navigate}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                password={password}
                email={email}
                setPassword={setPassword}
                setEmail={setEmail}
                navigate={navigate}
              />
            }
          ></Route>
        </Routes>
    </>
  );
}
