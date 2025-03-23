import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router";
import ShimmerCard from "./ShimmerCard";
import { useDispatch } from "react-redux";
import { setHomePageFlag } from "../store/slices/configSlice";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
    dispatch(setHomePageFlag(true));
    return () => {
      dispatch(setHomePageFlag(false));
    };
  }, []);

  const getVideos = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_API + "trending song music video india"
    );
    const json = await data.json();
    setVideos(json.items);
  };

  return (
    // <div className="flex flex-row justify-center flex-wrap overflow-y-auto h-screen pt-20">
    <div className="bg-gradient-to-t pt-20 from-black h-screen overflow-y-scroll">
      <div className="bg-white mx-40 my-2 rounded-lg p-4 flex flex-row justify-center flex-wrap">
        {videos?.length === 0 ? (
          <ShimmerCard />
        ) : (
          videos?.map((video) => (
            <Link
              key={video.id.videoId}
              to={"/browse/watch?v=" + video.id.videoId}
              onClick={() => dispatch(setHomePageFlag(false))}
            >
              <VideoCard info={video} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
