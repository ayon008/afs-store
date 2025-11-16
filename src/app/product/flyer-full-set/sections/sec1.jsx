import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icons ---
// Using components for cleaner JSX
const BuyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M10.2857 1.71484L1.71429 10.2863M10.2857 1.71484H2.57144M10.2857 1.71484V9.42913" stroke="white" strokeWidth="2"></path>
  </svg>
);

const SizeGuideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
    <path d="M10.2857 4.71484L1.71429 13.2863M10.2857 4.71484H2.57144M10.2857 4.71484V12.4291" stroke="#1D98FF" strokeWidth="1.5"></path>
  </svg>
);

const AppointmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
    <path d="M10.2857 4.71484L1.71429 13.2863M10.2857 4.71484H2.57144M10.2857 4.71484V12.4291" stroke="#1D98FF" strokeWidth="1.5"></path>
  </svg>
);

const PlayIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14">
    <rect x="1.5" y="1.5" width="53" height="53" rx="26.5" stroke="white" strokeWidth="3" strokeDasharray="10 10"></rect>
    <path d="M37 26.2679C38.3333 27.0377 38.3333 28.9623 37 29.7321L25 36.6603C23.6667 37.4301 22 36.4678 22 34.9282L22 21.0718C22 19.5322 23.6667 18.5699 25 19.3397L37 26.2679Z" fill="white"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

