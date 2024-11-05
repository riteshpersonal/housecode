import React from "react";

const PropertyInfo = ({data}) => {
  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Property Information</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-sm sm:text-base">
      {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border-b border-neutral-300 pb-5">
            <p className="font-semibold capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
            <p className="text-neutral-600">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyInfo;
