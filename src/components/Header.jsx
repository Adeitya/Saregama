import React, { useEffect, useState } from "react";
import {
  API_OPTIONS,
  HOME_BLACK,
  HOME_WHITE,
  LOGO_URL,
  PROFILE_URL,
} from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addSuggestionCache } from "../store/slices/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [searchTxt, setSearchTxt] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const suggestionCache = useSelector((store) => store.search.suggestionCache);

  useEffect(() => {
    const i = setTimeout(() => {
      if (suggestionCache[searchTxt]) {
        setSearchResult(suggestionCache[searchTxt]);
      } else if (searchTxt) getSearchQuery();
    }, 300);

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
      console.log("api call-", searchTxt);
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
    <div className="flex justify-between bg-black w-full py-3 px-4">
      <img src={LOGO_URL} alt="logo" className="h-10" />
      <div className="flex w-1/3 gap-2">
        <div className="rounded-full bg-gray-200 p-1 hover:bg-gray-100 cursor-pointer">
          <img src={HOME_WHITE} alt="logo" className="h-8 p-1" />
        </div>
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
            {showSuggestion && searchTxt && (
              <div className="absolute bg-white w-[90%] mt-10 z-50 max-h-60 rounded-lg shadow-lg overflow-y-auto">
                {searchResult?.map((item, index) => (
                  <span
                    key={index}
                    className="block p-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTxt(item.term);
                    }}
                  >
                    {item.term}
                  </span>
                ))}
              </div>
            )}
          </div>
          <img
            src={"https://cdn-icons-png.flaticon.com/128/18895/18895639.png"}
            alt="logo"
            className="h-8 border-l-2 pl-2 p-1 cursor-pointer"
          />
        </div>
      </div>
      <img
        src={PROFILE_URL}
        alt="logo"
        className="h-10 cursor-pointer"
        onClick={() => signOut(auth)}
      />
    </div>
  );
};

export default Header;
