import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mixins from './mixins'

window.axios = axios

createApp(App)
  .mixin(mixins)
  .use(store)
  .use(router)
  .mount('#app')
