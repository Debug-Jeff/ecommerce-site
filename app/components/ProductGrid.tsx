"use client"

import { useState, useMemo } from "react"
import { Grid, List, Heart, ShoppingCart, Star } from "lucide-react"
import { useCart } from "./CartContext"
import { mockProducts } from "../data/mockData"

interface ProductGridProps {
  category: string
}

export default function ProductGrid({ category }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 5000],
    brands: [] as string[],
    colors: [] as string[],
    inStockOnly: false,
  })

  const { addToCart, favorites, toggleFavorite } = useCart()

  const filteredProducts = useMemo(() => {
    let products = mockProducts

    // Filter by category if specified
    if (category) {
      products = products.filter((product) => product.category === category)
    }

    // Apply filters
    if (filters.categories.length > 0) {
      products = products.filter((product) => filters.categories.includes(product.category))
    }

    if (filters.inStockOnly) {
      products = products.filter((product) => product.inStock)
    }

    products = products.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Sort products
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        products.sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        products.sort((a, b) => b.rating - a.rating)
    }

    return products
  }, [category, filters, sortBy])

  const handleFilterChange = (type: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const toggleCategoryFilter = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat) ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat],
    }))
  }

  return (
    <div className="flex gap-8">
      {/* Filter Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
        <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            {["fresh-produce", "dairy-eggs", "meat-poultry", "beverages", "household"].map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategoryFilter(cat)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600 capitalize">{cat.replace("-", " ")}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleFilterChange("priceRange", [Number.parseInt(e.target.value) || 0, filters.priceRange[1]])
              }
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value) || 5000])
              }
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* In Stock Only */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => handleFilterChange("inStockOnly", e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-600">Only in Stock</span>
          </label>
        </div>

        <div className="text-sm text-gray-600 mb-4">{filteredProducts.length} items found</div>

        <button
          onClick={() =>
            setFilters({
              categories: [],
              priceRange: [0, 5000],
              brands: [],
              colors: [],
              inStockOnly: false,
            })
          }
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          Clear All Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {category ? category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "All Products"}
          </h2>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="popular">Popular First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>

            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-orange-100 text-orange-600" : "text-gray-600"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-orange-100 text-orange-600" : "text-gray-600"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                viewMode === "list" ? "flex items-center space-x-4 p-4" : "overflow-hidden"
              }`}
            >
              <div className={viewMode === "list" ? "w-24 h-24 flex-shrink-0" : "relative"}>
                <img
                  src={product.image || "/products/fresh-produce/mangoes.jpg"}
                  alt={product.name}
                  className={`object-cover ${viewMode === "list" ? "w-full h-full rounded-lg" : "w-full h-48"}`}
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow ${
                    favorites.includes(product.id) ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                </button>
                {product.badges.length > 0 && (
                  <div className="absolute top-2 left-2 space-y-1">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          badge.includes("%")
                            ? "bg-red-500 text-white"
                            : badge === "Fresh Today"
                              ? "bg-green-500 text-white"
                              : badge === "Special"
                                ? "bg-purple-500 text-white"
                                : "bg-blue-500 text-white"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                {product.origin && <p className="text-xs text-green-600 mb-2">{product.origin}</p>}

                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-800">KSh {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                  </button>
                </div>

                {product.stockCount <= 5 && product.inStock && (
                  <p className="text-xs text-red-600 mt-2">Only {product.stockCount} left!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
