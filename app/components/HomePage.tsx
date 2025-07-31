"use client"

import { ArrowRight, Star, Zap, Truck, Shield } from "lucide-react"

interface HomePageProps {
  onNavigate: (page: string) => void
  onCategorySelect: (category: string) => void
}

const featuredCategories = [
  {
    id: "fresh-produce",
    name: "Fresh Produce",
    image: "/placeholder.svg?height=200&width=300",
    discount: "30%",
    count: 245,
    isNew: false,
  },
  {
    id: "dairy-eggs",
    name: "Dairy & Eggs",
    image: "/placeholder.svg?height=200&width=300",
    discount: "15%",
    count: 89,
    isNew: false,
  },
  {
    id: "meat-poultry",
    name: "Meat & Poultry",
    image: "/placeholder.svg?height=200&width=300",
    discount: "20%",
    count: 156,
    isNew: true,
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "/placeholder.svg?height=200&width=300",
    discount: "25%",
    count: 198,
    isNew: false,
  },
]

export default function HomePage({ onNavigate, onCategorySelect }: HomePageProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId)
    onNavigate("products")
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Banner */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">BIG SALE!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Fresh mangoes from Kiambu County
              <br />
              Premium quality, locally sourced
            </p>
            <button
              onClick={() => handleCategoryClick("fresh-produce")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute right-4 top-4 w-48 h-48 opacity-20">
            <img
              src="/products/fresh-produce/mangoes.jpg"
              alt="Mangoes"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Side Banners */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Get up to 20%</h3>
            <p className="text-gray-600 mb-4">OFF Fresh Vegetables</p>
            <button
              onClick={() => handleCategoryClick("fresh-produce")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition-colors"
            >
              Shop now
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Safari Special</h3>
            <p className="text-gray-600 mb-4">
              Spend KSh 50,000
              <br />
              Win Amboseli Safari!
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
            </div>
            <p className="text-xs text-gray-600">KSh 17,500 / KSh 50,000</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Fast Delivery</h4>
            <p className="text-sm text-gray-600">3-hour delivery in Nairobi</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Fresh Guarantee</h4>
            <p className="text-sm text-gray-600">100% fresh or money back</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Local Sourcing</h4>
            <p className="text-sm text-gray-600">Direct from Kenyan farms</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">M-Pesa Ready</h4>
            <p className="text-sm text-gray-600">Pay with mobile money</p>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Explore popular categories</h2>
          <button className="text-orange-600 hover:text-orange-700 flex items-center space-x-1">
            <span>See all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={category.image || "/products/fresh-produce/mangoes.jpg"}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {category.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    -{category.discount}
                  </div>
                )}
                {category.isNew && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    New
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
