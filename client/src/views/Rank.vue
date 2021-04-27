<template>
  <div class="Rank">
    <div>
      <Navbar></Navbar>
    </div>
    <br><br><br><br>
    <!-- <h1 style="text-align:center;">Ranking Board</h1>
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
    >
    <template User.fullname="{ User }">{{ User.firstname }} {{ User.lastname }}</template>
    </v-data-table>
  </v-card>
    </v-container>    -->

    <!-- อันใหม่  -->

      <v-container>
        <!-- tablist -->
    <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">
        ตารางอันดับ
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in head"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    
      <v-tabs-items  v-model="tab">
      <v-tab-item v-for="item in head"
        :key="item">
       <v-card >
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
      :items="filteredList"
      :search="search"
    >
    <template filteredList.fullname="{ User }">{{ filteredList.firstname }} {{ filteredList.lastname }}</template>
    </v-data-table>
  </v-card>

      </v-tab-item>
    </v-tabs-items>
    
    
  </v-card>
      </v-container>

    <!-- อันใหม่ -->
  </div>
</template>

<script>
// const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
    // Footer
  },
  data (){
      return {
        User : [],
        search: '',
        tab:0,

        headers: [
          { text: 'ลำดับ' ,value: 'Rank' },
          { text: 'ชื่อผู้บริจาค',value: 'firstname'},
          { text: 'Point', value: 'point' },
        ],
        
        head: [
          'Beginner', 'Bronze', 'Silver', 'Gold', 'Platinum',
        ],
        }
    },
  mounted: async function mounted(){
      await this.$http.get("/user/RankList")
      .then((res) => {
        this.User = res.data;
        console.log(res.data);
      })
      .catch(function(err){
        console.log(err)
      })
      await this.onbeforeunload()
    },
     computed: {
    filteredList() {
      console.log(this.tab)
      var newlist = this.User.filter(user => {
      var result = user.Rank.toLowerCase().includes(this.head[this.tab].toLowerCase())
          console.log("kuy")
          return result
          
      })
      return newlist
    }
  },
  methods:{
    onbeforeunload() {
  window.scrollTo(0, 0);
  }
  }
}
</script>
