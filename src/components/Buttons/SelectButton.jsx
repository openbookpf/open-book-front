import React from "react";

const SelectButton = ({ selectMenuOpen, setSelectMenuOpen, user }) => {
  return (
    <button
      type="button"
      className=" inline-flex items-center justify-center p-2.5"
      onClick={() => setSelectMenuOpen(!selectMenuOpen)}
    >
      <img
        className="w-8 mx-auto rounded-full"
        src={user.picture}
        alt={user.name}
      />
    </button>
  );
};

export default SelectButton;
