"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import HomePage from "./HomePage"
import ProductGrid from "./ProductGrid"
import ShoppingCart from "./ShoppingCart"
import CheckoutFlow from "./CheckoutFlow"
import UserDashboard from "./UserDashboard"
import { CartProvider } from "./CartContext"

export default function MainLayout() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState("")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} />
      case "products":
        return <ProductGrid category={selectedCategory} />
      case "checkout":
        return <CheckoutFlow onBack={() => setCurrentPage("home")} />
      case "dashboard":
        return <UserDashboard />
      default:
        return <HomePage onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} />
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="flex">
          <Sidebar onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} />
          <div className="flex-1 ml-64">
            <Header onNavigate={setCurrentPage} />
            <main className="p-6">{renderPage()}</main>
          </div>
        </div>
        <ShoppingCart onCheckout={() => setCurrentPage("checkout")} />
      </div>
    </CartProvider>
  )
}
