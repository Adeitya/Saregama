import React, { useEffect, useState } from "react";
import Header from "./Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails, addUserDetails } from "../store/slices/userSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { addSearchData } from "../store/slices/searchSlice";
import MainContainer from "./MainContainer";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchTxt = useSelector((store) => store.search.searchTxt);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/browse");
        dispatch(
          addUserDetails({
            uId: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(resetUserDetails());
        navigate("/");
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchTxt) {
      getSearchData();
    }
  }, [searchTxt]);

  const getSearchData = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchTxt + "music song");
    const json = await data.json();
    setSearchData(json?.items);
    dispatch(addSearchData(json?.items));
  };

  return (
    <>
      <Header />
      {/* {searchData.length ? <MainContainer /> : null} */}
      <Outlet />
    </>
  );
};

export default Browse;
