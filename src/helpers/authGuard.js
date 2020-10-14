import { Notify } from "quasar";

import store from "../store/index";

export default (to, from, next) => {
  store.dispatch("checkLoginStatus");

  if (
    (!store.getters.loggedIn && to.name === "home") ||
    (!store.getters.loggedIn && to.name === "change-password") ||
    (!store.getters.loggedIn && to.name === "profile")
  ) {
    Notify.create({
      type: "negative",
      message: "You must be signed in to access the page"
    });

    next({
      name: "login"
    });
  } else if (
    (store.getters.loggedIn && to.name === "login") ||
    (store.getters.loggedIn && to.name === "register")
  ) {
    next({
      name: "home"
    });
  } else {
    next();
  }
};
