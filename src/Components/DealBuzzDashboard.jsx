import React, { useState, useEffect } from "react";
import axiosClient from "../hooks/axios"; // Import your custom Axios instance
import Sidebar from "../Components/Sidebar";
import SummaryCards from "../Components/SummaryCards";
import RevenueChart from "../Components/RevenueChart";
import TopItems from "../Components/TopItems";
import OrdersTable from "../Components/OrdersTable";

export default function DealBuzzDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Modular Axios fetch function
    const fetchDashboardData = async () => {
      try {
        // Replace with your actual Express route: e.g., '/api/v1/dashboard/summary'
        // const response = await axios.get('/api/v1/dashboard/summary');

        // Mocking the backend response based on the design
        const mockResponse = {
          data: {
            summary: {
              sales: {
                total: "$20.4K",
                subtitle: "We have sold 123 items",
                percent: 65,
              },
              revenue: {
                total: "$8.2K",
                subtitle: "Available to payout",
                percent: 45,
              },
              escrow: {
                total: "$18.2K",
                subtitle: "Available to payout",
                percent: 80,
              },
            },
            totalRevenue: {
              amount: "$50.4K",
              growth: "5% than last month",
              // Chart data would go here
            },
            topItems: [
              { name: "Jeans", percentage: 70 },
              { name: "Shirts", percentage: 40 },
              { name: "Belts", percentage: 60 },
              { name: "Caps", percentage: 80 },
              { name: "Others", percentage: 20 },
            ],
            latestOrders: [
              {
                id: "#11232",
                product: "Iphone 13 Pro",
                date: "Jun 29, 2022",
                customer: "Afaq Karim",
                status: "Delivered",
                amount: "$400.00",
              },
              {
                id: "#11233",
                product: "Macbook Pro",
                date: "Jun 29, 2022",
                customer: "Afaq Karim",
                status: "Pending",
                amount: "$288.00",
              },
              {
                id: "#11234",
                product: "Apple Watch",
                date: "Jun 29, 2022",
                customer: "Afaq Karim",
                status: "Canceled",
                amount: "$500.00",
              },
              {
                id: "#11235",
                product: "Microsoft Book",
                date: "Jun 29, 2022",
                customer: "Afaq Karim",
                status: "Delivered",
                amount: "$100.00",
              },
            ],
          },
        };

        // Simulate network delay
        setTimeout(() => {
          setDashboardData(mockResponse.data);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#1e1e2d] text-white flex items-center justify-center">
        Loading Data...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#1a1b27] font-sans text-gray-300">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <div className="bg-[#27293d] px-4 py-2 rounded text-sm text-gray-400 cursor-pointer">
            28 Jan, 2021 - 28 Dec, 2021 ▾
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCards
            title="Todays Sales"
            data={dashboardData.summary.sales}
            color="bg-blue-500"
          />
          <SummaryCards
            title="Todays Revenue"
            data={dashboardData.summary.revenue}
            color="bg-green-500"
          />
          <SummaryCards
            title="In Escrow"
            data={dashboardData.summary.escrow}
            color="bg-orange-500"
          />
        </div>

        {/* Middle Section: Charts and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-[#27293d] p-6 rounded-xl">
            <RevenueChart data={dashboardData.totalRevenue} />
          </div>
          <div className="bg-[#27293d] p-6 rounded-xl">
            <TopItems items={dashboardData.topItems} />
          </div>
        </div>

        {/* Bottom Section: Data Table */}
        <div className="bg-[#27293d] p-6 rounded-xl">
          <h2 className="text-lg font-medium text-white mb-4">Latest Orders</h2>
          <OrdersTable orders={dashboardData.latestOrders} />
        </div>
      </main>
    </div>
  );
}
