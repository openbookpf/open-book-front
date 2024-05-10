import axios from "axios";
import React, { useEffect, useState } from "react";
import ShoplistBanner from "./ShoplistBanner";

const ShoplistTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://open-book-back.onrender.com/orders/all-users-and-orders"
        );
        const mappedData = response.data.map((data) => ({
          user_name: data.user_name,
          email_address: data.email_address,
          auth0id: data.auth0id,
          orders: data.orders.map((order) => ({
            order_id: order.order_id,
            date: order.date,
            total_amount: order.total_amount,
            order_items: order.order_items.map((item) => ({
              quantity: item.quantity,
              subtotal: item.subtotal,
              book: {
                ISBN: item.book.ISBN,
                book_title: item.book.book_title,
              },
            })),
          })),
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 h-fit overflow-y-scroll bg-gradient-to-b from-white-2 to-blue-0 flex flex-col justify-center px-10 items-center w-full ">
      <div className="flex flex-col  text-center">
        {data.map((item, index) =>
          item.orders.map((order, orderIndex) => (
            <div className="gap-5 shadow-lg" key={orderIndex}>
              <div className="flex flex-col">
                <div className="grid bg-blue-1 border-b-2 border-white-2 rounded-t-lg text-white-1 font-bold text-lg grid-cols-3 p-2">
                  <p>{item.auth0id}</p>
                  <p>{item.user_name}</p>
                  <p>{item.email_address}</p>
                </div>
                <div className="grid text-base bg-blue-1 text-white-0 grid-cols-3 p-2">
                  <p>Date</p>
                  <p>Order ID</p>
                  <p>Total Amount (U$D)</p>
                </div>
                <div className="grid bg-blue-1 text-white-0 border-b-2 border-blue-1 text-sm grid-cols-3 p-2">
                  <p>{order.date}</p>
                  <div>
                    <p>{order.order_id}</p>
                  </div>
                  <p>{order.total_amount}</p>
                </div>
              </div>
              <div className="flex flex-col  rounded-b-lg gap-2  bg-white-0 text-blue-1  mb-2 w-full text-sm">
                <div className="grid text-base font-semibold bg-white-0 text-blue-1 border-b-2 border-blue-1 grid-cols-4 p-2">
                  <p>Book ISBN</p>
                  <p>Book Title</p>
                  <p>Quantity</p>
                  <p>Subtotal (U$D)</p>
                </div>
                {order.order_items.map((orderItem, index) => (
                  <div>
                    <div
                      className=" font-light grid grid-cols-4 p-2"
                      key={index}
                    >
                      <p>{orderItem.book.ISBN}</p>
                      <p className="truncate px-10">
                        {orderItem.book.book_title}
                      </p>
                      <p>{orderItem.quantity}</p>
                      <p>{orderItem.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShoplistTable;
