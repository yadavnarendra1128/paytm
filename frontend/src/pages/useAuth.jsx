import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../store/userSlice"; 

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Dispatch function to update Redux store

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      // Dispatch loading state
      dispatch(setLoading(true));

      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("http://localhost:3000/users/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request
            },
          });
          dispatch(setUser(response.data)); // Dispatch user data to Redux
        } catch (error) {
          dispatch(setError(error.message)); // Dispatch error if any
        } finally {
          dispatch(setLoading(false)); // Set loading to false once data is fetched
        }
      };

      fetchUserInfo();
    }
  }, [dispatch, navigate]);
}
