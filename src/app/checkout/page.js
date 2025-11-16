"use client"

import React, { useState, useEffect } from "react"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import CheckoutStepper from "@/components/CheckoutStepper"
import YourOrderSection from "@/components/YourOrderSection"
import CheckoutPayPal from "@/components/CheckoutPayPal"
import CheckoutMonetico from "@/components/CheckoutMonetico"
import Link from "next/link"
import {
  CheckCircle,
  MapPin,
  ShoppingBag,
  Truck,
  ArrowLeft,
  Shield,
  Lock,
} from "lucide-react"
import App from "./emptycart"

const steps = [
  { id: 1, name: "Basket" },
  { id: 2, name: "Secure payment and delivery" },
  { id: 3, name: "Summary" },
]

export default function CheckoutPage() {
  const { items, clear, totalPrice, updateQty, removeItem } = useCart()
  const { user } = useAuth()

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    company: "",
    city: "",
    country: "FR",
    postcode: "",
    email: "",
    phone: "",
  })
  const [shipping, setShipping] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "FR",
    postcode: "",
    email: "",
    phone: "",
  })
  const [shipToDifferent, setShipToDifferent] = useState(true)
  const [shippingOptions, setShippingOptions] = useState([])
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState("")

  const hasItems = items.length > 0
  const [currentStep, setCurrentStep] = useState(1)
  const [placedOrder, setPlacedOrder] = useState(null)
  const [placedPayUrl, setPlacedPayUrl] = useState("")
  
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "", remember: false })
  const [couponCode, setCouponCode] = useState("")
  const [showCouponForm, setShowCouponForm] = useState(false)

  useEffect(() => {
    if (user?.email && !billing.email) {
      setBilling((prev) => ({ ...prev, email: user.email || "" }))
    }
  }, [user, billing.email])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/shipping-options")
        if (!res.ok) return
        const j = await res.json()
        const opts = j.options || []
        setShippingOptions(opts)
        if (opts.length) setSelectedShipping(opts[0].id)
      } catch {}
    }
    if (currentStep === 1 || currentStep === 2) load()
  }, [currentStep])

  const handlePayPalSuccess = (orderDetails) => {
    console.log('PayPal payment successful:', orderDetails);
    const wooOrder = orderDetails.wooOrder || {};
    setPlacedOrder({
      wooOrderId: wooOrder.id,
      id: wooOrder.id,
      status: wooOrder.status || 'processing',
      payment_method: 'paypal',
      transactionId: orderDetails.transactionId,
    });
    setCurrentStep(3);
    clear();
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("cart_v1");
      } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
      }
    }
  }

  const handleWireTransfer = async () => {
    try {
      const selectedShippingObj = shippingOptions.find((s) => s.id === selectedShipping) || null
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billing,
          shipping: shipToDifferent
            ? shipping
            : {
                first_name: billing.first_name,
                last_name: billing.last_name,
                address_1: billing.address_1,
                address_2: billing.address_2,
                city: billing.city,
                country: billing.country,
                postcode: billing.postcode,
              },
          line_items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
          shipping_option: selectedShippingObj
            ? { id: selectedShippingObj.id, title: selectedShippingObj.title, cost: selectedShippingObj.cost }
            : undefined,
          payment_method: "bacs",
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to create order")
      setPlacedOrder({ wooOrderId: data.orderId, status: data.status, payment_method: data.payment_method })
      setPlacedPayUrl(data.payUrl || "")
      clear()
      try { localStorage.removeItem("cart_v1") } catch {}
      setCurrentStep(3)
    } catch (e) {
      alert(e?.message || "Wire transfer order failed")
    }
  }

  if (!hasItems) {
    return <App />
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <CheckoutStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(id) => {
          if (id < currentStep) setCurrentStep(id)
        }}
      />

      <div className={`grid grid-cols-1 ${currentStep === 2 ? "lg:grid-cols-1" : "lg:grid-cols-2"} gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8`}>
        <div className="space-y-4 sm:space-y-6">
          {currentStep === 1 ? (
            <>
              <div className="bg-white border border-gray-200 shadow-sm">
                <div className="hidden sm:grid grid-cols-[30px_1fr_120px_120px_120px] font-semibold text-gray-700 uppercase tracking-wider text-xs sm:text-sm border-b border-gray-200 px-4 sm:px-6 py-4">
                  <div></div>
                  <div>Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Subtotal</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.productId} className="grid grid-cols-1 sm:grid-cols-[30px_1fr_120px_120px_120px] items-start px-3 sm:px-6 py-4 gap-3 sm:gap-0">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-lg font-bold w-fit sm:mt-1"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name}`}
                      >
                        &times;
                      </button>

                      <div className="flex items-start space-x-3 sm:space-x-4 sm:pr-4">
                        <img
                          src="https://placehold.co/40x40/f3f4f6/000?text=I"
                          alt={item.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
                        />
                        <div className="flex-1 text-sm">
                          <div className="text-blue-600 font-medium hover:underline cursor-pointer text-sm sm:text-base">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Surface: {item.quantity * 2}m2
                          </div>
                          <div className="text-xs text-gray-500">
                            Boom Clip On System: Yes
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:block justify-between sm:text-center text-xs sm:text-sm text-gray-800 sm:pt-1">
                        <span className="sm:hidden font-semibold">Price:</span>
                        <span>{(item.price).toFixed(2).replace('.', ',')}€</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-center gap-2 sm:pt-1">
                        <span className="sm:hidden text-xs font-semibold">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQty(item.productId, parseInt(e.target.value) || 1)}
                          className="w-12 sm:w-16 h-8 text-center border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-0 text-xs sm:text-sm"
                        />
                      </div>

                      <div className="flex sm:block justify-between sm:text-right text-xs sm:text-sm text-gray-800 sm:pt-1">
                        <span className="sm:hidden font-semibold">Subtotal:</span>
                        <span>
                          {((item.price * item.quantity)).toFixed(2).replace('.', ',')}€ <span className="text-xs text-gray-500 whitespace-nowrap">(incl. VAT)</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 sm:p-6 sm:pt-0 flex justify-start border-t border-gray-200">
<button
  type="button"
  className="mt-2 bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 px-4 sm:px-6 py-2 font-semibold text-xs sm:text-sm uppercase tracking-wider transition duration-150 whitespace-nowrap"
>
  Update basket
</button>

                </div>
                
                <div className="p-3 sm:p-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input
                      type="text"
                      className="flex-1 border border-gray-400 px-3 py-2 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                    />
                    <button
                      type="button"
                      className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 px-4 sm:px-6 py-2 font-semibold text-xs sm:text-sm uppercase tracking-wider transition duration-150 whitespace-nowrap w-full sm:w-auto"
                      onClick={async () => {
                        try {
                          if (!couponCode.trim()) {
                            setCouponError("Please enter a coupon code");
                            return;
                          }
                          const res = await fetch("/api/coupons", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ code: couponCode })
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.message);
                          if (!data.valid) throw new Error("Invalid coupon code");
                          setAppliedCoupon(data);
                          setCouponError("");
                          setCouponCode("");
                        } catch (error) {
                          setCouponError(error.message || "Failed to apply coupon");
                        }
                      }}
                    >
                      Apply promo code
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-600 text-xs mt-2">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="text-green-600 text-xs mt-2">
                      Coupon {appliedCoupon.code} applied successfully!
                      {appliedCoupon.discount_percent && ` (${appliedCoupon.discount_percent}% off)`}
                      {appliedCoupon.free_shipping && " (Free shipping)"}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : currentStep === 2 ? (
            <div className="space-y-4 sm:space-y-8">
<div className="border border-[#1d98ff] bg-gray-50 rounded mb-4 p-3">
  <button
    type="button"
    onClick={() => setShowLoginForm(!showLoginForm)}
    className="flex items-center cursor-pointer w-full text-left"
  >
    <input 
      type="checkbox" 
      className="mr-2 pointer-events-none accent-[#1d98ff]" 
      checked={showLoginForm}
      readOnly
    />
    <span className="text-[#1d98ff] font-normal text-sm">Returning customer? Click here to login</span>
  </button>
</div>

{showLoginForm && (
  <div className="border border-gray-200 rounded mb-4 p-4 sm:p-6 bg-white">
    <p className="text-xs sm:text-sm text-gray-700 mb-4">
      If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.
    </p>
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="text-xs sm:text-sm text-gray-700 mb-1 block">
            Username or email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs sm:text-sm text-gray-700 mb-1 block">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
<Button
  type="button"
  className="bg-gray-200 hover:bg-gray-300 !text-black px-6 text-sm w-full sm:w-auto font-medium transition-all duration-200"
  onClick={() => console.log('Login clicked', loginData)}
>
  Login
</Button>

        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={loginData.remember}
            onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
            className="mr-2 accent-[#1d98ff]"
          />
          <span className="text-xs sm:text-sm text-gray-700">Remember me</span>
        </label>
      </div>
      <a href="#" className="text-xs sm:text-sm text-blue-600 hover:underline block">
        Lost your password?
      </a>
    </div>
  </div>
)}

<>
  <div className="border border-[#1d98ff] bg-gray-50 rounded mb-4 p-3">
    <button
      type="button"
      onClick={() => setShowCouponForm(!showCouponForm)}
      className="flex items-center cursor-pointer w-full text-left"
    >
      <input 
        type="checkbox" 
        className="mr-2 pointer-events-none accent-[#1d98ff]" 
        checked={showCouponForm}
        readOnly
      />
      <span className="text-[#1d98ff] font-normal text-sm">Have a coupon? Click here to enter your code</span>
    </button>
  </div>

  {showCouponForm && (
    <div className="border border-gray-200 rounded mb-4 p-4 sm:p-6 bg-white">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          className="w-full sm:flex-grow border border-gray-300 rounded px-3 py-2 text-sm"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon code"
        />
<Button
  type="button"
  className="bg-gray-200 hover:bg-gray-300 !text-black px-6 text-sm w-full sm:w-auto font-medium transition-all duration-200"
  onClick={async () => {
    try {
      if (!couponCode.trim()) {
        setCouponError("Please enter a coupon code");
        return;
      }

      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      if (!data.valid) throw new Error("Invalid coupon code");

      setAppliedCoupon(data);
      setCouponError("");
      setCouponCode("");
    } catch (error) {
      setCouponError(error.message || "Failed to apply coupon");
    }
  }}
>
  Apply Coupon
</Button>

      </div>
      {couponError && (
        <p className="text-red-600 text-xs mt-2">{couponError}</p>
      )}
      {appliedCoupon && (
        <p className="text-green-600 text-xs mt-2">
          Coupon {appliedCoupon.code} applied successfully!
          {appliedCoupon.discount_percent && ` (${appliedCoupon.discount_percent}% off)`}
          {appliedCoupon.free_shipping && " (Free shipping)"}
        </p>
      )}
    </div>
  )}
</>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-4">Billing Information</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { label: "First name", key: "first_name", required: true },
                      { label: "Last name", key: "last_name", required: true },
                      { label: "Company name (optional)", key: "company", required: false },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="text-xs sm:text-sm text-gray-700 mb-1 block">
                          {field.label} {field.required && <span className="text-red-600">*</span>}
                        </label>
                        <input 
                          className="w-full border rounded px-3 py-2 text-sm" 
                          placeholder={field.label}
                          value={billing[field.key]}
                          onChange={e => setBilling({ ...billing, [field.key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs sm:text-sm text-gray-700 mb-1 block">Country / Region *</label>
                      <select className="w-full border rounded px-3 py-2 text-sm" value={billing.country} onChange={e => setBilling({ ...billing, country: e.target.value })}>
                        <option value="FR">France</option>
                      </select>
                    </div>
                    {[
                      { label: "Street address", key: "address_1", required: true },
                      { label: "Apartment, suite, unit, etc. (optional)", key: "address_2", required: false },
                      { label: "Postcode / ZIP", key: "postcode", required: true },
                      { label: "Town / City", key: "city", required: true },
                      { label: "Phone", key: "phone", required: true },
                      { label: "Email address", key: "email", required: true },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="text-xs sm:text-sm text-gray-700 mb-1 block">
                          {field.label} {field.required && <span className="text-red-600">*</span>}
                        </label>
                        <input 
                          className="w-full border rounded px-3 py-2 text-sm" 
                          placeholder={field.label}
                          value={billing[field.key]}
                          onChange={e => setBilling({ ...billing, [field.key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs sm:text-sm text-gray-700 mb-1 block">How did you hear about the brand? *</label>
                      <select className="w-full border rounded px-3 py-2 text-sm" value="" onChange={() => {}}>
                        <option value="">Please select…</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 sm:w-5 sm:h-5" 
                      checked={shipToDifferent} 
                      onChange={e => setShipToDifferent(e.target.checked)} 
                    />
                    <h3 className="text-base sm:text-lg font-semibold">Ship to a different address?</h3>
                  </div>

                  {shipToDifferent ? (
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { label: "First name", key: "first_name" },
                        { label: "Last name", key: "last_name" },
                        { label: "Company name (optional)", key: "company" },
                      ].map(field => (
                        <div key={field.key}>
                          <label className="text-xs sm:text-sm text-gray-700 mb-1 block">{field.label} *</label>
                          <input 
                            className="w-full border rounded px-3 py-2 text-sm" 
                            placeholder={field.label}
                            value={shipping[field.key]}
                            onChange={e => setShipping({ ...shipping, [field.key]: e.target.value })}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="text-xs sm:text-sm text-gray-700 mb-1 block">Country / Region *</label>
                        <select className="w-full border rounded px-3 py-2 text-sm" value={shipping.country} onChange={e => setShipping({ ...shipping, country: e.target.value })}>
                          <option value="FR">France</option>
                        </select>
                      </div>
                      {[
                        { label: "Street address", key: "address_1" },
                        { label: "Apartment, suite, unit, etc. (optional)", key: "address_2" },
                        { label: "Postcode / ZIP", key: "postcode" },
                        { label: "Town / City", key: "city" },
                        { label: "Phone", key: "phone" },
                      ].map(field => (
                        <div key={field.key}>
                          <label className="text-xs sm:text-sm text-gray-700 mb-1 block">{field.label} *</label>
                          <input 
                            className="w-full border rounded px-3 py-2 text-sm" 
                            placeholder={field.label}
                            value={shipping[field.key]}
                            onChange={e => setShipping({ ...shipping, [field.key]: e.target.value })}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="text-xs sm:text-sm text-gray-700 mb-1 block">Order notes (optional)</label>
                        <input 
                          className="w-full border rounded px-3 py-2 text-sm" 
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          value={shipping.note || ""}
                          onChange={e => setShipping({ ...shipping, note: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs sm:text-sm">Shipping will be sent to your billing address</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6">
                <YourOrderSection
                  items={items}
                  totalPrice={totalPrice}
                  selectedShipping={selectedShipping}
                  shippingOptions={shippingOptions}
                  appliedCoupon={appliedCoupon}
                  onShippingChange={setSelectedShipping}
                  onWireTransfer={handleWireTransfer}
                  paypalButton={
                    <CheckoutPayPal
                      cartData={{
                        lineItems: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
                        shippingLines: selectedShipping
                          ? [{ method_id: selectedShipping, total: shippingOptions.find((s) => s.id === selectedShipping)?.cost || "0.00" }]
                          : [],
                      }}
                      customerData={{
                        billing,
                        shipping: shipToDifferent ? shipping : { first_name: billing.first_name, last_name: billing.last_name, company: billing.company, address_1: billing.address_1, address_2: billing.address_2, city: billing.city, country: billing.country, postcode: billing.postcode, email: billing.email, phone: billing.phone },
                      }}
                      onSuccess={handlePayPalSuccess}
                    />
                  }
                  moneticoButton={
                    <CheckoutMonetico
                      cartData={{
                        lineItems: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
                        shippingLines: selectedShipping
                          ? [
                              {
                                method_id: selectedShipping,
                                total: shippingOptions.find((s) => s.id === selectedShipping)?.cost || "0.00",
                              },
                            ]
                          : [],
                      }}
                      customerData={{
                        billing,
                        shipping: shipToDifferent
                          ? shipping
                          : {
                              first_name: billing.first_name,
                              last_name: billing.last_name,
                              company: billing.company,
                              address_1: billing.address_1,
                              address_2: billing.address_2,
                              city: billing.city,
                              country: billing.country,
                              postcode: billing.postcode,
                              email: billing.email,
                              phone: billing.phone,
                            },
                      }}
                      onSuccess={(orderDetails) => {
                        console.log('Monetico payment successful:', orderDetails)
                        setPlacedOrder(orderDetails)
                        setCurrentStep(3)
                        clear()
                        try {
                          localStorage.removeItem("cart_v1")
                        } catch (error) {
                          console.error('Error clearing cart:', error)
                        }
                      }}
                      onError={(error) => {
                        console.error('Monetico payment error:', error)
                        alert('Payment failed: ' + error.message)
                      }}
                    />
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 text-sm sm:text-base w-full sm:w-auto"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          ) : (
<div className="bg-white rounded-md border border-gray-200 p-4 sm:p-8 mx-auto relative left-1/2 -translate-x-[50%]">
  <h2 className="text-lg sm:text-2xl font-bold mb-4 text-green-700 flex justify-center items-center flex-wrap gap-2">
    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" /> 
    Order Placed Successfully
  </h2>

  {placedOrder ? (
    <div className="text-center">
      <div className="mb-4 text-sm sm:text-lg">
        Order ID: <span className="font-bold">{placedOrder.wooOrderId || placedOrder.id}</span>
      </div>

      {placedOrder.payment_method === 'bacs' ? (
        <div className="space-y-3">
          <div className="mb-2 text-xs sm:text-base">
            Your order has been created. Please complete the payment via bank transfer using the instructions on the next page.
          </div>
          {placedPayUrl && (
            <Link href={placedPayUrl}>
              <Button className="text-xs sm:text-sm">Go to payment instructions</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="mb-2 text-xs sm:text-base">
          Thank you for your purchase! Your order has been placed and is being processed.
        </div>
      )}
    </div>
  ) : (
    <div className="text-red-600 text-xs sm:text-base text-center">
      No order details found.
    </div>
  )}

  <Link href="/shop" className="flex justify-center">
    <Button
      className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-md shadow-sm hover:shadow-md transition-all duration-200"
    >
      Continue Shopping
    </Button>
  </Link>
</div>

          )}
        </div>

        {currentStep === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6">
              <YourOrderSection
                items={items}
                totalPrice={totalPrice}
                selectedShipping={selectedShipping}
                shippingOptions={shippingOptions}
                appliedCoupon={appliedCoupon}
                onShippingChange={setSelectedShipping}
                onWireTransfer={handleWireTransfer}
                paypalButton={
                  <CheckoutPayPal
                    cartData={{
                      lineItems: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
                      shippingLines: selectedShipping
                        ? [{ method_id: selectedShipping, total: shippingOptions.find((s) => s.id === selectedShipping)?.cost || "0.00" }]
                        : [],
                    }}
                    customerData={{
                      billing,
                      shipping: shipToDifferent ? shipping : { first_name: billing.first_name, last_name: billing.last_name, company: billing.company, address_1: billing.address_1, address_2: billing.address_2, city: billing.city, country: billing.country, postcode: billing.postcode, email: billing.email, phone: billing.phone },
                    }}
                    onSuccess={handlePayPalSuccess}
                  />
                }
              />
            </div>
            <div className="flex justify-center px-0">
              <Button 
                onClick={() => setCurrentStep(2)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 sm:py-3.5 text-sm sm:text-base font-bold tracking-wider uppercase rounded-lg shadow-md transition duration-150"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}