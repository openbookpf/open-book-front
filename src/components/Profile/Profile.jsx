import React, { useState } from 'react';
import { BiSolidMap } from 'react-icons/bi';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: 'Juan Gomez',
    address: 'Calle falsa 123',
    email: 'juangomez@gmail.com',
    phoneNumber: '123-456-7890'
  });

  const [image, setImage] = useState(null);


  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleEditProfileClick = () => {
    console.log('Editar perfil');
  };

  const handleAdvancedSettingsClick = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  return (
    <div className="bg-gray-500 min-h-screen flex justify-center items-center ">
      <div className="bg-white-0 p-4 rounded-lg shadow-md mr-80">
    
        <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gray-300 ">
          {image ? (
            <img src={image} alt="User" className="object-cover w-full h-full" />
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 0 0-2 19.447V17.75A8.25 8.25 0 1 1 10 1.5h-.25v5a.75.75 0 1 1-1.5 0v-5H7a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-.25v5a.75.75 0 1 1-1.5 0v-5H10A10 10 0 0 0 10 0zm.5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>

        <div className="font-bold">
          <label > </label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleUserChange} className="bg-white-0"/>
        </div>

        <div className="flex items-center">
          <BiSolidMap className="h-5 w-5 text-gray-500 mr-2" />
          <input type="text" name="address" value={user.address} onChange={handleUserChange} className="bg-white-0"/>
        </div>

        <div>
          <label></label>
          <input type="email" name="email" value={user.email} onChange={handleUserChange} className="bg-white-0" />
        </div>

        <div>
          <label></label>
          <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleUserChange} className="bg-white-0"/>
        </div>

        <div className="bg-blue-0 p-2 rounded-md mb-2">
        <button onClick={handleEditProfileClick} className="text-white-0">Edit Profile</button>
      </div>

      <div className="bg-cyan-0 p-2 rounded-md">
        <button onClick={handleAdvancedSettingsClick} className="text-white-0">
          {showAdvancedSettings ? 'Hide Advanced Configuration' : 'Advanced Configuration'}
        </button>
      </div>
        {showAdvancedSettings && (
          <div className="advanced-settings">
          </div>
        )}

<div className="flex justify-end items-start absolute top-0 right-10 mr-20 mt-32 bg-white-0">
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-lg font-bold">My Library 📚</h2>
    <p className="text-sm text-gray-600 mb-2">Books you bought</p>
    <button className="bg-orange-500 text-white-0 px-1 rounded-md">See All</button>
  </div>
</div>

<div className="flex justify-end items-start absolute top-0 right-10 mr-20 mt-80 bg-white-0">
  <div className="bg-white p-10 rounded-lg shadow-md">
    <h2 className="text-lg font-bold">Wish list ✨</h2>
    <p className="text-sm text-gray-600 mb-2">Favorites books</p>
    <button className="bg-orange-500 text-white-0 px-1  rounded-md">See All</button>
  </div>
</div>


      </div>
    </div>
  );
};

export default UserProfile;
