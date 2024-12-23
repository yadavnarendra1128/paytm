/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [entries, setEntries] = useState(8);

const handlePrev = () => {
  if (currPage > 1) {
    setCurrPage(currPage - 1); // Go to previous page
  } else {
    setCurrPage(Math.ceil(users.length / entries)); // Go to last page when on first page
  }
};

const handleNext = () => {
  if (currPage < Math.ceil(users.length / entries)) {
    setCurrPage(currPage + 1); // Go to next page
  } else {
    setCurrPage(1); // Loop back to the first page after the last one
  }
};

  useEffect(() => {
    axios.get("http://localhost:3000/users/all").then((response) => {
      setUsers(response.data.users);
    });
  
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (filter.length>0) {
        axios.get("http://localhost:3000/users/bulk?filter=" + filter)
          .then((response) => {
            setUsers(response.data.user);
            console.log(response.data.user);
          });
      } else{
          axios.get("http://localhost:3000/users/all").then((response) => {
            setUsers(response.data.users);
          });
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [filter]);

  return (
    <div className="flex flex-col justify-between h-[90%]">
      <div className="flex flex-col">
        <input
          className="w-full px-2 py-1 mb-2 border rounded border-slate-200"
          type="text"
          onChange={async (e) => {
            setFilter(e.target.value);
          }}
          placeholder="Search Users"
        />
        <div className="">
          {users.length > 0 ? (
            users
              .slice((currPage - 1) * entries, currPage * entries)
              .map((user, i) => <User key={i} user={user} />)
          ) : (
            <div className="text-lg font-serif font-medium text-slate-500 text-center ">
              No users found..
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
          <span
            className="mr-4 cursor-pointer rounded-md px-2"
            onClick={handlePrev}
          >
            prev
          </span>
          <span className="mr-4 select-none">Page : {currPage}</span>
          <span onClick={handleNext} className="cursor-pointer rounded-md px-2">
            next
          </span>
        </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex items-center px-2">
        <div className="rounded-full h-8 w-8 bg-slate-200 flex items-center text-lg justify-center mt-1 mr-3">
          {user.firstName[0]}
        </div>
        <div className="flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName + "&lastName=" + user.lastName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}