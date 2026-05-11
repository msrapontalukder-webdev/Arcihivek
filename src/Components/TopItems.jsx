export default function TopItems({ items }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-white mb-6">Most Sold Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{item.name}</span>
              <span className="text-gray-300">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
