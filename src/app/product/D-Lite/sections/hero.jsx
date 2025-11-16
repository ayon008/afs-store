"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DlitePage = () => {
  const captionRef = useRef(null);

  useEffect(() => {
    // Floating animation when in view
    gsap.fromTo(
      captionRef.current,
      { y: 0 },
      {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: captionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <>
      <style>{`
        .dlite-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 120px 0;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-direction: column;
        }

        .dlite-image {
          width: 110%;
          height: auto;
          object-fit: contain;
          object-position: center;
          margin-top: 18px;
          z-index: 1;
        }

        .dlite-heading {
          position: absolute;
          top: 14%;
          left: 50%;
          transform: translateX(-50%);
          font-family: "alliance no.2", sans-serif;
          font-size: 70px;
          font-weight: 700;
          line-height: 77px;
          color: rgb(17, 17, 17);
          text-align: center;
          max-width: 80%;
          z-index: 2;
        }

        /* Updated caption */
        .dlite-caption {
          position: absolute;
          bottom: 200px; /* pushed upward to overlap image */
          right: 80px;
          font-family: "alliance no.2", sans-serif;
          font-size: 20px;
          font-weight: 500;
          line-height: 22px;
          color: rgba(17, 17, 17, 0.75);
          max-width: 380px;
          text-align: right;
          z-index: 3;
        }

        @media (max-width: 1024px) {
          .dlite-section {
            padding: 80px 0;
            min-height: 90vh;
          }
          .dlite-heading {
            font-size: 50px;
            line-height: 56px;
            top: 15%;
            max-width: 90%;
          }
          .dlite-image {
            width: 95%;
            margin-top: 120px;
          }
          .dlite-caption {
            font-size: 18px;
            right: 20px;
            bottom: 80px;
            max-width: 80%;
            text-align: center;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 600px) {
          .dlite-section {
            padding: 60px 0;
            min-height: 80vh;
          }
          .dlite-heading {
            font-size: 28px;
            line-height: 34px;
            top: 12%;
            width: 90%;
            max-width: none;
          }
          .dlite-image {
            width: 100%;
            margin-top: 90px;
          }
          .dlite-caption {
            font-size: 16px;
            line-height: 22px;
            bottom: 40px;
            width: 90%;
            padding: 0 15px;
          }
        }
      `}</style>

      <section className="dlite-section">
        <h1 className="dlite-heading">
          The D-lite offers an incredibly light and intuitive navigation
          experience.
        </h1>

        <img
          src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-5-1-1536x762.png"
          alt="D-lite Wing"
          className="dlite-image"
        />

        <p className="dlite-caption" ref={captionRef}>
          Add to that soft handles for optimal safety, and you have the perfect
          wing to take with you everywhere,whether for summer or winter
          sessions.
        </p>
      </section>
    </>
  );
};

export default DlitePage;
