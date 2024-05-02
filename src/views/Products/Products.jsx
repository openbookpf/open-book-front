import React from "react";
import BookTable from "../../components/Admin/Products/BookTable";
import ProductCard from "../../components/Admin/Products/ProductCard";

const Products = () => {
  return (
    <div className="mt-24 mb-24 flex flex-col justify-center  px-10 items-center">
      <h1 className="text-xl font-semibold text-center">Manage Products</h1>
      {/* <ProductCard /> */}
      <BookTable />
    </div>
  );
};

export default Products;
