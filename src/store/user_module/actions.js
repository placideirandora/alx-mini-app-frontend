import store from "../index";
import axios from "boot/axios";

export const signIn = ({ commit }, credentials) => {
  return new Promise((resolve, reject) => {
    commit("setLoading", true);

    axios
      .post("/auth/signin", credentials)
      .then(
        ({
          data: {
            message,
            data: { token, user }
          }
        }) => {
          localStorage.setItem("alxToken", token);

          commit("setLoading", false);
          commit("setUser", user);
          commit("setLoggedIn", true);

          resolve(message);
        }
      )
      .catch(
        ({
          response: {
            data: { message }
          }
        }) => {
          commit("setLoading", false);
          reject(message);
        }
      );
  });
};

export const signUp = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("setLoading", true);

    axios
      .post("/auth/signup", payload)
      .then(res => {
        commit("setLoading", false);

        resolve("Registered successfully. You can now sign into your account");
      })
      .catch(
        ({
          response: {
            data: { message }
          }
        }) => {
          commit("setLoading", false);

          reject(message);
        }
      );
  });
};

export const getProfile = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("alxToken");
    const config = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get("/profile", config)
      .then(({ data: { data } }) => {
        commit("setUser", data);

        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const checkLoginStatus = ({ commit }) => {
  const token = localStorage.getItem("alxToken");

  if (token) {
    store.dispatch("getProfile");

    commit("setLoggedIn", true);
  } else {
    commit("setLoggedIn", false);
  }
};

export const signUserOut = ({ commit }) => {
  localStorage.removeItem("alxToken");

  commit("setLoggedIn", false);
};
