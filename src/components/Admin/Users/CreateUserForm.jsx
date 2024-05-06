import React, { useState } from "react";
import Swal from "sweetalert2";
import { validationsForm } from "./validations/validationsAdmin";
import axios from "axios";

const CreateUserForm = () => {
  const formInitialState = {
    email: "",
    password: "",
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [userData, setUserData] = useState(formInitialState);
  const [errorForm, setErrorForm] = useState({
    email: "",
    password: "",
  });
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    handleDataChange(e);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatch(e.target.value === password);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      const remainingFields = [];
      for (let key in userData) {
        if (!userData[key]) {
          remainingFields.push(key);
        }
      }
      return Swal.fire({
        title: `Complete the fields ${remainingFields.join(
          ", "
        )} to register a new user!`,
        text: "",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }

    if (errorForm.email || errorForm.password) {
      const wrongFields = [];
      for (let key in errorForm) {
        if (errorForm[key]) {
          wrongFields.push(key);
        }
      }

      const wrongMessage =
        wrongFields.length === 1
          ? `Verify that the data in the ${wrongFields.join(
              ", "
            )} field is correct`
          : `Verify that the data in the ${wrongFields.join(
              ", "
            )} fields are correct`;

      return Swal.fire({
        title: "Wrong data!",
        text: wrongMessage,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }
    try {
      const formData = new FormData();
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      console.log("THIS IS THE DATA", formData.keys());
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await axios.post(
        "https://open-book-back.onrender.com/users",
        { email_address: email, password: password }
      );
      setUserData(formInitialState);
      return Swal.fire({
        title: "User registered correctly!",
        text: "",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#81B29A",
        background: "#fef3ed",
      });
    } catch (error) {
      console.error("Error:", error);
      return Swal.fire({
        title: "Error",
        text: "Something went wrong when adding the user, check the data and try again",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }
  };
  const updateData = (key, value) => {
    setUserData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleDataChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    validationsForm(key, value, errorForm, setErrorForm);

    updateData(key, value);
  };

  return (
    <div>
      <div className="flex justify-center mt-24">
        <form
          action="submit"
          className="w-4/6 py-5 text-base bg-[#fef3ed] shadow-md rounded-xl p-3"
        >
          <div className="flex justify-center">
            <h5 className="text-center bg-blue-0 text-white-0 font-semibold text-xl w-4/6 py-3 mb-5 rounded-xl">
              Register a new user into our DataBase
            </h5>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5/6 flex mt-3">
              <label className=" mr-3 font-semibold" htmlFor="book_title">
                Email address:
              </label>
              <input
                name="email"
                type="text"
                autoComplete="off"
                value={userData.email}
                onChange={handleDataChange}
                className={
                  errorForm.email
                    ? "rounded-xl border-2 border-orange-0 grow"
                    : "rounded-xl border-2 grow"
                }
              />
            </div>
            <div className="w-5/6 flex mt-3">
              <label className="mr-3 font-semibold" htmlFor="password">
                Password:
              </label>
              <input
                name="password"
                type="password"
                autoComplete="off"
                value={userData.password}
                onChange={handlePasswordChange}
                className={
                  isMatch
                    ? "rounded-xl border-2 grow"
                    : "rounded-xl border-2 border-orange-0 grow"
                }
              />
            </div>
            <div className="w-5/6 flex mt-3">
              <label className="mr-3 font-semibold" htmlFor="confirmPassword">
                Confirm your password:
              </label>
              <input
                name="confirmPassword"
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={
                  isMatch
                    ? "rounded-xl  border-2 grow"
                    : "rounded-xl border-2 border-orange-0 grow"
                }
              />
            </div>
            {!isMatch && <p className="text-red-500">Passwords do not match</p>}
            <button
              className="mt-5 text-lg bg-orange-0 px-10 py-2 rounded-full text-white-0 duration-200 hover:scale-110 hover:bg-[#D48620]"
              onClick={handleUpload}
            >
              Add user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
