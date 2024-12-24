import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export function Balance() {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="rounded-lg  select-text flex border-4 py-4 justify-between border-slate-900-300 gap-x-4 px-8">
      <div className="relative">
        <div className="font-semibold text-lg relative right-0">
          {userInfo.firstName} {userInfo.lastName}
        </div>
        <div className="font-thin text-sm not-italic relative bottom-0">
          {userInfo.email}
        </div>
      </div>

      <div className="flex gap-x-2 items-center">
        <div className="text-lg font-medium text-gray-700">
          <h3>Your Balance :</h3>
        </div>
        <div className="text-xl font-medium">
          Rs <span className="px-0" />
          {(Math.ceil(userInfo.balance))}
        </div>
      </div>
    </div>
  );
}
