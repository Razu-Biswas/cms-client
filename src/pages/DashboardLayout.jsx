import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiUsers, FiFileText, FiSettings, FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-500 text-white p-4 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white mb-4"
        >
          <FiMenu size={24} />
        </button>
        <ul>
          <li className="flex items-center p-3 cursor-pointer hover:bg-gray-700">
            <FiUsers />
            {sidebarOpen && (
              <Link to="/dashboard/employees" className="ml-3">
                Employees
              </Link>
            )}
          </li>
          <li className="flex items-center p-3 cursor-pointer hover:bg-gray-700">
            <FiFileText />
            {sidebarOpen && (
              <Link to="/dashboard/contacts-list" className="ml-3">
                Contacts List
              </Link>
            )}
          </li>
          <li className="flex items-center p-3 cursor-pointer hover:bg-gray-700">
            <FiSettings />
            {sidebarOpen && (
              <Link to="/dashboard/settings" className="ml-3">
                Settings
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Loads the selected page inside the dashboard */}
      </div>
    </div>
  );
};

export default DashboardLayout;
