import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Updated to include paths for routing
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Statistics", path: "/statistics" },
    { name: "Payment", path: "/payment" },
    { name: "Transactions", path: "/transactions" },
    { name: "Products", path: "/products" },
    { name: "Customer", path: "/customer" },
    { name: "Messages", path: "/messages" },
  ];

  return (
    <aside className="w-64 bg-[#232433] min-h-screen flex flex-col pt-6 border-r border-gray-800">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-6 h-6 bg-white rounded-sm"></div>
        <span className="text-white font-bold text-xl tracking-wider">
          DEALBUZZZ
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          // Check if the current URL matches the item's path
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#2e3047]"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-8 pb-8 space-y-4 text-gray-400">
        <div className="cursor-pointer hover:text-white transition-colors">
          Settings
        </div>
        <div className="cursor-pointer hover:text-white transition-colors">
          Logout
        </div>
      </div>
    </aside>
  );
}
