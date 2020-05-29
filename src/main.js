import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';

import Login from './components/Login';
import Home from './components/Home';
import ServicosForm from './components/ServicosForm';


// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [ // define as rotas e os componentes
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/servicesform', component: ServicosForm}
];

const router = new VueRouter({ // instancia o router
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
