import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';

import Login from './components/Login';

import Home from './components/Home';
import ServicosForm from './components/ServicosForm';
import ServicosUpdate from './components/ServicosUpdate';

import Clients from './components/Clients';
import Clientsupdateform from './components/Clientsupdateform';
import Clientsnewform from './components/Clientsnewform';
// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [ // define as rotas e os componentes
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/servicesform', component: ServicosForm},
  { path: '/servicesupdateform', component: ServicosUpdate},
  { path: '/clients', component: Clients},
  { path: '/clientsupdateform', component: Clientsupdateform},
  { path: '/clientsnewform', component: Clientsnewform},
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
