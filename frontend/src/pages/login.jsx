/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setUser,
  setLoading,
  setError,
} from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    setErrors({ email: "", password: "" });
    let hasErrors = false;

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      hasErrors = true;
    }

    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    try {
      const res = await axios.post("http://localhost:3000/users/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(setLoading(true));
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("http://localhost:3000/users/user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          await dispatch(setUser(response.data.userInfo));
        } catch (error) {
          dispatch(setError(error.message));
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetchUserInfo();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        password: "Please check your credentials.",
      }));
    } 
  };

  useEffect(()=>{
    // console.log('login loaded')
    if(logged){
      navigate("/dashboard");
      dispatch(setLoading(false));
      dispatch(setError(null));
      return;
    }
  },[logged,dispatch,navigate])

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
              error={errors.email}
              placeholder="johndoe@gmail.com"
              label={"Email"}
            />
            <InputBox
              id="password"
              type="password"
              placeholder={"password length must be at least 6"}
              error={errors.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="pt-4">
              <Button label={"Login"} onClick={handleSubmit} />
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
