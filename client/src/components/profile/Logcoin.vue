<template>
  <div>
      <div>
      
      <Navbar></Navbar>
    </div>
    <h1>Coin Log</h1>
    <br>
    <div id ='headaddnews'>
        <div class="text-center">
        </div>
    </div>
    <v-container>
      <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                 
                </th>
                <th class="text-left">
                 วัน/เดือน/ปี 
                </th>
                <th class="text-left">
                 
                </th>
                <th class="text-left">
                 จำนวนเงิน
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr   @submit.prevent="editcampaign" v-for="campaign in campaigns"  :key="campaign._id">
                <td><center><img :src="'http://localhost:4000/uploads/' + campaign.image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td>
                <td>{{ campaign.name }}</td>
                <td>{{ campaign.date }}</td>
                <td>{{ campaign.amount }}</td>
                <!-- <td v-html="campaign.content">{{ campaign.content }}</td> -->
                <td>
                  <!-- <router-link :to="`/admin/listdoctrine/${doctrine._id}`">detail</router-link> -->
                  <!-- <router-link :to="{name : 'DetailDoctrine', params: {id:doctrine._id}}">detail</router-link> -->
                  <v-btn @click="ViewCampaign(campaign._id)">view</v-btn>
                  <v-btn to='/admin/logdonate'>Log</v-btn>
                </td>
                <!-- <td>{{ item.name }}</td>
                <td>
                  
                    <v-btn style="margin-left:5%; margin-top:3%; margin-bottom:3%;" class="ma-2"  color="purple" to = "/admin/editnews"  dark><v-icon dark>mdi-wrench</v-icon></v-btn>
                    <v-btn style="margin-left:5%; margin-top:3%; margin-bottom:3%;"><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn>
                  
                </td> -->
                <!-- <td>{{ item.calories }}</td> -->
              </tr>
            </tbody>
          </template>
      </v-simple-table>
    </v-container>
      
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    data(){
      return{
        log:[]
      }
    },
    mounted: function mounted() {
      this.getCoinLog()
    },
    name:'LogCoin',
    components:{
        Navbar
    },
    methods:{
      getCoinLog(){
        var id = window.localStorage.getItem("user_id")
        this.$http.get("/coinlog/coinloglist/"+id)
        .then((res) => {
          console.log(res.data)
          this.log = res.data;
          console.log(this.log)
        })
        .catch(function(err){
          
          console.log(err)
        })

      }
    }
}
</script>

<style>

</style>