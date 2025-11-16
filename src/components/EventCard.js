
export default function EventCard({
    title,
    subtitle,
    country,
    city,
    countryFlag,
    startDate,
    endDate,
    key
}) {
    const formattedStart = new Date(startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const formattedEnd = new Date(endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="flex flex-col rounded-md bg-gray-100 text-white p-3" key={key}>
            <div className="flex items-center gap-2">
                <span className="font-bold text-black text-2xl">{title}</span>

                <span className="text-black text-4xl">|</span>
                <span className="font-bold text-black text-2xl">{subtitle}</span>
            </div>

            <div className="flex gap-2 mt-2 text-sm">
                <div className="flex items-center gap-1 bg-gray-200 px-2 py-0.5 rounded-full">
                    <span className="text-lg">{countryFlag}</span>
                    <span className="text-black">{country} {city}</span>
                </div>

                <div className="flex items-center gap-1 bg-gray-200 px-2 py-0.5 rounded-full text-black">
                    <span>{formattedStart}</span>
                    <span>→</span>
                    <span>{formattedEnd}</span>
                </div>
            </div>
        </div>
    );
}
