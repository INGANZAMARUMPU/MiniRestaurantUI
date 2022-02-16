import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

Vue.config.productionTip = false
window.axios = axios

Vue.mixin({
  computed:{
    headers(){
      return {
        "headers": {
          "Authorization": "Bearer " + this.$store.state.user.access
        }
      }
    },
    host(){
      return this.$store.state.host
    }
  },
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
    compress(file, width, callback){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e){
        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function () {
            let canvas = document.createElement("canvas");
            let rapport = img.width/width;
            canvas.width = width;
            canvas.height = img.height/rapport;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let result64 = ctx.canvas.toDataURL(img, file.type);
            callback(new File([result64], file.name));
            URL.revokeObjectURL(file);
        };
      }
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
