"use client";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import FeatureSections from './alternatingImages';
import Header from './header';
gsap.registerPlugin(ScrollTrigger);

const FuryProductPage = () => {
	const [isBuyingOpen, setIsBuyingOpen] = useState(false);
	const [selectedVolume, setSelectedVolume] = useState('');
	const [galleryExpanded, setGalleryExpanded] = useState(false);
	const headerRef = useRef(null);
	const buyingSectionRef = useRef(null);
	const buyBtnTextRef = useRef(null);
	const galleryRef = useRef(null);
	const seeMoreBtnRef = useRef(null);


	// Buy Section Toggle
	useEffect(() => {
		const btn = document.querySelector('.afs_buy_btn');
		const btnText = buyBtnTextRef.current;
		const section = buyingSectionRef.current;
		const lpsButtons = document.querySelectorAll('.hide_for_lps');

		let scrollTriggerInstance = null;

		const freezeScroll = (freeze) => {
			document.body.style.overflow = freeze ? 'hidden' : '';
			document.documentElement.style.overflow = freeze ? 'hidden' : '';
		};

		const updateBtnText = (state) => {
			if (btnText) {
				btnText.textContent = state === 'open' ? 'En savoir plus' : 'Buy';
			}
		};

		const scrollToTop = () => {
			return new Promise((resolve) => {
				window.scrollTo({ top: 0, behavior: 'instant' });
				resolve();
			});
		};

		const scrollToAnchor = (anchor) => {
			const target = document.querySelector(anchor);
			if (target) {
				const headerOffset = 100;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
				window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
			}
		};

		const toggleScrollTrigger = (on) => {
			scrollTriggerInstance?.kill();
			if (on) {
				scrollTriggerInstance = ScrollTrigger.create({
					trigger: section,
					start: 'bottom top',
					onEnterBack: () => updateBtnText('open'),
					onLeave: () => updateBtnText('closed'),
				});
			}
			ScrollTrigger.refresh();
		};

		const open = async (anchor = null) => {
			if (!isBuyingOpen) {
				freezeScroll(true);
				await scrollToTop();
				section.style.display = 'block';
				setIsBuyingOpen(true);
				updateBtnText('open');
				void section.offsetHeight;
				toggleScrollTrigger(true);
				if (anchor) {
					setTimeout(() => scrollToAnchor(anchor), 100);
				}
				freezeScroll(false);
			} else if (anchor) {
				scrollToAnchor(anchor);
			}
		};

		const close = () => {
			if (!isBuyingOpen) return;
			freezeScroll(true);
			scrollToTop().then(() => {
				section.style.display = 'none';
				setIsBuyingOpen(false);
				updateBtnText('closed');
				toggleScrollTrigger(false);
				freezeScroll(false);
			});
		};

		const handleClick = (e) => {
			e.preventDefault();
			isBuyingOpen ? close() : open();
		};

		btn?.addEventListener('click', handleClick);

		lpsButtons.forEach((lpsBtn) => {
			lpsBtn.addEventListener('click', (e) => {
				const anchor = lpsBtn.getAttribute('href') || lpsBtn.dataset.anchor;
				if (anchor && anchor.startsWith('#')) {
					e.preventDefault();
					open(anchor);
				} else {
					open();
				}
			});
		});

		return () => {
			btn?.removeEventListener('click', handleClick);
			lpsButtons.forEach((btn) => btn.removeEventListener('click', () => { }));
		};
	}, [isBuyingOpen]);

	// Gallery Toggle
	useEffect(() => {
		const gallery = galleryRef.current;
		const btn = seeMoreBtnRef.current;

		if (!gallery || !btn) return;

		const handleClick = () => {
			const expanded = gallery.classList.toggle('show-all');
			btn.textContent = expanded ? 'Voir moins' : 'Voir plus';
			setGalleryExpanded(expanded);
			setTimeout(() => ScrollTrigger.refresh(), 300);
		};

		btn.addEventListener('click', handleClick);
		return () => btn.removeEventListener('click', handleClick);
	}, []);

	return (
		<div
			className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
			style={{
				backgroundImage: `url('https://afs-foiling.com/wp-content/uploads/2023/04/Group-44-e1680621420252.png')`,
			}}
		>
			<Header />


			{/* Hero Section - Aligned Left */}
			<section className="relative min-h-screen flex items-center justify-start px-[30px] py-20">
				<div className="absolute inset-0 bg-linear-to-b z-10"></div>

				<div className="relative z-20 max-w-4xl text-left text-white">
					<div className="mb-8">
						<div className="w-168 h-48 mb-60">
							<img
								src="https://afs-foiling.com/wp-content/uploads/2023/04/ahdblue.png"
								alt="AHD Logo"
								className="w-full h-full object-contain"
							/>
						</div>
						<h1 className="text-6xl pl-15 tracking-widest md:text-8xl italic text-red-500 mb-6">FURY</h1>
					</div>
					<div className="space-y-4 pl-15 text-lg md:text-xl leading-relaxed">
						<p>
							Our AHD Fury boards are the latest generation of freeride boards developed at AHD with our shaper Jean Marie
							Guiriec.
						</p>
						<p>
							These are boards with a slender outline that provide glide and a fast start to the planning. It stays high on
							the water yet feels very lively underfoot: the perfect combination of performance and ease of control.
						</p>
						<p>If you’re looking for a sporty freeride board without sacrificing comfort, the Fury is for you.</p>
					</div>
				</div>
			</section>


			{/* Buying Section (Hidden by default) */}
			<section
				ref={buyingSectionRef}
				className="afs_buying_sec hidden"
			>
				<div className="w-full max-w-7xl mx-auto p-6">
					<div className="w-full">
						{/* Breadcrumb */}
						<nav className="text-sm mb-6">
							<a href="https://afs-foiling.com" className="text-blue-500 hover:underline">Home</a>
							<span className="mx-2">/</span>
							<a href="https://afs-foiling.com/product-category/foiling/" className="text-blue-500 hover:underline">FOILING</a>
							<span className="mx-2">/</span>
							<a href="https://afs-foiling.com/product-category/foiling/windfoiling/" className="text-blue-500 hover:underline">WINDFOIL</a>
							<span className="mx-2">/</span>
							<a href="https://afs-foiling.com/product-category/foiling/windfoiling/board-windfoil/" className="text-blue-500 hover:underline">Board</a>
							<span className="mx-2">/</span>
							<span className="text-gray-600">Fury</span>
						</nav>

						<main className="flex flex-col lg:flex-row gap-8">
							{/* Left: Gallery */}
							<div className="lg:w-1/2">
								<div className="custom-gallery-wrapper">
									<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
										<div ref={galleryRef} className="col-span-full overflow-hidden max-h-[400px] data-[expanded=true]:max-h-full transition-all duration-300">
											{[
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/03/Fury-ahd.png.webp", alt: "Fury board main" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/ahd-deep-1024x640.jpg", alt: "Deep view" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/ahd-fury-cut-out-1024x573.jpg", alt: "Cut-out detail" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-décra-7.png", alt: "Logo close-up" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-décra-6.png", alt: "Paddle detail" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-décra-3.png", alt: "Side view" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-décra-2.png", alt: "Stripe detail" },
												{ src: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-décra-1.png", alt: "Full board" },
											].map((img, i) => (
												<div key={i} className="cursor-pointer overflow-hidden rounded-lg">
													<img src={img.src} alt={img.alt} className="w-full h-auto hover:scale-105 transition-transform duration-300" loading="lazy" />
												</div>
											))}
										</div>
									</div>
									<button ref={seeMoreBtnRef} className="mt-4 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
										Voir plus
									</button>
								</div>
							</div>

							{/* Right: Product Info */}
							<div className="lg:w-1/2 space-y-6">
								<div>
									<h1 className="text-4xl font-bold mb-2">Fury</h1>
									<p className="text-gray-600">Comfort and performance – Screws, footstraps included (fin not supplied)</p>
									<p className="mt-3">The latest freeride generation from J.M. Guiriec. The perfect combination of performance and comfort thanks to a slim outline and unique hull.</p>
								</div>

								<p className="text-2xl font-semibold">From <span className="text-blue-600">600,00€</span></p>

								<a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800" href="#">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
										<path d="M10.2857 4.71484L1.71429 13.2863M10.2857 4.71484H2.57144M10.2857 4.71484V12.4291" stroke="currentColor" strokeWidth="1.5" />
									</svg>
									Size guide
								</a>

								{/* Volume Selector */}
								<form className="space-y-4">
									<div>
										<label className="block font-medium mb-2">Volume</label>
										<div className="flex gap-3">
											{['100-l', '130-l'].map((vol) => (
												<button
													key={vol}
													type="button"
													onClick={() => setSelectedVolume(vol)}
													className={`py-2 px-6 border rounded-lg transition-colors ${selectedVolume === vol
														? 'bg-blue-500 text-white border-blue-500'
														: 'bg-white text-gray-800 border-gray-300 hover:border-blue-500'
														}`}
												>
													{vol === '100-l' ? '100 L' : '130 L'}
												</button>
											))}
										</div>
										{selectedVolume && (
											<button
												type="button"
												onClick={() => setSelectedVolume('')}
												className="mt-2 text-sm text-blue-600 hover:underline"
											>
												Clear
											</button>
										)}
									</div>

									<div className="flex gap-4 items-center">
										<div className="flex items-center border rounded-lg">
											<label className="sr-only" htmlFor="quantity">Quantity</label>
											<input
												type="number"
												id="quantity"
												className="w-20 px-3 py-2 text-center border-none focus:outline-none"
												defaultValue="1"
												min="1"
											/>
										</div>
										<button
											type="submit"
											className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg transition-colors font-medium"
										>
											Add to cart
										</button>
									</div>
								</form>

								{/* Icons */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
									<div>
										<h3 className="font-semibold mb-1">Warranty</h3>
										<p className="text-sm text-gray-600">2-year guarantee</p>
									</div>
									<div>
										<h3 className="font-semibold mb-1">After-sales</h3>
										<p className="text-sm text-gray-600">Free return within 15 days</p>
									</div>
									<div>
										<h3 className="font-semibold mb-1">Payment</h3>
										<p className="text-sm text-gray-600">Secure & easy</p>
										<div className="flex gap-2 mt-2 flex-wrap">
											<img src="https://afs-foiling.com/wp-content/uploads/2025/05/Layer_1-1.svg" alt="Visa" className="h-5" />
											<img src="https://afs-foiling.com/wp-content/uploads/2025/05/Group-26.svg" alt="Paypal" className="h-6" />
											<img src="https://afs-foiling.com/wp-content/uploads/2025/05/svg3409-1.svg" alt="MasterCard" className="h-7" />
											<img src="https://afs-foiling.com/wp-content/uploads/2025/05/image-7.svg" alt="Monetico" className="h-7" />
										</div>
									</div>
								</div>

								{/* Expert Help */}
								<div className="bg-gray-50 p-6 rounded-xl flex flex-col md:flex-row gap-6">
									<div className="flex-1">
										<p className="text-sm text-gray-600">AFS product expert</p>
										<h4 className="text-lg font-semibold mb-2">Need help choosing?</h4>
										<p className="text-sm mb-4">We’re here to help you make the right choice.</p>
										<a className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors text-sm font-medium">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
												<path d="M10.2857 4.71484L1.71429 13.2863M10.2857 4.71484H2.57144M10.2857 4.71484V12.4291" stroke="white" strokeWidth="1.5" />
											</svg>
											Book a call
										</a>
									</div>
									<div className="flex-1">
										<img src="https://afs-foiling.com/wp-content/uploads/2025/06/image-33-1.png.webp" alt="Expert" className="w-full h-auto rounded-lg" />
									</div>
								</div>
							</div>
						</main>

						{/* Features Tabs */}
						<div id="features" className="mt-16" />
						<h2 className="text-3xl font-bold mb-6">Features</h2>
						<div className="space-y-4">
							{[
								{ title: "Dimensions", open: false },
								{ title: "Size guide", open: false },
								{ title: "Program", open: false },
								{ title: "FAQ", open: false },
							].map((tab, i) => (
								<details key={i} className="group">
									<summary className="flex justify-between items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
										<span className="font-medium">{tab.title}</span>
										<span className="text-xl group-open:rotate-45 transition-transform">+</span>
									</summary>
									<div className="p-4 bg-white border border-gray-200 rounded-lg mt-2">
										{tab.title === "Dimensions" && (
											<div className="overflow-x-auto">
												<table className="w-full text-left">
													<thead className="bg-gray-50">
														<tr>
															<th className="p-3">Volume (L)</th>
															<th className="p-3">Length (cm)</th>
															<th className="p-3">Width (cm)</th>
															<th className="p-3">OFO</th>
															<th className="p-3">Construction</th>
															<th className="p-3">Box</th>
															<th className="p-3">Weight (kg)</th>
															<th className="p-3">Wing</th>
															<th className="p-3">Sail</th>
														</tr>
													</thead>
													<tbody>
														<tr className="border-t">
															<td className="p-3">100</td>
															<td className="p-3">240</td>
															<td className="p-3">63</td>
															<td className="p-3">41.7 cm</td>
															<td className="p-3">PVC Sandwich Glass</td>
															<td className="p-3">Deep Tuttle</td>
															<td className="p-3">6.9</td>
															<td className="p-3">33 to 41 cm</td>
															<td className="p-3">6m²</td>
														</tr>
														<tr className="border-t">
															<td className="p-3">130</td>
															<td className="p-3">247</td>
															<td className="p-3">76</td>
															<td className="p-3">49.6 cm</td>
															<td className="p-3">PVC Sandwich Glass</td>
															<td className="p-3">Deep Tuttle</td>
															<td className="p-3">8.4</td>
															<td className="p-3">43 to 50 cm</td>
															<td className="p-3">7.5m²</td>
														</tr>
													</tbody>
												</table>
											</div>
										)}
										{tab.title === "Size guide" && (
											<table className="w-full text-left">
												<tbody>
													<tr className="border-b">
														<td className="p-3 font-semibold">100</td>
														<td className="p-3">Medium to strong wind, medium/light build</td>
													</tr>
													<tr className="border-b">
														<td className="p-3 font-semibold">130</td>
														<td className="p-3">Light to moderate wind, medium to heavy build</td>
													</tr>
												</tbody>
											</table>
										)}
									</div>
								</details>
							))}
						</div>

						<div id="reviews" className="h-0" />
					</div>
				</div>
			</section>

			{/* Two Different Sizes Section (Styled Like Reference Image) */}
			<section
				className="relative w-full py-28 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden"

			>
				{/* Left Text Section */}
				<div className="z-10 pl-40 md:pl-20 w-full md:w-1/2 space-y-10">
					<h2 className="text-5xl font-semibold mb-8">Two different sizes</h2>

					<div className="flex flex-col md:flex-row md:gap-16 gap-10">
						{/* Fury 100 L */}
						<div>
							<h3 className="text-2xl font-semibold mb-3">Fury 100 L</h3>
							<p className="text-gray-300 leading-relaxed">
								Volume: 100 L<br />
								Length: 240 cm<br />
								Width: 63 cm
							</p>
						</div>

						{/* Fury 130 L */}
						<div>
							<h3 className="text-2xl font-semibold mb-3">Fury 130 L</h3>
							<p className="text-gray-300 leading-relaxed">
								Volume: 130 L<br />
								Length: 247 cm<br />
								Width: 76 cm
							</p>
						</div>
					</div>
				</div>

				{/* Right Image Section */}
				<div className="relative z-10 w-full md:w-1/2 flex justify-center mt-16 md:mt-0">
					<img
						src="https://afs-foiling.com/wp-content/uploads/2023/03/Fury-ahd.png.webp"
						alt="Fury boards"
						className="w-[95%] md:w-[78%] h-auto object-contain"
					/>
				</div>

				{/* Overlay (optional subtle gradient) */}
			</section>

			<FeatureSections />

		</div>
	);
};

export default FuryProductPage;