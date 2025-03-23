export const LOGO_URL =
  "https://cdn-icons-png.flaticon.com/128/1834/1834342.png";

export const PROFILE_URL =
  "https://cdn-icons-png.flaticon.com/128/4400/4400483.png";

export const HOME_BLACK =
  "https://cdn-icons-png.flaticon.com/128/1946/1946436.png";

export const HOME_WHITE =
  "https://cdn-icons-png.flaticon.com/128/1946/1946488.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1d462b4dacmshb05123e444ceb5cp1fed7ejsn20d1b7bc3ae6",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

const GOOGLE_API_KEY = "AIzaSyDx3N5YZWkclLsz65P9fQIQZurrPoo9oao";

export const YOUTUBE_SEARCH_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=" +
  GOOGLE_API_KEY +
  "&q=";

export const YOUTUBE_VIDEO_ID =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  GOOGLE_API_KEY +
  "&id=";

export const DEBOUNCING_DELAY = 300;

export const GEMINIAPI_KEY = "AIzaSyDeQKnPvgDB_RRgbd2GAf_petHeRWecRZ4";

export const TRACK_URL =
  "https://spotify23.p.rapidapi.com/search/?type=tracks&offset=0&limit=10&numberOfTopResults=5&q=";

export const SPOTIFY_API_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1d462b4dacmshb05123e444ceb5cp1fed7ejsn20d1b7bc3ae6",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};
