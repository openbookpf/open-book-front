import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions";
import { LuPencil, LuTrash2, LuUserCircle2 } from "react-icons/lu";
import axios from "axios";
import DeleteUserModal from "./DeleteUserModal";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [openDelete, setOpenDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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
    axios
      .put(
        `https://open-book-back.onrender.com/users/modify?user_id=${userIdToDelete}`,
        {
          is_active: false,
        }
      )
      .then((response) => {
        console.log(response.data);
        // Cerrar el modal después de eliminar el usuario
        setOpenDelete(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mt-5 mb-24 p-5 flex flex-col justify-center px-10 items-center w-full">
      <div className="flex gap-2"></div>
      <table className="table-auto p-5 border-collapse ">
        <thead>
          <tr className="bg-blue-0 text-white-0 grid grid-cols-5 gap-2 mb-1 text-lg rounded-md">
            <th className="font-medium p-2">ID</th>
            <th className="font-medium p-2">Name </th>
            <th className="font-medium p-2">Email address</th>
            <th className="font-medium p-2">Actions</th>
            <th className="font-medium p-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {users.map((user) => (
            <tr
              className="bg-white-1 hover:bg-white-2 text-blue-1 transition-colors delay-50 grid grid-cols-5 mb-2 text-sm rounded-md"
              key={user.idAuth0}
            >
              <td className="font-light my-auto p-2">{user.idAuth0}</td>
              <td className=" p-2  my-auto">{user.user_name}</td>
              <td className="p-2  my-auto">{user.email_address}</td>
              <td className="flex flex-row  gap-2 justify-center  p-1">
                <button
                  className="bg-cyan-0 p-2 my-auto rounded-md"
                  onClick={() => editUsers(user.idAuth0)}
                >
                  <LuPencil className="text-white-0" />
                </button>
                <button
                  className="bg-red-600 p-2 my-auto rounded-md"
                  onClick={() => setOpenDelete(true)}
                  // onClick={() => deleteUsers(user.idAuth0)}
                >
                  <LuTrash2 className="text-white-0" />
                </button>
              </td>
              <td className="my-auto p-2">
                {user.is_active ? (
                  <p className="text-green-600">Active</p>
                ) : (
                  <p className="text-red-600">Unavailable</p>
                )}
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center">
        <DeleteUserModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          className="mt-24 py-5"
        >
          <div className="text-center mx-auto py-5">
            <LuTrash2
              size={56}
              className="text-white-0 bg-red-600 p-2 mx-auto rounded-md "
            />
            <h3 className="text-lg mt-2 font-black text-blue-1">
              Confirm delete
            </h3>
            <p className="text-sm text-blue-0">
              Are you sure you want to delete this user?
            </p>
          </div>
          <div className="flex gap-2 p-2">
            <button
              onClick={deleteUsers}
              className="p-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 hover:text-white-0 transition-colors text-white-2 w-full"
            >
              Delete
            </button>
            <button
              className="p-2 rounded-lg text-sm bg-white-0 hover:bg-white-2 hover:text-blue-0 transition-colors w-full"
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </button>
          </div>
        </DeleteUserModal>
      </div>
    </div>
  );
};

export default UserTable;
