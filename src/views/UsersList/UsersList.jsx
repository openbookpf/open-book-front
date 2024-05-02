import React from "react";
import UserTable from "../../components/Admin/Users/UserTable";

const UsersList = () => {
  return (
    <div className="mt-24 mb-24 flex flex-col justify-center  px-10 items-center">
      <h1 className="text-xl font-semibold text-center">Manage Users</h1>
      <UserTable />
    </div>
  );
};

export default UsersList;
