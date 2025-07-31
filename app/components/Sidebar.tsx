"use client"

import { Leaf, Milk, Beef, Package, Coffee, Droplets, Sofa, Mountain } from "lucide-react"

interface SidebarProps {
  onNavigate: (page: string) => void
  onCategorySelect: (category: string) => void
}

const categories = [
  { id: "fresh-produce", name: "Fresh Produce", icon: Leaf, count: 245 },
  { id: "dairy-eggs", name: "Dairy & Eggs", icon: Milk, count: 89 },
  { id: "meat-poultry", name: "Meat & Poultry", icon: Beef, count: 156 },
  { id: "pantry", name: "Pantry Essentials", icon: Package, count: 432 },
  { id: "beverages", name: "Beverages", icon: Coffee, count: 198 },
  { id: "household", name: "Household Items", icon: Droplets, count: 267 },
  { id: "furniture", name: "Furniture (Livara)", icon: Sofa, count: 78 },
  { id: "tourism", name: "Tourism Packages", icon: Mountain, count: 12 },
]

export default function Sidebar({ onNavigate, onCategorySelect }: SidebarProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId)
    onNavigate("products")
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg"></div>
          <h1 className="text-xl font-bold text-gray-800">Guardmart</h1>
        </div>

        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors group"
              >
                <Icon className="w-5 h-5 group-hover:text-orange-600" />
                <span className="flex-1">{category.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-orange-100 group-hover:text-orange-600">
                  {category.count}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
