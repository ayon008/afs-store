"use client";

export default function EvoAboutSection() {
  return (
    <section
      className="relative w-full h-[80vh] bg-[url('https://afs-foiling.com/wp-content/uploads/2025/05/5.-Carbon-1.png')] bg-cover bg-center bg-no-repeat text-white"
    >
      <div className="absolute bottom-10 left-6 md:left-12 lg:left-16 px-4 md:px-0 max-w-6xl">
        {/* Flag and Label */}
        <div className="flex items-center space-x-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 0.5H20V15.5H13V0.5Z"
              fill="#F50100"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.5H7V15.5H0V0.5Z"
              fill="#2E42A5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 0.5H13V15.5H7V0.5Z"
              fill="#F7FCFF"
            />
          </svg>
          <span
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Made in France
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            fontSize: '50px',
            fontWeight: 700,
            lineHeight: '55px',
            color: 'rgb(255, 255, 255)',
          }}
          className="mb-6"
        >
          Built to fly, designed to last
        </h2>

        {/* Paragraphs side by side */}
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0">
          {/* Left paragraph */}
          <p
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '26px',
              color: 'rgb(255, 255, 255)',
            }}
            className="md:w-1/2"
          >
            With its full carbon construction and carefully positioned
            reinforcements, the Blackbird V3 offers an exceptional
            weight-to-stiffness ratio. <br />
            <br />
           
          </p>

          {/* Right paragraph */}
          <p
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '26px',
              color: 'rgb(255, 255, 255)',
            }}
            className="md:w-1/2"
          >
            You will feel every nuance of the water beneath your feet, allowing
            for precise maneuvers and unmatched speeds, whether in competition
            or downwind sessions, or wingfoiling in light winds. <br />
            
          </p>
        </div>
      </div>
    </section>
  );
}
