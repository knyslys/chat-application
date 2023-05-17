import { createRouter, createWebHistory } from "vue-router";
import Logs from "../components/LoggedIn/Chat/ChatLogs/Logs.vue";
import ChatView from "../views/ChatView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      props: true,
      component: ChatView,
    },
    {
      path: "/chat&id=:id",
      name: "about",
      props: true,
      component: Logs,
    },
  ],
});

export default router;
