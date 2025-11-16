"use client"

import { useState } from "react"

export default function YourOrderSection({ 
  items, 
  totalPrice, 
  selectedShipping, 
  shippingOptions, 
  appliedCoupon,
  onShippingChange,
  onWireTransfer,
  paypalButton, // new prop for custom PayPal button/component
  moneticoButton // new prop for custom Monetico button/component
}) {
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const selectedShippingOption = shippingOptions.find(s => s.id === selectedShipping)
  const shippingCost = selectedShippingOption ? parseFloat(selectedShippingOption.cost || "0") : 0
  const subtotal = totalPrice
  const tax = subtotal * 0.17 // 17% VAT as shown in image
  const discount = appliedCoupon?.discount_percent ? (subtotal * appliedCoupon.discount_percent / 100) : 0
  const total = subtotal + shippingCost + tax - discount

  return (
    <div className="bg-white mt-8">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">Your order</h3>
      
      {/* Order items table */}
      <table className="w-full border-b-2 border-gray-300">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-300">
            <th className="text-left p-4 text-sm font-semibold text-gray-900 border-r border-gray-300">Product</th>
            <th className="text-right p-4 text-sm font-semibold text-gray-900">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productId} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 border-r border-gray-300">
                <div className="text-sm">
                  <div className="font-semibold text-blue-600 mb-1">{item.name} <span className="text-gray-600 font-normal">× {item.quantity}</span></div>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div>Surface: Sm2</div>
                    <div>Boom Clip Or System: No</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {(item.price * item.quantity).toFixed(2)}€ <span className="text-xs text-gray-500 font-normal">(incl. VAT)</span>
                </div>
              </td>
            </tr>
          ))}
          
          <tr className="bg-gray-50 border-b-2 border-gray-300">
            <td className="p-4 border-r border-gray-300 text-sm font-semibold text-gray-900">Subtotal</td>
            <td className="p-4 text-right text-sm font-semibold text-gray-900">
              {subtotal.toFixed(2)}€ <span className="text-xs text-gray-500 font-normal">(incl. VAT)</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Shipping section */}
      <div className="border-b-2 border-gray-300">
        <div className="bg-gray-50 border-b border-gray-300 p-4">
          <h4 className="text-sm font-semibold text-gray-900">Shipping</h4>
        </div>
        <div className="p-4 space-y-3">
          {shippingOptions.map((option) => (
            <label key={option.id} className="flex items-start space-x-3 cursor-pointer group hover:bg-gray-50 p-2 rounded transition">
              <input 
                type="radio" 
                name="shipping" 
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={() => onShippingChange(option.id)}
                className="mt-1 w-4 h-4" 
              />
              <div className="flex-1">
                <div className="text-sm text-gray-900">{option.title}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {option.cost && option.cost !== '0.00' ? (
                    <>
                      {option.cost}€ <span className="text-xs text-gray-500 font-normal">(incl. VAT)</span>
                    </>
                  ) : (
                    'Free'
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Total row */}
      <div className="bg-gray-50 border-b-2 border-gray-300">
        <div className="flex justify-between items-center p-4">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-sm font-semibold text-gray-900">
            {total.toFixed(2)}€ <span className="text-xs text-gray-500 font-normal">(includes {tax.toFixed(2)}€ TVA)</span>
          </span>
        </div>
      </div>

      {/* PayPal installment info */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6">
        <div className="flex items-start space-x-3">
          <div>
            <span className="inline-block text-blue-600 font-bold">PayPal</span>
            <p className="text-sm text-blue-900 mt-1">Payez en 4 échéances de <strong>{(total / 4).toFixed(2)}€</strong> sans frais. <a href="#" className="text-blue-600 underline">En savoir plus</a></p>
          </div>
        </div>
      </div>

      {/* Payment methods - matching image styling */}
      <div className="space-y-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="radio" 
              name="payment" 
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-blue-600"
            />
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-bold">PayPal</span>
            </div>
          </label>
          
          {paymentMethod === "paypal" && (
            <div className="mt-3 text-sm text-gray-700 ml-8">
              Pay with PayPal
            </div>
          )}
        </div>

        <label className="flex items-center space-x-3 cursor-pointer p-3 rounded hover:bg-gray-50">
          <input 
            type="radio" 
            name="payment" 
            value="wire"
            checked={paymentMethod === "wire"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="text-gray-900 font-medium">Wire transfer</span>
        </label>
      </div>

      {/* Privacy policy and terms */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
        <p className="text-xs text-gray-700 mb-3">Your personal data will be used to process your order, assist you during your visit to the website, and for other reasons described in our <a href="/privacy-policy" className="text-blue-600 underline">privacy policy</a>.</p>
        
        <label className="flex items-start space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 accent-blue-600"
          />
          <span className="text-xs text-gray-700">I have read and agree to the website <a href="/general-terms-and-conditions-of-sale" className="text-blue-600 underline">terms and conditions</a> <span className="text-red-600">*</span></span>
        </label>
      </div>

      {/* Payment buttons */}
      <div className="space-y-3">
        {paymentMethod === "paypal" && agreedToTerms && paypalButton}
        {paymentMethod === "wire" && agreedToTerms && moneticoButton}
        {paymentMethod === "wire" && !moneticoButton && (
          <button 
            onClick={onWireTransfer}
            disabled={!agreedToTerms}
            className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded font-medium transition"
          >
            PROCEED WITH WIRE TRANSFER
          </button>
        )}
      </div>
    </div>
  )
}