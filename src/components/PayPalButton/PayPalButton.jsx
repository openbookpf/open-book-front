/* eslint-disable react/prop-types */

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

const PayPalButton = ({ totalValue, invoice }) => {
  const cartProducts = useSelector((state) => state.items);
  console.log(cartProducts);
  const body = {
    totalValue: 22.0,
    cart: [...cartProducts],
  };
  const createOrder = (data, actions) => {
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
        totalValue: totalValue,
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
    <div className="flex items-center justify-center content-center">
      <span className="pr-2 font-bold text-lg">Buy Now</span>
      <PayPalScriptProvider
        options={{
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "USD",
          intent: "capture",
          disableFunding: "card",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
