import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "./style.css";
// @ts-ignore
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue).mount("#app");