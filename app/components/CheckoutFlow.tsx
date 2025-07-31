"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, CreditCard, Smartphone, Banknote, Check } from "lucide-react"
import { useCart } from "./CartContext"

interface CheckoutFlowProps {
  onBack: () => void
}

export default function CheckoutFlow({ onBack }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const { cartItems, clearCart } = useCart()

  const [checkoutData, setCheckoutData] = useState({
    address: "",
    timeSlot: "",
    paymentMethod: "",
    mpesaPhone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 120
  const discount = 100
  const total = subtotal + deliveryFee - discount

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your order #GM-2024-001 has been confirmed and will be delivered within 3 hours.
        </p>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Delivery Details</h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium">{checkoutData.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time Slot:</span>
              <span className="font-medium">{checkoutData.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold text-lg">KSh {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step < 4 && <div className={`w-16 h-1 ${currentStep > step ? "bg-orange-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Location</label>
                  <select
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Choose your location</option>
                    <option value="Nairobi CBD">Nairobi CBD</option>
                    <option value="Westlands">Westlands</option>
                    <option value="Karen">Karen</option>
                    <option value="Kilimani">Kilimani</option>
                    <option value="Lavington">Lavington</option>
                    <option value="Kileleshwa">Kileleshwa</option>
                  </select>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!checkoutData.address}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue to Time Slot
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Delivery Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM", "6:00 PM - 9:00 PM"].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setCheckoutData({ ...checkoutData, timeSlot: slot })}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      checkoutData.timeSlot === slot
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{slot}</div>
                    <div className="text-sm text-gray-600">Available today</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!checkoutData.timeSlot}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </h2>
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setCheckoutData({ ...checkoutData, paymentMethod: "mpesa" })}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    checkoutData.paymentMethod === "mpesa"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-sm text-gray-600">Pay with mobile money</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setCheckoutData({ ...checkoutData, paymentMethod: "card" })}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    checkoutData.paymentMethod === "card"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard accepted</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setCheckoutData({ ...checkoutData, paymentMethod: "cash" })}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    checkoutData.paymentMethod === "cash"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Banknote className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive</div>
                    </div>
                  </div>
                </button>
              </div>

              {checkoutData.paymentMethod === "mpesa" && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Phone Number</label>
                  <input
                    type="tel"
                    placeholder="0712345678"
                    value={checkoutData.mpesaPhone}
                    onChange={(e) => setCheckoutData({ ...checkoutData, mpesaPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {checkoutData.paymentMethod === "card" && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={checkoutData.cardNumber}
                      onChange={(e) => setCheckoutData({ ...checkoutData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={checkoutData.cardExpiry}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cardExpiry: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={checkoutData.cardCvv}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cardCvv: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setCurrentStep(4)}
                disabled={!checkoutData.paymentMethod}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Review Order
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Delivery Address:</span>
                  <span>{checkoutData.address}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Delivery Time:</span>
                  <span>{checkoutData.timeSlot}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Payment Method:</span>
                  <span className="capitalize">{checkoutData.paymentMethod}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Place Order - KSh {total.toLocaleString()}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>KSh {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee:</span>
              <span>KSh {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-KSh {discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
              <span>Total:</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>• Temperature-controlled delivery ❄️</p>
            <p>• Fresh guarantee or money back</p>
            <p>• SMS updates on delivery status</p>
          </div>
        </div>
      </div>
    </div>
  )
}
