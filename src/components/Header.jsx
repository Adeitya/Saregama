import React, { useEffect, useState } from "react";
import {
  API_OPTIONS,
  DEBOUNCING_DELAY,
  HOME_BLACK,
  HOME_WHITE,
  LOGO_URL,
  PROFILE_URL,
} from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addSuggestionCache, addSearchTxt } from "../store/slices/searchSlice";
import { useNavigate } from "react-router";
import { setHomePageFlag } from "../store/slices/configSlice";
import SuggestionShimmer from "./SuggestionShimmer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTxt, setSearchTxt] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const suggestionCache = useSelector((store) => store.search.suggestionCache);
  const homePageFlag = useSelector((store) => store.config.homePageFlag);
  const gptScreenFlag = useSelector((store) => store.gpt.gptScreenFlag);

  useEffect(() => {
    const i = setTimeout(() => {
      if (suggestionCache[searchTxt]) {
        setSearchResult(suggestionCache[searchTxt]);
      } else if (searchTxt) getSearchQuery();
    }, DEBOUNCING_DELAY);

    return () => {
      clearTimeout(i);
    };
  }, [searchTxt]);

  const getSearchQuery = async () => {
    try {
      const response = await fetch(
        "https://shazam.p.rapidapi.com/auto-complete?e&locale=en-US&term=" +
          searchTxt,
        API_OPTIONS
      );
      const result = await response?.json();
      setSearchResult(result?.hints);
      dispatch(
        addSuggestionCache({
          [searchTxt]: result?.hints,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex fixed justify-between bg-black w-full py-3 px-4 z-50">
      <img src={LOGO_URL} alt="logo" className="h-10" />
      <div
        className={`flex gap-2 ${
          gptScreenFlag ? "w-full justify-end mr-4" : "w-1/3"
        }`}
      >
        <div
          className={`rounded-full bg-gray-200 p-1  ${
            !homePageFlag ? "hover:bg-green-500 cursor-pointer" : null
          }`}
        >
          <img
            src={HOME_WHITE}
            alt="logo"
            className="h-8 p-1"
            onClick={() => {
              navigate("/browse");
              // dispatch(setHomePageFlag(true));
            }}
          />
        </div>
        {!gptScreenFlag && (
          <div className="flex grow bg-white rounded-full p-1 relative">
            <div className="flex flex-col w-full h-full">
              <input
                type="text"
                placeholder="What do you want to play?"
                className="w-full focus:outline-none pl-2 p-1"
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
                onFocus={() => setShowSuggestion(true)}
                onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
              />
              {showSuggestion ? (
                searchResult?.length > 0 ? (
                  <div className="absolute bg-white w-[90%] mt-10 z-50 max-h-60 rounded-lg shadow-lg overflow-y-auto">
                    {searchResult?.map((item, index) => (
                      <span
                        key={index}
                        className="block p-2 text-black hover:bg-green-500 cursor-pointer"
                        onClick={() => {
                          dispatch(addSearchTxt(item.term));
                          setSearchTxt(item.term);
                          // dispatch(setHomePageFlag(false));
                          navigate("/browse/results?search_query=" + item.term);
                        }}
                      >
                        {item.term}
                      </span>
                    ))}
                  </div>
                ) : (
                  searchTxt && <SuggestionShimmer />
                )
              ) : null}
            </div>
            <img
              src={"https://cdn-icons-png.flaticon.com/128/149/149852.png"}
              alt="logo"
              className="h-8 pl-2 p-1 cursor-pointer hover:bg-green-500 hover:rounded-full"
              onClick={() => {
                if (searchTxt) {
                  dispatch(addSearchTxt(searchTxt));
                  setSearchTxt(searchTxt);
                  // dispatch(setHomePageFlag(false));
                  navigate("/browse/results?search_query=" + searchTxt);
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/128/10172/10172332.png"
          alt="logo"
          className="h-10 cursor-pointer hover:bg-white hover:rounded-full"
          onClick={() => navigate("/browse/aiSearch")}
        />
        <img
          src={PROFILE_URL}
          alt="logo"
          className="h-10 cursor-pointer hover:bg-white hover:rounded-full"
          onClick={() => signOut(auth)}
        />
      </div>
    </div>
  );
};

export default Header;
