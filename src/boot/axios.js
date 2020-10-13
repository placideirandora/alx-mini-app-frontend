import Vue from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1"
});

Vue.prototype.$axios = axiosInstance;

export default axiosInstance;