import React, { useState } from "react";

// Define the structure for the FAQ data
const faqData = [
  {
    question: "HOW CAN I BE SURE I'M ORDERING THE RIGHT SIZE?",
    answer:
      "Depending on your size/practice, you'll find different information on the sheets presenting our ranges directly. If you have the slightest doubt, a team of enthusiasts and practitioners is at your disposal via the website chat (blue logo) at the bottom of your screen.",
  },
  {
    question: "WHERE ARE WE LOCATED?",
    answer:
      "We are proudly based in the heart of Europe, with our main offices and logistics hub operating from Poland. Our distribution network covers over 50 countries worldwide.",
  },
  {
    question: "WHERE ARE THE PRODUCTS MADE?",
    answer:
      "Our equipment is designed in France and manufactured across specialized facilities in Portugal and Vietnam, ensuring the highest standards of quality and ethical labor practices. We maintain strict quality control at every stage.",
  },
  {
    question: "HOW LONG DOES DELIVERY TAKE?",
    answer:
      "Unless otherwise indicated, all materials shown are in stock. Delivery takes place within 48 hours of the order being placed.",
  },
  {
    question: "HOW IS MY ORDER SHIPPED?",
    answer:
      "All our products are packed in reinforced cardboard boxes. We ship all over the world, with occasional shifts between private distribution, boat and plane... The whole unit is protected with various types of foam.",
  },
  {
    question: "WHAT SHOULD I DO IF I HAVE RECEIVED A FAULTY ORDER?",
    answer:
      "Please contact our support team immediately by email or phone. We will guide you through our return process and arrange for a replacement or refund as quickly as possible, usually within 3-5 business days of receiving the faulty item back.",
  },
  {
    question:
      "I HAVE AFS EQUIPMENT AND WOULD LIKE IT BACK. ARE YOU MAKING TAKEOVER BIDS?",
    answer:
      "We occasionally offer trade-in programs for legacy AFS gear. Please submit a request through our dedicated Buy-Back form with detailed photos and condition reports of your equipment for an evaluation. Eligibility depends on current stock levels and model condition.",
  },
  {
    question: "WHERE CAN I SEE/TEST THE EQUIPMENT?",
    answer:
      "We partner with several authorized dealers globally who have testing centers. Check the 'Dealer Locator' section on our website to find the nearest location where you can view and test our latest range.",
  },
];

// Reusable FAQ Item Component
const FAQItem = ({ faq, isOpen, toggleFAQ }) => {
  return (
    <div className="py-5 border-b border-gray-300">
      <button
        className="flex justify-between items-start w-full text-left focus:outline-none"
        onClick={toggleFAQ}
      >
        {/* Question Text */}
        <span
          className="uppercase font-semibold text-[18px] leading-[19.8px]"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            color: "rgba(17, 17, 17, 0.698)",
          }}
        >
          {faq.question}
        </span>

        {/* Custom SVG Icon */}
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6H12C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9V19M15 19L11 15M15 19L19 15" stroke="#333333" strokeWidth="2" strokeLinecap="square"></path></svg>
      </button>

      {/* Answer Section */}
      {isOpen && (
        <div className="pt-4">
          <p
            className="text-[18px] leading-[21.6px] font-medium"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              color: "rgba(17, 17, 17, 0.698)",
            }}
          >
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

// Main Component
const App = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 pt-16 pb-32">
        {/* Header */}
        <h1
          className="text-center mb-16 uppercase"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "50px",
            fontWeight: 700,
            lineHeight: "55px",
            color: "rgb(17, 17, 17)",
          }}
        >
          F.A.Q.
        </h1>

        {/* FAQ Container */}
        <div className=" p-8 md:p-12 ">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleFAQ={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
