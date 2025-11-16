import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Section9() {
		const sectionRef = useRef(null);
		const { scrollYProgress } = useScroll({
			target: sectionRef,
			offset: ["start start", "end end"]
		});

	// Make animation slower by increasing scroll range
	const rotate = useTransform(scrollYProgress, [0.1, 0.7], [0, 90]);
	const y = useTransform(scrollYProgress, [0.7, 1], [0, 500]);

	    return (
		    <section ref={sectionRef} className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
					{/* Centered text above image */}
					<div className="sticky top-24 left-1/2 transform -translate-x-1/2 w-full max-w-xl text-center z-10">
						<h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Whitebird 5'8</h2>
						<p className="text-white text-base md:text-lg font-medium leading-snug mb-2">
							The Whitebird 5'8 picks up on the trends of these long, narrow shapes, while retaining its compactness for a more wing foil-oriented riding style that allows you to ride high-performance, small-area wind conditions. The board offers many advantages for waves in light wind conditions, including its ability to glide quickly, its maneuverability, and its versatility.
						</p>
					</div>
									{/* Board image with scroll-triggered animation */}
									{/* To change the vertical position of the image, adjust the 'top' value below (e.g. top-[40%], top-[30%]) */}
									<motion.div
										className="sticky top-[25%] flex justify-center items-center w-full h-[80vh] z-20"
										style={{ rotate, y, maxWidth: '900px', margin: '0 auto' }}
									>
								<Image
									src="https://afs-foiling.com/wp-content/uploads/2024/03/F_58_0001-1.png.webp"
									alt="Whitebird 5'8 Board"
									width={900}
									height={1500}
									className="object-contain drop-shadow-2xl w-full h-full"
									priority
								/>
							</motion.div>
							{/* Small text to the right of the board (restored position) */}
							<div className="sticky right-32 top-1/2 transform -translate-y-1/2 w-64 text-white text-sm font-semibold text-right z-10 ml-auto mr-32">
								The 5'8" Whitebird allows high-performance foil surfaces in a wider range.
							</div>
									{/* Large text above the image */}
									<div className="sticky top-10 w-full max-w-3xl mx-auto text-center z-30">
										<p className="text-white text-5xl md:text-6xl font-extrabold leading-tight">
											This makes it an ideal choice for riders who want to enjoy the waves even when the wind is light.
										</p>
									</div>
			</section>
		);
}