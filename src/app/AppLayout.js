"use client"

import { usePathname } from "next/navigation"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import VhUpdater from "../components/utils/VhUpdater"
import { ContentProvider } from "../context/ContentContext"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { CartProvider } from "../components/cart-provider"
import { NavigationProvider } from "../context/NavigationContext"
import TopBar from "../components/TopBar"
import FaqSection from "../components/FaqSection"
import FeatureBar from "../constants/FeatureBar"

function LayoutContent({ children }) {
  const { isLoggedIn } = useAuth()
  const pathname = usePathname()

  return (
    <div className={`flex flex-col min-h-screen relative ${isLoggedIn ? "pt-10" : ""}`}>
      {isLoggedIn && <TopBar />}
      <VhUpdater />
      <Navbar />
      {/* <HamburgerMenu /> */}
      <main className="flex-grow">{children}</main>
      {pathname.startsWith('/product') && <FeatureBar />}
      {pathname === '/made-in-france' && <FeatureBar />}
      {pathname !== '/' &&
        pathname !== '/service/foilcharacteristics' &&
        pathname !== '/login' &&
        pathname !== '/register' &&
        pathname !== '/made-in-france' &&
        !pathname.startsWith('/account') &&
        !pathname.startsWith('/product') &&
        // 
        <></>
      }

      <Footer />
    </div>
  )
}

export default function AppLayout({ children }) {
  // keep this simple: always render the full layout
  return (
    <AuthProvider>
      <ContentProvider>
        <CartProvider>
          <NavigationProvider>
            <LayoutContent>{children}</LayoutContent>
          </NavigationProvider>
        </CartProvider>
      </ContentProvider>
    </AuthProvider>
  )
}