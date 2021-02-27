<template>
  <div class="Rank">
    <div>
      <Navbar></Navbar>
    </div>
    <h1>Ranking Board</h1>
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
      :items="User"
      :search="search"
    ></v-data-table>
  </v-card>
    </v-container>    
  </div>
</template>
<script>
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
  },
  data (){
      return {
        User : [],
        search: '',
        headers: [
          { text: 'ชื่อผู้บริจาค',value: 'Username',},
          { text: 'จำนวนเงินที่บริจาค(บาท)', value: 'amount' },
          { text: 'Point', value: 'point' },
          
        ],
        }
    },
  mounted: async function mounted(){
      await this.$http.get("/user/RankList")
      .then((res) => {
        this.User = res.data;
        
        console.log(res.data)
      })
      .catch(function(err){
        console.log(err)

      })
    },
}
</script>

