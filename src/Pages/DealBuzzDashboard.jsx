import React, { useState, useEffect } from "react";
import axiosClient from "../hooks/axios";
import Sidebar from "../Components/Sidebar";
import SummaryCards from "../Components/SummaryCards";
import RevenueChart from "../Components/RevenueChart";
import TopItems from "../Components/TopItems";
import OrdersTable from "../Components/OrdersTable";

export default function DealBuzzDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
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
            totalRevenue: { amount: "$50.4K", growth: "5% than last month" },
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
      <div className="min-h-screen bg-[#1a1b27] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 animate-pulse">Loading Data...</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1a1b27] font-sans text-gray-300">
      {/* Sidebar - responsive behavior handled inside component */}
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Header - Stacks on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back, DealBuzz Admin
            </p>
          </div>

          <div className="w-full sm:w-auto bg-[#27293d] px-4 py-2 rounded-lg text-sm text-gray-400 cursor-pointer border border-gray-800 flex justify-between items-center gap-2">
            <span>28 Jan, 2021 - 28 Dec, 2021</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Top KPI Cards - 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
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
          {/* Revenue Chart Section */}
          <div className="lg:col-span-2 bg-[#27293d] p-4 sm:p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">
              Revenue Overview
            </h2>
            <div className="w-full h-[300px]">
              <RevenueChart data={dashboardData.totalRevenue} />
            </div>
          </div>

          {/* Top Items Section */}
          <div className="bg-[#27293d] p-4 sm:p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">
              Top Selling Items
            </h2>
            <TopItems items={dashboardData.topItems} />
          </div>
        </div>

        {/* Bottom Section: Data Table - Responsive Wrapper */}
        <div className="bg-[#27293d] p-4 sm:p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-white">Latest Orders</h2>
            <button className="text-sm text-blue-500 hover:underline">
              View All
            </button>
          </div>

          {/* Horizontal scroll container for tables on small screens */}
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[700px]">
              <OrdersTable orders={dashboardData.latestOrders} />
            </div>
          </div>
        </div>
      </main>

      {/* Global CSS for custom scrollbar on table */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1b27;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3a3b4f;
          border-radius: 10px;
        }
      `,
        }}
      />
    </div>
  );
}
