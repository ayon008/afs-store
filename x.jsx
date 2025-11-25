"use client";
import facebook from "@/../public/facebook-icon.png";
import whatasapp from "@/../public/whatsapp-icon.webp";
import { Headphones, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/../public/cleaning-leads-usa-logo.png";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryBtn from "../Button/PrimaryBtn";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

export const Logo = ({ containerClass }: { containerClass?: string }) => {
    return (
        <Link href={"/"} aria-label="Go to homepage">
            <div>
                <div className={`flex items-center gap-2 ${containerClass}`}>
                    <Image
                        src={logo}
                        priority
                        alt="Cleaning Leads USA company logo - professional janitorial lead generation services"
                        title="Cleaning Leads USA Logo"
                        width={70}
                        height={70}
                        sizes="100vw"
                    />
                    <span className={`font-semibold text-lg inline-block`}>
                        Cleaning <br />
                        Leads USA
                    </span>
                </div>
            </div>
        </Link>
    );
};

const navItems = [
    {
        name: "Home",
        href: "/",
    },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "Appointments", href: "/appointments" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blogs" },
];

const Navbar = () => {
    const ref = useRef < HTMLDivElement | null > (null);
    const ctaRef = useRef < HTMLDivElement | null > (null);
    const [isOpen, setOpen] = useState < boolean > (false);

    const mblNavRef = useRef < HTMLUListElement | null > (null);

    useEffect(() => {
        let tl: gsap.core.Timeline | null = null;

        // Guard: ref must exist and be visible (hidden on small screens via `hidden lg:block`)
        const init = () => {
            if (!ref.current || !ctaRef.current) return;

            // Guard: ensure the trigger node is connected to the document. ScrollTrigger will
            // try to manipulate DOM (insert wrappers) and fails if the node isn't a child of its parent.
            if (!(ref.current instanceof Element) || !ref.current.isConnected) return;
            if (!ref.current.parentNode) return;

            // If element is hidden (display: none) do not initialize — will initialize on resize when visible
            const style = window.getComputedStyle(ref.current);
            if (style.display === "none" || style.visibility === "hidden") return;

            // Create timeline with scrollTrigger using the element ref (avoid ID selector which may collide)
            // Wrap creation in try/catch because ScrollTrigger internally inserts DOM nodes and will throw
            // if the reference nodes are not arranged as expected (which shows as insertBefore errors).
            try {
                tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current, // use the DOM node directly
                        start: "top top",
                        end: "max",
                        pin: true,
                        pinSpacing: false, // keep spacing so layout doesn't collapse when pinned
                        pinType: "fixed", // prefer "fixed" to avoid transform issues (use "transform" if needed)
                        anticipatePin: 1, // smoother pin transitions
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true, // re-evaluate values on refresh
                    },
                });
            } catch (err) {
                // Don't rethrow — log for debugging and skip initializing animation to avoid runtime crash.
                // This prevents the "Failed to execute 'insertBefore' on 'Node'" error when DOM state is unexpected.
                console.warn("ScrollTrigger init skipped due to DOM state:", err);
                return;
            }

            // Animation: keep same transforms/effects as before
            tl.to(ref.current, {
                duration: 0.5,
                ease: "power1.inOut",
                backgroundColor: "#4DAC4D",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            });
            tl.to(ctaRef.current, {
                duration: 0,
                borderRadius: "0px",
            });
        };

        // Initialize now (if visible)
        init();

        // Ensure ScrollTrigger recalculates when the page loads, on resize, or when fonts/images change layout
        const onResize = () => {
            // If nothing initialized yet, attempt init (handles breakpoint crossing where nav becomes visible)
            if (!tl) init();
            // Always refresh ScrollTrigger so pin calculations are accurate
            ScrollTrigger.refresh(true);
        };

        // Refresh on load as images/next/image can change layout after initial mount
        window.addEventListener("load", onResize);
        window.addEventListener("resize", onResize);

        // Also refresh when route/pathname changes (Nav might re-render)
        // (the file already uses pathName elsewhere; add listener or use effect dependency where appropriate)
        // Here we return cleanup which will be invoked on pathname changes if component re-renders/unmounts.

        return () => {
            // cleanup timeline and associated ScrollTrigger
            if (tl) {
                try {
                    if (tl.scrollTrigger) tl.scrollTrigger.kill();
                } catch {
                    /* ignore cleanup errors */
                }
                tl.kill();
                tl = null;
            }
            window.removeEventListener("load", onResize);
            window.removeEventListener("resize", onResize);
            // ensure all ScrollTriggers are refreshed/killed if needed
            // ScrollTrigger.getAll().forEach(st => st.kill()); // uncomment only if you must force-kill others
        };
    }, []);

    useGSAP(
        () => {
            if (!mblNavRef.current) return;

            const tl = gsap.timeline();

            // Hamburger icon animation
            tl.to(
                ".line-1",
                {
                    rotate: isOpen ? 45 : 0,
                    backgroundColor: isOpen ? "white" : "black",
                    duration: 0.5,
                    transformOrigin: "left center",
                },
                0
            )
                .to(".line-2", { opacity: isOpen ? 0 : 1, duration: 0.5 }, 0)
                .to(
                    ".line-3",
                    {
                        rotate: isOpen ? -45 : 0,
                        backgroundColor: isOpen ? "white" : "black",
                        duration: 0.5,
                        transformOrigin: "left center",
                    },
                    0
                );

            // Drawer animation using transform
            tl.to(
                mblNavRef.current,
                {
                    x: isOpen ? "0%" : "100%", // smoother than left
                    opacity: isOpen ? 1 : 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                },
                0
            );

            // Nav items stagger animation
            tl.fromTo(
                ".nav-items",
                { opacity: isOpen ? 0 : 1, yPercent: isOpen ? 20 : 0 },
                {
                    opacity: isOpen ? 1 : 0,
                    yPercent: isOpen ? 0 : 20,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power1.inOut",
                }
            );

            return () => tl.kill();
        },
        { dependencies: [isOpen], revertOnUpdate: true }
    );

    const pathName = usePathname();
    useEffect(() => {
        if (isOpen) {
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    return (
        <nav className={`nav`} aria-label="Main navigation">
            {/* Nav top */}
            <div className="relative hidden lg:block">
                <div className="flex items-center justify-between container !pl-8 bg-primary nav-top rounded-tl-[50px] rounded-bl-[50px]">
                    <ul className={`flex items-center gap-8`}>
                        <li className="text-sm font-semibold">
                            <Link href={"/career"} title="Career opportunities">
                                Career
                            </Link>
                        </li>
                        <li className="text-sm font-semibold">
                            <Link href={"/faq"} title="Frequently Asked Questions">
                                Faq&apos;s
                            </Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-8">
                        <Link href={"/appointments"} title="Book an appointment">
                            <PrimaryBtn text="Book an Appointment" />
                        </Link>
                    </div>
                </div>
            </div>
            {/* Logo Part */}
            <header
                className="container items-center justify-between gap-10 py-5 hidden lg:flex"
                role="banner"
            >
                <div className="flex-1">
                    <Logo />
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-secondary" size={"2rem"} />
                    <div>
                        <p className="text-sm text-gray-500 font-semibold">
                            Office Address
                        </p>
                        <h2 className={`text-base font-bold`}>Long Island City, NY</h2>
                    </div>
                </div>
                <address className="flex items-center gap-2 mx-8">
                    <Mail className="text-secondary" size={"2rem"} />
                    <div>
                        <p className="text-sm text-gray-500 font-semibold not-italic">Contact Mail</p>
                        <a
                            href="mailto:support@cleaningleadsusa.com"
                            title="Contact Cleaning Leads USA Support"
                            className="text-base font-bold"
                        >
                            <span className="text-base not-italic">support@cleaningleadsusa.com</span>
                        </a>
                    </div>
                </address>
                <div className="flex items-center gap-5">
                    <div>
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/commercialcleaningleads/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Cleaning Leads USA on Facebook"
                            title="Cleaning Leads USA Facebook Page"
                        >
                            <Image
                                src={facebook}
                                className="w-[30px] h-[30px] cursor-pointer"
                                alt="Follow Cleaning Leads USA on Facebook for janitorial lead generation updates"
                                loading="lazy"
                            />
                        </a>
                    </div>

                    <div>
                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/13477985582"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat with Cleaning Leads USA on WhatsApp"
                            title="Chat with Cleaning Leads USA on WhatsApp"
                        >
                            <Image
                                src={whatasapp}
                                className="w-[40px] h-[40px] cursor-pointer"
                                alt="Chat with Cleaning Leads USA on WhatsApp for commercial cleaning leads"
                                sizes="40px"
                                loading="lazy"
                            />
                        </a>
                    </div>
                    <div>
                        {/* Phone */}
                        <a
                            href="tel:+13326004766"
                            aria-label="Call Cleaning Leads USA at +1 (332) 600-4766"
                            title="Call Cleaning Leads USA"
                            className="inline-flex items-center justify-center"
                        >
                            <Phone className="cursor-pointer" />
                        </a>
                    </div>
                </div>
            </header>
            {/* Nav Part */}
            <div className="relative z-[100] hidden lg:block" id="nav-part" ref={ref}>
                <div className="flex items-center justify-between container nav-part">
                    <ul className="flex items-center lg:w-2/3 gap-10">
                        {navItems?.map((navItems, i) => {
                            return (
                                <li key={i}>
                                    <Link
                                        href={navItems.href}
                                        className="text-white font-semibold text-base"
                                        title={navItems.name}
                                    >
                                        {navItems.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div
                        className="flex items-center gap-2 bg-tertiary py-3 px-4 rounded-4xl"
                        id="cta"
                        ref={ctaRef}
                    >
                        <Headphones className="text-secondary" size={"2rem"} />
                        <a href="tel:+13326004766">
                            <div>
                                <p className="text-sm text-white font-semibold">Phone Number</p>
                                <h2 className={`text-white text-base font-bold cursor-pointer`}>
                                    +1 (332) 600-4766
                                </h2>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-primary lg:hidden flex items-center justify-between p-6 relative">
                <Logo />
                <button
                    type="button"
                    onClick={() => setOpen(!isOpen)}
                    className="w-10 h-8 flex flex-col justify-between relative z-50"
                    aria-label="Toggle navigation menu"
                    aria-controls="mobile-navigation"
                >
                    <div className="w-10 h-1 bg-black rounded line-1"></div>
                    <div className="w-10 h-1 bg-black rounded line-2"></div>
                    <div className="w-10 h-1 bg-black rounded line-3"></div>
                </button>

                <ul
                    id="mobile-navigation"
                    ref={mblNavRef}
                    className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl nav-mbl transform translate-x-full opacity-0 z-40"
                >
                    {navItems.map((item, i) => (
                        <li key={i}>
                            <Link
                                href={item.href}
                                className="nav-items text-white font-semibold text-3xl"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;