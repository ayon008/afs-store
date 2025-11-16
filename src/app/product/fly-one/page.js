'use client';

import Header from './sections/header';

export default function Flyone() {
    return (
        <div className="bg-white">
            <Header />
            <HorizontalImageStack />
            <FlyOneDescription />
            <EasyAccessSection />
            <RoundRailsSection />
            <SingleHorizontalImage />
            <PVCSandwich />
            <BottomReinforceSection />
            <BoardFeatures />
        </div>
    );
}

function HorizontalImageStack() {
    return (
        <section className="relative w-screen h-screen flex justify-center items-center bg-white text-black overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80vw] after:border-b after:border-black">
            {/* Text overlay */}
            <div className="absolute top-[8%] left-0 right-0 z-50 text-center px-4">
                <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold leading-tight tracking-tight text-black">
                    The One you<br />need to fly
                </h1>
            </div>

            {/* Board container */}
            <div className="relative flex justify-center items-center w-full h-full mt-24">
                {/* Back board (left side) */}
                <img
                    src="/images/fly-one/bc.png"
                    alt="Surfboard back"
                    className="absolute z-[2] w-[65vw] max-w-[1400px] h-auto object-contain select-none"
                    style={{
                        userSelect: 'none',
                        WebkitUserDrag: 'none',
                        left: 'calc(50% - 40vw)',
                        transform: 'translateX(-14%)'
                    }}
                />

                {/* Front board (right side) */}
                <img
                    src="/images/fly-one/bcd.png"
                    alt="Surfboard front"
                    className="absolute z-[1] w-[65vw] max-w-[1400px] h-auto object-contain select-none"
                    style={{
                        userSelect: 'none',
                        WebkitUserDrag: 'none',
                        right: 'calc(50% - 40vw)',
                        transform: 'translateX(14%)'
                    }}
                />
            </div>
        </section>
    );
}
function FlyOneDescription() {
    return (
        <section className="w-[80vw] mx-auto bg-white text-black py-16">
            <div className="grid w-[80vw] grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {/* Left column */}
                <div className="flex justify-start pl-6 md:pl-12">
                    <p className="text-lg leading-relaxed font-semibold max-w-[450px]">
                        The Fly One is a compact, solid wing foil board designed to offer accessibility and performance for all levels of progression.
                    </p>
                </div>

                {/* Right column */}
                <div className="flex flex-col justify-start items-start space-y-6 max-w-[580px] pr-6 md:pr-12">
                    <p className="text-lg leading-relaxed">
                        Its optimized shape facilitates take-off and intuitive navigation. Even when the wind dies down, this generous board makes it easy to stand up and get back to shore.
                    </p>
                    <p className="text-lg leading-relaxed">
                        With its integrated handle, full pad, double US rail and strap inserts, the Fly One is ready to accompany you as you progress. Accelerate, take off quickly and fly, even in light winds.
                    </p>
                </div>
            </div>
        </section>
    );
}



function EasyAccessSection() {
    return (
        <section className="w-[82vw] mx-auto bg-white text-black py-28">
            <div className="grid grid-cols-1 items-center gap-6">
                {/* Top text block (aligned left, with left padding) */}
                <div className="flex justify-start pl-6 md:pl-46">
                    <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-1">Easy access</h2>
                        <p className="text-lg leading-relaxed w-[528px] font-semibold">
                            The board’s volume and width offer overall stability and greater tolerance when landing.
                            This prevents the board from sticking to the water or slowing down, and prevents it from
                            nose-diving because it is pushed back by the surface of the water.
                        </p>
                    </div>
                </div>

                {/* Center image (made larger) */}
                <div className="flex justify-center">
                    <img
                        src="/images/fly-one/easy-access.png"
                        alt="AFS Fly One board easy access"
                        className="w-[1000px] md:w-[1000px] h-auto object-contain select-none"
                        style={{
                            userSelect: 'none',
                            WebkitUserDrag: 'none',
                        }}
                    />
                </div>

                {/* Bottom text block (aligned right, with right padding) */}
                <div className="flex justify-end pr-6 md:pr-26">
                    <div className="text-left">
                        <p className="text-sm md:text-base w-[400px] font-semibold leading-relaxed text-gray-600">
                            The slight concave on the board’s hull, which extends from the center to the nose, improves
                            water evacuation and facilitates acceleration for quick takeoffs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}



function RoundRailsSection() {
    return (
        <section className="relative w-screen h-[80vh] left-0 bg-white text-black py-20 overflow-hidden">
            {/* Content grid constrained to a comfortable reading width */}
            <div className="w-[82vw] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                {/* Left text block */}
                <div className="flex justify-start pl-4 md:pl-12 z-20">
                    <div className="max-w-[480px] text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Round Rails</h2>
                        <p className="text-lg leading-relaxed text-gray-700 font-semibold">
                            The round rail design maintains momentum by reducing drag, prevents the rails from catching water when turning, and stabilizes the board during landings.
                        </p>
                    </div>
                </div>

                {/* Right column (kept empty so grid layout remains) */}
                <div className="hidden md:block" />
            </div>

            {/* Absolute image: positioned relative to the section (flush to viewport right) */}
            <img
                src="/images/fly-one/round-rails.png"
                alt="AFS Fly One round rails"
                className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 z-10"
                style={{
                    // responsive sizing: will be at most 1200px, otherwise 70% of viewport width
                    width: 'min(90vw, 2000px)',
                    height: 'auto',
                    // ensure image isn't draggable
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                }}
            />
        </section>
    );
}

function SingleHorizontalImage() {
    return (
        <section className="flex justify-center items-center bg-white py-98 px-[30px]">
            <img
                src="/images/fly-one/single.png"
                alt="AFS Fly One board"
                className="pointer-events-none select-none object-contain"
                style={{
                    width: 'min(90vw, 1100px)', // larger, but responsive
                    height: 'auto',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                }}
            />
        </section>
    );
}



function PVCSandwich() {
    return (
        <section
            className="relative w-full min-h-[75dvh] overflow-hidden flex justify-center items-center py-16 px-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/fly-one/grain-texture.png')" }}
        >
            {/* Optional semi-transparent overlay for contrast */}
            {/* <div className="absolute inset-0 bg-white/60"></div> */}

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                    PVC Sandwich Construction
                </h2>

                <p className="text-base md:text-lg lg:text-xl text-gray-700 font-normal leading-relaxed">
                    The PVC sandwich construction gives you a solid, rigid board that will stand the test of time!
                </p>
            </div>
        </section>
    );
}


