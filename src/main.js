import "./assets/index.css";
import Loading from "./components/UI/Loading.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("loading", Loading);
app.use(createPinia());
app.use(router);
app.mount("#app");
