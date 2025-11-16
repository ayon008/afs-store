"use client";

import Link from "next/link";

export const SERVICE_SECTIONS = [
  {
    title: "Choose",
    items: [
      { text: "Foil configurator", link: "/service/foilconfigurator" },
      { text: "Best match stab", link: "/service/matchstab" },
      { text: "Comparator 3 stabs / front wing", link: "/service/comparestab" },
      { text: "Mast comparison", link: "/service/mastcomp" },
      { text: "Board construction", link: "#" },
      { text: "Equipment recovery", link: "/service/equipment-recovery" },
      { text: "Foil characteristics", link: "#" },
      { text: "Screw size", link: "#" },
    ],
  },
  {
    title: "Pay",
    items: [
      {
        text: "Payment options",
        link: "https://afs-foiling.crisp.help/fr/article/moyens-de-paiement-accepte-fyk5ip/?bust=1738253018539",
      },
    ],
  },
  {
    title: "Shipping and delivery",
    items: [
      {
        text: "Order tracking",
        link: "https://afs-foiling.crisp.help/fr/article/suivre-ma-commande-apz39g/",
      },
      {
        text: "Shipping and delivery",
        link: "https://afs-foiling.crisp.help/fr/article/comment-est-envoyee-ma-commande-1qx8cka/",
      },
      {
        text: "Returns",
        link: "https://afs-foiling.crisp.help/fr/article/politique-de-retour-comment-proceder-1p53ld4/",
      },
    ],
  },
  {
    title: "Repair and maintenance",
    items: [
      { text: "Support", link: "https://afs-foiling.crisp.help/fr/" },
      { text: "Service request", link: "#" },
      {
        text: "Warranty",
        link: "https://afs-foiling.crisp.help/fr/article/garantie-afs-duree-et-conditions-fnhfqg/?bust=1738253018543",
      },
      {
        text: "Instructions for use",
        link: "https://foilandco.sharepoint.com/sites/Market/Documents%20partages/Forms/AllItems.aspx?id=%2Fsites%2FMarket%2FDocuments%20partages%2FGeneral%2FContent%2FBrochure%2F2025%2FNOTICE%20AFS%5FFR%202%2Epdf&parent=%2Fsites%2FMarket%2FDocuments%20partages%2FGeneral%2FContent%2FBrochure%2F2025&p=true&ga=1",
      },
    ],
  },
  {
    title: "Contact",
    items: [
      { text: "Mail", link: "mailto:support@afs-foiling.com" },
      { text: "Whatsapp", link: "wa.me/33782296241" },
      { text: "Book a call with an AFS expert", link: "#" },
      { text: "Come visit us", link: "#" },
      { text: "Events", link: "/service/events" },
      { text: "Blog", link: "/blog" },
    ],
  },
  {
    title: "Team",
    items: [
      { text: "Work team", link: "/service/team" },
      { text: "Ambassadors", link: "/ambassadeur-afs" },
      { text: "Map retailers", link: "#" },
    ],
  },
];

export default function ServiceSubbar({ topOffset, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="fixed top-0 left-0 bg-white border-t border-gray-300 py-8 px-10 w-full z-50 shadow-xl transition-all duration-200"
      style={{ top: `${topOffset}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Main row - evenly spaced columns */}
      <div className="flex justify-between max-w-[1200px] mx-auto gap-8">
        {SERVICE_SECTIONS.map((section, idx) => (
          <div key={idx} className="flex flex-col min-w-[160px]">
            <h3
              className="mb-3"
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "22px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "rgba(17, 17, 17, 0.75)",
              }}
            >
              {section.title}
            </h3>
            <div className="flex flex-col gap-4">
              {section.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.link}
                  className="transition-all duration-200 hover:font-medium"
                  style={{
                    fontFamily: '"alliance no.2", sans-serif',
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "21.6px",
                    color: "rgb(17, 17, 17)",
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Divider + Visit link */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <Link
          href="https://www.afs-foiling.com/factory"
          target="_blank"
          className="transition-all duration-200 hover:opacity-80"
          style={{
            fontFamily: '"Alliance No.2"',
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "16px",
            color: "rgba(17, 17, 17, 0.75)",
          }}
        >
          Visit the factory
        </Link>
      </div>
    </div>
  );
}
