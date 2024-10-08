import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

/**
 * PrimeVue
 */
import PrimeVue from "primevue/config";

/**
 * The main entry point for the Vue.js application.
 */
const app = createApp(App);

/**
 * Vue Router
 */
import router from "./router";
app.use(router);

/**
 * PrimeVue - Configuration
 */
app.use(PrimeVue, { ripple: true, inputStyle: "filled" });

/**
 * PrimeVue - Theme
 */
import "primevue/resources/themes/aura-light-purple/theme.css";

/**
 * PrimeFlex
 */
import "primeflex/primeflex.css";

/**
 * PrimeIcons
 */

import "primeicons/primeicons.css";

/**
 * Toast Service
 */
import ToastService from "primevue/toastservice";
app.use(ToastService);

/**
 * Mount the Vue.js application to the DOM.
 */
app.mount("#app");
