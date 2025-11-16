"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <footer className="bg-[#f7f7f7] text-black flex flex-col px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 pt-16 sm:pt-24 pb-12 font-sans">
      {/* Main Content Wrapper */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-8 lg:gap-x-16 xl:gap-x-24">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <h2
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(48px, 10vw, 72px)",
                  fontWeight: 700,
                  lineHeight: "1.1",
                  color: "rgb(17, 17, 17)",
                }}
                className="leading-none tracking-tight"
              >
                Subscribe to our
                <br />
                newsletter
              </h2>

              <p
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(16px, 4vw, 18px)",
                  fontWeight: 500,
                  lineHeight: "1.2",
                  color: "rgb(51, 51, 51)",
                }}
                className="max-w-full sm:max-w-[320px]"
              >
                We won’t send you spam; we’ll only let you know about new
                products and events.
              </p>

              {/* Email Input Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 space-y-3"
              >
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: '"alliance no.2", sans-serif',
                    fontSize: "clamp(10px, 3vw, 11px)",
                    fontWeight: 600,
                    lineHeight: "1.3",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#222",
                  }}
                  className="block mb-1 tracking-widest"
                >
                  EMAIL
                </label>

                <div className="relative max-w-full sm:max-w-[320px]">
                  <input
                    id="email"
                    type="email"
                    placeholder="person@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#000000] rounded-sm bg-transparent text-[clamp(12px, 3.5vw, 14px)] placeholder-gray-400 py-2 pl-3 pr-10 outline-none focus:ring-0"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={!agreed || !email}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-black disabled:opacity-50"
                  >
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>

                {/* Checkbox */}
                <div className="flex items-start space-x-2 pt-2 relative">
                  <div className="relative">
                    <input
                      id="privacy"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="peer mt-0.5 w-4 h-4 border border-gray-400 rounded-[4px] 
                 appearance-none cursor-pointer transition-all duration-200 
                 bg-white checked:bg-[#0075ff] checked:border-[#0075ff]"
                    />
                    <svg
                      className="absolute top-1 left-[3px] w-3 h-3 text-white opacity-0 
                 peer-checked:opacity-100 transition-opacity duration-150 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <label
                    htmlFor="privacy"
                    style={{
                      fontFamily: '"alliance no.2", sans-serif',
                      fontSize: "clamp(12px, 3.5vw, 18px)",
                      fontWeight: 600,
                      lineHeight: "1.3",
                      color: "rgb(153, 153, 153)",
                    }}
                    className="leading-snug select-none"
                  >
                    I accept the{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-semibold hover:text-[#0075ff] transition-colors"
                    >
                      privacy policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="font-semibold hover:text-[#0075ff] transition-colors"
                    >
                      terms of use
                    </Link>
                  </label>
                </div>
              </form>
            </div>

            {/* AFS Social Links */}
            <div className="mt-12 md:mt-0">
              <h3
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(20px, 5vw, 24px)",
                  fontWeight: 700,
                  lineHeight: "1.2",
                  color: "rgb(17, 17, 17)",
                }}
                className="mt-6"
              >
                AFS
              </h3>
              <ul
                className="space-y-1 mt-2"
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(16px, 4vw, 18px)",
                  fontWeight: 500,
                  lineHeight: "1.3",
                  color: "rgb(51, 51, 51)",
                }}
              >
                <li>
                  <Link
                    href="https://www.instagram.com/afsfoils/"
                    className="hover:text-black transition-colors"
                  >
                    INSTAGRAM
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/afsfoils/"
                    className="hover:text-black transition-colors"
                  >
                    FACEBOOK
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCv-LqvRBRFQWBSJSeIZK_5g"
                    className="hover:text-black transition-colors"
                  >
                    YOUTUBE
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.whatsapp.com/channel/0029VaR5sep0Qeajo7HHEQ32"
                    className="hover:text-black transition-colors"
                  >
                    WHATSAPP
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 md:gap-8 lg:flex lg:flex-col lg:space-y-10">
            <div>
              <h3
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(20px, 5vw, 24px)",
                  fontWeight: 700,
                  lineHeight: "1.2",
                  color: "rgb(17, 17, 17)",
                }}
              >
                About Us
              </h3>
              <ul
                className="space-y-1 mt-2"
                style={{
                  fontFamily: '"alliance no.2", sans-serif, serif',
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "19.6px",
                  color: "rgb(51, 51, 51)",
                }}
              >
                <li>
                  <Link
                    href="/afs-advanced"
                    className="hover:text-black transition-colors"
                  >
                    AFS ADVANCED
                  </Link>
                </li>
                <li>
                  <Link
                    href="/made-in-france"
                    className="hover:text-black transition-colors"
                  >
                    MADE IN FRANCE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/afs-product-tests-and-reviews"
                    className="hover:text-black transition-colors"
                  >
                    NOTICE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/team"
                    className="hover:text-black transition-colors"
                  >
                    TEAM
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://foilandco.notion.site/Recrutements-Foil-And-Co-Marque-AFS-59425ad74b8e4b359c63de5f44aa8f26"
                    className="hover:text-black transition-colors"
                  >
                    JOIN US
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal-notice"
                    className="hover:text-black transition-colors"
                  >
                    LEGAL NOTICE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/general-terms-and-conditions-of-sale"
                    className="hover:text-black transition-colors"
                  >
                    TERMS AND CONDITIONS OF SALE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-black transition-colors"
                  >
                    PRIVACY POLICY
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(20px, 5vw, 24px)",
                  fontWeight: 700,
                  lineHeight: "1.2",
                  color: "rgb(17, 17, 17)",
                }}
              >
                Equipment Wing
              </h3>
              <ul
                className="space-y-1 mt-2"
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "clamp(16px, 4vw, 18px)",
                  fontWeight: 500,
                  lineHeight: "1.3",
                  color: "rgb(51, 51, 51)",
                }}
              >
                <li>
                  <Link
                    href="/category/foiling/wingfoil"
                    className="hover:text-black transition-colors"
                  >
                    WINGFOIL EQUIPMENT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/foiling/downwind"
                    className="hover:text-black transition-colors"
                  >
                    DOWNWIND EQUIPMENT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/downwind/package"
                    className="hover:text-black transition-colors"
                  >
                    WINGFOIL PACK
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full mt-10">
        <div className="border-t-[2px] border-dashed border-gray-400 my-6"></div>
        <p
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "clamp(14px, 3.5vw, 16px)",
            fontWeight: 500,
            lineHeight: "1.3",
            color: "rgb(51, 51, 51)",
          }}
          className="text-left"
        >
          Foil and Co, All rights are reserved. ©{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
