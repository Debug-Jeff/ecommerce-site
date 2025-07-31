"use client"

import { Search, Filter, ShoppingCart, MapPin, User } from "lucide-react"
import { useCart } from "./CartContext"

interface HeaderProps {
  onNavigate: (page: string) => void
}

export default function Header({ onNavigate }: HeaderProps) {
  const { cartItems, setIsCartOpen } = useCart()
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded"></div>
            <span className="font-bold text-gray-800">Guardmart</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for fresh produce, dairy, meat..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span className="text-sm">Filter</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Nairobi CBD - 3hr delivery</span>
          </div>

          <button
            onClick={() => onNavigate("dashboard")}
            className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
