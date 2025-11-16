function extractHeadings(markdown) {
  const headingRegex = /^##\s+(.*)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push(match[1]);
  }
  return headings;
}

const blog1Content = `
    <div class="blog-content">
        <h1>Top Wing Foil Destinations Recommended by AFS</h1>
        <p>Ready to explore new wingfoil spots in France or abroad? Whether you prefer staying local or traveling across the globe, we’ve selected the absolute best destinations for your next wingfoil adventure. This guide is curated by the AFS Pro Team based on wind consistency, water conditions, and local amenities. Before you leave, a quick preparation task is necessary: <strong>Task 1: Check your board's pressure! Ensure inflatable boards are at 15 PSI.</strong></p>

        <img src="/images/blogs/destination.png" alt="Wingfoil destinations" style="width:100%; border-radius:12px; margin:20px 0;" />
        
        <p>Wingfoiling is more than just a sport; it's a way of life that takes you to some of the world's most spectacular coastal regions. The quality of your session often depends heavily on the spot you choose.</p>

        <h2>🌊 The Mediterranean Wind Belt: Top 5 Wingfoil Spots Around the World</h2>
        <p>These locations offer near-guaranteed wind, essential infrastructure, and amazing community vibes. They cater to a wide range of skill levels, from the absolute beginner to the professional wave rider.</p>
        <ol>
            <li><strong>Le Morne, Mauritius (The Lagoon):</strong> Famous for the stunning view of the Le Morne Brabant mountain, it offers flat, shallow water inside the reef, perfect for learning and mastering jumps. The outer reef provides world-class waves for experts. Wind is consistent SE trade winds.</li>
            <li><strong>Tarifa, Spain (Valdevaqueros Beach):</strong> Known as the wind capital of Europe. It gets both the Levante (strong, offshore) and Poniente (milder, onshore) winds, providing varied conditions almost daily. The lively surf town adds to the vibrant atmosphere.</li>
            <li><strong>Brittany, France (The Bay of Quiberon):</strong> Offers diverse spots, from the exposed Atlantic side to sheltered bays. Ideal for those who love cooler water, rugged coastlines, and a rich maritime culture. Excellent school facilities are abundant here.</li>
            <li><strong>Maui, Hawaii (Spreckelsville/Kite Beach):</strong> The undisputed birthplace of modern foiling and wind sports. Side-shore wind, small to medium swell, and a deep history of innovation make this a pilgrimage site for serious riders.</li>
            <li><strong>Cape Town, South Africa (Big Bay, Bloubergstrand):</strong> Incredible backdrop of Table Mountain combined with strong, reliable Cape Doctor (South-Easterly) winds during the summer months. Conditions can be challenging, making it a favorite for advanced riders looking for big air and downwinders.</li>
        </ol>

        <p>Choosing a spot often depends on the season, wind strength, and water temperature. Below is a detailed breakdown to help you plan your next trip meticulously.</p>

        <h2>📊 Advanced Comparison Table for Global Destinations</h2>
        <p>This table details specific conditions to help you match your expectations with reality. Note the difference in water temperature, which often dictates wetsuit choice (3/2mm vs 5/4mm).</p>
        <table border="1" cellpadding="10" style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Best Season</th>
                    <th>Average Wind (Knots)</th>
                    <th>Water Temperature</th>
                    <th>Skill Level</th>
                    <th>Hazard Profile</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Le Morne, MU</td><td>April - November</td><td>15–25</td><td>26°C (Shorty)</td><td>Intermediate+</td><td>Coral Reefs (Wear booties)</td></tr>
                <tr><td>Tarifa, ES</td><td>May - September</td><td>18–35</td><td>22°C (3/2mm)</td><td>All Levels</td><td>Crowds, Strong Currents</td></tr>
                <tr><td>Brittany, FR</td><td>June - September</td><td>12–20</td><td>18°C (5/4mm)</td><td>Beginner+</td><td>Tides, Rocks</td></tr>
                <tr><td>Maui, HI</td><td>Year-round</td><td>15–25</td><td>27°C (Boardshorts)</td><td>Advanced</td><td>Boat Traffic, Shorebreak</td></tr>
                <tr><td>Cape Town, ZA</td><td>November - March</td><td>20–40</td><td>20°C (4/3mm)</td><td>Advanced</td><td>High Wind, Cold Upwellings</td></tr>
            </tbody>
        </table>

        <h2>🧭 Safety and Logistics Considerations</h2>
        <p>Safety is paramount, especially when traveling. Always respect local conditions and marine life. We advise against solo sessions in high-risk areas.</p>
        
        <h3>Local Wind Patterns and Tidal Effects</h3>
        <p>In locations like Brittany, tidal range can drastically affect the riding area. A spot that is perfect at high tide might become a rocky minefield at low tide. Conversely, in Tarifa, understanding the difference between the thermal Levante (offshore) and Poniente (onshore) winds is crucial for safe riding and self-rescue. **Task 3: Locate the nearest marine rescue station contact information for your chosen destination.**</p>
        
        <h3>Gear Preparation for Travel</h3>
        <p>Traveling with foil gear requires careful packing. Ensure your foil wings are protected to prevent damage during transit. The mast should ideally be packed separately from the fuselage. **Task 4: Purchase a durable, padded foil bag designed for air travel.**</p>

        <p style="margin-top:20px;">No matter where you go, always check local regulations and safety conditions before hitting the water. Happy foiling!</p>
        
        <h2>🌟 AFS Team's Wildcard Destination: Sardinia, Italy</h2>
        <p>For those seeking something less mainstream than Tarifa, the north of Sardinia offers the infamous 'Mistral' wind, a strong northerly wind that creates incredibly flat water in the sheltered bays, perfect for high-speed runs and training advanced maneuvers like the Tack and Jibe.</p>
        <p>The best spot is Porto Pollo, featuring two large bays with a permanent wind-tunnel effect. It's a fantastic training ground with a reliable wind-forecast for most of the summer. The water is warm, the food is incredible, and the vibe is relaxed. It's truly a hidden gem for wingfoiling enthusiasts.</p>
    </div>
`;

