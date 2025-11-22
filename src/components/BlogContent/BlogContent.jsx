// "use client"
// import { ArrowRight } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react';

// const BlogContent = ({ blog }) => {
//     // Content
//     const content = blog?.content?.rendered;
//     const [headings, setHeadings] = useState([]);
//     const [activeId, setActiveId] = useState(null);
//     const [isSticky, setIsSticky] = useState(false);
//     const tocRef = useRef(null);
//     const contentRef = useRef(null);
//     const sentinelRef = useRef(null);
//     const prevHeadingsRef = useRef([]);



//     // Observe heading intersections whenever headings list changes
//     useEffect(() => {
//         if (!contentRef.current || headings.length === 0) return;
//         const headingElements = Array.from(contentRef.current.querySelectorAll("h2"));
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
//     }, [headings]);

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
//         //  {/* BLOG CONTENT SECTION */ }
//         <section className="max-w-[1600px] px-8 lg:mt-[120px] mt-20">
//             {/* Outer wrapper that defines sticky bounds */}
//             <div className="flex flex-col lg:flex-row items-start gap-12" >
//                 <div className='w-72 sticky top-24'>
//                     <aside
//                         id="toc"
//                     >
//                         <ul className="space-y-6  border-gray-200">
//                             {headings.map((h) => (
//                                 // <li key={h.id} className="text-sm text-gray">
//                                 //     <a
//                                 //         href={`#${h.id}`}
//                                 //         className={`block transition-all duration-300 hover:text-blue-600 hover:font-semibold ${activeId === h.id
//                                 //             ? "text-blue-700 font-semibold border-blue-700 border-l-2 -ml-[5px] pl-[3px]"
//                                 //             : "text-gray-800 font-medium text-[18px]"
//                                 //             }`}
//                                 //     >
//                                 //         {h.text}
//                                 //     </a>
//                                 // </li>

//                             ))}
//                         </ul>
//                     </aside>
//                 </div>
//                 {/* MAIN BLOG CONTENT */}
//                 <div className="flex-1 min-w-0">
//                     <article ref={contentRef}>
//                         <div
//                             className='prose prose-2xl prose-h2:pb-2 prose-h2:pt-2 prose-h1:text-4xl prose-headings:scroll-mt-32 prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8 
//                     prose-table:border prose-table:rounded-lg prose-table:shadow-lg prose-th:font-extrabold prose-th:bg-blue-50 prose-td:p-3 prose-table:w-full 
//                     prose-a:text-blue-600 hover:prose-a:text-blue-800
//                     prose-headings:text-gray-900'
//                             dangerouslySetInnerHTML={{ __html: content }}
//                         />
//                     </article>

//                     {/* sentinel div that defines where sticky TOC stops */}
//                     <div id="toc-end" ref={sentinelRef} className="h-[1px] mt-32" />
//                 </div>
//             </div >
//         </section>
//     );
// };

// export default BlogContent;


"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const BlogContent = ({ blog }) => {

    const contentRef = useRef(null);
    const [heading, setHeadings] = useState([]);
    const prevHeadingsRef = useRef([]);
    const [activeId, setActiveId] = useState(null);


    // Added Id to all h2
    useEffect(() => {
        if (!contentRef.current) return;

        // Assign IDs from h2 text and update headings state only when changed.
        const assignHeadingIds = () => {
            const headingElements = Array.from(contentRef.current.querySelectorAll("h2"));
            const newHeadings = headingElements.map((h) => ({
                // Use the raw heading text as the id (trimmed)
                id: h.textContent.trim(),
                text: h.textContent,
            }));

            // Assign IDs to all h2 elements (idempotent)
            headingElements.forEach((h, i) => {
                const newId = newHeadings[i].id;
                if (h.id !== newId) h.id = newId;
            });

            // Compare with previous headings to avoid unnecessary state updates and re-renders
            const prev = prevHeadingsRef.current;
            const isSame =
                prev.length === newHeadings.length &&
                prev.every((p, i) => p.id === newHeadings[i].id && p.text === newHeadings[i].text);

            if (!isSame) {
                prevHeadingsRef.current = newHeadings;
                setHeadings(newHeadings);
            }
        };

        // Try once immediately (content may already be present)
        assignHeadingIds();

        // Observe for DOM insertion (e.g. HTML inserted by dangerouslySetInnerHTML)
        const mutObserver = new MutationObserver(() => {
            assignHeadingIds();
        });
        mutObserver.observe(contentRef.current, { childList: true, subtree: true });

        return () => mutObserver.disconnect();
    }, [blog]);


    useGSAP()


    //  Content
    const content = blog?.content?.rendered;
    return (
        <section className='max-w-[1600px] mx-auto flex gap-10 lg:mt-[120px] mt-20 px-8'>
            {/* Navigation */}
            <div className='w-72 sticky top-24 h-fit'>
                <ul className="space-y-6">
                    {
                        heading.map((h, i) =>
                            <li key={h.id} className=''>
                                <a href={`#${encodeURIComponent(h.id)}`} className={`uppercase leading-[100%] text-base font-bold text-black/40 hover:text-black`}>{activeId ? <ArrowRight className='inline' /> : <></>} {h.text}</a>
                            </li>
                        )
                    }
                </ul>
            </div>

            {/* Main Blog */}
            <div className='flex-1 min-h-[2000px] global-margin'>
                <article ref={contentRef}>
                    <div
                        className='prose lg:text-[22px] text-[19px] font-semibold leading-[120%] prose-h2:pb-2 prose-h2:pt-2 prose-h1:text-4xl prose-headings:scroll-mt-32 prose-img:my-8 
                prose-table:border prose-table:rounded-lg prose-table:shadow-lg prose-th:font-extrabold prose-th:bg-blue-50 prose-td:p-3 prose-table:w-full 
                prose-a:font-bold
                prose-a:text-blue-600 hover:prose-a:text-blue-800
                prose-headings:text-gray-900'
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </article>
            </div>
        </section>

    );
};

export default BlogContent;