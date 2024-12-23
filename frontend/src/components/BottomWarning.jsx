/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 pb-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link className="underline pl-1 cursor-pointer font-semibold text-slate-600" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