// =========================================================================
// BLOG 2: HOW TO CHOOSE THE RIGHT FRONT WING
// =========================================================================

const blog2Content = `
    <div class="blog-content">
        <h1>How to Choose the Right Front Wing</h1>
        <p>Choosing the right front wing is the single most important decision for your performance and enjoyment while wingfoiling. The front wing dictates everything: your minimum take-off speed, your top speed, stability, and carving ability. The right setup can transform your session. At AFS, we believe in a balanced approach, helping you find the perfect compromise between lift and speed. We start with a mandatory assessment: <strong>Task 1: Determine your average local wind speed and your body weight in kilograms.</strong></p>

        <img src="/images/blogs/front-wing.png" alt="Front wing" style="width:100%; border-radius:12px; margin:20px 0;" />
        
        <p>The hydrofoil works on the same principle as an airplane wing, using Bernoulli’s principle to generate lift. However, unlike an airplane, the wingfoil must operate in two different fluid densities—air (the wing) and water (the foil)—which makes the front wing's design paramount.</p>

        <h2>⚙️ Critical Front Wing Characteristics Explained</h2>
        <p>Understanding these three parameters is essential for making an informed purchase, regardless of brand.</p>
        <ul>
            <li><strong>Surface Area (cm²):</strong> This is the wing's footprint. It primarily determines **lift and low-end speed**. Larger wings (1800cm²+) lift more easily in light wind but saturate (get too hard to control) faster. Smaller wings (1000cm²-) require more speed to lift but offer a higher top speed and sharper turning.</li>
            <li><strong>Aspect Ratio (AR):</strong> Calculated as (Span² / Area), this affects **glide and agility**.
                <ul>
                    <li>**Low Aspect Ratio (AR < 4.5):** Wider span, shorter chord (front to back). Offers stability, easy pumping, and great turning, ideal for beginners and wave riders.</li>
                    <li>**High Aspect Ratio (AR > 7.0):** Narrow span, long chord. Excellent glide, minimal drag, and high speed, but requires precision and higher take-off speed, favored for racing and downwinding.</li>
                </ul>
            </li>
            <li><strong>Profile Thickness:</strong> This relates to the wing's cross-section. Thicker profiles generate more lift but also more drag, resulting in a stable, early lift. Thinner profiles are faster but require better technique to maintain flight.</li>
        </ul>
        
        <h2>⚖️ Foil Construction: Carbon vs. Aluminum</h2>
        <p>The mast and fuselage material also impacts performance and price. Aluminum is often cheaper and highly durable for beginner setups, but carbon offers superior stiffness and lighter weight, which is critical for maneuverability and pumping. AFS foils often use a hybrid system—carbon wings with an aluminum mast—to offer the best balance of performance and cost. **Task 2: Research the torsional stiffness ratings for carbon and aluminum masts.**</p>

        <h2>📊 Recommended Configurations by Skill Level and Weight</h2>
        <p>Use this table as a starting point. Remember that **rider weight** is a heavy factor—a lighter person needs a smaller wing for the same conditions.</p>
        <table border="1" cellpadding="10" style="width:100%; border-collapse:collapse;">
            <thead>
                <tr><th>Skill Level</th><th>Rider Weight (kg)</th><th>Front Wing Size (cm²)</th><th>Aspect Ratio</th><th>Ideal Wind Range (knots)</th></tr>
            </thead>
            <tbody>
                <tr><td>Beginner</td><td>60-85</td><td>1800–2200</td><td>Low (4.0-5.0)</td><td>10–18 (Light/Medium)</td></tr>
                <tr><td>Intermediate</td><td>70-90</td><td>1400–1800</td><td>Medium (5.5-6.5)</td><td>15–25 (Medium/Strong)</td></tr>
                <tr><td>Advanced Freeride</td><td>75-95</td><td>1000–1400</td><td>High (7.0+)</td><td>18–30 (Strong)</td></tr>
                <tr><td>Advanced Wave</td><td>65-85</td><td>800–1200</td><td>Low/Medium (4.5-6.0)</td><td>12–25 (Swell/Waves)</td></tr>
            </tbody>
        </table>

        <h2>💡 Tuning and Progression: The AFS Approach</h2>
        <p>As you progress, you won't necessarily need a whole new foil. You can often 'tune' your setup by adjusting the stabilizer (back wing) angle or changing the tail wing entirely. A smaller stabilizer makes the setup looser and faster, while a larger one adds stability for easier learning. **Task 3: Experiment with adjusting your stabilizer angle by 1 degree to feel the difference in lift.**</p>

        <h3>Choosing Your Quiver</h3>
        <p>A true all-around rider usually aims for a two-wing quiver: a large, low-aspect wing (e.g., 2000cm²) for light wind days and a small, high-aspect wing (e.g., 1200cm²) for strong wind and high-speed blasting. This allows you to cover a vast range of conditions.</p>

        <p>Still unsure? Visit an AFS partner store or **Task 4: Book a front wing demo session with your local school** to feel the difference between a high and low-aspect wing before making your final choice.</p>
    </div>
`;

