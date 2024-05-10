import React from "react";
import ShoplistBanner from "../../components/Admin/Shoplist/ShoplistBanner";
import ShoplistTable from "../../components/Admin/Shoplist/ShoplistTable";

const Shoplist = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ShoplistBanner />
      <ShoplistTable />
    </div>
  );
};

export default Shoplist;
