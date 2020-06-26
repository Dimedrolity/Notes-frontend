import Vue from 'vue'
import App from './App.vue'

import '../node_modules/bulma/css/bulma.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app');

