import EventCard from "../../../components/EventCard";
import AFSEventsHero from "./hero";

const imageEvents = [
  <EventCard
    key="1"
    title="AFS Days Lorient"
    subtitle="OSSS6"
    country="France"
    city="Lorient"
    startDate="May 9 2025"
    endDate="May 10 2025"
    countryFlag={<span className="inline-block align-middle">🇫🇷</span>}
  />,
  <EventCard
    key="2"
    title="AFS DAYS CLINIQUE DE LA PLANCHE"
    country="France"
    startDate="April 5 2025"
    endDate="April 6 2025"
    countryFlag={<span className="inline-block align-middle">🇫🇷</span>}
  />,
  <EventCard
    key="3"
    title="VIKWING 2025"
    country="France"
    city="Ouistreham"
    startDate="May 2 2025"
    endDate="May 4 2025"
    countryFlag={<span className="inline-block align-middle">🇫🇷</span>}
  />,
  <EventCard
    key="4"
    title="National de Printemps Windfoil 2025"
    country="France"
    city="Brest"
    startDate="April 17 2025"
    endDate="April 20 2025"
    countryFlag={<span className="inline-block align-middle">🇫🇷</span>}
  />,
  <EventCard
    key="5"
    title="Roca Cup"
    country="France"
    city="Hyères"
    startDate="April 4 2025"
    endDate="April 6 2025"
    countryFlag={<span className="inline-block align-middle">🇫🇷</span>}
  />,
];

export default function AfsEvents() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Hero Section */}
      <AFSEventsHero />

      {/* Events Layout */}
      <div className="flex mx-auto pt-6 py-3 space-x-4">
        {/* Left Sidebar/Event List Area */}
        <div className="min-h-screen p-6 ml-8 bg-[#111111] text-white overflow-y-auto shadow-none">
          {/* Country Select Dropdown */}
          <div className="mb-8">
            <select className="w-full p-2 bg-[#2e2e2e] border border-[#2e2e2e] text-white appearance-none rounded-none cursor-pointer">
              <option>Choisir un pays</option>
              <option>France</option>
            </select>
          </div>

          {/* Title */}
          <h1
            className="mb-6"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "50px",
              fontWeight: 600,
              lineHeight: "55px",
              color: "rgb(255, 255, 255)",
            }}
          >
            Number Of Shops:
          </h1>

          {/* Event List Container */}
          <div className="space-y-4">{imageEvents}</div>
        </div>

        {/* Right Content Area (Map or Placeholder) */}
        <div className="flex-grow flex items-center justify-center p-6 bg-[#f0f0f0] text-gray-700">
          <div className="text-center max-w-md">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <p className="text-lg font-semibold mb-2">
              Petit problème. Une erreur s&apos;est produite
            </p>
            <p className="text-sm text-gray-500">
              Google Maps ne s&apos;est pas chargé correctement sur cette page. Pour
              plus d&apos;informations techniques sur cette erreur, veuillez consulter
              la console JavaScript.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors">
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.735-1.493L2 19l2.453-3.066A9.098 9.098 0 0110 13c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7h2c0-2.76 2.69-5 6-5s6 2.24 6 5z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
}
