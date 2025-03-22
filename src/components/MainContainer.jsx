import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import SongCard from "./SongCard";
import HomeContainer from "./HomeContainer";

const MainContainer = () => {
  const searchData = useSelector((store) => store.search.searchData);

  if (searchData.length == 0) return <HomeContainer />;
  return (
    <div className="bg-gradient-to-t pt-20 from-black h-screen overflow-y-scroll">
      <div className="bg-white mx-40 my-2 rounded-lg p-4">
        <div>
          <p className="font-bold text-xl mb-2">Top result</p>
          <div className="flex justify-between bg-black text-white p-4 rounded-lg">
            {searchData?.map(
              (item, index) =>
                index < 3 && (
                  <Link
                    key={item.id.videoId}
                    to={"/browse/watch?v=" + item.id.videoId}
                  >
                    <div
                      className={`flex-1 flex items-center px-2 cursor-pointer group hover:bg-green-500 p-1 hover:scale-105 transform transition-all duration-300 ease-in-out ${
                        index < 2 ? "border-r-2 border-gray-10" : null
                      }`}
                    >
                      <img
                        alt="img"
                        src={item?.snippet?.thumbnails?.default?.url}
                        className="w-20 h-20 mr-2 "
                      />
                      <p>{item?.snippet?.title}</p>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      <div className="bg-white mx-40 my-2 rounded-lg p-4">
        <p className="font-bold text-xl mb-2">Songs</p>
        <div className="">
          {searchData.map((item) => (
            <Link
              key={item.id.videoId}
              to={"/browse/watch?v=" + item.id.videoId}
            >
              <SongCard data={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
