export default function OrdersTable({ orders }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "canceled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700">
            <th className="pb-3 font-medium">Products</th>
            <th className="pb-3 font-medium">Order ID</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Customer name</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {orders.map((order, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-800 hover:bg-[#2e3047] transition-colors"
            >
              <td className="py-4">{order.product}</td>
              <td className="py-4 text-gray-500">{order.id}</td>
              <td className="py-4">{order.date}</td>
              <td className="py-4">{order.customer}</td>
              <td className="py-4 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full bg-current ${getStatusColor(order.status)}`}
                ></span>
                {order.status}
              </td>
              <td className="py-4">{order.amount}</td>
              <td className="py-4 tracking-widest cursor-pointer text-gray-500 hover:text-white">
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
