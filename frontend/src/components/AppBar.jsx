/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";

export const AppBar = ()=>{
  const userInfo = useSelector((state) => state.user.userInfo);

    return (
      <>
        <div className="flex items-center justify-between py-4 shadow-sm select-none">
          <div className="font-semibold text-2xl">PaytmApp</div>
          <div className="flex items-center">
            <div className="text-xl mt-1 text-white font-medium rounded-full w-10 h-10 flex justify-center items-center bg-slate-500">
              {userInfo.firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </>
    );
}