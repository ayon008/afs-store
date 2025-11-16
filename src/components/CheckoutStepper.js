"use client";

// A simple check icon component
const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17L4 12" />
  </svg>
);

export default function CheckoutStepper({ steps, currentStep, onStepClick }) {
  const activeColor = "#1d98ff";

  return (
    <div className="w-full flex items-start mb-8 px-4 sm:px-8">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        let circleClasses = "bg-white border-2 ";
        let textClasses = "font-medium ";

        if (isCurrent) {
          circleClasses += "border-[#1d98ff] bg-[#1d98ff] text-white";
          textClasses += "text-[#1d98ff]";
        } else if (isCompleted) {
          circleClasses += "border-[#1d98ff] bg-[#1d98ff] text-white";
          textClasses += "text-gray-800";
        } else {
          circleClasses += "border-gray-400 text-gray-400";
          textClasses += "text-gray-400";
        }

        return (
          <div key={step.id} className="flex items-start flex-1 relative">
            {/* Step Circle & Text */}
            <button
              type="button"
              onClick={() => onStepClick(step.id)}
              className="flex flex-col items-center w-full z-10"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold transition-colors ${circleClasses}`}
                style={
                  isCurrent || isCompleted
                    ? { backgroundColor: activeColor, borderColor: activeColor, color: "white" }
                    : {}
                }
              >
                {isCompleted ? <CheckIcon /> : step.id}
              </div>
              <span
                className={`mt-2 text-xs text-center px-1 ${textClasses} md:whitespace-nowrap`}
                style={isCurrent ? { color: activeColor } : {}}
              >
                {step.name}
              </span>
            </button>

            {/* Long Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1 z-0">
                <div
                  className={`w-full bg-black h-1`} // Always black
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
