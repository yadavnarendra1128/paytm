/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"

export const AppBar = ({username})=>{
    return (
      <>
        <div className="flex items-center justify-between px-6 py-4 shadow-sm select-none">
          <div className="font-semibold text-2xl">PaytmApp</div>
          <div className="flex items-center">
            <div className="text-xl mt-1 text-white font-medium rounded-full w-10 h-10 flex justify-center items-center bg-slate-500">
              {username.charAt(0)}
            </div>
          </div>
        </div>
      </>
    );
}