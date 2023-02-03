import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mixins from './mixins'

Vue.config.productionTip = false
window.axios = axios

createApp(App)
  .component('fa', FontAwesomeIcon)
  .mixin(mixins)
  .use(store)
  .use(router)
  .mount('#app')
