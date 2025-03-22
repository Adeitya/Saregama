import React from "react";

const SongCard = ({ data }) => {
  const { snippet } = data;
  const { title, thumbnails, description } = snippet;

  return (
    <div className="flex gap-2 p-1 m-1 bg-gray-100 rounded-lg cursor-pointer group hover:bg-green-500 hover:scale-103 hover:text-white transform transition-all duration-300 ease-in-out">
      <img alt="logo" src={thumbnails?.default?.url} />
      <div className="flex flex-col justify-center">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SongCard;
