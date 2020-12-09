import store from "../index";
import router from "../../router";
import { axiosInstance as axios } from "boot/axios";


// Double Checking Again 

// Triple Checking Again!

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
  const token = localStorage.getItem("alxToken");

  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios
      .get("/profile", config)
      .then(({ data: { data } }) => {
        commit("setUser", data);

        resolve(data);
      })
      .catch(
        ({
          response: {
            request: { status }
          }
        }) => {
          if (status === 403) {
            reject(status);

            store.dispatch("signUserOut");
            router.push({ name: "login" });
          }
        }
      );
  });
};

export const updateProfile = ({ commit }, payload) => {
  const token = localStorage.getItem("alxToken");

  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    commit("setLoading", true);

    axios
      .patch("/profile", payload, config)
      .then(({ data: { message, data } }) => {
        commit("setUser", data);
        commit("setLoading", false);

        resolve(message);
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

export const changePassword = ({ commit }, credentials) => {
  const token = localStorage.getItem("alxToken");

  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    commit("setLoading", true);

    axios
      .patch("/auth/change-password", credentials, config)
      .then(res => {
        commit("setLoading", false);

        resolve("Password changed. Sign in again with the new password.");
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
  commit("setUser", null);
};
