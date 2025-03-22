import React from "react";

const ShimmerCard = () => {
  const dummy = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <>
      {dummy.map((index) => (
        <div
          key={index}
          className="w-80 h-72 shadow-lg p-2 m-2 bg-gray-100 rounded-lg overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>

          <div className="w-full h-48 bg-gray-400 rounded-lg mb-4"></div>

          <div className="w-3/4 h-6 bg-gray-400 rounded mb-2"></div>

          <div className="w-full h-4 bg-gray-400 rounded"></div>
        </div>
      ))}
    </>
  );
};

export default ShimmerCard;
