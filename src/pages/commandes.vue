<template>
  <div class="parent" @click="popover_opened=false">
    <div class="top">
      <SearchBar @changed="search"/>
      <DateFilter/>
    </div>
      <div class="scrollable">
      <table>
        <thead>
          <tr class="panier-item">
            <th :class="{'active':column=='id'}" 
              @click="column='id'">
              id
            </th>
            <th :class="{'active':column=='personnel'}" 
              @click="column='personnel'">
              personnel
            </th>
            <th :class="{'active':column=='serveur'}" 
              @click="column='serveur'">
              serveur
            </th>
            <th class="right">somme</th>
            <th class="right">payée</th>
            <th class="right">Reste</th>
            <th :class="{'active':column=='date'}" 
              @click="column='date'">
              Date
            </th>
            <th><button onclick="toggleTableSize(event)">toggle display</button></th>
          </tr>
        </thead>
        <tbody id="commandes">
            <tr v-for="commande in commandes">
              <td>#{{ commande.id }}</td>
              <td>{{ commande.personnel }}</td>
              <td>{{ commande.serveur }}</td>
              <td class="right">{{ money(commande.a_payer) }}</td>
              <td class="right">{{ money(commande.payee) }}</td>
              <td class="right">{{ money(commande.reste) }}</td>
              <td class="time">{{ datetime(commande.date)}}</td>
              <td>
                <div class="btns">
                  <button @click="showDetails(commande)">
                    détails
                  </button>
                  <button @click="showPay(commande)">
                    payer
                  </button>
                </div>
              </td>
            </tr>
        </tbody>
        <tfoot>
          <tr class="panier-item">
            <th colspan="3">total</th>
            <th class="right">{{ money(totals.a_payer) }} Fbu</th>
            <th class="right">{{ money(totals.payee) }} Fbu</th>
            <th class="right">{{ money(totals.reste) }} Fbu</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      </div>
    <DetailsDialog :visible='details_opened' :commande='active_commande'
      @close="details_opened=false"/>
    <PayDialog :visible='pay_opened' :commande='active_commande'
      @close="pay_opened=false"/>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/search";
import DateFilter from "../components/date_filter";
import menu from "../components/menu";
import DetailsDialog from "../components/popup_details";
import PayDialog from "../components/popup_payer";

export default {
  components:{
    SearchBar, restoMenu:menu, DateFilter, DetailsDialog,
    PayDialog
  },
  data(){
    return{
      commandes : [],
      details_opened:false,
      pay_opened:false, column:"",
      active_commande :{
        "details": [], "a_payer": 0,"serveur_name": "",
        "date": "2020-12-23T21:54:10.326506Z","payee": 0,
        "reste": 0, "table": 0,"serveur": 0, "personnel": 0,
        "tel": ""
      },
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
      string = string.toLowerCase();
      let value = ""; let commande = null;
      let commandes = this.$store.state.commandes;
      if(!string){
        this.commandes = commandes;
        return;
      }
      this.commandes = [];
      for(var i = 0; i < commandes.length; i++){
        commande = commandes[i];
        value = String(commande[this.column]).toLowerCase();
        if(this.column=="date"){
          value = this.datetime(value)
        }
        if (value.search(string) >= 0 ) {
          this.commandes.push(commande);
        }
      }
    },
    showDetails(commande){
      this.active_commande = commande;
      this.details_opened = true;
    },
    showPay(commande){
      this.active_commande = commande;
      this.pay_opened = true;
    }
  }
};
</script>
<style scoped>
.top{
  display: flex;
  justify-content: center;
}
.scrollable{
  overflow: auto;
  position: relative;
  height: calc(100vh - 91px);
}
table{
}
.active{
  color:#007799;
  font-size: 1.2em;
}
thead th{
  position: sticky;
  top: 0px;
}
tfoot th{
  position: sticky;
  bottom: 0px;
}
.right{
  text-align: right;
}
th, td{
  text-align: center;
}
@media screen and (max-width: 650px){
  .scrollable{
    overflow: inherit;
    position: relative;
    padding-bottom: inherit;
    height: inherit;
  }
}
</style>
