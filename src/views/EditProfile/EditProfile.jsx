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
    if (event.target.name === "name") {
      setUsuario({ ...usuario, user_name: event.target.value });
    }
    if (event.target.name === "email") {
      setUsuario({ ...usuario, email_address: event.target.value });
    }
    if (event.target.name === "picture") {
      setUsuario({ ...usuario, picture: event.target.value });
    }
  }

  const submitear = async (e) => {
    e.preventDefault();
    try {
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
  useEffect(() => {
    fetch(`http://localhost:3001/users/findbyname/${user.name}`)
      .then((res) => res.json())
      .then((data) => setUserobject(data));
  }, []);
  console.log(userobject);
  return (
    <div className="mt-20">
      <pre>{JSON.stringify(user)}</pre>
      {/* <h2>"Hola": {newuser}</h2> */}
      <form onSubmit={submitear}>
        <h2>edicion de usuario</h2>
        <div>
          <label htmlFor="name">name</label>
        </div>
        <div>
          <input
            name="name"
            value={usuario.user_name}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
        </div>
        <div>
          <input
            name="email"
            value={usuario.email_address}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label htmlFor="picture">picture</label>
        </div>
        <div>
          <input
            name="picture"
            value={usuario.picture}
            onChange={handlerChange}
          />
        </div>
        {usuario.user_name !== "" ||
        usuario.email_address !== "" ||
        usuario.picture ? (
          <button type="Submit">edit</button>
        ) : (
          <button disabled type="Submit">
            edit
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