// =========================================================================
// BLOG 3: THE BEST WINGFOIL SPOTS AND SCHOOLS IN BRITTANY
// =========================================================================

const blog3Content = `
    <div class="blog-content">
        <h1>The Best Wingfoil Spots and Schools in Brittany</h1>
        <p>Brittany, with its rugged coastline, reliable winds, and high-quality infrastructure, is one of the top destinations for wingfoilers in France. It offers a perfect blend of challenging Atlantic conditions and sheltered, sandy bays, making it ideal for every level of rider, from first-timers to wave experts. The key to a great session here is preparation: <strong>Task 1: Check the tide times and coefficients daily, as the water level changes dramatically.</strong></p>

        <img src="/images/blogs/brittany.png" alt="Wingfoil in Brittany" style="width:100%; border-radius:12px; margin:20px 0;" />

        <p>The prevailing winds in Brittany are usually Westerlies and North-Westerlies, which offer excellent side-shore conditions on many popular spots, ensuring easy launching and safe downwind runs (if planned).</p>

        <h2>🌤️ Top Wingfoil Spots in Brittany by Region</h2>
        <p>Brittany can be divided into three prime zones for foiling, each offering unique conditions.</p>
        <ul>
            <li><strong>La Torche (South Finistère):</strong> The most famous spot, known for its consistent swell and surf culture. It's best suited for intermediate to advanced riders who want to practice wave riding or jumping. Caution: Strong currents can be present.</li>
            <li><strong>Quiberon Peninsula (Morbihan):</strong> This peninsula offers a beautiful duality: the Atlantic side for waves and the sheltered bay side (Baie de Quiberon) for flat, calm water. The bay is a beginner's paradise—shallow and protected.</li>
            <li><strong>Saint-Malo/Saint-Brieuc Bay (Ille-et-Vilaine/Côtes-d'Armor):</strong> The northern spots offer vast tidal flat areas, which, at mid-tide, create enormous zones of buttery-flat water ideal for learning to foil and for high-speed runs.</li>
            <li>**Lorient (Gâvres Peninsula):** Excellent for downwinders and often less crowded than Quiberon.</li>
        </ul>

        <h2>🏫 Recommended Wingfoil Schools and Instruction</h2>
        <p>Learning with certified instructors is the fastest and safest way to progress. These schools are known for using modern equipment and focusing on safety protocols, including boat-assisted lessons.</p>
        <table border="1" cellpadding="10" style="width:100%; border-collapse:collapse;">
            <thead>
                <tr><th>School</th><th>Location</th><th>Specialty</th><th>Duration (Average Lesson)</th><th>Website</th></tr>
            </thead>
            <tbody>
                <tr><td>AFS Center (La Torche)</td><td>La Torche</td><td>Wave Riding & Foiling Jumps</td><td>3 Hours</td><td><a href="#">afscenter.fr</a></td></tr>
                <tr><td>Wind Riders Academy</td><td>Quiberon (Bay)</td><td>Beginners & Water Starts</td><td>2.5 Hours</td><td><a href="#">windriders.fr</a></td></tr>
                <tr><td>Ocean School Bretagne</td><td>Saint-Malo</td><td>Intermediate Foiling & Tacks</td><td>3 Hours</td><td><a href="#">oceanschool.fr</a></td></tr>
            </tbody>
        </table>

        <h2>⚠️ Essential Brittany Safety and Gear Checklist</h2>
        <p>Due to the cool water and powerful tides, extra safety measures are non-negotiable in this region.</p>
        
        <h3>Required Gear</h3>
        <p>A good quality **4/3mm or 5/4mm wetsuit** is essential even in summer. Booties are highly recommended for shore access in many rocky areas. Always wear a **helmet and impact vest**, especially when learning or riding near rocks or other riders. **Task 2: Ensure your board and wing leashes are in perfect condition (no tears or cracks).**</p>
        
        <h3>Tidal Awareness and Wind Direction</h3>
        <p>Never ride offshore (wind blowing out to sea) unless you have a safety boat plan or are an expert. The tides here are strong; always check the current's direction before launching. If the wind dies, the current can quickly pull you away from your launch spot. **Task 3: Study the tidal current diagram for the specific bay you plan to visit.**</p>
        
        <h2>🛠️ Maintaining Your Gear in a Salty Environment</h2>
        <p>Brittany's harsh coastal environment requires diligent gear maintenance. Always rinse your wing, board, and foil thoroughly with fresh water immediately after a session. Pay special attention to the mast plate screws to prevent saltwater corrosion. **Task 4: Apply a layer of anti-seize grease to all stainless steel screws before mounting your foil.**</p>

        <p>Brittany is a captivating location that rewards the prepared rider with unforgettable sessions. Enjoy the Celtic vibe and the stunning natural beauty!</p>
    </div>
`;

