<template>
  <div class="LogDonate">
    <div>
      <Navbar></Navbar>
    </div>
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
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
    </v-container>    
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
  name: 'Admin',
  components:{
    Navbar
  },
  data () {
      return {
        search: '',
        headers: [
          {text: 'ชื่อแคมเปญ',value: 'Campaign',},
          { text: 'จำนวนเงินที่บริจาค(บาท)', value: 'amonut' },
          { text: 'วัน-เดือน-ปี', value: 'date' },
          
        ],
      }
  }
      
}



</script>
