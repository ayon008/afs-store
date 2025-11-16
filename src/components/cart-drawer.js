"use client";

import React, { useRef, useEffect } from "react";
import { X, Plus, Minus, Trash } from "lucide-react";
import Image from "next/image";
import { useCart } from "./cart-provider";
import gsap from "gsap";

// Dashed divider component
const DashedDivider = () => (
  <div
    className="w-full h-[1px] my-4"
    style={{
      background:
        "repeating-linear-gradient(to right, #000 0, #000 6px, transparent 6px, transparent 10px)",
      backgroundSize: "10px 1px",
    }}
  />
);

export default function CartDrawer({ onClose }) {
  const { items, totalPrice, updateQty, removeItem, clear } = useCart();
  const isCartEmpty = items.length === 0;
  const drawerRef = useRef(null);
  const bgRef = useRef(null);

  // Animate drawer in on mount
  useEffect(() => {
    gsap.fromTo(
      drawerRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    // Animate drawer out before closing
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.5,
      ease: "power3.inOut",
    });
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: onClose,
    });
  };

  const handleBackgroundClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const textStyle = "text-black font-extrabold uppercase tracking-widest";

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-50 flex items-start justify-end p-0 bg-gray-900/50 backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div
        ref={drawerRef}
        className="w-full h-full max-w-2xl bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className={`text-xl ${textStyle} md:text-2xl`}>YOUR CART</h1>
          <button
            onClick={handleClose}
            aria-label="Close Cart"
            className={`text-sm ${textStyle} text-gray-500 transition duration-200 hover:text-black p-2 -mr-2`}
          >
            X CLOSE
          </button>
        </header>

        {/* Content */}
        <main className="flex flex-col flex-grow p-8 overflow-auto text-center">
          {isCartEmpty ? (
            <div className="text-xl font-light tracking-[.25em] text-gray-400">
              NO PRODUCTS IN THE CART.
            </div>
          ) : (
            <ul className="space-y-6 text-left">
              {items.map((it) => (
                <li key={it.productId} className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {it.image && (
                      <Image
                        src={it.image}
                        alt={it.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-sm text-gray-500">
                          ${(it.price || 0).toFixed(2)}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(it.productId)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(it.productId, Math.max(0, it.quantity - 1))
                        }
                        className="p-1 rounded border"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="px-3 py-1 border rounded">{it.quantity}</div>
                      <button
                        onClick={() => updateQty(it.productId, it.quantity + 1)}
                        className="p-1 rounded border"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>

        {/* Footer */}
        <footer className="p-6">
          <div
            className="w-full h-[2px] my-4"
            style={{
              background:
                "repeating-linear-gradient(to right, #000 0, #000 10px, transparent 10px, transparent 15px)",
              backgroundSize: "15px 2px",
              marginLeft: 0,
            }}
          />
          <div className="flex items-center justify-between mt-4 mb-6">
            <span className={`text-xl ${textStyle}`}>SUBTOTAL:</span>
            <span className={`text-3xl ${textStyle}`}>
              ${Number(totalPrice || 0).toFixed(2)}{" "}
              <span className="text-sm font-medium text-gray-500">(incl. VAT)</span>
            </span>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <button
              className="flex items-center justify-center w-[60%] px-6 py-3 space-x-2 text-sm font-bold text-white uppercase transition-colors duration-300 bg-blue-500 rounded-none shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => (window.location.href = "/checkout")}
            >
              <span>CONTINUE TO BASKET</span>
              <span className="ml-2">↗</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
