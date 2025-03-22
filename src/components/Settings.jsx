import React, { useState, useEffect } from "react";

const Settings = () => {
  // Initial State
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  // Load User Data from LocalStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Welcome </h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <label className="cursor-pointer">
          <img
            src={
              user.profilePic ||
              "https://static.cricbuzz.com/a/img/v1/152x152/i1/c616435/mark-chapman.jpg"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <input type="file" className="hidden" readOnly />
        </label>
      </div>

      {/* Name Input */}
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        name="name"
        value={user.fullName}
        readOnly
        className="w-full p-2 border border-gray-300 rounded mt-1"
        placeholder="Enter your name"
      />

      {/* Email Input */}
      <label className="block text-sm font-medium text-gray-700 mt-3 ">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={user.email}
        readOnly
        className="w-full p-2 border border-gray-300 rounded mt-1"
        placeholder="Enter your email"
      />

      {/* Save Button */}
      <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        See Details.......
      </button>
    </div>
  );
};

export default Settings;
