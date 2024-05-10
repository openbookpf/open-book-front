import React from "react";

const ShoplistBanner = () => {
  return (
    <div
      className="h-60 mt-10 w-full bg-blue-1"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 25, 36, 0.8), rgba(61, 64, 91, 0.6)), url(https://images.unsplash.com/photo-1566415609180-96eaa27bf3f8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        zIndex: 0,
        backgroundSize: "cover",
      }}
    >
      {" "}
      <div className="flex flex-col items-center my-12 justify-center gap-3 z-10 text-white-0">
        <h1 className="text-6xl mt-1 font-semibold text-center">Shoplist</h1>
        <p className="text-lg font-normal text-center">
          Check all the registered orders in our shop.
        </p>
      </div>
    </div>
  );
};

export default ShoplistBanner;
