import AuthGuard from "../helpers/authGuard";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/SignIn.vue"),
        beforeEnter: AuthGuard
      },
      {
        path: "/register",
        name: "register",
        component: () => import("pages/SignUp.vue"),
        beforeEnter: AuthGuard
      },
      {
        path: "/home",
        name: "home",
        component: () => import("pages/Home.vue"),
        beforeEnter: AuthGuard
      },
      {
        path: "/change-password",
        name: "change-password",
        component: () => import("pages/ChangePassword.vue"),
        beforeEnter: AuthGuard
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
