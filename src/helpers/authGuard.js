import { Notify } from "quasar";

import store from "../store/index";

export default (to, from, next) => {
  store.dispatch("checkLoginStatus");

  if (!store.getters.loggedIn) {
    Notify.create({
      type: "negative",
      message: "You must be signed in to access the page"
    });

    next({
      name: ""
    });
  } else {
    next();
  }
};