function BottomReinforceSection() {
    return (
        <section
            className="relative w-full min-h-[120vh] overflow-hidden flex justify-center items-center px-8 bg-no-repeat"
        >
            {/* Large centered image */}
            <img
                src="/images/fly-one/semi.png"
                alt="AFS Fly One board"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] object-contain pointer-events-none select-none"
                style={{
                    width: 'max(130vw, 1900px)', // big image
                    height: 'auto',
                    opacity: 1,
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                }}
            />

            {/* Text block aligned right but still overlaying image */}
            <div className="relative z-10 text-left max-w-2xl ml-auto w-[380px] mr-[8vw]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
                    Reinforced Double US Rail Box
                </h2>

                <p className="text-base md:text-lg lg:text-xl text-gray-700 font-normal leading-relaxed">
                    The carbon casing that houses your foil is extremely strong and durable, capable of withstanding
                    high levels of pressure. Its position is optimized to offer numerous adjustment options while
                    maintaining perfect balance. It is universal and compatible with most foil brands.
                </p>
            </div>
        </section>
    );
}


function BoardFeatures() {
    const boards = [
        {
            name: "Fly One S",
            specs: [
                { label: "Length", value: "5'8/173 cm" },
                { label: "Width", value: '24"/61 cm' },
                { label: "Volume", value: "90L" },
                { label: "Construction", value: "PVC Sandwich" },
                { label: "Weight", value: "TBC" }
            ]
        },
        {
            name: "Fly One M",
            specs: [
                { label: "Length", value: "5'10/177 cm" },
                { label: "Width", value: '28"/71 cm' },
                { label: "Volume", value: "100L" },
                { label: "Construction", value: "PVC Sandwich" },
                { label: "Weight", value: "7 kg" }
            ]
        },
        {
            name: "Fly One L",
            specs: [
                { label: "Length", value: "6'2/189 cm" },
                { label: "Width", value: '27.5"/68.5 cm' },
                { label: "Volume", value: "115L" },
                { label: "Construction", value: "PVC Sandwich" },
                { label: "Weight", value: "7.3 kg" }
            ]
        },
        {
            name: "Fly One XL",
            specs: [
                { label: "Length", value: "6'4/193 cm" },
                { label: "Width", value: '26"/66 cm' },
                { label: "Volume", value: "125L" },
                { label: "Construction", value: "PVC Sandwich" },
                { label: "Weight", value: "TBC" }
            ]
        }
    ];

    return (
        <section className="w-full py-16 px-8 bg-white">
            <h2 className="text-center text-5xl md:text-6xl font-extrabold text-black mb-16">
                Board features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
                {boards.map((board, idx) => (
                    <div key={idx} className="flex flex-col">
                        <h3 className="text-2xl font-bold text-black mb-8">
                            {board.name}
                        </h3>
                        <div className="flex flex-col">
                            {board.specs.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center py-3 border-b border-gray-200"
                                >
                                    <span className="text-base font-normal text-black">
                                        {spec.label}
                                    </span>
                                    <span className="text-base font-semibold text-black text-right">
                                        {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
