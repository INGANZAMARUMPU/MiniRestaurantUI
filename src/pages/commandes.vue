<template>
  <div id="app" @click="popover_opened=false">
    <div class="top">
      <SearchBar @changed="search"/>
      <DateFilter/>
    </div>
    <div class="recycler">
    </div>
      <div class="scrollable-tab">
        <table class="table commandes">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>table</th>
              <th>serveur</th>
              <th>somme</th>
              <th>payée</th>
              <th>Reste</th>
              <th>Date</th>
              <th><button onclick="toggleTableSize(event)">toggle display</button></th>
            </tr>
          </thead>
          <tbody id="commandes">
              <tr v-for="commande in commandes">
                <td>#{{ commande.id }}</td>
                <td>Table {{ commande.table }}</td>
                <td>{{ commande.serveur_name }}</td>
                <td>{{ commande.a_payer }}</td>
                <td>{{ commande.payee }}</td>
                <td>{{ commande.reste }}</td>
                <td>{{ commande.date }}</td>
                <td>
                  <div class="btns">
                    <a href="{% url 'details' commande.id %}" class="btn url_button" id="commande_details">détails</a>
                    <a href="{% url 'payer_commande' commande.id %}" class="btn url_button">payer</a>
                  </div>
                </td>
              </tr>
          </tbody>
          <tfoot>
            <tr class="panier-item">
              <th colspan="3">total</th>
              <th>{{ totals.a_payer }}</th>
              <th>{{ totals.payee }}</th>
              <th>{{ totals.reste }}</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    <!-- <cart-popover :visible='popover_opened' :cart='cart' @item_add="addToCart"/> -->
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/search";
import DateFilter from "../components/date_filter";
import menu from "../components/menu";
// import popover from "../components/popup_panier";

export default {
  components:{ SearchBar, restoMenu:menu, DateFilter },
  data(){
    return{
      commandes : []
    }
  },
  computed:{
    totals(){
      let tots = { a_payer: 0, payee: 0, reste: 0}
      if (this.commandes.length == 0 ) return tots;
      for(let commande of this.commandes) {
        tots.a_payer += commande.a_payer;
        tots.payee += commande.payee;
        tots.reste += commande.reste;
      }
      return tots;
    }
  },
  mounted(){
    let result = this.$store.state.commandes;
    if (result.length > 0){
      this.commandes = result;
    } else {
      let headers = {
        headers: {
          "Authorization": "Bearer " + this.$store.state.user.access
        }
      }
      axios.get(this.$store.state.host+'/commande/', headers)
      .then((response) => {
        this.$store.state.commandes = response.data;
        this.commandes = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  methods:{
    search(string){
      this.commandes = [];
      for(var i = 0; i < this.$store.state.commandes.length; i++){
        let commande = this.$store.state.commandes[i];
        for (let key in commande) {
          var value = String(commande[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.commandes.push(commande);
            break;
          }
        }
      }
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
