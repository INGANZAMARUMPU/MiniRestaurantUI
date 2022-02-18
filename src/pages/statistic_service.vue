<template>
  <div id="app" class="nonprintable" @click="popover_opened=false">
    <div class="top">
      <SearchBar @changed="search"/>
      <DateFilter @changed="filter"/>
    </div>
    <div class="recycler">
    </div>
      <div class="scrollable-tab">
        <table class="table services">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>serveur</th>
              <th>du</th>
              <th>au</th>
              <th>quantite</th>
            </tr>
          </thead>
          <tbody id="services">
              <tr v-for="service in services">
                <td>#{{ service.id }}</td>
                <td>{{ service.firstname+" "+service.lastname }}</td>
                <td>{{ date_du }}</td>
                <td>{{ date_au }}</td>
                <td>{{ service.quantite }}</td>
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
  components:{ SearchBar, DateFilter },
  data(){
    return{
      services : [],
      raw_services : [],
      date_du : new Date().toLocaleDateString('fr-CA'),
      date_au : new Date().toLocaleDateString('fr-CA'),
    }
  },
  mounted(){
    let result = this.$store.state.stats.service;
    if (result.length > 0){
      this.services = result;
      this.raw_services = result;
    } else {
      axios.get(this.$store.state.host+'/statistic/service/', this.headers)
      .then((response) => {
        this.$store.state.stats.service = response.data;
        this.services = response.data;
        this.raw_services = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  methods:{
    search(string){
      this.services = [];
      for(var i = 0; i < this.raw_services.length; i++){
        let service = this.raw_services[i];
        for (let key in service) {
          var value = String(service[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.services.push(service);
            break;
          }
        }
      }
    },
    filter(dates){
      let date_du = new Date(dates.du).toLocaleDateString('fr-CA');
      let date_au = new Date(dates.au).toLocaleDateString('fr-CA');
      
      axios.get(`${this.$store.state.host}/statistic/service/${date_du}/${date_au}/`, this.headers)
      .then((response) => {
        this.services = response.data;
        this.raw_services = response.data;
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
