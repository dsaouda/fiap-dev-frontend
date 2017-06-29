// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false

Vue.prototype.helperUrl = function(uri) {
  return `https://fiap-java-devops.appspot.com${uri}`;
};

Vue.prototype.helperImage = function(filename) {
    return this.helperUrl(`/images/view?file=${filename}`);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
