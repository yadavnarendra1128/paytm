/* eslint-disable no-unused-vars */
import { useState } from "react";
import Heading from "./../components/Heading";
import SubHeading from "./../components/SubHeading";
import InputBox from "./../components/InputBox";
import BottomWarning from "./../components/BottomWarning";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setUser,
  updateUser,
  logout,
  setLoading,
  setError,
} from "../store/userSlice";
import { useDispatch } from 'react-redux';

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    const re = /^[A-Za-z\s-]+$/; // Allows only alphabets, spaces, and hyphens
    return re.test(name);
  };

  const handleSubmit = async (e) => {
    setErrors({ firstName: "", lastName: "", email: "", password: "" });
    let hasErrors = false;

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      hasErrors = true;
    }
    if (!validateName(firstName)) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First name must contain only alphabets",
      }));
      hasErrors = true;
    }
    if (!validateName(lastName)) {
      setErrors((prev) => ({
        ...prev,
        lastName: "Last name must contain only alphabets",
      }));
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
      const res = await axios.post("http://localhost:3000/users/signup", {
        firstName,
        lastName,
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
          dispatch(setUser(response.data.userInfo));
        } catch (error) {
          dispatch(setError(error.message));
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetchUserInfo();
      navigate("/dashboard");
    } catch (error) {
      if (
        error.response.status === 403
      ) {
        console.error(
          "Error: The email is already taken. Please choose a different email."
        );
        setErrors((prev) => ({
          ...prev,
          email: "Email already exists. Log in instead",
          password: "Please check your credentials and try again.",
        }));
        
      } else {
        console.error("Signup error:", error.message);
      
      setErrors((prev) => ({
        ...prev,
        email: "Server issue. try after some time.",
        password: "Server issue. try after some time.",
      }));
    }
  }};

  return (
    <div className="flex h-screen justify-center items-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="w-80 h-max items-center rounded-lg bg-white text-center p-2 px-6">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />

          {/* Input fields */}
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label={"First Name"}
            error={errors.firstName} // Display error if present
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
            error={errors.lastName}
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            label={"Email"}
            error={errors.email}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password length must be at least 6"
            label={"Password"}
            error={errors.password}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit} // Use the handleSubmit function here
              label={"Sign Up"}
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
  );
}