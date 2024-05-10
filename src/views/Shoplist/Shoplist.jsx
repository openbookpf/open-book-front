import React from "react";
import ShoplistBanner from "../../components/Admin/Shoplist/ShoplistBanner";
import ShoplistTable from "../../components/Admin/Shoplist/ShoplistTable";
import { useAuth0 } from "@auth0/auth0-react";

const Shoplist = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const adminEmail = "admin";

  if (!isAuthenticated || user.user_type !== "admin") {
    return (
      <div className="text-center flex flex-col mt-20">
        <p>Please sign in with an Admin account. This is a private page.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <ShoplistBanner />
      <ShoplistTable />
    </div>
  );
};

export default Shoplist;
