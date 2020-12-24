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
  created(){
    var state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.$store.state.user = state.user; 
      this.$store.state.serveurs = state.serveurs; 
      this.$store.state.recettes = state.recettes; 
      this.$store.state.tables = state.tables; 
      this.$store.state.commandes = state.commandes; 
      this.$store.state.stocks = state.stocks; 
      this.$store.state.host = state.host; 
      this.$store.state.selected_serveur = state.selected_serveur; 
      this.$store.state.selected_table = state.selected_table;
      this.user = state.user;
      // restore CART items
      // for(let item of state.cart.content){
      //   this.$store.state.cart.add(item.recette);
      // }
    } else {
      console.warn("il y'a pas de session");
    }
  },
  watch:{
    "$store.state":{
      deep: true,
      handler(new_state){
        localStorage.setItem('state', JSON.stringify(new_state));  
      }
    }
  },
  methods:{
    logIn(user){
      if (user != null && user.access.length>20) {
        this.user = user;
        this.fetchData();
      }
    },
    logout(){
      this.store.state.user = null;
    },
    fetchData(){
      let headers = {
        headers: {
          "Authorization": "Bearer " + this.user.access
        }
      }
      axios.get('http://127.0.0.1:8000/serveur/', headers)
        .then((response) => {
          this.$store.state.serveurs = response.data;
        }).catch((error) => {
          console.error(error);
        });

      axios.get('http://127.0.0.1:8000/table/', headers)
        .then((response) => {
          this.$store.state.tables = response.data;
        }).catch((error) => {
          console.error(error);
        });

      axios.get('http://127.0.0.1:8000/recette/', headers)
        .then((response) => {
          this.$store.state.recettes = response.data;
        }).catch((error) => {
          console.error(error);
        });
    }

  }
};
</script>
<style src="./style.css">
</style>
