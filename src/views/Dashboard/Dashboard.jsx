import React from "react";
import TopCard from "../../components/Admin/DashboardComponents/TopCards/TopCard";
import LastSales from "../../components/Admin/DashboardComponents/LastSales/LastSales";

const Dashboard = () => {
  const dataTop = [
    "Total revenue",
    "Quantity of selled books",
    "Users registered",
    "Active users",
  ];

  const adminEmail = "openbooklibrary.dev@gmail.com";

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
          graphic chart
        </div>
        <LastSales />
      </div>
    </div>
  );
};

export default Dashboard;
