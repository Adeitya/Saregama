import React, { useEffect, useRef } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import model from "../utils/geminiAi";
import { useDispatch, useSelector } from "react-redux";
import TrackInfoList from "./TrackInfoList";
import {
  addGptTrackResult,
  setGptScreenFlag,
  toggleGptShowLoading,
} from "../store/slices/gptSlice";

const GptMusicSuggestion = () => {
  const dispatch = useDispatch();
  const searchTxt = useRef(null);
  const { gptShowLoading, gptTrackNames, gptTrackResults } = useSelector(
    (store) => store.gpt
  );

  useEffect(() => {
    dispatch(setGptScreenFlag(true));

    return () => {
      dispatch(setGptScreenFlag(false));
    };
  }, []);

  const fetchTrackDetails = async (trackName) => {
    const data = await fetch(YOUTUBE_SEARCH_API + trackName + "music song");
    const json = await data.json();
    return json?.items;
  };

  const handleSearch = async () => {
    if (!searchTxt.current.value) return;
    dispatch(toggleGptShowLoading());
    const gptQuery =
      "Act as a music recommendation api & suggest some songs for the query: " +
      searchTxt.current.value +
      ". only give me the 5 names of the movies in a comma separated list";
    const gptResults = await model.generateContent(gptQuery);
    const trackList = gptResults.response.text().split(",");
    const trackResultsPromise = trackList?.map((trackName) =>
      fetchTrackDetails(trackName)
    );
    const trackResults = await Promise.all(trackResultsPromise);
    dispatch(
      addGptTrackResult({
        trackNames: trackList,
        trackDetailsList: trackResults,
      })
    );
  };

  return (
    <div className="bg-gradient-to-t pt-20 from-black h-screen overflow-y-scroll">
      <div className="bg-gradient-to-t from-black md:mx-40 mx-2 my-2 md:px-40 rounded-lg p-4">
        <div className="flex justify-between  bg-white p-1 rounded-sm">
          <input
            ref={searchTxt}
            type="text"
            placeholder="What do you want to listen to? Let AI suggest...?"
            className=" w-full focus:outline-none pl-2 p-1 text-sm"
          />
          <button
            className="text-black bg-green-500 hover:bg-green-400 py-2 md:px-8 px-2 rounded-md cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="bg-white md:mx-40 mx-2 my-2 rounded-lg p-4">
        {gptTrackNames && <p className="font-bold text-xl mb-2">Songs</p>}
        <div className="">
          {gptShowLoading ? (
            <div className="flex justify-center items-cente m-2">
              <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
            </div>
          ) : (
            gptTrackNames?.map((trackName, index) => (
              <TrackInfoList
                key={index}
                title={trackName}
                trackList={gptTrackResults[index]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GptMusicSuggestion;
