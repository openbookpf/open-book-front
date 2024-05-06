import React from "react";
import UserTable from "../../components/Admin/Users/UserTable";
import UsersBanner from "../../components/Admin/Users/UsersBanner";

const UsersList = () => {
  return (
    <div className="mb-24 flex flex-col justify-center items-center">
      <UsersBanner />
      <UserTable />
    </div>
  );
};

export default UsersList;
