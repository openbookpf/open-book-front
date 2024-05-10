import React from "react";
import BookTable from "../../components/Admin/Products/BookTable";
import ProductCard from "../../components/Admin/Products/ProductCard";
import Banner from "../../components/Admin/Products/Banner";
import { useAuth0 } from "@auth0/auth0-react";

const Products = () => {
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
    <div className="mb-24 flex flex-col justify-center items-center">
      <Banner />
      <BookTable />
    </div>
  );
};

export default Products;
