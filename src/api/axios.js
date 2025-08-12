import axios from "axios";
import { baseURL } from "./api";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGMxYWU2ZGYyYmRlMmQ0OGQ3N2NmMTE1ZDU3ZDg5YiIsIm5iZiI6MTc1NDgxNDE5OC4yNTQwMDAyLCJzdWIiOiI2ODk4NTZmNmFmYzY4YWUzNTQyNjc5OGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.55DodqL4ih4R1gA18zc-rSRSXmjvMpXFcLxsI9f-D08';
export const Axios = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${API_KEY}`
    }
})