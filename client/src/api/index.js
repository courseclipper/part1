import axios from "axios";

// const getToken = () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   return token;
// };

const api = axios.create({
  baseURL: "https://course-clipper-api-ea3d88f279db.herokuapp.com",
  // baseURL: "http://localhost:3001",
});

// api.interceptors.request.use(
//   async (config) => {
//     config.headers.authorization = `Bear ${getToken()}`;
//     return config;
//   },
//   (error) => {
//     return error;
//   }
// );

export default api;
