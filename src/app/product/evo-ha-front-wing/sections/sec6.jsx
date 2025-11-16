"use client";

export default function EvoAboutSection() {
  return (
    <section
      className="relative w-full h-[70vh] bg-[url('https://afs-foiling.com/wp-content/uploads/2025/05/5.-Carbon-1.png')] bg-cover bg-center bg-no-repeat text-white"
    >
      <div className="absolute bottom-10 left-6 md:left-12 lg:left-16 px-4 md:px-0 max-w-5xl">
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
          className="mb-4"
        >
          Built to fly, designed to last
        </h2>

        {/* Paragraph */}
        <p
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '21.6px',
            color: 'rgb(255, 255, 255)',
          }}
        >
          EVO HA wings are made from high-strength (HR) carbon, with <br /> HM
          reinforcement on the 750 for greater responsiveness and  <br />torsional
          rigidity. The goal: to offer a direct feel underfoot, a <br />crisp response
          in turns, and clean gliding without unnecessary <br />friction.  
          This is the essence of our composite expertise at the <br />service of your  ride.
        </p>
      </div>
    </section>
  );
}