// =========================================================================
// BLOG 4: WHAT GLIDER SHOULD YOU CHOOSE IF YOU’RE A WINGFOIL BEGINNER?
// =========================================================================

const blog4Content = `
    <div class="blog-content">
        <h1>What Glider Should You Choose If You’re a Wingfoil Beginner?</h1>
        <p>If you’re new to wingfoiling, choosing the right glider (board) can make all the difference between frustration and fun. The goal for a beginner is **volume and stability**. A larger, more buoyant board provides the necessary platform to stand up and manage the wing before the foil even lifts, dramatically accelerating your learning curve. <strong>Task 1: Calculate your required volume: (Your weight in kg + 40) = Minimum volume in liters.</strong></p>

        <img src="/images/blogs/man-sea.jpg" alt="Beginner glider" style="width:100%; border-radius:12px; margin:20px 0;" />

        <p>Beginner boards are designed to be forgiving. They act like a stable floating platform, giving you ample time to master wing control, stance, and basic steering before introducing the complexity of flying on the foil.</p>

        <h2>🪶 Key Glider Features for Beginners</h2>
        <p>Don't be tempted by the small, sleek boards the pros use! Focus on these characteristics for your first 10-20 sessions:</p>
        <ul>
            <li>**High Volume (110L - 160L):** Volume is flotation. More volume means easier water starts and more stability when paddling or kneeling.</li>
            <li>**Wide and Long Shape:** A wider board provides lateral stability, while a longer board helps with directional stability and keeping the nose up when touching down.</li>
            <li>**Durable Construction (Composite/Epoxy):** Your board will take a beating from the foil, the wing, and the bottom of the lake/sea. Durable, inexpensive construction is crucial.</li>
            <li>**Footstrap Options:** Start without straps, but ensure the board has inserts. Footstraps are key once you begin flying consistently and attempting jumps.</li>
        </ul>

        <h2>⚖️ AFS Beginner Glider Comparison: The Full Range</h2>
        <p>This table compares models across the beginner and progression categories, illustrating how volume decreases as your skill increases.</p>
        <table border="1" cellpadding="10" style="width:100%; border-collapse:collapse;">
            <thead>
                <tr><th>Glider Model</th><th>Volume (L)</th><th>Length (ft/in)</th><th>Width (in)</th><th>Recommended Skill</th><th>Focus</th></tr>
            </thead>
            <tbody>
                <tr><td>AFS Fly 1800</td><td>150</td><td>6’6”</td><td>32”</td><td>Absolute Beginner</td><td>Maximum Stability</td></tr>
                <tr><td>AFS Pure 1600</td><td>120</td><td>6’0”</td><td>30”</td><td>Advancing Beginner</td><td>Early Lift & Progress</td></tr>
                <tr><td>AFS Pure 1400</td><td>105</td><td>5’8”</td><td>28”</td><td>Intermediate</td><td>Maneuverability</td></tr>
                <tr><td>AFS Pro 1200</td><td>80</td><td>5’2”</td><td>26”</td><td>Advanced/Expert</td><td>High-Performance Carving</td></tr>
            </tbody>
        </table>

        <h2>🌬️ The Crucial Role of Board Size in Light Wind</h2>
        <p>In light wind (8-12 knots), a large volume board is essential because it allows you to pump the board and wing to generate enough speed to lift the foil. A small board would sink under your weight, making the pumping action impossible. The extra volume keeps you on the surface, ready to fly. **Task 2: Practice the "knee-to-stand" water start transition on land to perfect the movement before hitting the water.**</p>

        <h2>🚀 Progression Steps: From Beginner to Intermediate</h2>
        <p>As you progress, you will notice your large board becomes cumbersome. Your natural progression should look like this:</p>
        <ol>
            <li>**Phase 1 (Floating):** Using a 150L+ board, learn to stand, balance, and control the wing in both directions.</li>
            <li>**Phase 2 (First Flights):** Stay on the 150L board, focusing on consistently getting the foil up and flying for 50+ meters.</li>
            <li>**Phase 3 (Transition):** Move down to a 110L–130L board (e.g., AFS Pure 1600). This requires using the sinker method for water starts but allows for much better carving and maneuverability.</li>
        </ol>

        <p>For first-time riders, we recommend the <strong>AFS Fly 1800</strong> — stable, smooth, and perfect for your learning curve. **Task 3: Watch a video tutorial on how to correctly install your foil mast plate and tighten all bolts to prevent damage.**</p>

        <p>Remember: Buy the board for the level you are *at*, not the level you *want* to be at. Happy, fast learning is guaranteed with the right gear!</p>
    </div>
`;

