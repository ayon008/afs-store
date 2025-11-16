"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import NAV_LINKS from "../constants/navlinks";
import {
  User,
  Search,
  ShoppingCart,
  Menu,
  UserCircle,
  ChevronDown,
  CircleUserRound,
  ScrollText,
  LogOut,
} from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
import FoilSubbar from "./subdisplay";
import "flag-icons/css/flag-icons.min.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import { useCart } from "./cart-provider";
import CartDrawer from "./cart-drawer";
import ServiceSubbar from "./ServiceSubbar";
import HamburgerMenu from "./HamburgerMenu";
import SearchOverlay from "./search";
import { createSlug } from "../utils/slugUtils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [selectedSublink, setSelectedSublink] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHoveringNavOrSub, setIsHoveringNavOrSub] = useState(false);
  const subDisplayRef = useRef(null);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const { user, logout } = useAuth();
  const { totalQty } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function onDocClick(e) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) setIsProfileOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setIsProfileOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileRef]);

  useEffect(() => {
    if (!navbarRef.current) return;

    const updateHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    const handleClickOutside = (event) => {
      if (
        selectedSublink &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        subDisplayRef.current &&
        !subDisplayRef.current.contains(event.target)
      ) {
        setSelectedSublink(null);
        setHoveredLink(null);
        setIsHoveringNavOrSub(false);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", updateHeight);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, selectedSublink]);

  const handleMouseEnterNav = (idx) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredLink(idx);
    setIsHoveringNavOrSub(true);
  };

  const handleMouseLeaveNav = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!selectedSublink) {
        setHoveredLink(null);
        setIsHoveringNavOrSub(false);
      }
      timeoutRef.current = null;
    }, 150);
  };

  const handleMouseEnterSub = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHoveringNavOrSub(true);
  };

  const handleMouseLeaveSub = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
      setIsHoveringNavOrSub(false);
      setSelectedSublink(null);
      timeoutRef.current = null;
    }, 150);
  };

  const { updateNavigation } = useNavigation();

  const handleSublinkClick = (subId) => {
    if (selectedSublink === subId) {
      setSelectedSublink(null);
      setHoveredLink(null);
      setIsHoveringNavOrSub(false);
    } else {
      setSelectedSublink(subId);
      // Find the main navigation item and sublink
      const mainNav = NAV_LINKS.find((nav) =>
        nav.sublinks?.some((sub) => sub.id === subId)
      );
      const sublink = mainNav?.sublinks?.find((sub) => sub.id === subId);

      if (mainNav && sublink) {
        updateNavigation(mainNav.name, sublink);
      }
    }
  };

  return (
    <>
      {isHoveringNavOrSub && hoveredLink !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-all duration-200"></div>
      )}

      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-lg"
        onMouseEnter={() => setIsHoveringNavOrSub(true)}
        onMouseLeave={handleMouseLeaveNav}
      >
        <div className="py-2 border-b border-gray-600">
          <Container>
            <div className="flex justify-between items-center h-14">
              <button
                className="flex md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6 text-white" />
              </button>

              <Link href="/" className="hidden md:flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Alpago Properties Clone"
                  width={150}
                  height={45}
                  priority
                  className="ml-6"
                />
              </Link>

              <div className="flex items-center space-x-3 md:space-x-4 mr-6">
                {/* Desktop Search */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center bg-[#3d3d3d] rounded-full h-9 w-64 px-3"
                >
                  <Search className="w-5 h-5 mr-2 text-white opacity-90" />
                  <span className="bg-[#3d3d3d] w-full text-sm text-white text-left">
                    Search for...
                  </span>
                </button>

                {/* Mobile Search */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex md:hidden items-center bg-[#3d3d3d] rounded-full h-8 px-2"
                  aria-label="Open search"
                >
                  <Search className="w-4 h-4 text-white" />
                </button>

                {/* Profile/User */}
                {user ? (
                  <div className="relative flex items-center" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen((s) => !s)}
                      aria-expanded={isProfileOpen}
                      aria-haspopup="true"
                      className="flex items-center gap-2 rounded-full p-2 text-sm font-medium text-gray-100 transition-all duration-300 
             hover:bg-gray-800/60 backdrop-blur-md 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
             focus:ring-[rgba(186,230,253,0.6)] dark:focus:ring-[rgba(196,181,253,0.6)]"
                    >
                      <UserCircle className="h-6 w-6 text-gray-200" />
                      <span className="hidden md:inline">
                        {user.name || "Account"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </button>

                    {isProfileOpen && (
                      <div
                        className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <Link
                          href="/account"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                          role="menuitem"
                        >
                          <CircleUserRound className="h-5 w-5 text-gray-500" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                          role="menuitem"
                        >
                          <ScrollText className="h-5 w-5 text-gray-500" />
                          <span>Orders</span>
                        </Link>

                        {/* Divider */}
                        <div className="my-2 h-px bg-gray-200" />

                        <button
                          onClick={async () => {
                            setIsProfileOpen(false);
                            try {
                              await logout();
                            } catch (e) {}
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                          role="menuitem"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center p-1 md:p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </Link>
                )}

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center justify-center relative p-1 md:p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  <span className="absolute -top-1 -right-2 text-xs font-bold bg-white text-black rounded-full h-4 w-4 flex items-center justify-center pointer-events-none">
                    {totalQty || 0}
                  </span>
                </button>

                {/* Language */}
                <button className="hidden md:flex items-center justify-center text-sm font-extrabold p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                  <span className="fi fi-fr fis mr-2 scale-125"></span>
                  <span className="text-white text-[0.95rem] font-extrabold tracking-wide">
                    FR
                  </span>
                </button>
              </div>
            </div>
          </Container>
        </div>

        <div className="hidden md:block py-2 border-t border-gray-500 relative">
          <div className="flex justify-center items-center whitespace-nowrap px-4">
            {NAV_LINKS.map((link, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => handleMouseEnterNav(idx)}
                onMouseLeave={handleMouseLeaveNav}
              >
                <Link
                  href={link.href}
                  className="text-[16px] font-semibold tracking-wide flex items-center justify-center relative"
                  style={{ padding: "12px 15px 13px" }}
                  onClick={() => {
                    if (link.sublinks && link.sublinks.length > 0) {
                      updateNavigation(link.name, link.sublinks[0]);
                    } else {
                      updateNavigation(link.name);
                    }
                  }}
                >
                  <span className="absolute top-[-6px] left-0 w-full h-[calc(100%+12px)] bg-white opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                  <span className="relative z-10 text-white group-hover:text-black">
                    {link.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {hoveredLink !== null &&
          NAV_LINKS[hoveredLink].sublinks &&
          (NAV_LINKS[hoveredLink].name === "Service" ? (
            <div
              onMouseEnter={handleMouseEnterSub}
              onMouseLeave={handleMouseLeaveSub}
              className="fixed left-1/2 -translate-x-1/2 bg-white border-t border-gray-300 w-full max-w-[100%] flex justify-center items-center z-50"
              style={{ top: navbarHeight, marginTop: 0, paddingTop: 0 }}
            >
              <ServiceSubbar />
            </div>
          ) : (
            <div
              onMouseEnter={handleMouseEnterSub}
              onMouseLeave={handleMouseLeaveSub}
              className="fixed left-1/2 -translate-x-1/2 bg-white border-t border-gray-300 py-4 w-full max-w-[100%] flex justify-center items-center z-50"
              style={{ top: navbarHeight }}
            >
              {NAV_LINKS[hoveredLink].sublinks.map((sub, subIdx) => (
                <button
                  key={subIdx}
                  onClick={() => handleSublinkClick(sub.id)}
className={`text-black font-['Alliance_No.2'] text-[16px] font-bold tracking-wide mx-3 transition-colors duration-200 ${
                    selectedSublink === sub.id
                      ? "text-blue-600"
                      : "hover:text-gray-600"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          ))}

        {selectedSublink && (
          <div
            ref={subDisplayRef}
            className="fixed left-1/2 -translate-x-1/2 w-full z-50"
            style={{ top: navbarHeight + (hoveredLink !== null ? 56 : 0) }}
            onMouseEnter={handleMouseEnterSub}
            onMouseLeave={handleMouseLeaveSub}
          >
            <div className="bg-white shadow-lg">
              <FoilSubbar
                selectedSublinkId={selectedSublink}
                onClose={() => {
                  setSelectedSublink(null);
                  setHoveredLink(null);
                  setIsHoveringNavOrSub(false);
                }}
              />
            </div>
          </div>
        )}
      </nav>

      <div style={{ height: `${navbarHeight}px` }} />

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
