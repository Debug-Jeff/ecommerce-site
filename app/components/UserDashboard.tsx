"use client"

import { useState } from "react"
import { Package, Star, MapPin, Gift, TrendingUp, Award } from "lucide-react"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("orders")

  const orders = [
    {
      id: "GM-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 2450,
      items: 8,
    },
    {
      id: "GM-2024-002",
      date: "2024-01-12",
      status: "Processing",
      total: 1890,
      items: 5,
    },
    {
      id: "GM-2024-003",
      date: "2024-01-08",
      status: "Delivered",
      total: 3200,
      items: 12,
    },
  ]

  const loyaltyData = {
    points: 2450,
    tier: "Gold",
    nextTier: "Platinum",
    pointsToNext: 550,
    safariProgress: 35,
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">JM</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John Mwangi!</h1>
            <p className="text-orange-100">Member since January 2024</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{loyaltyData.points}</p>
              <p className="text-sm text-gray-600">Loyalty Points</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12%</p>
              <p className="text-sm text-gray-600">Savings Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{loyaltyData.tier}</p>
              <p className="text-sm text-gray-600">Member Tier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Safari Raffle Progress */}
      <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">🏔️ Amboseli Safari Raffle</h3>
          <span className="text-sm text-green-700 font-medium">{loyaltyData.safariProgress}% Complete</span>
        </div>
        <p className="text-gray-700 mb-4">Spend KSh 50,000 to enter the monthly safari draw!</p>
        <div className="w-full bg-white rounded-full h-3 mb-2">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${loyaltyData.safariProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">KSh 17,500 / KSh 50,000</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "orders", name: "Order History", icon: Package },
              { id: "loyalty", name: "Loyalty Program", icon: Gift },
              { id: "insights", name: "AI Insights", icon: TrendingUp },
              { id: "preferences", name: "Preferences", icon: MapPin },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Order {order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.items} items • {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">KSh {order.total.toLocaleString()}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "loyalty" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">You're a {loyaltyData.tier} Member!</h3>
                <p className="text-gray-600">
                  Earn {loyaltyData.pointsToNext} more points to reach {loyaltyData.nextTier}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Current Points</h4>
                  <p className="text-2xl font-bold text-yellow-600">{loyaltyData.points}</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Rewards Available</h4>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">This Month</h4>
                  <p className="text-2xl font-bold text-green-600">+450</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">AI Shopping Insights</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">💡 Smart Tip</h4>
                  <p className="text-gray-700">
                    You save 12% by shopping on Tuesdays. Your next Tuesday delivery slot is available!
                  </p>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">🥬 Fresh Recommendations</h4>
                  <p className="text-gray-700">
                    Based on your purchases, try organic spinach from Kiambu - it's in season and 20% off!
                  </p>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">📊 Spending Pattern</h4>
                  <p className="text-gray-700">
                    You spend most on fresh produce (45%) and dairy (25%). Consider our bulk discounts!
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Goal Progress</h4>
                  <p className="text-gray-700">
                    You're 65% towards your monthly budget goal of KSh 15,000. Great job staying on track!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Delivery Preferences</h3>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Default Delivery Location</h4>
                  <p className="text-gray-600">Nairobi CBD - Kenyatta Avenue</p>
                  <button className="text-orange-600 hover:text-orange-700 text-sm mt-2">Change Location</button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Preferred Delivery Time</h4>
                  <p className="text-gray-600">Weekdays: 3:00 PM - 6:00 PM</p>
                  <p className="text-gray-600">Weekends: 9:00 AM - 12:00 PM</p>
                  <button className="text-orange-600 hover:text-orange-700 text-sm mt-2">Update Preferences</button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Dietary Preferences</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Organic</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Produce</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Fresh Daily</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
