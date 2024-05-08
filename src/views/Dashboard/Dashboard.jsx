import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopCard from "../../components/Admin/DashboardComponents/TopCards/TopCard";
// import LastSales from "../../components/Admin/DashboardComponents/LastSales/LastSales";
// // import GraphicChart from "../../components/GraphicChart/GraphicChart";
import axios from "axios";
import BarChart from "../../components/GraphicChart/BarChart";
import PieChart from "../../components/GraphicChart/PieChart";

const Dashboard = () => {
  const [dataTop, setDataTop] = useState([
    {
      title: "Total revenue",
      data: null,
      subtitle: "These values are calculated in US dollars",
    },
    {
      title: "Sold books",
      data: null,
      subtitle: "These values are calculated since the library was opened",
    },
    {
      title: "Users registered",
      data: null,
      subtitle: "These values are calculated since the library was opened",
    },
  ]);

  async function countUserTypes() {
    try {
      const response = await axios.get(
        "https://open-book-back.onrender.com/users"
      );
      let adminCount = 0;
      let shopperCount = 0;

      response.data.forEach((user) => {
        if (user.user_type === "admin") {
          adminCount++;
        } else if (user.user_type === "shopper") {
          shopperCount++;
        }
      });

      return { adminCount, shopperCount };
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://open-book-back.onrender.com/orders/payments-and-orders"
        );
        const { shopperCount } = await countUserTypes();

        setDataTop((prevDataTop) =>
          prevDataTop.map((item) => {
            if (item.title === "Total revenue") {
              return { ...item, data: "$" + response.data.total_sales_amount };
            } else if (item.title === "Sold books") {
              return {
                ...item,
                data: response.data.total_sold_books + " units",
              };
            } else if (item.title === "Users registered") {
              return {
                ...item,
                data: shopperCount,
              };
            } else {
              return item;
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const adminEmail = "openbooklibrary.dev@gmail.com";
  const chartData = useSelector((state) => state.chartData);
  return (
    <div className="mt-16 py-5 bg-blue-1 w-full h-full flex flex-col justify-center  px-10 items-center">
      <h1 className="text-3xl font-semibold text-white-0 text-center">
        Admin Dashboard
      </h1>

      <div className="flex flex-row justify-between mb-4 gap-4 mx-auto w-full mt-6">
        {dataTop.map((data) => (
          <TopCard
            key={data}
            title={data.title}
            data={data.data}
            subtitle={data.subtitle}
          />
        ))}
      </div>
      <div className="flex flex-row w-full gap-4 justify-between h-96">
        <div className="bg-white-0 shadow-md p-2 w-3/5 rounded-md mb-2">
          <BarChart data={chartData} />
        </div>
        <div className="bg-white-0 shadow-md p-2 w-2/5 rounded-md mb-2">
          <PieChart data={chartData} className="self-end w-full h-full" />
        </div>
      </div>

      <div className="flex flex-row w-full justify-between h-96 bg-white-0 shadow-md p-2 rounded-md mt-4">
        {/* <LastSales /> */}
      </div>
    </div>
  );
};

export default Dashboard;
