import { useEffect, useState } from "react";

const EditProfile = (props) => {
  const [userobject, setUserobject] = useState({});
  const [usuario, setUsuario] = useState({
    user_name: "",
    email_address: "",
    picture: "",
  });
  function submitear(e){
    e.preventDefault()
    fetch("http://localhost:3001/user",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
  }
  useEffect(() => {
    fetch(`http://localhost:3001/user/${props.newuser}`)
      .then((res) => res.json())
      .then((data) => setUserobject(data));
  }, []);
  return (
    <div>
      <form onSubmit={submitear}>
        <h2>edicion de usuario</h2>
        <label htmlFor="name">name</label>
        <input name="name" value={usuario.user_name} defaultValue={userobject.user_name}/>

        <label htmlFor="name">email</label>
        <input name="name" value={usuario.email_address} defaultValue={userobject.email_address}/>

        <label htmlFor="name">picture</label>
        <input name="name" value={usuario.picture} defaultValue={userobject.picture}/>
        {/* <button onClick={}>edit</button> */}
      </form>
    </div>
  );
};

export default EditProfile;
