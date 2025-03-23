import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Browse from "./Browse";
import Login from "./Login";
import WatchPage from "./WatchPage";
import MainContainer from "./MainContainer";
import HomeContainer from "./HomeContainer";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
      children: [
        {
          path: "/browse",
          element: <HomeContainer />,
        },
        {
          path: "results",
          element: <MainContainer />,
        },
        {
          path: "watch",
          element: <WatchPage />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
