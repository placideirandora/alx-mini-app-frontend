import Vue from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://alx-mini-app-api.herokuapp.com/api/v1"
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
