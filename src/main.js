import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    money(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    datetime(x) {
    	let date = new Date(x);
    	return new Intl.DateTimeFormat(
    		'en-GB',
    		{ dateStyle: 'short', timeStyle: 'short' }
    	).format(date)
    },
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
