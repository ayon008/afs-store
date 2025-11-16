'use client';
import Image from "next/image";

const featureData = [
    {
        ti: "https://afs-foiling.com/wp-content/uploads/2023/04/Group-44-1.png",
        text: "These are boards with a slim outline for greater glide and a fast planing start. Its generous length makes it a board that just wants to glide along and have fun quickly.",
        image: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-de%CC%81cra-6.png",
    },
    {
        ti: "https://afs-foiling.com/wp-content/uploads/2023/04/Plan_de_travail.png",
        text: "The rounded rails add comfort and smoothness to the board’s handling. The assembly is tolerant of maneuvers and forgiving of support errors.",
        image: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-de%CC%81cra-2.png",
    },
    {
        ti: "https://afs-foiling.com/wp-content/uploads/2023/04/Plan_de_travail-1.png",
        text: "The cut-outs on the back of the board provide the stability and comfort of a wide-tail board. They reduce the wetted surface area when planning. There is less drag and therefore more speed at high revs.",
        image: "https://afs-foiling.com/wp-content/uploads/2023/04/ahd-fury-cut-out.jpg",
    },
    {
        ti: "https://afs-foiling.com/wp-content/uploads/2023/04/Plan_de_travail-2.png",
        text: "Thanks to its deep tuttle and carbon reinforcements, you can sail with any foil.",
        image: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-de%CC%81cra-5.png",
    },
    {
        ti: "https://afs-foiling.com/wp-content/uploads/2023/04/Plan_de_travail-3.png",
        text: "We follow a unique manufacturing process during which all layers of fabrics, reinforcements and housings are applied in a double-shell mold, then baked using a process that allows ideal polymerization of resins for perfect reproduction and an optimal weight/solidity ratio. The resin used for the construction of our boards is a biosourced epoxy SR GreenPoxy (more than 33% of the molecules come from plant sources). Carbon reinforcements are also added at strategic points on the board.",
        image: "https://afs-foiling.com/wp-content/uploads/2023/04/Capture-de%CC%81cra-7.png",
    },
];

// ... (rest of the file remains the same)

export default function FeatureSections() {
    return (
        <section className=" text-white w-full overflow-hidden">
            {featureData.map((item, index) => (
                <div
                    key={index}
                    // 1. KEEP the overall padding here to define the common boundary
                    className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                        } items-center justify-center gap-x-40 gap-y-40 md:px-40 py-16 md:py-24 relative`} // Keep px-6 md:px-20
                    style={{
                        // ... (background style remains the same)
                    }}
                >
                    {/* Text Section */}
                    <div className="flex-1 text-center max-w-xl z-10 flex flex-col items-center">
                        {/* The text section is fine, its max-w-xl constrains the text content inside flex-1 */}
                        <div className="flex justify-center mb-6">
                            <Image
                                src={item.ti}
                                alt="Feature title icon"
                                width={160}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-gray-300 text-lg w-full leading-relaxed">
                            {item.text}
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 z-10">
                        {/* 2. CRITICAL CHANGE: Use w-full and an aspect ratio (or a consistent height) 
                           to make the image wrapper responsive and fill its flex-1 space. 
                           Using 'aspect-video' or a set height will help. */}
                        <div className="relative w-full h-0 pb-[56.25%] md:pb-[45%] rounded-2xl overflow-hidden shadow-lg">
                            {/* 👆 w-full makes it fill flex-1. pb-[%] creates a responsive height/aspect ratio. */}
                            <Image
                                src={item.image}
                                alt="Feature visual"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}