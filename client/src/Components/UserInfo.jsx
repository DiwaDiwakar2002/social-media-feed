import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserContext";
import axios from "axios";

// Component to display user information and handle logout
const UserInfo = () => {
  const { setUser, setAccountRedirect } = useContext(Context); // Access the context for user and account redirect
  const [userData, setUserData] = useState([]); // State to hold user data

  // useEffect to fetch user data on component mount
  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(`/user-data`);
        setUserData(data);
      };
      fetchData();
    } catch (error) {
      console.error("Error in fetching userInfo", error);
    }
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    await axios.post("/logout");
    setAccountRedirect('/'); // Redirect to home page after logout
    setUser(null); // Clear the user context
  };

  return (
    <div className="flex items-center justify-between lg:gap-5 gap-3 bg-white py-5 px-7 rounded-lg">
      <div className="flex gap-2">
        <div className="my-auto">
          {/* Display user name */}
          <h2 className="font-bold text-2xl">{userData.name}</h2>
          {/* Display user email */}
          <p className="text-sm text-gray-600">{userData.email}</p>
        </div>
      </div>
      {/* Logout button */}
      <button
        className="flex gap-2 items-center pe-4 bg-primary font-medium px-3 py-1 rounded-md text-white max-w-sm mt-2"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden sm:block">Logout</span>
      </button>
    </div>
  );
};

export default UserInfo;
