<template>
  <div id="app" class="nonprintable" @click="popover_opened=false">
    <div class="top">
      <SearchBar @changed="search"/>
      <DateFilter @changed="filter"/>
    </div>
    <div class="recycler">
    </div>
      <div class="scrollable-tab">
        <table class="table menus">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>menu</th>
              <th>du</th>
              <th>au</th>
              <th>quantite</th>
              <th>somme</th>
            </tr>
          </thead>
          <tbody id="menus">
              <tr v-for="menu in menus">
                <td>#{{ menu.id }}</td>
                <td>{{ menu.nom }}</td>
                <td>{{ date_du }}</td>
                <td>{{ date_au }}</td>
                <td>{{ menu.quantite }}</td>
                <td>{{ menu.total }}</td>
              </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/search";
import DateFilter from "../components/date_filter";

export default {
  components:{
    SearchBar, DateFilter
  },
  data(){
    return{
      menus : [],
      raw_menus : [],
      date_du : new Date().toLocaleDateString('fr-CA'),
      date_au : new Date().toLocaleDateString('fr-CA'),
      headers : null
    }
  },
  mounted(){
    let result = this.$store.state.stats.menu;
    if (result.length > 0){
      this.menus = result;
      this.raw_menus = result;
    } else {
      let headers = {
        headers: {
          "Authorization": "Bearer " + this.$store.state.user.access
        }
      };
      this.headers = headers;
      axios.get(this.$store.state.host+'/statistic/menu/', headers)
      .then((response) => {
        this.$store.state.stats.menu = response.data;
        this.menus = response.data;
        this.raw_menus = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  methods:{
    search(string){
      this.menus = [];
      for(var i = 0; i < this.raw_menus.length; i++){
        let menu = this.raw_menus[i];
        for (let key in menu) {
          var value = String(menu[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.menus.push(menu);
            break;
          }
        }
      }
    },
    filter(dates){
      let date_du = new Date(dates.du).toLocaleDateString('fr-CA');
      let date_au = new Date(dates.au).toLocaleDateString('fr-CA');
      
      axios.get(`${this.$store.state.host}/statistic/menu/${date_du}/${date_au}/`, this.headers)
      .then((response) => {
        this.menus = response.data;
        this.raw_menus = response.data;
        this.date_du = date_du;
        this.date_au = date_au;
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};
</script>
<style scoped>
.top{
  display: flex;
  justify-content: center;
}
.scrollable-tab{
  width: 100%;
  /*height: 0px;*/
  overflow: auto;
  padding: 0 20px;
  position: relative;
}
.scrollable-tab table thead tr th{
  position: sticky;
  top: 0;
}
.scrollable-tab table tfoot tr th{
  position: sticky;
  bottom: 0;
}
@media screen and (max-width: 650px){
  .scrollable-tab{
    position: inherit;
    height: auto;
    overflow-y: hidden;
  }
  .scrollable-tab table thead tr th{
    position: inherit;
  }
}
</style>
