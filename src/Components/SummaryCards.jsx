export default function SummaryCards({ title, data, color }) {
  return (
    <div className="bg-[#27293d] p-6 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-white mb-1">{data.total}</div>
        <p className="text-xs text-gray-500">{data.subtitle}</p>
      </div>

      <div className="relative w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-700">
        <div
          className={`absolute top-0 right-0 w-4 h-4 rounded-full ${color}`}
        ></div>
      </div>
    </div>
  );
}
