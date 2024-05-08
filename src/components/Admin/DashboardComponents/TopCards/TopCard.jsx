import React from "react";
import axios from "axios";

const TopCard = ({ title, data, subtitle }) => {
  return (
    <div className="bg-white-0 shadow-sm w-1/3 flex flex-col my-auto align-middle rounded-md py-3 h-36">
      <h1 className="px-5 mt-1 font-semibold text-xl">{title}</h1>
      <h1 className="px-5 mt-0 font-light text-4xl">{data}</h1>
      <p className="px-5 mt-2 font-normal text-sm"> {subtitle} </p>
    </div>
  );
};

export default TopCard;
