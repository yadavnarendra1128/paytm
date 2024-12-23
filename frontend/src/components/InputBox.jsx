/* eslint-disable react/prop-types */

export default function InputBox({ onChange, placeholder, label }) {
  return (
    <>
      <div className="text-sm font-md text-left py-2">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </>
  );
}
