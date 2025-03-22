import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { YOUTUBE_VIDEO_ID } from "../utils/constants";
import moment from "moment";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoDetail, setVideoDetails] = useState();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getVideoDetail();
  }, []);

  const getVideoDetail = async () => {
    const data = await fetch(YOUTUBE_VIDEO_ID + searchParams.get("v"));
    const json = await data.json();
    setVideoDetails(json.items[0]);
    console.log(json);
  };
  return (
    <div className="bg-gradient-to-t pt-20 from-black h-screen overflow-y-scroll">
      <div className="flex flex-col items-center bg-white mx-40 my-2 rounded-lg p-4">
        <div className="flex">
          <iframe
            width="939"
            height="528"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?autoplay=1&modestbranding=1&showinfo=0&fs=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&cc_load_policy=0&autohide=1"
            }
            title="Youtube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        {videoDetail && (
          <div className="pt-2 w-[85%]">
            <p className="font-bold text-lg overflow-hidden text-ellipsis line-clamp-2">
              {videoDetail?.snippet?.title}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  alt="profile"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOW34PFNB2wJ1Hf5AP88UYB4d-LDcOsC7i4g&s"
                  className="h-9"
                />
                <p className="font-bold">
                  {videoDetail?.snippet?.channelTitle}
                </p>
              </div>
              <button className="flex bg-gray-200 p-2 rounded-full font-medium">
                <img
                  alt="like"
                  src="https://cdn-icons-png.flaticon.com/128/2107/2107783.png"
                  className="h-5 mr-1"
                />
                {videoDetail?.statistics?.likeCount}
              </button>
            </div>
            <div className="bg-gray-200 mt-4 p-4 rounded-lg">
              <div className="flex font-medium flex-wrap">
                <p>{videoDetail?.statistics?.viewCount} views •</p>
                <p>{moment(videoDetail?.snippet?.publishedAt).fromNow()}</p>
                {videoDetail?.snippet?.tags?.map(
                  (tag, index) =>
                    index < 5 && (
                      <span key={index} className="px-1 text-gray-600">
                        {"#" + tag}
                      </span>
                    )
                )}
              </div>
              <div>
                <p>
                  {videoDetail?.snippet?.description
                    ?.split("\n")
                    ?.map((item, index) =>
                      !showMore ? (
                        index < 3 && (
                          <span key={index} className="block my-2">
                            {item}
                          </span>
                        )
                      ) : (
                        <span key={index} className="block my-2">
                          {item}
                        </span>
                      )
                    )}
                </p>
              </div>
              <span
                className="cursor-pointer font-bold text-gray-700"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show More"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
