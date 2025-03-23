import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const showLoaderFlag = useSelector((store) => store.config.showLoaderFlag);

  return (
    showLoaderFlag && (
      <div className="flex justify-center items-cente m-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default Loader;
