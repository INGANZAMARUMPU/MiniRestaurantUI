<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div v-if="user != null">
      <TopBar :user="user" class="nonprintable"/>
      <router-view/>
      <button @click="logout" class="logout nonprintable">
        logout
      </button>
      <Invoice/>
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
import Invoice from "./components/invoice";

export default {
  name: 'app',
  components:{ AppLogin, TopBar, Invoice},
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
    } else {
      console.warn("il y'a pas de session");
    }
  },
  watch:{
    "$store.state.user":{
      deep: true,
      handler(new_state){
        localStorage.setItem('user', JSON.stringify(new_state));
        this.user = user;
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
