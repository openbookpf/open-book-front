import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const EditProfile = (props) => {
  const { user } = useAuth0();
  const [userobject, setUserobject] = useState("");
  const [usuario, setUsuario] = useState({
    user_name: user.name,
    email_address: user.email,
    picture: user.picture,
  });

  function handlerChange(event) {
    console.log(event.target.value);
    if (event.target.name === "name") {
      setUsuario({ ...usuario, user_name: event.target.value });
    }
    if (event.target.name === "email") {
      setUsuario({ ...usuario, email_address: event.target.value });
    }
    if (event.target.name === "picture") {
      setUsuario({ ...usuario, picture: event.target.files[0] });
    } else {
      setUsuario({ ...usuario, [event.target.name]: event.target.value });
    }
  }

  const submitear = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("user_name", usuario.user_name);
      formData.append("email_address", usuario.email_address);
      formData.append("picture", usuario.picture);

      const response = await fetch(
        `http://localhost:3001/users/modifybyname?user_name=${user.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        }
      );
      if (response.ok) {
        const nuevoRegistro = await response.json();
        console.log("Registro creado con éxito:", nuevoRegistro);
      } else {
        console.error("Error al crear el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  //setUserobject(data)
  // useEffect(() => {
  //   fetch(`http://localhost:3001/users/findbyname/${user.name}`)
  //     .then((res) => res.json())
  //     .then((data) => setUserobject(data));
  // }, []);

  return (
    <div className="mt-20 flex justify-center">
      <form
        className=" mt-20 w-4/6 py-5 text-base bg-[#fef3ed] shadow-md rounded-xl p-3 "
        onSubmit={submitear}
      >
        <div className="flex justify-center">
          <h5 className="text-center bg-blue-0 text-white-0 font-semibold text-xl w-4/6 py-3 mb-5 rounded-xl">
            Edit User
          </h5>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="picture" className="mr-3 font-semibold ">
            Picture
          </label>
        </div>
        <div className="w-5/6 flex mt-3 duration-200 flex-col items-center">
          <input type="file" name="picture" onChange={handlerChange} />
          {usuario.picture && typeof usuario.picture === "object" && (
            <div className="mt-3 w-24 h-24 overflow-hidden rounded-full border-2 border-gray-400">
              <img
                src={URL.createObjectURL(usuario.picture)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <button
            type="submit"
            className="mt-3 text-lg bg-orange-0 px-5 py-1 rounded-full text-white-0 duration-200 hover:scale-110 hover:bg-[#D48620]"
          >
            Save Image
          </button>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="name" className="mr-3 font-semibold">
            Name
          </label>
        </div>
        <div className="w-5/6 flex mt-3 duration-200 flex-col items-center">
          <input
            name="name"
            value={usuario.user_name}
            onChange={handlerChange}
          />
        </div>

        <div className="flex justify-center items-center">
          <label htmlFor="email" className="mr-3 font-semibold">
            Email
          </label>
        </div>
        <div className="w-5/6 flex mt-3 duration-200 flex-col items-center">
          <input
            name="email"
            value={usuario.email_address}
            onChange={handlerChange}
          />
        </div>

        <div className="flex justify-center items-center">
          {usuario.user_name !== "" ||
          usuario.email_address !== "" ||
          usuario.picture ? (
            <button
              type="Submit"
              className="mt-5 text-lg bg-orange-0 px-10 py-2 rounded-full text-white-0 duration-200 hover:scale-110 hover:bg-[#D48620]"
            >
              Save Edit
            </button>
          ) : (
            <button disabled type="Submit">
              Save Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
