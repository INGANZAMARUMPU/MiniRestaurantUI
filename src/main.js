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
    cleanString(str){
      if (!str) return "";
      if(typeof(str)=='object'){
        let string = ""
        for( let [clef, valeur] of Object.entries(str)){
          if(typeof(valeur)=='object'){
            let child = ""
            for( let [key, value] of Object.entries(valeur)){
              child += `- ${key}: ${value}<br>`
            }
            valeur = child;
          }
          string+=`${clef}: ${valeur}<br>`
        }
        return string;
      };
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    money(x) {
      if(!x) return 0
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
    },
    displayErrorOrRefreshToken(error, callback){
      if(!!error.response){
        if(error.response.data.code == "token_not_valid"){ 
          let refresh = this.$store.state.user.refresh
          if(!refresh){
            this.$store.state.user = null;
            return
          }
          axios.post(this.url+"/refresh/", {"refresh":refresh})
          .then((response) => {
            this.$store.state.user.access = response.data.access
            if(typeof callback == "function") callback()
          }).catch((error) => {
            console.error(error)
            this.displayNotification(error)
            this.$store.state.user = null;
          })
        } else {
          this.displayNotification(error)
        }
      }
    },
    displayNotification(error){
      if (Notification.permission === 'granted') {
        const notification = new Notification(
          this.cleanString(error.response.data).replaceAll("<br>","")
        )
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification(
              this.cleanString(error.response.data).replaceAll("<br>","")
            )
          }
        })
      }
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
