import React from 'react';
import { useRouter } from 'next/navigation';

// Icon for the "CONTINUE TO BASKET" button
const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

// Main Cart Component
const Cart = ({ onClose }) => {
  const router = useRouter();
  const subtotal = "0,00€"; // Keeping European format

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm"
    >
      {/* Responsive Side Cart Drawer */}
      <div
        className="fixed top-0 right-0 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        style={{ width: 'min(100vw, 640px)' }} // ✅ 640px max width, full on mobile
      >
        {/* Cart Layout */}
        <div className="flex flex-col h-full">
          
          {/* HEADER */}
          <header className="px-6 py-4 flex justify-between items-center border-b border-black">
            <h1
              className="text-xl font-extrabold tracking-widest uppercase"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              YOUR CART
            </h1>

            <button
              onClick={onClose}
              className="flex items-center text-xs text-black opacity-80 hover:opacity-100 transition duration-150 p-1 -mr-1 uppercase"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-sm font-bold mr-1 leading-none">×</span>
              <span className="tracking-widest font-semibold text-xs leading-none">
                CLOSE
              </span>
            </button>
          </header>

          {/* EMPTY STATE / MAIN CONTENT */}
          <main className="flex-grow flex items-center justify-center p-8">
            <div className="text-center">
              <p
                className="text-lg text-gray-300 font-bold tracking-widest uppercase select-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                NO PRODUCTS IN THE CART.
              </p>
            </div>
          </main>

          {/* FOOTER */}
          <footer className="p-6">
            {/* Dashed Line */}
            <div className="mb-6 border-t-2 border-black border-dashed" />

            {/* Subtotal */}
            <div className="flex justify-between items-baseline mb-6">
              <span
                className="text-base font-extrabold uppercase tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                SUBTOTAL:
              </span>
              <span
                className="text-3xl font-extrabold leading-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {subtotal}
              </span>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center mt-4">
  <button
    className="flex items-center justify-center gap-2 w-full max-w-[230px] h-[48px]
               bg-[#0094FF] hover:bg-[#0080E6] text-white text-sm font-semibold
               uppercase rounded-none transition-all duration-200"
    style={{
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.03em',
    }}
    onClick={() => {
      onClose(); // Close the cart drawer first
      router.push('/cart/emptycart'); // Navigate to empty cart page
    }}
  >
    CONTINUE TO BASKET
    <ExternalLinkIcon className="w-4 h-4" />
  </button>
</div>

          </footer>
        </div>
      </div>
    </div>
  );
};

export default Cart;
