import React from "react";

const SuggestionShimmer = () => {
  const dummy = ["1", "2", "3", "4", "5", "6"];
  return (
    <div className="absolute bg-white w-[90%] mt-10 z-50 max-h-60 rounded-lg shadow-lg overflow-y-auto">
      {dummy?.map((index) => (
        <div key={index} className="block p-2 hover:bg-gray-200">
          <div
            key={index}
            className=" p-2 mx-2 h-6 bg-gray-300 animate-pulse"
          />
        </div>
      ))}
    </div>
  );
};

export default SuggestionShimmer;
