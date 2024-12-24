/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  updateUser,
  logout,
  setLoading,
  setError,
} from "../store/userSlice";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const lastName = searchParams.get("lastName");
  const [transferred, setTransferred] = useState(false)
  const [amount, setAmount] = useState(0);

  const logged = useSelector((state) => state.user.logged);
  const navigate=useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('send loded')
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(logout());
        return;
      }
    }, [navigate,logged,dispatch]);

   return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min max-w-md p-4 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col py-6 px-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex space-x-4 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl mt-1 font-semibold">{name}<span className="mr-2"/>{lastName}</h3>
            </div>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <label
                  className="text-sm ml-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <button
                onClick={async () => {
                  if(amount<=0){
                    return;
                  }
                  const res = await axios.post(
                    "http://localhost:3000/accounts/transfer",
                    {
                      to: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  dispatch(updateUser({field:"balance",value:res.data.balance}));
                  navigate("/transferred?amount="+amount+"&name="+name+"&lastName="+lastName);
                  
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