// =========================================================================
// FINAL EXPORT
// =========================================================================



// Short snippet/description


// Used for the URL parameter
// Full HTML content


export const dummyBlogs = [
  {
    id: 1,
    title: "Top wing foil destinations recommended by AFS",
    description: "#WINGFOIL Ready to explore new wingfoil spots, in France or abroad? We've selected the best destinations...",
    date: "4 MARCH 2025",
    imageUrl: "/images/blogs/destination.png",
    slug: "destinations",
    fullDescription: blog1Content,
    headings: extractHeadings(blog1Content)
  },
  {
    id: 2,
    title: "How to choose the right front wing?",
    description: "A story of sliding... and progress. Choosing the right front wing is crucial to your performance and enjoyment...",
    date: "28 JULY 2025",
    imageUrl: "/images/blogs/front-wing.png",
    slug: "front-wing",
    fullDescription: blog2Content,
    headings: extractHeadings(blog2Content)
  },
  {
    id: 3,
    title: "The best wingfoil spots and schools in Brittany",
    description: "Brittany is one of the top destinations for wingfoilers in France. With its scenic coasts, reliable winds, and quality schools...",
    date: "28 JULY 2025",
    imageUrl: "/images/blogs/brittany.png",
    slug: "brittany",
    fullDescription: blog3Content,
    headings: extractHeadings(blog3Content)
  },
  {
    id: 4,
    title: "What glider should you choose if you’re a wingfoil beginner?",
    description: "Looking for a thrill, a break and a sport like no other? If you’re new to wingfoiling, choosing the right glider can make all the difference...",
    date: "28 JULY 2025",
    imageUrl: "/images/blogs/man-sea.jpg",
    slug: "beginner-glider",
    fullDescription: blog4Content,
    headings: extractHeadings(blog4Content)
  }
];

