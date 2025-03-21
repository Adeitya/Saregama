export const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ057HBKYGvHGqFSigWBSn_PZFXRsICls11lqrMyp5pxDhgaQ2k35bS7eZzlZ6rUHp7Y_Y&usqp=CAU";

export const PROFILE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc79jif5wcLZaTk4PEVKc5ult10Gze8i6QQg&s";

export const HOME_BLACK =
  "https://cdn-icons-png.flaticon.com/128/1946/1946436.png";

export const HOME_WHITE =
  "https://cdn-icons-png.flaticon.com/128/1946/1946488.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.REACT_APP_MUSIC_API_KEY,
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
