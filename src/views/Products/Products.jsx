import React from "react";
import BookTable from "../../components/Admin/Products/BookTable";
import ProductCard from "../../components/Admin/Products/ProductCard";
import Banner from "../../components/Admin/Products/Banner";

const Products = () => {
  return (
    <div className="mb-24 flex flex-col justify-center items-center">
      <Banner />
      <BookTable />
    </div>
  );
};

export default Products;
