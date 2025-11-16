"use client";

import React from "react";

const Content = () => {
  return (
    <div className="w-full bg-white text-black px-4 py-20 sm:px-8 lg:px-12 font-['Inter'] mt-[60px]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Manufacturing Process Intro */}
        <p
          className="font-[400] leading-[26.4px] text-[22px] text-[rgba(17,17,17,0.75)]"
          style={{ fontFamily: '"alliance no.2", sans-serif' }}
        >
          The manufacturing process is essentially the same: a core of
          low-density foam (EPS) is created, which is then encased in a rigid
          shell. <br />
          This is often a sandwich composite, combining fiberglass or carbon
          with a high-density foam several millimeters thick.
        </p>

        {/* Section: The Materials */}
        <section id="materials">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-8">
            The materials
          </h2>
          <p className="text-lg leading-relaxed mb-12">
            What modifies the board's properties are the materials used and the
            order in which they are positioned. Here are the different materials
            that can be found in a board:
          </p>

          {/* Sub-section: EPS Foam */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold">EPS foam</h3>
            <p className="text-base leading-relaxed">
              A foam of variable density forms the core of the board, also known
              as the <span className="font-semibold">foam block</span>. It
              ensures the board's{" "}
              <span className="font-semibold">rigidity</span> and{" "}
              <span className="font-semibold">buoyancy</span>, while remaining
              lightweight. The density of the foam block has a major impact on
              the board's final weight.
            </p>

            <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/images/service/image-18-4.png.webp"
                alt="EPS Foam Construction"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-8">
              Fibres de verre / Glass Fiber
            </h3>
            <p className="text-base leading-relaxed">
              Fiberglass is a solid material that makes for robust board
              construction. It has a higher density than carbon and is less
              rigid, but is nonetheless far more affordable, making it an asset
              in rigid and affordable board construction.
            </p>

            {/* Placeholder for the Glass Fiber Image */}
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/images/service/image-18-5.png.webp"
                alt="Glass Fiber Construction"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-8">Carbon</h3>
            <p className="text-base leading-relaxed">
              The stiffness/density ratio of this material makes it one of the
              most widely used in high-performance construction. It can make up
              the entire board envelope, or simply reinforce certain strategic
              areas. Carbon is available in varying degrees of stiffness,
              enabling you to push the limits of gliding while guaranteeing
              rigidity and responsiveness.
            </p>

            {/* Placeholder for the Carbon Image */}
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/images/service/image-43.png.webp"
                alt="Carbon Fiber Construction"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-8">PVC</h3>
            <p className="text-base leading-relaxed">
              This foam is generally four times denser than the EPS core. It
              comes in sheets of various thicknesses, depending on the
              application (deck, US rail, etc.). The combination of PVC foam and
              glass or carbon fiber fabric forms a sandwich material. It
              conforms to the shape of the core to reinforce and stiffen it,
              while guaranteeing maximum lightness.
            </p>

            {/* Placeholder for the PVC Foam Image */}
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/images/service/image-18-7.png.webp"
                alt="PVC Foam Construction"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-8">
              Epoxy resin
            </h3>
            <p className="text-base leading-relaxed">
              It binds all the elements together and makes the board watertight.
            </p>

            {/* Placeholder for the Epoxy Resin Image */}
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="w-full h-full flex items-center justify-center">
                <img
                src="/images/service/image-18-7.png.webp"
                alt="PVC Foam Construction"
                className="w-full h-full object-cover"
              />
              </div>
            </div>
          </div>
        </section>

        {/* Section: The Basics of Construction */}
        <section id="basics" className="pt-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-8">
            The basics of construction
          </h2>
          <p className="text-lg leading-relaxed">
            Let’s take a closer look at the construction of the boards: The core
            forms the basis of the board. There is a direct link between the
            choice of density and the construction that will be built around it,
            depending on the weight targeted for the final product. The denser
            the foam used, the heavier it will be, but the more resistant it
            will be to compression and impact. With a denser loaf (therefore
            heavier but stronger), we can afford to make a lighter envelope with
            stiffer materials such as carbon. It’s a question of balance and
            compromise, depending on what you want from the final product. This
            is where the notion of sandwich construction comes in. For PVC
            sandwich constructions, the principle is to enclose the PVC sheets
            between several layers of glass or carbon in order to benefit from
            the mechanical properties of the fibers while limiting the weight,
            thus ensuring unfailing strength. Carbon or glass reinforcements are
            then carefully positioned according to the intended use, to optimize
            the board’s strength and rigidity. This is the advantage of
            composite materials, which can be strategically placed to optimize
            strength and weight. At AFS and AFS Advanced, we distinguish between
            several types of construction – the process remains broadly the
            same, but the materials used vary according to the type of
            construction:
          </p>
        </section>

        {/* Section: Sandwich Construction */}
        <section id="sandwich" className="pt-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-8">
            Sandwich-Bauweise
          </h2>
          <p className="text-lg leading-relaxed">
            Firstly, the sandwich structure offers high impact resistance and is
            a durable construction.
          </p>
        </section>
        <section id="basics" className="pt-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-8">
            PVC Sandwich Glass
          </h2>
          <p className="text-lg leading-relaxed">
            For Sandwich Glass PVC constructions, the principle is to enclose
            the PVC sheets between several layers of glass fibers to take
            advantage of the mechanical properties of the fibers while limiting
            weight, thus ensuring unfailing strength. The Sandwich Glass PVC
            structure is highly resistant to impact and wear. Suitable for all
            riding levels, from beginner to advanced, these boards are versatile
            and durable, offering excellent value for money.
          </p>
        </section>

        {/* Section: Triaxial Carbon */}
        <section id="triaxial" className="pt-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-8">
            Triaxial Carbon Construction
          </h2>
          <h6 className="text-2xl sm:text-3xl font-bold tracking-tight text-black-600 mb-8">
            AFS Advanced Construction
          </h6>

          <p className="text-lg leading-relaxed">
            Triaxial Carbon is a weave of carbon fibers along three different
            axes, offering outstanding strength and rigidity at minimum weight.
            For this type of construction, we use a denser-than-usual EPS core.
            To ensure a lightweight, strong and rigid board, a carbon/PVC
            sandwich reinforcement is located on the deck’s footprint and around
            the US rail housings. This is complemented by carbon stiffeners
            along the length of the board, for added responsiveness. These
            technical elements, put together, form a compromise that maximizes
            the lightness, strength and rigidity of our boards.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Content;
