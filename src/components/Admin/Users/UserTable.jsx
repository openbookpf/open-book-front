import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions";
import {
  LuPencil,
  LuTrash2,
  LuUserCircle2,
  LuLock,
  LuUnlock,
  LuShoppingCart,
} from "react-icons/lu";
import axios from "axios";
import DeleteUserModal from "./DeleteUserModal";
import EditUsersModal from "./EditUsersModal";
import { Link } from "react-router-dom";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [openDelete, setOpenDelete] = useState(false);
  // Estado para almacenar el ID del usuario que se va a eliminar
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  // Estado para almacenar el usuario que se va a editar
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEditUser = (user) => {
    // Almacenar el libro que se va a editar
    setUserToEdit(user);
    // Abrir el modal de edición
    setOpenEdit(true);
  };

  const handleDeleteUser = (user) => {
    setUserIdToDelete(user.idAuth0);
  };

  const handleUnlockUser = (user) => {
    axios
      .put(
        `https://open-book-l9pv.onrender.com/users/modify?user_id=${user.idAuth0}`,
        {
          is_active: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        // Cerrar el modal después de eliminar el usuario
        dispatch(getUsers());
        setOpenDelete(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitEdit = (editedUser) => {
    axios
      .put(
        `https://open-book-l9pv.onrender.com/users/modify?user_id=${editedUser.idAuth0}`,
        editedUser
      )
      .then((response) => {
        console.log(response.data);
        // Cerrar el modal después de editar el libro
        setOpenEdit(false);
        dispatch(getUsers());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteUsers = () => {
    axios
      .put(
        `https://open-book-l9pv.onrender.com/users/modify?user_id=${userIdToDelete}`,
        {
          is_active: false,
        }
      )
      .then((response) => {
        console.log(response.data);
        // Cerrar el modal después de eliminar el usuario
        dispatch(getUsers());
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
          <tr className="bg-blue-0 text-white-0 grid grid-cols-7 gap-2 mb-1 text-lg rounded-md">
            <th className="font-medium p-2">ID</th>
            <th className="font-medium p-2">Name </th>
            <th className="font-medium p-2">Email address</th>
            <th className="font-medium p-2">User Type</th>
            <th className="font-medium p-2">Actions</th>
            <th className="font-medium p-2">Status</th>
            <th className="font-medium p-2">Orders</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {users.map((user) => (
            <tr
              className="bg-white-1 hover:bg-white-2 text-blue-1 transition-colors delay-50 grid grid-cols-7 mb-2 text-sm rounded-md"
              key={user.idAuth0}
            >
              <td className="font-light my-auto truncate p-2">
                {user.idAuth0}
              </td>
              {user.user_type === "admin" ? (
                <>
                  <td className="p-2 truncate font-semibold my-auto">
                    {user.user_name}
                  </td>
                  <td className="p-2 font-semibold my-auto">
                    {user.email_address}
                  </td>
                  <td className="p-2 font-semibold my-auto">
                    {user.user_type}
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 mx-1 truncate my-auto">
                    {user.user_name}
                  </td>
                  <td className="p-2 mx-1 truncate my-auto">
                    {user.email_address}
                  </td>
                  <td className="p-2 my-auto">{user.user_type}</td>
                </>
              )}
              <td className="flex flex-row  gap-2 justify-center  p-1">
                <button
                  className="bg-cyan-0 p-2 my-auto rounded-md"
                  onClick={() => handleEditUser(user)}
                >
                  <LuPencil className="text-white-0" />
                </button>

                {user.is_active ? (
                  <button
                    className="bg-red-600 p-2 my-auto rounded-md"
                    onClick={() => {
                      setOpenDelete(true);
                      handleDeleteUser(user);
                    }}
                  >
                    <LuLock className="text-white-0" />
                  </button>
                ) : (
                  <button
                    className="bg-green-600 p-2 my-auto rounded-md"
                    onClick={() => handleUnlockUser(user)}
                  >
                    <LuUnlock className="text-white-0" />
                  </button>
                )}
              </td>
              <td className="my-auto p-2">
                {user.is_active ? (
                  <p className="text-green-600">Active</p>
                ) : (
                  <p className="text-red-600">Unavailable</p>
                )}
              </td>{" "}
              <td className="my-auto p-2">
                <Link
                  to={
                    user.user_type !== "admin"
                      ? `/shoplist/${user.idAuth0}`
                      : "#"
                  }
                  rel="noopener noreferrer"
                  className={
                    user.user_type !== "admin"
                      ? `flex flex-row gap-2 bg-cyan-0 p-1  hover:cursor-pointer  delay-50 hover:bg-cyan-1 transition-colors text-white-0 justify-center my-auto rounded-lg`
                      : `flex flex-row gap-2 bg-blue-0 bg-opacity-25 p-1 justify-center my-auto rounded-lg text-white-0`
                  }
                >
                  <p className="font-normal text-base">See orders</p>
                  <LuShoppingCart className="my-auto" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-24 items-center p-5 ">
        <EditUsersModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          className="mt-16 py-5"
          defaultValues={userToEdit}
          onSubmit={handleSubmitEdit}
        >
          <div className="text-center mx-auto py-5">
            <LuPencil
              size={56}
              className="text-white-0 bg-cyan-0 p-2 mx-auto rounded-md "
            />
            <h3 className="text-lg mt-2 font-black text-blue-1">Edit book</h3>
          </div>
        </EditUsersModal>
      </div>
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
              onClick={() => deleteUsers(userIdToDelete)}
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
