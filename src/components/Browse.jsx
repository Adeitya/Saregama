import React, { useEffect } from "react";
import Header from "./Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { resetUserDetails, addUserDetails } from "../store/slices/userSlice";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="bg-white h-screen">
      <Header />
      Browse
    </div>
  );
};

export default Browse;
