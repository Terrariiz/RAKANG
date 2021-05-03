<template>
  <div class="LogDonate">
    <div>
      <Navbar></Navbar>
    </div>
    <br><br>
     <v-overlay :value="isloading">
        <v-progress-circular
        indeterminate
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
    <h1>Log Donate Admin</h1>
    <v-container >
      <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="loguser"
      :search="search"
    ></v-data-table>
  </v-card>
    </v-container>    
  </div>
</template>

<script>
import moment from "moment";
const Navbar = () => import('@/components/navbar/navbar')
export default {
  name: 'Admin',
  components:{
    Navbar
  },
  data () {
      return {
        loguser: [],
        search: '',
        isloading:true,
        headers: [
          {text: 'ชื่อผู้บริจาค',value: 'UserName',},
          { text: 'จำนวนเงินที่บริจาค(บาท)', value: 'amount' },
          { text: 'วัน-เดือน-ปี', value: 'date' },
          
        ],
      }
  },
  mounted: async function mounted() {
    const id = this.$route.params.id;
    await this.$http
      .get("donatelog/donatelogcampaign/" + id)
      .then((res) => {
        this.loguser = res.data.donatelist;
        this.isloading = false
        var i = 0
        for(this.loguser[i];;i++){
            this.loguser[i].date = moment(this.loguser[i].date).format(" DD-MM-YY HH:mm A");
            } 
      })
      .catch(function (err) {
        console.log(err);
      });
  }, 
}
</script>
