// import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import VhUpdater from "../components/utils/VhUpdater"
import { ContentProvider } from "../context/ContentContext"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { CartProvider } from "../components/cart-provider"
import { NavigationProvider } from "../context/NavigationContext"
// import TopBar from "../components/TopBar"
import FaqSection from "../components/FaqSection"
import FeatureBar from "../constants/FeatureBar"
import NavBar from "../Shared/NavBar/NavBar.jsx"
import { getMenuItems } from "../funtions/getMenuData"

async function LayoutContent({ children }) {
  // const { isLoggedIn } = useAuth()
  // const pathname = usePathname()
  const NAV_LINKS = await getMenuItems();

  console.log('NAV_LINKS', NAV_LINKS);



  return (
    // ${isLoggedIn ? "pt-10" : ""}
    <div className={`flex flex-col min-h-screen relative`}>
      {/* {isLoggedIn && <TopBar />} */}
      <VhUpdater />
      {/* <Navbar /> */}
      <NavBar NAV_LINKS={NAV_LINKS} />
      {/* <HamburgerMenu /> */}
      <main className="flex-grow lg:pt-[157px] pt-[64px] z-20">{children}</main>
      {/* {pathname.startsWith('/product') && <FeatureBar />}
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
      } */}

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