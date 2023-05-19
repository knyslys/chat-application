import "./assets/index.css";
import Loading from "./components/UI/Loading.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import VueAnimXyz from "@animxyz/vue3";
import "@animxyz/core";
import App from "./App.vue";
import router from "./router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const app = createApp(App);
app.component("loading", Loading);
app.use(createPinia());
app.use(VueAnimXyz);
app.use(router);
app.use(autoAnimatePlugin);
app.mount("#app");
