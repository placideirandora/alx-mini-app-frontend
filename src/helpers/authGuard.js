import { Notify } from "quasar";

export default (to, from, next) => {
  const token = localStorage.getItem("alxToken");

  if (!token) {
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
