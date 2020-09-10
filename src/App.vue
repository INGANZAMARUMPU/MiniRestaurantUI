<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div v-if="logged_in">
      <top-bar :user="user"></top-bar>
      <router-view/>
      <ul class="floating-menu floating-right floating-top">
        <li><a @click="logged_in=false">logout</a></li>
      </ul>
    </div>
    <div v-else>
      <app-login :state="logged_in" @connected="connection"></app-login>
    </div>
  </div>
</template>

<script>
import EVENT_BUS from "./main";
import login from "./components/login";
import topbar from "./components/topbar";

export default {
  name: 'app',
  components:{
    appLogin: login,
    topBar: topbar,
  },
  data () {
    return {
      logged_in:false,
      user:null
    }
  },
  methods: {
    connection(user){
      if (user!=null) {
        this.user = user;
        this.logged_in = user.connected;
      }
    }
  }
};
</script>
<style src="./style.css">
  
</style>
