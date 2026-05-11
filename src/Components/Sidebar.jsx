export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Statistics",
    "Payment",
    "Transactions",
    "Products",
    "Customer",
    "Messages",
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
        {menuItems.map((item) => (
          <div
            key={item}
            className={`px-4 py-3 rounded-lg cursor-pointer transition-colors ${
              item === "Dashboard"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-[#2e3047]"
            }`}
          >
            {item}
          </div>
        ))}
      </nav>

      <div className="px-8 pb-8 space-y-4 text-gray-400">
        <div className="cursor-pointer hover:text-white">Settings</div>
        <div className="cursor-pointer hover:text-white">Logout</div>
      </div>
    </aside>
  );
}
