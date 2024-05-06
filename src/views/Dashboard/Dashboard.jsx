import React from "react";
import { useSelector } from "react-redux";
import TopCard from "../../components/Admin/DashboardComponents/TopCards/TopCard";
import LastSales from "../../components/Admin/DashboardComponents/LastSales/LastSales";
import GraphicChart from "../../components/GraphicChart/GraphicChart";

const Dashboard = () => {
  const dataTop = [
    "Total revenue",
    "Quantity of selled books",
    "Users registered",
    "Active users",
  ];

  const adminEmail = "openbooklibrary.dev@gmail.com";
  const chartData = useSelector((state) => state.chartData);
  return (
    <div className="mt-24 mb-24 flex flex-col justify-center  px-10 items-center">
      <h1 className="text-xl font-semibold text-center">Admin Dashboard</h1>

      <div className="flex flex-row justify-between mb-4 gap-5 mx-auto w-full mt-6">
        {dataTop.map((data) => (
          <TopCard key={data} data={data} />
        ))}
      </div>
      <div className="flex flex-row w-full gap-6 justify-between h-96">
        <div className="bg-white-0 shadow-md p-2 w-3/5 rounded-md mb-2">
          <GraphicChart data={chartData} />
        </div>
        <LastSales />
      </div>
      <div className="flex flex-row w-full justify-between h-96 bg-white-0 shadow-md p-2 rounded-md mt-4"></div>
    </div>
  );
};

export default Dashboard;
