import React from "react";

const TopCard = ({ data }) => {
  return (
    <div className="bg-white-0 shadow-sm w-1/4 rounded-md mb-2 h-40">
      <h1 className="px-5 py-3 font-semibold text-lg">{data}</h1>
    </div>
  );
};

export default TopCard;
