import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "../pages/ProfilePage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "LoginPage", component: LoginPage },
  {
    path: "/profile",
    redirect: () => {
      const uid = localStorage.getItem("uid");
      return uid ? { path: "/profile/" + uid } : "/";
    },
    children: [
      {
        path: ":uid",
        name: "ProfileDetails",
        component: ProfilePage,
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: "/:catchAll(.*)", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (to.name === "LoginPage" && isAuthenticated) {
    const uid = localStorage.getItem("uid");
    next({ name: "ProfileDetails", params: { uid } });
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
