<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div v-if="logged_in">
      <top-bar :user="user"></top-bar>
      <router-view/>
      <button @click="logged_in=false" class="logout">
        logout
      </button>
    </div>
    <div v-else>
      <app-login :state="logged_in" @connected="connection"></app-login>
    </div>
  </div>
</template>

<script>
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
        this.$store.state.user = user;
        this.logged_in = user.connected;
      }
    }
  },
  mounted(){
    this.$store.state.serveurs = [
      {id:"1", avatar:"/img/ic_user.png", firstname:"premier", lastname:"quatre", tel:'0000000'},
      {id:"2", avatar:"/img/ic_user.png", firstname:"second", lastname:"quatre", tel:'111111'},
      {id:"3", avatar:"/img/ic_user.png", firstname:"troisieme", lastname:"quatre", tel:'2222222'},
      {id:"4", avatar:"/img/ic_user.png", firstname:"quatrieme", lastname:"quatre", tel:'333333'}
    ];
    this.$store.state.recettes = [
      {id:"1", image:"/img/recette.png", nom:"premier", prix:1000},
      {id:"2", image:"/img/recette.png", nom:"second", prix:2000},
      {id:"3", image:"/img/recette.png", nom:"troisieme", prix:3000},
      {id:"4", image:"/img/recette.png", nom:"quatrieme", prix:4000}
    ];
  }
};
</script>
<style src="./style.css">
</style>
