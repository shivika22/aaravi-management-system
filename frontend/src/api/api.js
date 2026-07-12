// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5001/api"
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;