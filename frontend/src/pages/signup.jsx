
import { useState } from "react";
import Heading from "./../components/Heading";
import SubHeading from "./../components/SubHeading";
import InputBox from "./../components/InputBox";
import BottomWarning from "./../components/BottomWarning";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-slate-300">
        <div className="flex flex-col justify-center">
          <div className="w-80 h-max items-center rounded-lg bg-white text-center p-2 px-6">
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your infromation to create an account"} />
            <InputBox
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="John"
              label={"First Name"}
            />
            <InputBox
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Doe"
              label={"Last Name"}
            />
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
                  const response = await axios.post(
                    "http://localhost:3000/users/signup",
                    {
                      email,
                      firstName,
                      lastName,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Login"}
              to={"/login"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
