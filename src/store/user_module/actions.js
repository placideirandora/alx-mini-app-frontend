import axios from "boot/axios";

export const signIn = ({ commit }, credentials) => {
  return new Promise((resolve, reject) => {
    commit("setLoading", true);

    axios
      .post("/auth/signin", credentials)
      .then(res => {
        const {
          data: {
            message,
            data: { token, user }
          }
        } = res;

        localStorage.setItem("alxToken", token);

        commit("setLoading", false);
        commit("setUser", user);
        commit("setLoggedIn", true);

        resolve(message);
      })
      .catch(err => {
        commit("setLoading", false);
        reject("Incorrect Email or Password");
      });
  });
};

export const checkLoginStatus = ({ commit }) => {
  const token = localStorage.getItem("alxToken");

  if (token) {
    commit("setLoggedIn", true);
  } else {
    commit("setLoggedIn", false);
  }
};

export const signUserOut = ({ commit }) => {
  localStorage.removeItem("alxToken");

  commit("setLoggedIn", false);
};
