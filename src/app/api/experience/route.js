// app/api/experience/route.js

export const GET = async () => {
  const data = [
    {
      heading: "Rarity in Luxury",
      body: "At Alpago, we redefine rarity with our collection of limited-edition artworks and bespoke designs. Each customized furnishing is a testament to individuality, turning your home into a masterpiece that reflects the essence of your life.",
      image: "/images/experience/1.webp",
    },
    {
      heading: "Pioneering New Standards",
      body: "We aren’t just setting trends, we are breaking new records in luxury living. From innovative amenities to trendsetting features, we are constantly creating an exceptional environment for you, your family, and your prized possessions.",
      image: "/images/experience/2.webp",
    },
    {
      heading: "Innovation with Exclusivity",
      body: "Step into the future with Alpago, where luxury and technology converge. Our advanced automation systems ensure effortless convenience and accessibility, elevating your smart living experience to new heights.",
      image: "/images/experience/3.webp",
    },
  ];

  return Response.json(data);
};
