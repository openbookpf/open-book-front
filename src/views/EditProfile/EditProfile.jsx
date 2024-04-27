import { useEffect, useState } from "react";

const EditProfile = (props) => {
  const [userobject, setUserobject] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3001/user/${props.newuser}`)
      .then((res) => res.json())
      .then((data) => setUserobject(data));
  }, []);
  return (
    <div>
      <h2>edicion de usuario</h2>
      <label htmlFor="name">name</label>
      <input name="name" value={userobject} />
    </div>
  );
};

export default EditProfile;
