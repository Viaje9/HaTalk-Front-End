import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';
import axios from './plugins/axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'normalize.css';

// 全域component
import MenuComponent from './components/Menu.vue';

Vue.component('menu-component', MenuComponent);
Vue.use(VueAxios, axios);
Vue.use(
  new VueSocketIO({
    connection: process.env.VUE_APP_LOCAL_URL,
  }),
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
