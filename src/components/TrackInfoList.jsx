import React from "react";
import SongCard from "./SongCard";
import VideoCard from "./VideoCard";
import GptSongCard from "./GptSongCard";
import { Link } from "react-router";
import ShimmerCard from "./ShimmerCard";

const TrackInfoList = ({ title, trackList }) => {
  return (
    <div className="bg-gray-200 mb-2 p-2 rounded-md">
      <h1 className="font-bold text-lg text-black">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-2 rounded-lg ">
          {trackList?.length > 0 || trackList === undefined || null ? (
            <ShimmerCard />
          ) : (
            trackList?.map((item) => (
              <Link
                key={item.id.videoId}
                to={"/browse/watch?v=" + item.id.videoId}
              >
                <GptSongCard data={item} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackInfoList;
