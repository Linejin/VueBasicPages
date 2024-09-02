import { createApp } from 'vue'
import axios from 'axios';
import App from './views/App.vue'
import router from './router';

// Vue.config.productionTip = false;
// Vue.prototype.$http = axios;
const app = createApp(App);

app.config.globalProperties.$http = axios;
app.use(router).mount('#app')
// createApp(PopupTest).mount('#popupBtn')
// createApp(CountingBtn).mount('#countingBtn')
