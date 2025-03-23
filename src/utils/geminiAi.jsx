import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINIAPI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINIAPI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;