// --- Data ---
const galleryImagesData = [
  { id: 1, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/Full-Set-Flyer-V2.png.webp", alt: "foil wing foil AFS Flyer Full Set" },
  { id: 2, type: 'video', src: "https://afs-foiling.com/wp-content/uploads/2025/04/flyer-thumb.png.webp", alt: "flyer thumb", videoUrl: "https://youtu.be/SV4D6msP7fs" },
  { id: 3, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/flyer-full-set-situation-1024x1024.jpeg.webp", alt: "" },
  { id: 4, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-5-1024x1024.png.webp", alt: "" },
  { id: 5, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-4-1024x1024.png.webp", alt: "" },
  { id: 6, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-3-1024x1024.png.webp", alt: "" },
  { id: 7, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-2-1024x1024.png.webp", alt: "" },
  { id: 8, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/Flyer-front-wing-1024x1024.png.webp", alt: "aile avant carbone AFS Flyer 1800" },
  { id: 9, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/Flyer_stab-1024x1024.png.webp", alt: "" },
  { id: 10, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/Flyer_mast-1024x1024.png.webp", alt: "" },
  { id: 11, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/Evo-fuselage-1024x1024.png.webp", alt: "" },
  { id: 12, type: 'image', src: "https://afs-foiling.com/wp-content/uploads/2023/11/0001-1024x1024.png.webp", alt: "" },
];

const featuresData = [
  {
    id: "dimensions",
    title: "Dimensions",
    content: `
      <p class="font-bold">Flyer front wing</p>
      <div class="overflow-x-auto text-sm">
        <table class="w-full min-w-[600px] border-collapse">
          <thead><tr class="border-b"><th class="text-left p-2">Surface (cm2)</th><th class="text-left p-2">Span (mm)</th><th class="text-left p-2">Aspect Ratio</th><th class="text-left p-2">Weight (kg)</th></tr></thead>
          <tbody>
            <tr class="border-b"><td class="p-2">1500</td><td class="p-2">955</td><td class="p-2">6.3</td><td class="p-2">TBA</td></tr>
            <tr class="border-b"><td class="p-2">1800</td><td class="p-2">1050</td><td class="p-2">6.3</td><td class="p-2">TBA</td></tr>
          </tbody>
        </table>
      </div>
      <p class="font-bold mt-4">Stabilizer</p>
      <div class="overflow-x-auto text-sm">
        <table class="w-full min-w-[600px] border-collapse">
          <thead><tr class="border-b"><th class="text-left p-2">Surface (cm2)</th><th class="text-left p-2">Span (mm)</th><th class="text-left p-2">Aspect Ratio</th><th class="text-left p-2">Weight (kg)</th></tr></thead>
          <tbody><tr class="border-b"><td class="p-2">245</td><td class="p-2">450</td><td class="p-2">8.3</td><td class="p-2">0.2</td></tr></tbody>
        </table>
      </div>
      <p class="mt-4">Find all the <a href="https://afs-foiling.com/details-and-dimensions-foils-boards/" class="text-blue-600 underline">features of our products</a>.</p>
    `
  },
  {
    id: "size-guide",
    title: "Size guide",
    content: `
      <table class="w-full border-collapse">
        <tbody>
          <tr class="border-b"><td class="p-2 text-left"><strong>75 kg and under</strong></td><td class="p-2 text-right">1500</td></tr>
          <tr class="border-b"><td class="p-2 text-left"><strong>75 kg and above</strong></td><td class="p-2 text-right">1800</td></tr>
        </tbody>
      </table>
    `
  },
  { id: "program", title: "Program", content: "<p>Program details to be added.</p>" },
  { id: "faq", title: "FAQ", content: "<p>FAQ details to be added.</p>" }
];

// --- Sub-Components ---


const Breadcrumbs = () => (
  <nav className="text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
    <a href="https://afs-foiling.com" className="hover:underline">Home</a> / 
    <a href="https://afs-foiling.com/product-category/foiling/" className="hover:underline"> FOILING</a> / 
    <a href="https://afs-foiling.com/product-category/foiling/wing-foil/" className="hover:underline"> Wing Foil</a> / 
    <span className="text-gray-400"> Flyer Full Set</span>
  </nav>
);

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? galleryImagesData : galleryImagesData.slice(0, 6); // Show 6 images by default (2 rows)

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {visibleImages.map(image => (
          <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              loading="lazy"
            />
            {image.type === 'video' && (
              <a href={image.videoUrl} target="_blank" rel="noopener noreferrer" aria-label="Play video">
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <PlayIcon />
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowAll(prev => !prev)}
        className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        {showAll ? 'View Less' : 'View All'}
      </button>
    </div>
  );
};

const ProductForm = () => {
  const [selectedVariation, setSelectedVariation] = useState('');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-800 mb-2 block">Aile avant</label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedVariation('1500')}
            className={`py-2 px-4 rounded-md border text-sm ${
              selectedVariation === '1500' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            1500
          </button>
          <button
            onClick={() => setSelectedVariation('1800')}
            className={`py-2 px-4 rounded-md border text-sm ${
              selectedVariation === '1800' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            1800
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="quantity">
          <label htmlFor="quantity" className="sr-only">Quantity</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 p-2 border border-gray-300 rounded-md text-center"
            min="1"
            step="1"
          />
        </div>
        <button
          type="submit"
          disabled={!selectedVariation}
          className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-md transition-colors
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     hover:bg-blue-700"
        >
          Add to cart
        </button>
      </div>
      {!selectedVariation && <p className="text-xs text-red-500 mt-2">Please choose an option.</p>}
    </div>
  );
};

const InfoBoxes = () => (
  <div className="mt-8 space-y-6">
    {/* Warranty */}
    <div>
      <h3 className="font-semibold text-gray-800">Warranty</h3>
      <p className="text-sm text-gray-600">All our products come with a 2-year guarantee.</p>
    </div>
    {/* After-sales service */}
    <div>
      <h3 className="font-semibold text-gray-800">After-sales service</h3>
      <p className="text-sm text-gray-600">Free return within 15 days</p>
    </div>
    {/* Payment methods */}
    <div>
      <h3 className="font-semibold text-gray-800">Payment methods</h3>
      <p className="text-sm text-gray-600">Secure payment. Quick and easy.</p>
      <div className="flex items-center gap-4 mt-2 flex-wrap">
        <img src="https://afs-foiling.com/wp-content/uploads/2025/05/Layer_1-1.svg" alt="Visa" className="h-6" />
        <img src="https://afs-foiling.com/wp-content/uploads/2025/05/Group-26.svg" alt="Paypal" className="h-6" />
        <img src="https://afs-foiling.com/wp-content/uploads/2025/05/svg3409-1.svg" alt="MasterCard" className="h-8" />
        <img src="https://afs-foiling.com/wp-content/uploads/2025/05/image-7.svg" alt="Monetico Payment" className="h-8" />
      </div>
    </div>
  </div>
);

const HelpSection = () => (
  <div className="mt-8 bg-gray-50 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
    <div className="p-6 flex flex-col justify-center">
      <span className="text-sm font-semibold text-blue-600">AFS product expert</span>
      <h4 className="text-lg font-bold text-gray-800 mt-1">Need help choosing your equipment?</h4>
      <p className="text-sm text-gray-600 mt-2">We’re here to provide you with comprehensive answers and advice to help you make the right choice.</p>
      <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 mt-4 self-start">
        <AppointmentIcon />
        <span>Make an appointment by phone</span>
      </button>
    </div>
    <div className="hidden md:block">
      <img 
        src="https://afs-foiling.com/wp-content/uploads/2025/06/image-33-1.png.webp" 
        alt="AFS Expert" 
        className="w-full h-full object-cover" 
        loading="lazy"
      />
    </div>
  </div>
);

const FeaturesAccordion = () => {
  const [openToggle, setOpenToggle] = useState(null);

  const handleToggle = (id) => {
    setOpenToggle(prev => (prev === id ? null : id));
  };

  return (
    <div className="mt-12" id="features">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Features</h2>
      <div className="border-t border-gray-200">
        {featuresData.map(item => (
          <div key={item.id} className="border-b border-gray-200">
            <h3>
              <button
                onClick={() => handleToggle(item.id)}
                className="flex items-center justify-between w-full py-4 px-2 text-left"
                aria-expanded={openToggle === item.id}
                aria-controls={`content-${item.id}`}
              >
                <span className="text-lg font-semibold text-gray-800">{item.title}</span>
                <span className={`${openToggle === item.id ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>
            </h3>
            {openToggle === item.id && (
              <div 
                id={`content-${item.id}`} 
                className="p-4 bg-gray-50 text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewsSlider = () => (
  <div className="mt-12" id="reviews">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Reviews</h2>
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src="https://afs-foiling.com/wp-content/uploads/2024/03/maxresdefault-32.jpg.webp" 
          alt="Video Thumbnail" 
          className="w-full"
          loading="lazy"
        />
        <a href="https://youtu.be/SX-qHw7UPxE" target="_blank" rel="noopener noreferrer" aria-label="Watch review">
          <PlayIcon />
        </a>
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800">GWEN LE TUTOUR</h3>
        <a 
          href="https://youtu.be/SX-qHw7UPxE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 mt-2"
        >
          Watch the review
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M12 2L2 12M12 2H3M12 2V11" stroke="#1D98FF" strokeWidth="2"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
);

// --- Page Components ---

/**
 * This component contains the "Product Details" view, which is
 * equivalent to the original site's '.afs_buying_sec'
 */
const ProductView = () => (
  <div className="container mx-auto px-4 py-8">
    <Breadcrumbs />
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Gallery */}
      <div className="lg:sticky top-24 self-start">
        <Gallery />
      </div>

      {/* Right Column: Product Info */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900">Flyer Full Set</h1>
        <div className="mt-4 text-gray-700">
          <p>Ultra fun – Screws and covers included</p>
          <p className="mt-2">The Flyer foil is designed to accompany your first wing flights. Its smooth takeoff, stability, control, and predictable nature make it the ideal foil for learning to fly with ease. 100% carbon.</p>
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-4">
          From <span className="text-blue-600">1399,00€</span>
        </p>
        <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 mt-4">
          <SizeGuideIcon />
          <span>Size guide</span>
        </button>
        <ProductForm />
        <InfoBoxes />
        <HelpSection />
      </div>
    </main>
    
    {/* Full Width Sections Below */}
    <FeaturesAccordion />
    <ReviewsSlider />
  </div>
);

/**
 * This component contains the "Landing Page" view, which is
 * equivalent to the original site's hero and feature sections.
 */
const LandingView = () => (
  <div className="text-gray-800">
    {/* Hero Section */}
   <section className="relative min-h-[70vh] md:min-h-screen flex items-end justify-center text-center text-white bg-[#000000] py-20 px-4 overflow-hidden">

      <img 
        src="https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-5-1.png" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-bold">Ultra-fun foiling!</h2>
        <p className="text-lg md:text-xl mt-4 max-w-lg">The Flyer foil is designed to accompany your first wing flights.</p>
        <div className="mt-12 max-w-2xl text-base md:text-lg space-y-4">
          <p>Its smooth launch, stability, control and predictability make it the ideal foil for learning to fly easily, upwind, performing your first manoeuvres and wing surfing.</p>
          <p>Its great versatility means it can accompany you throughout your progress, without the need to change foils.</p>
          <p>Enjoy this reliable front wing for a long time to come, with exceptional glide and forgiveness.</p>
        </div>
      </div>
    </section>

    {/* Early take off Section */}
<section className="w-full bg-[#000000] py-20 px-4">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-4xl font-bold mb-6 text-white">Early take off</h2>
      <div className="space-y-4 text-gray-300">
        <p>Designed for early take-off, the Flyer range provides immediate, intuitive and progressive take-off.</p>
        <p>The Flyer foil offers a high level of stability and comfort to wingfoil beginners and improving riders, who can then enjoy the sensations of flight.</p>
        <p className="mt-6 font-semibold text-white">Large surfaces (1500 and 1800 cm²) provide tolerance and stability.</p>
      </div>
    </div>
    <div className="relative h-64">
      <img 
        src="https://afs-foiling.com/wp-content/uploads/2023/11/weights_wrapper-1.png" 
        alt="Weights wrapper 1" 
        className="absolute top-0 left-0 w-4/5" 
        loading="lazy"
      />
      <img 
        src="https://afs-foiling.com/wp-content/uploads/2023/11/weights_wrapper-2.png" 
        alt="Weights wrapper 2" 
        className="absolute bottom-0 right-0 w-4/5" 
        loading="lazy"
      />
    </div>
  </div>
</section>


    {/* Full Carbon Section */}
<section
  className="relative bg-[url('https://afs-foiling.com/wp-content/uploads/2023/11/17820231_SL-092619-23740-39-1.png')] bg-cover bg-center bg-no-repeat text-white min-h-[85vh] w-full overflow-hidden"
>
  {/* Optional dark overlay for readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Top-left text */}
  <div className="absolute top-20 left-12 md:top-28 md:left-20 max-w-xl z-10">
    <h2 className="text-5xl font-bold mb-6">Full Carbon Construction</h2>
    <div className="space-y-5 text-gray-200 leading-relaxed">
      <p>Today, it offers the best weight/strength/stiffness ratio.</p>
      <p>
        Lighter, stiffer foils mean faster take-offs and more pleasant,
        efficient, responsive flying. A carbon mast is impossible to bend
        permanently.
      </p>
    </div>
  </div>

  {/* Bottom-right text */}
  <div className="absolute bottom-20 right-12 md:bottom-28 md:right-20 max-w-xl text-right z-10">
    <h2 className="text-5xl font-bold leading-tight">
      lighter than
      <br />
      <span className="text-8xl font-light lowercase">3kg</span>
    </h2>
    <p className="mt-8 text-gray-200 leading-relaxed">
      In comparison, a carbon foil can weigh half as much as an aluminum foil,
      saving around 3 kg on the total weight of a foil!
    </p>
  </div>
</section>



    
    {/* Easy care Section */}
<section className="relative py-20 px-4 overflow-hidden min-h-[80vh] bg-black flex items-center justify-center">
  {/* Background image */}
  <img 
    src="https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-4-1.png" 
    alt="" 
    className="absolute inset-0 w-full h-full object-cover opacity-20" 
    loading="lazy"
  />

  {/* Content */}
  <div className="relative z-10 text-center text-white max-w-2xl">
    <img 
      src="https://afs-foiling.com/wp-content/uploads/2023/11/0001-1.png" 
      alt="Easy care" 
      className="w-48 h-48 mx-auto mb-6"
      loading="lazy"
    />
    <h2 className="text-4xl font-bold mb-6">Easy care</h2>
    <div className="space-y-4 text-gray-300">
      <p>
        Durability is just one of the many advantages of carbon foils. 
        Damage to the wing caused by a pebble or the appearance of scratches can happen. 
        The advantage of carbon is that it can be lightly sanded to remove these scratches.
      </p>
      <p>
        No need for special cleaning products. Say goodbye to tef gel or any other product — 
        this is really simple and effective maintenance: just use water!
      </p>
    </div>
  </div>
</section>


    {/* Plug And Play Section */}
<section className="bg-black min-h-screen flex items-center justify-center px-4 py-20">
  <div className="relative w-full max-w-6xl flex items-center justify-center">
    {/* --- Background Image --- */}
    <div
  className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://afs-foiling.com/wp-content/uploads/2023/11/foil-flyer-full-set-2-1.png')",
    backgroundSize: "110%",
  }}
></div>

    {/* --- Content Wrapper (on right side) --- */}
    <div className="relative z-10 ml-auto text-right text-white max-w-xl px-8">
      <h2 className="text-4xl font-bold mb-6">Plug And Play</h2>
      <p className="text-lg text-white/90 mb-12">
        These aim was to minimize set-up time and get the most out of the boat
        on the water! Simple assembly with screws
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* --- Item 1 --- */}
        <div className="text-right">
          <div className="flex items-start justify-end gap-x-4">
            <div className="text-white/80 uppercase pt-2 text-right">
              <span className="block">For</span>
              <span className="block">The front wing</span>
            </div>
            <span className="text-7xl font-bold">3</span>
          </div>
        </div>

        {/* --- Item 2 --- */}
        <div className="text-right">
          <div className="flex items-start justify-end gap-x-4">
            <div className="text-white/80 uppercase pt-2 text-right">
              <span className="block">For</span>
              <span className="block">the stabilizer</span>
            </div>
            <span className="text-7xl font-bold">2</span>
          </div>
        </div>

        {/* --- Item 3 --- */}
        <div className="text-right">
          <div className="flex items-start justify-end gap-x-4">
            <div className="text-white/80 uppercase pt-2 text-right">
              <span className="block">For</span>
              <span className="block">the mast/fuselage</span>
            </div>
            <span className="text-7xl font-bold">2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>






    {/* Compatibility Section */}
    <section className="bg-[#000000] text-white py-20 px-4 relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <img 
        src="https://afs-foiling.com/wp-content/uploads/2023/11/Flyer_mast-1-e1700607768403.png" 
        alt="Mast" 
        className="absolute top-0 left-0 w-1/2 opacity-30 -translate-x-1/4" 
        loading="lazy"
      />
      <img 
        src="https://afs-foiling.com/wp-content/uploads/2023/11/image-4.png" 
        alt="Wing" 
        className="absolute bottom-0 right-0 w-1/2 opacity-30 translate-x-1/4" 
        loading="lazy"
      />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Afterwards, you can leave your foil mounted without any risk of corrosion thanks to the full-carbon construction.</h2>
        <p className="text-lg text-white">The Flyer set is also compatible with the entire AFS foil range.</p>
      </div>
    </section>
  </div>
);


// --- Main App ---

export default function App() {
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [scrollToAnchor, setScrollToAnchor] = useState(null);

  useEffect(() => {
    // This effect handles scrolling to anchors when the product page is shown
    if (isProductViewOpen && scrollToAnchor) {
      const el = document.getElementById(scrollToAnchor.substring(1));
      if (el) {
        const headerOffset = 100; // Offset for the sticky header
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      // Reset anchor after scrolling
      setScrollToAnchor(null);
    }
  }, [isProductViewOpen, scrollToAnchor]);

 return (
  <div className="font-sans antialiased text-gray-800 bg-white">
    {/* Removed StickyHeader */}

    {/* Main content toggle */}
    <div className={isProductViewOpen ? 'block' : 'hidden'}>
      <ProductView />
    </div>
    <div className={isProductViewOpen ? 'hidden' : 'block'}>
      <LandingView />
    </div>
  </div>
);
}