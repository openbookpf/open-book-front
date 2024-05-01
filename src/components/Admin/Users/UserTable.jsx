import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions";
import { LuPencil, LuTrash2, LuUserCircle2 } from "react-icons/lu";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const editUsers = () => {
    // Implementar lógica de edición aquí
  };

  const deleteUsers = () => {
    // Implementar lógica de eliminación aquí
  };

  return (
    <div className="mt-5 mb-24 p-5 flex flex-col justify-center px-10 items-center w-full">
      <div className="flex gap-2">
        <button className="text-sm" onClick={deleteUsers}>
          Delete selected
        </button>
      </div>
      <table className="table-auto p-5 border-collapse border border-slate-500">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className=" p-2  border border-slate-500"
                onChange={(e) =>
                  setSelectedUsers(
                    e.target.checked ? users.map((user) => user.idAuth0) : []
                  )
                }
              />
            </th>
            <th className="p-2 text-sm border border-slate-500">ID</th>
            <th className="p-2 text-sm border border-slate-500">Name </th>
            <th className="p-2 text-sm border border-slate-500">
              email adress
            </th>
            <th className="p-2 text-sm border border-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {users.map((user) => (
            <tr key={user.idAuth0}>
              <td className=" p-2 border border-slate-500">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.idAuth0)}
                  onChange={() => toggleSelectUser(user.idAuth0)}
                />
              </td>
              <td className="p-2 truncate border text-xs font-light border-slate-500">
                {user.idAuth0}
              </td>
              <td className=" p-2 border border-slate-500">{user.user_name}</td>
              <td className="p-2 border border-slate-500">
                {user.email_address}
              </td>
              <td className="flex flex-row gap-3 p-1 border border-slate-500">
                <button
                  className="bg-blue-0 p-2 rounded-md"
                  onClick={() => editUsers(user.idAuth0)}
                >
                  <LuPencil className="text-white-0" />
                </button>
                <button
                  className="bg-red-600 p-2 rounded-md"
                  onClick={() => deleteUsers(user.idAuth0)}
                >
                  <LuTrash2 className="text-white-0" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
