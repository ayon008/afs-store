// "use client";

// import { dummyBlogs } from "@/dummyData/dummyBlogs";
// import { ArrowRight, Bookmark, Calendar } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// // ✅ SSR-safe date formatter (avoids hydration mismatch)
// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
// };


// // featured,
// // Post title
// // author
// // published date
// // h2 of page


// export default function BlogDetail({ params }) {


//     // this is the comment I am writting just to push this to github
//     const { slug } = params;
//     console.log(slug,'slug');

//     const blog = dummyBlogs.find((b) => b.slug === slug);

//     const [headings, setHeadings] = useState([]);
//     const [activeId, setActiveId] = useState(null);
//     const [isSticky, setIsSticky] = useState(false);
//     const tocRef = useRef(null);
//     const contentRef = useRef(null);
//     const sentinelRef = useRef(null);

//     useEffect(() => {
//         if (!contentRef.current) return;

//         // Collect h2 headings
//         const headingElements = Array.from(contentRef.current.querySelectorAll("h2"));
//         const newHeadings = headingElements.map((h) => ({
//             id:
//                 h.id ||
//                 h.textContent
//                     .toLowerCase()
//                     .replace(/[^\w\s-]/g, "")
//                     .replace(/\s+/g, "-"),
//             text: h.textContent,
//         }));

//         headingElements.forEach((h, i) => {
//             if (!h.id) h.id = newHeadings[i].id;
//         });
//         setHeadings(newHeadings);

//         // Observe heading intersection for active section highlight
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) setActiveId(entry.target.id);
//                 });
//             },
//             { rootMargin: "-25% 0px -70% 0px" }
//         );
//         headingElements.forEach((el) => observer.observe(el));
//         return () => observer.disconnect();
//     }, [blog]);

//     // ✅ Observe the content container to toggle sticky state
//     useEffect(() => {
//         const content = contentRef.current;
//         const sentinel = sentinelRef.current;
//         if (!content || !sentinel) return;

//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 setIsSticky(entry.isIntersecting);
//             },
//             { root: null, threshold: 0 }
//         );

//         observer.observe(content);
//         return () => observer.disconnect();
//     }, []);

//     if (!blog) {
//         return (
//             <div className="max-w-3xl mx-auto p-10 text-center bg-[#f4f4f4] min-h-screen">
//                 <h1 className="text-3xl font-bold mb-4">Blog not found 😢</h1>
//                 <Link
//                     href="/blog"
//                     className="text-blue-600 hover:text-blue-800 underline flex items-center justify-center gap-2"
//                 >
//                     <ArrowRight size={16} className="rotate-180" /> Back to blogs
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full bg-white min-h-screen relative">
//             {/* HERO SECTION */}
//             <header className="relative h-screen w-full flex items-end justify-center overflow-hidden">
//                 <Image
//                     src={blog.imageUrl}
//                     alt={blog.title}
//                     width={800}
//                     height={500}
//                     className="w-full h-auto object-cover"
//                 />
//                 <div className="absolute bottom-50 z-10 max-w-4xl w-full p-8 text-white text-left mb-20">
//                     <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
//                         {blog.title}
//                     </h1>

//                     <div className="flex justify-center gap-6 text-sm font-medium">
//                         <span className="flex items-center gap-2">
//                             <Calendar size={18} /> {formatDate(blog.date)}
//                         </span>
//                         <span className="flex items-center gap-2 text-yellow-400">
//                             <Bookmark size={18} fill="currentColor" />{" "}
//                             {blog.slug.toUpperCase().replace("-", " ")}
//                         </span>
//                     </div>
//                 </div>
//             </header>

//             {/* BLOG CONTENT SECTION */}
//             <section className="relative max-w-7xl mx-auto py-16 px-6 md:px-10">
//                 {/* Outer wrapper that defines sticky bounds */}
//                 <div className="flex flex-col lg:flex-row items-start gap-12 relative">

//                     {/* TOC SIDEBAR */}
//                     <aside
//                         id="toc"
//                         className="hidden lg:block w-72 pr-8 sticky top-24 self-start"
//                     >
//                         <h3 className="uppercase text-base mb-4 font-bold text-gray-800 tracking-wider">
//                             Table of Contents
//                         </h3>
//                         <ul className="space-y-4 border-l-2 border-gray-200 pl-5">
//                             {headings.map((h) => (
//                                 <li key={h.id} className="text-sm text-gray">
//                                     <a
//                                         href={`#${h.id}`}
//                                         className={`block transition-all duration-300 hover:text-blue-600 hover:font-semibold ${activeId === h.id
//                                             ? "text-blue-700 font-semibold border-blue-700 border-l-2 -ml-[5px] pl-[3px]"
//                                             : "text-gray-800 font-medium text-[18px]"
//                                             }`}
//                                     >
//                                         {h.text}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </aside>

//                     {/* MAIN BLOG CONTENT */}
//                     <div className="flex-1 min-w-0">
//                         <article ref={contentRef}>
//                             <div
//                                 className="prose prose-2xl max-w-none 
//                      prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-h2:pt-2 prose-h2:font-bold 
//                      prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8 
//                      prose-table:border prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-lg prose-th:font-extrabold prose-th:bg-blue-50 prose-td:p-3 prose-table:w-full 
//                      prose-a:text-blue-600 hover:prose-a:text-blue-800 
//                      prose-headings:text-gray-900 prose-headings:scroll-mt-32"
//                                 dangerouslySetInnerHTML={{ __html: blog.fullDescription }}
//                             />
//                         </article>

//                         {/* sentinel div that defines where sticky TOC stops */}
//                         <div id="toc-end" className="h-[1px] mt-32" />
//                     </div>
//                 </div>
//             </section>


//             {/* FLOATING HELP BUTTON */}
//             <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl z-50 transition transform hover:scale-105">
//                 💬 Help
//             </button>
//         </div>
//     );
// }


import React from 'react';

const page = async ({ params }) => {
    const { slug } = params;
    const response = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/posts?slug=${slug}`);
    const data = await response.json();
    const blog = data[0];
    console.log(blog);
    
    return (
        <div>

        </div>
    );
};

export default page;
