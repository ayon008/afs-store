"use client";

import Head from "next/head";
import Image from "next/image";

export default function EquipmentRecoveryPage() {
    return (
        <>
            <Head>
                <title>Equipment Recovery</title>
            </Head>

            {/* HERO SECTION — Parallax stays fixed */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Fixed Background Layer */}
                <div className="fixed inset-0 -z-10">
                    <Image
                        src="/images/blogs/brittany.png"
                        alt="Equipment Recovery Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Hero Content (fixed to viewport, stays in place) */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Equipment Recovery
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        We&apos;ll take back your old AFS foil if you buy a new AFS foil!
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="bg-black text-white relative z-20">
                {/* HOW IT WORKS */}
                <section className="py-20 bg-black" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                    <div className="max-w-full mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 pb-4 border-b-4  border-dashed border-gray-600">
                            Here&apos;s how it works
                        </h2>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                            {/* STAGE 01 */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-200">STAGE 01</h3>
                                <p className="text-lg mb-4 text-gray-400">
                                    Register your equipment – complete foil, front wing, stabilizer or TBAR – online.
                                </p>
                                <p className="text-lg mb-4 text-gray-400">
                                    Using the same link, you indicate the material you wish to purchase.
                                </p>
                                <a
                                    href="#"
                                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center mb-6"
                                >
                                    REGISTER EQUIPMENT
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <p className="text-sm text-gray-500">
                                    You will receive the estimated cost of restoration within 24 hours.
                                </p>
                            </div>

                            {/* STAGE 02 */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-200">STAGE 02</h3>
                                <p className="text-lg mb-4 text-gray-400">
                                    After validating the trade-in offer, drop off your equipment at:
                                </p>
                                <p className="text-lg font-semibold text-gray-300 mb-6">
                                    FOIL AND CO Espace Joseph Rolland<br />
                                    MODULE 3 - ZA DE, Gorréquer, 29800<br />
                                    PENCRAN
                                </p>
                            </div>

                            {/* STAGE 03 */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-200">STAGE 03</h3>
                                <p className="text-lg mb-4 text-gray-400">
                                    Once acceptance has been confirmed, your new equipment is dispatched.
                                </p>
                                <p className="text-2xl font-bold text-blue-400 mb-6">
                                    ALL YOU HAVE TO DO IS RIDE!
                                </p>
                                <p className="text-lg mb-4 text-gray-400">
                                    We&apos;ll help you assess the condition of your equipment so you can trade it in today.
                                </p>
                                <a
                                    href="#"
                                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center"
                                >
                                    HAVE A TRADE-IN ESTIMATE
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-700 text-gray-500 text-sm">
                            <p>
                                ATTENTION: Rework is done piece by piece; it&apos;s not possible to rework a wing against a foil, for example. It will be a foil for a foil, a fuselage for a fuselage...
                            </p>
                        </div>
                    </div>
                </section>
                {/* EXPERT HELP SECTION */}





                {/* CONTACT SECTION */}
                <section className="py-20 border-t border-gray-800" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    <div className="max-w-full mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 pb-4 border-b border-dotted border-gray-600">
                            Contact Us
                        </h2>
                        <p className="text-lg text-gray-400 mb-8">
                            Have questions about our Equipment Recovery Program? Reach out to our team for more information or assistance with your trade-in.
                        </p>
                        <a
                            href="#"
                            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center"
                        >
                            GET IN TOUCH
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}