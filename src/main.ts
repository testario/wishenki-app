import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ConfirmationServiceMethods from "primevue/confirmationservice";
import ToastServiceMethods from "primevue/toastservice";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "./style.css";
// @ts-ignore
import App from "./App.vue";
import {createPinia} from "pinia";

const app = createApp(App);
export const API_URL = import.meta.env.VITE_API_URL;

app
  .use(PrimeVue)
  .use(ConfirmationServiceMethods)
  .use(ToastServiceMethods)
  .use(createPinia())
  .mount("#app");