import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
});

// We will pass the Clerk token into this instance via a custom hook or interceptor
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;