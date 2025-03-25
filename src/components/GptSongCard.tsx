import React from "react";
import moment from "moment";

const GptSongCard = ({ data }) => {
  const { snippet } = data;
  const { title, thumbnails, channelTitle } = snippet;

  return (
    <div className="md:w-80 md:h-72 w-50 h-50 shadow-lg p-2 m-2 cursor-pointer group hover:bg-green-500 hover:scale-105 transform transition-all duration-300 ease-in-out">
      <img
        alt="thumbnail"
        src={thumbnails.medium.url}
        className="hover:rounded-none rounded-lg"
      />
      <div className="pt-2">
        <p className="font-bold text-sm pb-1 overflow-hidden text-ellipsis line-clamp-2">
          {title}
        </p>
      </div>
      <div className="text-gray-600 text-xs">
        <p>{channelTitle}</p>
        <div className="flex gap-2">
          {/* <p>{statistics.viewCount} views •</p> */}
          <p>{moment(snippet.publishedAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default GptSongCard;
