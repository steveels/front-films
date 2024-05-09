import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

store.dispatch('loadUserFromStorage')
.then(() => {
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.mount('#app');
});
