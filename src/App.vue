<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div v-if="user != null">
      <TopBar :user="user"/>
      <router-view/>
      <button @click="logout" class="logout">
        logout
      </button>
    </div>
    <div v-else>
      <AppLogin @connected="logIn"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppLogin from "./components/login";
import TopBar from "./components/topbar";

export default {
  name: 'app',
  components:{ AppLogin, TopBar},
  data () {
    return {
      user:this.$store.state.user,
    }
  },
  computed:{
    host(){
      return this.$store.state.host
    }
  },
  created(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(!!user) {
      this.$store.state.user = user;
      axios.post(this.host+'/refresh/', {
          "refresh": user.refresh
        })
        .then((response) => {
          this.$store.state.user.access = response.data.access;
        }).catch((error) => {
          return;
        });
      this.user = user;
    } else {
      console.warn("il y'a pas de session");
    }
  },
  watch:{
    "$store.state.user":{
      deep: true,
      handler(new_state){
        localStorage.setItem('user', JSON.stringify(new_state));  
      }
    },
  },
  methods:{
    logIn(user){
      if (user != null && user.access.length>20) {
        this.user = user;
      }
    },
    logout(){
      localStorage.setItem('user', null);
      this.$store.state.user = null;
      this.$store.state.serveurs = null;
      this.$store.state.recettes = null;
      this.$store.state.tables = null;
      this.user = null;
    }
  }
};
</script>
<style src="./style.css">
</style>
