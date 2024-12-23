/* eslint-disable react/prop-types */
export function Balance({value}) {
  return (
    <div className="rounded-lg flex justify-start gap-x-4 items-center pb-4">
      <div className="text-lg font-medium text-gray-700">
        <h3>Your Balance :</h3>
      </div>
      <div className="text-xl font-medium">
        Rs <span className="px-0"/>
        {value}
      </div>
    </div>
  );
}

