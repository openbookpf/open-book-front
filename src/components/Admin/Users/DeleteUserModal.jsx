import React from "react";

const DeleteUserModal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white-0 mt-48 mx-auto w-1/4 rounded-xl shadow transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-white text-red-600 rounded-full text-base transition-colors hover:bg-gray-300 hover:text-blue-1"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default DeleteUserModal;
