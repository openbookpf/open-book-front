import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Swal from "sweetalert2";

const EditUserProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [profilePictureUrl, setProfilePictureUrl] = React.useState(
    user.picture
  );

  console.log(user);
  const initialState = {
    user_name: user.name,
    email_address: user.email,
    phone_number: user.user_phone_number,
    address_street: user.address_street,
    picture: user.picture,
  };
  const [editedProfileForm, setEditedProfileForm] =
    React.useState(initialState);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "name" || name === "email" || name === "picture") {
      if (event.target.name === "name") {
        setEditedProfileForm({
          ...editedProfileForm,
          user_name: value,
        });
      }
      if (event.target.name === "email") {
        setEditedProfileForm({
          ...editedProfileForm,
          email_address: value,
        });
      }
    } else {
      setEditedProfileForm((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  const submitear = async (e) => {
    e.preventDefault();
    try {
      //   const formData = new FormData();
      //   formData.append("user_name", editedProfileForm.user_name);
      //   formData.append("email_address", editedProfileForm.email_address);
      //   formData.append("picture", editedProfileForm.picture);

      const response = await fetch(
        `http://localhost:3001/users/modify?user_id=${user.sub}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProfileForm),
        }
      );
      if (response.ok) {
        const nuevoRegistro = await response.json();
        console.log("Registro creado con éxito:", nuevoRegistro);
        return Swal.fire({
          title: "User data has been udpated correctly!",
          text: "The changes you just made will be displayed on your next session.",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#81B29A",
          background: "#fef3ed",
        });
      } else {
        console.error("Error al crear el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("picture", event.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:3001/users/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      setProfilePictureUrl(response.data.imageUrl);
      setEditedProfileForm((prev) => {
        return { ...prev, picture: response.data.imageUrl };
      });
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    editedProfileForm &&
    isAuthenticated && (
      <div>
        <div className="flex justify-center mt-24">
          <form
            onSubmit={submitear}
            action="submit"
            className="w-4/6 py-5 text-base bg-[#fef3ed] shadow-md rounded-xl p-3"
          >
            <div className="flex justify-center">
              <h5 className="text-center bg-blue-0 text-white-0 font-semibold text-xl w-4/6 py-3 mb-5 rounded-xl">
                Edit user Information in the DataBase
              </h5>
            </div>

            <img
              className="w-40 mx-auto rounded-full"
              src={profilePictureUrl}
              alt={user.name}
            />

            <div className="flex flex-col items-center">
              <div className="w-5/6 flex mt-3">
                <input
                  type="file"
                  name="picture"
                  onChange={handleProfilePictureUpload}
                />
              </div>
              <div className="w-5/6 flex mt-3">
                <label className=" mr-3 font-semibold" htmlFor="book_title">
                  User Name:
                </label>
                <input
                  name="name"
                  type="text"
                  autoComplete="off"
                  className="rounded-xl border-2 grow"
                  value={editedProfileForm.user_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-5/6 flex mt-3">
                <label className=" mr-3 font-semibold" htmlFor="book_title">
                  Email address:
                </label>
                <input
                  name="email"
                  type="text"
                  autoComplete="off"
                  className="rounded-xl border-2 grow"
                  value={editedProfileForm.email_address}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="flex flex-col  text-center gap-4 p-1 justify-center items-center w-full text-base font-normal">
                <div className="flex justify-center px-2 py-1 bg-red-500 text-sm rounded-md">
                  <p className="text-white-0 ">
                    Warning: <br />
                    Email cannot be changed because of security reasons
                    regarding with Auth0.
                  </p>
                </div>
              </div>

              <div className="w-5/6 flex mt-3">
                <label className=" mr-3 font-semibold" htmlFor="book_title">
                  Phone number:
                </label>
                <input
                  name="phone_number"
                  type="text"
                  autoComplete="off"
                  className="rounded-xl border-2 grow"
                  value={editedProfileForm.phone_number}
                  onChange={handleChange}
                />
              </div>

              <div className="w-5/6 flex mt-3">
                <label className=" mr-3 font-semibold" htmlFor="book_title">
                  Address for delivery:
                </label>
                <input
                  name="address_street"
                  type="text"
                  autoComplete="off"
                  className="rounded-xl border-2 grow"
                  value={editedProfileForm.address_street}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="mt-5 text-lg bg-orange-0 px-10 py-2 rounded-full text-white-0 duration-200 hover:scale-110 hover:bg-[#D48620]"
              >
                Edit User
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditUserProfile;
