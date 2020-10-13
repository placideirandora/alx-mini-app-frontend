import { Notify } from "quasar";

import store from "../store/index";

export default (to, from, next) => {
  store.dispatch("checkLoginStatus");

  if (!store.getters.loggedIn && to.name === "home") {
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
    Notify.create({
      type: "warning",
      message: `You cannot access the ${to.name.toUpperCase()} PAGE while you're signed in. Sign out to do so.`
    });

    next({
      name: from.name
    });
  } else {
    next();
  }
};
