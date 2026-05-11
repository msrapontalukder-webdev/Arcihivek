import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ data }) {
  if (!data || !data.chartData) {
    return (
      <div className="text-gray-500 h-64 flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chart Header block */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white mb-2">Total Revenue</h2>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-white">{data.amount}</span>
          <span className="text-sm text-green-400">↑ {data.growth}</span>
        </div>
      </div>

      {/* Recharts Implementation */}
      <div className="flex-1 min-h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#374151"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `${value}k`}
            />

            <Tooltip
              cursor={{ fill: "#2e3047" }}
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#374151",
                color: "#fff",
                borderRadius: "8px",
              }}
            />

            <Bar
              dataKey="current"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />

            <Bar
              dataKey="previous"
              fill="#f3f4f6"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
