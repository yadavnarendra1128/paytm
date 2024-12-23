/* eslint-disable react/prop-types */
import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-slate-300">
        <div className="flex flex-col justify-center">
          <div className="w-80 h-max items-center rounded-lg bg-white text-center p-2 px-6">
            <Heading label={"Log In"} />
            <SubHeading label={"Enter your credentials for account access"} />
            <InputBox
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="johndoe@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="min 6 characters req"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const res = await axios.post(
                    "http://localhost:3000/users/signin",
                    {
                      email: email,
                      password: password,
                    }
                  );
                  localStorage.setItem("token", res.data.token);
                  navigate("/dashboard");
                }}
                label={"Log in"}
              />
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign Up"}
                to={"/signup"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
