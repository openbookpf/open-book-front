/* eslint-disable react/prop-types */

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PayPalButton = () => {
  const cartProducts = useSelector((state) => state.items);
  const totalValue = useSelector((state) => state.cartTotalPrice);

  console.log(cartProducts);
  const body = {
    totalValue: 22.0,
    cart: [...cartProducts],
  };

  useEffect(() => {
    console.log("Total Price Changed", totalValue);
  }, [totalValue]);

  const createOrder = (cartProducts, totalValue, actions) => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:3001/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: cartProducts,
        totalValue: totalValue ? totalValue.toFixed(2) : "0",
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  // const createOrder = async () => {
  //   const id = await axios
  //     .post("http://localhost:3001/orders/", body)
  //     .then(({ data }) => {
  //       data.id;
  //     });
  //   console.log(id ? id : "THERE IS NO ID");
  //   return id;
  // };

  const onApprove = (data, actions) => {
    console.log(data);
    // Order is captured on the server and the response is returned to the browser
    return fetch(`http://localhost:3001/orders/${data.orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  return (
    cartProducts &&
    totalValue && (
      <div className="flex flex-col items-center justify-center content-center w-full">
        <span className="pr-2 font-bold text-lg mb-4">Buy Now</span>
        <div className="w-80">
          <PayPalScriptProvider
            options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
              currency: "USD",
              intent: "capture",
              disableFunding: "card",
            }}
          >
            <PayPalButtons
              style={{ shape: "pill" }}
              disabled={totalValue ? false : true}
              createOrder={(data, actions) =>
                createOrder(cartProducts, totalValue, actions)
              }
              onApprove={(data, actions) => onApprove(data, actions)}
              onCancel={console.log("Payment has been canceled")}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    )
  );
};

export default PayPalButton;
