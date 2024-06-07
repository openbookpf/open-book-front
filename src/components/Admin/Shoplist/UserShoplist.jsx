import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserShoplist = () => {
  const { idAuth0 } = useParams();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://open-book-l9pv.onrender.com/orders/payments-and-orders?idAuth0=${idAuth0}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [idAuth0]);

  if (!orders) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-full mt-24 flex flex-col justify-center mx-auto">
      <h1>Shoplist of User: {idAuth0}</h1>
      <div className="gap-2 p-5">
        {orders.map((order, index) => (
          <div className="flex flex-col w-full bg-white-1  " key={index}>
            <div className="grid grid-cols-3 text-lg p-2 rounded-t-xl bg-blue-1 text-white-0">
              <h2>Order ID:</h2>
              <p>Date:</p>
              <p>Total amount (in USD): </p>
            </div>
            <div className="grid grid-cols-3 p-2 text-sm">
              <h2>{order.order_id}</h2>
              <p>{order.date}</p>
              <p>{order.total_amount}</p>
            </div>
            <div className="grid grid-cols-4 text-lg p-2 bg-blue-1 text-white-0">
              <p>ISBN: </p>
              <p>Book: </p>
              <p>Quantity: </p>
              <p>Subtotal: </p>
            </div>
            <div className="rounded-b-xl shadow-xl">
              {order.order_items.map((item, index) => (
                <div key={index}>
                  <div className="grid grid-cols-4 text-sm" key={index}>
                    <p> {item.book.ISBN}</p>
                    <p> {item.book.book_title}</p>
                    <p>{item.quantity}</p>
                    <p> {item.subtotal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShoplist;
