import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';

// import './my-theme/index.less.less'
import 'iview/dist/styles/iview.css';
import './css/index.less'
Vue.use(router);
Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
