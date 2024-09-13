import { createApp } from 'vue'
import axios from 'axios';
import App from './views/App.vue'
import router from './router';
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies';

// Vue.config.productionTip = false;
// Vue.prototype.$http = axios;
const pinia = createPinia()
const app = createApp(App);

app.config.globalProperties.$http = axios;
app.use(pinia).use(VueCookies).use(router).mount('#app')
app.$cookies.config("7d");
