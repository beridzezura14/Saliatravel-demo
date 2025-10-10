import React from "react";

export default function RequireCard({ requireItem, index }) {
  return (
    <div className="bg-white flex just gap-4">
      {/* Left timeline */}
      <div className="flex flex-col items-center mt-[6px]">
        {/* Circle */}
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        {/* Vertical line stretched */}
        <div className="w-[3px] flex-1 bg-primary mt-2"></div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {requireItem.head && (
          <h3 className="text-xl font-bold mb-2 font-caps text-primary">
            {`${index + 1}. ${requireItem.head}`}
          </h3>
        )}

        <ul className="list-disc pl-5 space-y-2 text-black leading-[20px]">
          {requireItem.answer?.map((ans, i) => (
            <li key={i}>
              {requireItem.fullAnswer?.[i] ? (
                <span className="text-gray-800 font-bold">
                  {ans}
                  <span className="text-gray-800 font-semibold">:</span>{" "}
                  <span className="font-normal">{requireItem.fullAnswer[i]}</span>
                </span>
              ) : (
                <span className="text-gray-800 font-semibold">{ans}</span>
              )}
            </li>
          ))}

          {(!requireItem.answer || requireItem.answer.length === 0) &&
            requireItem.fullAnswer?.map((ans, i) => (
              <li key={i} className="font-normal ">
                {ans}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
