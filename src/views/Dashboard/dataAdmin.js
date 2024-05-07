import axios from "axios";

async function getTotalSalesAmount() {
  try {
    const response = await axios.get(
      "https://open-book-back.onrender.com/orders/payments-and-orders"
    );
    return response.data.total_sales_amount;
  } catch (error) {
    console.error(error);
  }
}

let dataTop = [];

async function initializeDataTop() {
  const totalSalesAmount = await getTotalSalesAmount();
  dataTop = [
    { title: "Total revenue", data: totalSalesAmount },
    { title: "Quantity of selled books", data: null },
    { title: "Users registered", data: null },
    { title: "Active users", data: null },
  ];
}

initializeDataTop();
