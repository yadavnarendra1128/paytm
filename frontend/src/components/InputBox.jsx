/* eslint-disable react/prop-types */

export default function InputBox({ onChange, placeholder, label, error }) {
  return (
    <>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <div className="flex flex-col justify-center">
        <input
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-2 py-1 text-sm border rounded ${
            error ? "border-red-300 border-2 font-semibold" : "border-slate-200"
          }`}
        />
        <div className={`text-xs text-left pl-1 text-red-400 font-normal`}>{error}</div>
      </div>
    </>
  );
}
