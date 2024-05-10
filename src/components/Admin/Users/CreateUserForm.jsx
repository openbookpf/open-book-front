import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { validationsForm } from "./validations/validationsAdmin";
import axios from "axios";
import { MdError } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const CreateUserForm = () => {
    const formInitialState = {
        email: "",
        password: "",
        user_type: "",
    };
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatch, setIsMatch] = useState(true);
    const [userData, setUserData] = useState(formInitialState);
    const [userRole, setUserRole] = useState("Admin");
    const [errorForm, setErrorForm] = useState({
        email: "",
        password: "",
        user_type: "",
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

        if (!userData.email || !userData.password || !userData.user_type) {
            const remainingFields = [];
            for (let key in userData) {
                if (!userData[key]) {
                    remainingFields.push(key);
                }
            }
            return Swal.fire({
                title: `Complete the fields ${remainingFields.join(", ")} to register a new user!`,
                text: "",
                icon: "warning",
                confirmButtonText: "Ok",
                confirmButtonColor: "#D34720",
                background: "#fef3ed",
            });
        }

        if (errorForm.email || errorForm.password || errorForm.user_type) {
            const wrongFields = [];
            for (let key in errorForm) {
                if (errorForm[key]) {
                    wrongFields.push(key);
                }
            }

            const wrongMessage =
                wrongFields.length === 1
                    ? `Verify that the data in the ${wrongFields.join(", ")} field is correct`
                    : `Verify that the data in the ${wrongFields.join(", ")} fields are correct`;

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

            const response = await axios.post("https://open-book-back.onrender.com/users", {
                email_address: email,
                password: password,
                user_type: userRole,
            });
            setUserData(formInitialState);
            setConfirmPassword("");
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

    const handleUserRoleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setUserRole(value);

        updateData(key, value);
    };


    return (
        <div>
            <div className="flex justify-center mt-24">
                <form action="submit" className="w-4/6 py-5 text-base bg-[#fef3ed] shadow-md rounded-xl p-3">
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
                            <div
                                className="flex justify-center items-center"
                                data-tooltip-id="email-tooltip"
                                data-tooltip-content={errorForm.email}
                            >
                                <MdError className={errorForm.email ? "text-orange-0 ml-1" : "hidden"} />
                            </div>
                            <Tooltip className="text-xs" id="email-tooltip" />
                        </div>
                        <div className="w-5/6 flex mt-3">
                            <label className="w-20 mr-3 font-semibold" htmlFor="password">
                                Password:
                            </label>
                            <div className="grow">
                                <div className="flex">
                                    <input
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        value={userData.password}
                                        onChange={handlePasswordChange}
                                        className={
                                            isMatch && !errorForm.password
                                                ? "rounded-xl border-2 grow"
                                                : "rounded-xl border-2 border-orange-0 grow"
                                        }
                                    />
                                    <div
                                        className="flex justify-center items-center"
                                        data-tooltip-id="password-tooltip"
                                        data-tooltip-content={errorForm.password}
                                    >
                                        <MdError className={errorForm.password ? "text-orange-0 ml-1" : "hidden"} />
                                    </div>
                                    <Tooltip className="text-xs" id="password-tooltip" />
                                </div>
                                <div className="text-sm mt-2 border-2 border-gray-400 py-1 px-3 rounded-xl w-96">
                                    <p className="font-bold">Your password must contain:</p>
                                    <div className="ml-2">
                                        <u className="list-disc no-underline">
                                            <li
                                                className={
                                                    userData.password.length < 8 ? "text-orange-0" : "text-cyan-0"
                                                }
                                            >
                                                At least 8 characters long
                                            </li>
                                            <li
                                                className={
                                                    /[a-z]/.test(userData.password) ? "text-cyan-0" : "text-orange-0"
                                                }
                                            >
                                                Lowercase letters (a-z)
                                            </li>
                                            <li
                                                className={
                                                    /[A-Z]/.test(userData.password) ? "text-cyan-0" : "text-orange-0"
                                                }
                                            >
                                                Capital letters (A-Z)
                                            </li>
                                            <li
                                                className={
                                                    /\d{1}/.test(userData.password) ? "text-cyan-0" : "text-orange-0"
                                                }
                                            >
                                                Numbers (0-9)
                                            </li>
                                            <li
                                                className={
                                                    /(?=.*?[#?!@$ %^&*-])/.test(userData.password)
                                                        ? "text-cyan-0"
                                                        : "text-orange-0"
                                                }
                                            >
                                                Special characters (for example, !@#$%*&)
                                            </li>
                                        </u>
                                    </div>
                                </div>
                            </div>
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
                                    isMatch ? "rounded-xl  border-2 grow" : "rounded-xl border-2 border-orange-0 grow"
                                }
                            />
                        </div>
                        {!isMatch && <p className="text-red-500">Passwords do not match</p>}
                        <div className="w-5/6 flex mt-3">
                            <label className="mr-3 font-semibold" htmlFor="confirmPassword">
                                Select user type:
                            </label>
                            <div>
                                <select
                                    name="user_type"
                                    autoComplete="off"
                                    value={userRole}
                                    onChange={handleUserRoleChange}
                                    className={
                                        errorForm.user_type
                                            ? "rounded-xl border-2 border-orange-0 grow"
                                            : "rounded-xl  border-2 grow"
                                    }
                                >
                                    <option value="select an option">select an option</option>
                                    <option value="admin">Admin</option>
                                    <option value="shopper">Shopper</option>
                                </select>
                                <div
                                    className="flex justify-center items-center"
                                    data-tooltip-id="password-tooltip"
                                    data-tooltip-content={errorForm.user_type}
                                >
                                    <MdError className={errorForm.user_type ? "text-orange-0 ml-1" : "hidden"} />
                                </div>
                                <Tooltip className="text-xs" id="password-tooltip" />
                            </div>
                        </div>
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
