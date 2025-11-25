"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BlogContent = ({ blog }) => {

    const contentRef = useRef(null);
    const [heading, setHeadings] = useState([]);
    const blogRef = useRef(null);
    const prevHeadingsRef = useRef([]);
    const [activeId, setActiveId] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const stickyRef = useRef(null);

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

    // Added Animation
    useEffect(() => {
        if (!stickyRef.current || !contentRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(stickyRef.current, {
                scrollTrigger: {
                    trigger: stickyRef.current,
                    start: "top 200px",
                    endTrigger: contentRef.current,
                    end: `bottom bottom`,
                    pin: true,
                    scrub: false,
                    pinSpacing: true,
                }
            });
        }, stickyRef);
        return () => ctx.revert();
    }, []);

    // Track active heading and read aloud using GSAP
    useEffect(() => {
        if (!contentRef.current || heading.length === 0 || clickedId) return;

        const headingElements = Array.from(contentRef.current.querySelectorAll("h2"));

        const ctx = gsap.context(() => {
            headingElements.forEach((h) => {
                if (!h.id) return;

                // Create ScrollTrigger for each h2 to detect when it reaches middle of viewport
                ScrollTrigger.create({
                    trigger: h,
                    start: "top top", // When h2 center reaches viewport center
                    end: "top top",
                    onEnter: () => {
                        setActiveId(h.id);
                        setClickedId(null);
                    },
                    onEnterBack: () => {
                        setActiveId(h.id);
                        setClickedId(null);
                    },
                    markers: false
                });
            });
        }, contentRef);

        return () => ctx.revert();
    }, [heading, clickedId]);

    // Handle navigation click - only change clicked state, don't affect scroll tracking
    const handleNavClick = (id) => {
        setClickedId(id);
        setActiveId(null);
    };

    // When a user manually scrolls/uses touch/keyboard, clear the clicked state
    useEffect(() => {
        if (!clickedId) return;

        const clearClicked = () => {
            setClickedId(null);
        };

        const onKeyDown = (e) => {
            // common navigation keys that indicate user scroll intent
            const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
            if (keys.includes(e.key)) clearClicked();
        };

        window.addEventListener('wheel', clearClicked, { passive: true });
        window.addEventListener('touchstart', clearClicked, { passive: true });
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('wheel', clearClicked);
            window.removeEventListener('touchstart', clearClicked);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [clickedId]);

    // console.log(activeId);


    //  Content
    const content = blog?.content?.rendered;


    // {h.id === activeId ? <ArrowRight className='inline mb-1' size={'1.2rem'} /> : <></>}

    return (
        <section ref={blogRef} className='max-w-[1600px] mx-auto flex gap-10 blog-section'>
            {/* Navigation */}
            <div className='w-72 h-fit' ref={stickyRef}>
                <ul className="space-y-6">
                    {
                        heading.map((h, i) => {
                            // If something is clicked, show only clicked item as active
                            // Otherwise show scroll-based activeId
                            const isActive = clickedId ? h.id === clickedId : h.id === activeId;
                            return (
                                <li key={h.id} className={`${isActive ? 'text-black' : 'text-black/40'} menu-items transition-colors`}>
                                    <a
                                        href={`#${encodeURIComponent(h.id)}`}
                                        onClick={() => handleNavClick(h.id)}
                                        className={`uppercase  hover:text-black leading-[100%] text-base font-bold`}
                                    >
                                        {isActive ? <ArrowRight className='inline mb-1 mr-2' size={'1.2rem'} /> : <></>}
                                        {h.text}
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            {/* Main Blog */}
            <div className='flex-1 global-margin'>
                <article ref={contentRef}>
                    <div
                        className='prose lg:text-[22px] text-[19px] font-semibold leading-[120%] prose-h2:pb-2 prose-h2:pt-2 prose-h1:text-4xl prose-headings:scroll-mt-2 prose-img:my-8 
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