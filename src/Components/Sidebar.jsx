import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for mobile toggle

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Statistics", path: "/statistics" },
    { name: "Payment", path: "/payment" },
    { name: "Transactions", path: "/transactions" },
    { name: "Products", path: "/products" },
    { name: "Customer", path: "/customer" },
    { name: "Messages", path: "/messages" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- MOBILE HAMBURGER BUTTON --- */}
      {/* Only visible on small screens when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#232433] text-white rounded-md border border-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* --- MOBILE OVERLAY --- */}
      {/* Dims the background when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#232433] transform transition-transform duration-300 ease-in-out flex flex-col pt-6 border-r border-gray-800 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:min-h-screen`}
      >
        {/* Sidebar Header */}
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-white font-bold text-xl tracking-wider">
              DEALBUZZZ
            </span>
          </div>

          {/* --- CLOSE (CROSS) ICON --- */}
          {/* Only visible on mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // Close sidebar when link is clicked on mobile
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:text-white hover:bg-[#2e3047]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-8 pb-8 space-y-4 text-gray-400 border-t border-gray-800 pt-6">
          <div className="cursor-pointer hover:text-white transition-colors flex items-center gap-2">
            <span>Settings</span>
          </div>
          <div className="cursor-pointer hover:text-white transition-colors flex items-center gap-2">
            <span>Logout</span>
          </div>
        </div>
      </aside>
    </>
  );
}
