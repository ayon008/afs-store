'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EnduroWings() {
  const containerRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const slides = slidesRef.current;
    if (!container || !slides) return;

    const sections = slides.children;
    const totalWidth = slides.scrollWidth;

    gsap.to(slides, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden factsContainer_sm bg-[#000000] text-[#ffffff]">
      <div ref={slidesRef} className="flex">
        {/* Enduro 1300 */}
        <section className="w-screen min-h-screen flex-shrink-0 slide_hori">
          <div className="max-w-full mx-auto px-4 flex flex-col justify-center h-full">
            <div className="w-full">
              <div className="p-0">
               <section className="w-full bg-black text-white py-16 px-8">
  <div className="max-w-6xl mx-auto">
    
    {/* HEADING */}
    <h2 className="text-5xl font-bold text-white mb-6">
      Enduro 1300
    </h2>

    {/* BLUE DIVIDER LINE */}
    <div className="border-b-2 border-blue-500 mb-8"></div>

    {/* TWO-COLUMN TEXT CONTAINER */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      
      {/* Column 1 */}
      <div className="text-lg text-gray-200">
        <p>
          The moderate surface area of 1300 cm², coupled with an aspect 
          ratio of 11 (wingspan 1190 mm), makes it an ultra-efficient 
          light wing that optimizes lift and glides at low speeds.
        </p>
      </div>

      {/* Column 2 */}
      <div className="text-lg text-gray-200">
        <p>
          It is ideal for downwind or freefly in marginal conditions 
          and/or for dockstart/pumping practices.
        </p>
      </div>

    </div>
  </div>
</section>
                <div className="my-8">
                  <Image
                    src="https://afs-foiling.com/wp-content/uploads/2024/10/Enduro1300_0001-4-1.png.webp"
                    alt=""
                    width={2048}
                    height={368}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <section className="w-full tst2">
                  <div className="max-w-full mx-auto px-4">
                    <div className="w-full">
                      <div className="p-0">
                        <p className="text-base">
                          Combined with the new short Fuselink and our range of UHM mats, you will be amazed by the maneuverability of this wing.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* Enduro 1100 */}
        <section className="w-screen min-h-screen flex-shrink-0 slide_hori">
          <div className="max-w-full mx-auto px-4 flex flex-col justify-center h-full">
            <div className="w-full">
              <div className="p-0">
<section className="w-full bg-black text-white py-16 px-8">
  <div className="max-w-6xl mx-auto">
    
    {/* HEADING */}
    <h2 className="text-5xl font-bold text-white mb-6">
      Enduro 1100
    </h2>

    {/* BLUE DIVIDER LINE */}
    <div className="border-b-2 border-blue-500 mb-8"></div>

    {/* TWO-COLUMN TEXT CONTAINER */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      
      {/* Column 1 */}
      <div className="text-lg text-gray-200">
        <p>
          Like its big sister, the Enduro 1100 meets the same 
          expectations for smaller riders. This wing combines 
          low-speed lift, ease of use, and the ability to carve 
          in small conditions.
        </p>
      </div>

      {/* Column 2 (Intentionally empty to maintain layout) */}
      <div></div>

    </div>
  </div>
</section>
                <div className="my-8">
                  <Image
                    src="https://afs-foiling.com/wp-content/uploads/2024/10/Enduro1300_0001-5-1-1.png.webp"
                    alt=""
                    width={2048}
                    height={368}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enduro 900 */}
        <section className="w-screen min-h-screen flex-shrink-0 slide_hori">
          <div className="max-w-full mx-auto px-4 flex flex-col justify-center h-full">
            <div className="w-full">
              <div className="p-0">
<section className="w-full bg-black text-white py-16 px-8">
  <div className="max-w-6xl mx-auto">
    
    {/* HEADING */}
    <h2 className="text-5xl font-bold text-white mb-6">
      Enduro 900
    </h2>

    {/* BLUE DIVIDER LINE */}
    <div className="border-b-2 border-blue-500 mb-8"></div>

    {/* TWO-COLUMN TEXT CONTAINER */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      
      {/* Column 1 */}
      <div className="text-lg text-gray-200">
        <p>
          This is the all-terrain wing in the range. It is perfectly 
          suited to a wide range of activities: downwind carving, 
          wingfoil freefly carving, small wave surffoil, and 
          experienced dockstart.
        </p>
      </div>

      {/* Column 2 */}
      <div className="text-lg text-gray-200">
        <p>
          We like to compare it to the SILK 1050, known for its 
          radical turns in powerful waves, comparable to those of 
          a shortboard. The Enduro 900 is smoother when carving, 
          comparable to a longboard.
        </p>
      </div>

    </div>
  </div>
</section>
                <div className="my-8">
                  <Image
                    src="https://afs-foiling.com/wp-content/uploads/2024/10/Enduro1300_0001-11.png.webp"
                    alt=""
                    width={2048}
                    height={368}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <section className="w-full tst2">
                  <div className="max-w-full mx-auto px-4">
                    <div className="w-full">
                      <div className="p-0">
                        <p className="text-base">
                          We recommend it with the short Fuselink fuselage for maneuverability and the standard Fuselink fuselage for gliding.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* Enduro 700 */}
        <section className="w-screen min-h-screen flex-shrink-0 slide_hori">
          <div className="max-w-full mx-auto px-4 flex flex-col justify-center h-full">
            <div className="w-full">
              <div className="p-0">
                <section className="w-full slider_box slide_1_inner">
                  <div className="max-w-full mx-auto px-4">
                    <div className="w-full">
                      <div className="p-0">
                        <h2 className="text-4xl font-bold mb-6 slide_1_h">Enduro 700</h2>
                        <section className="w-full">
                          <div className="max-w-full mx-auto px-4">
                            <div className="w-full">
                              <div className="p-0 space-y-4">
                                <p className="text-base">
                                  An unprecedented combination of gliding and carving downwind. It offers a level of performance suitable for intermediate and expert riders in various disciplines.
                                </p>
                                <p className="text-base">
                                  This wing has a slightly larger wingspan than the SILK 850 but a much greater aspect ratio, giving it versatile performance.
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="my-8">
                  <Image
                    src="https://afs-foiling.com/wp-content/uploads/2024/10/Enduro1300_0001-10-1.png.webp"
                    alt=""
                    width={2048}
                    height={368}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <section className="w-full tst2">
                  <div className="max-w-full mx-auto px-4">
                    <div className="w-full">
                      <div className="p-0">
                        <p className="text-base">
                          We recommend it with the short Fuselink fuselage for maneuverability and the standard Fuselink fuselage for gliding.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}