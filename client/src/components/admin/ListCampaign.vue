<template>
  <div class='ListCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>This is add campaign page.</h1>
    <div id ='headaddnews'>
        <div class="text-center">
          
            <v-btn rounded color="primary" dark to = "/admin/addCampaign">Add CAMPAIGN</v-btn>
  
            <!-- <v-btn rounded color="primary"  to = "/addnews" >Add NEWS</v-btn> -->
        </div>
    </div>
    <v-container>
      <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr   @submit.prevent="editcampaign" v-for="campaign in campaigns"  :key="campaign._id">
                <td><center><img :src="'http://localhost:4000/uploads/' + campaign.image" class="img-fluid" style="width: 700px; height: 480px; object-fit: cover;" align="center"></center></td>
                <td>{{ campaign.name }}</td>
                <td>{{ campaign.date }}</td>
                <td>{{ campaign.amount }}</td>
                <td v-html="campaign.content">{{ campaign.content }}</td>
                <td>
                  <!-- <router-link :to="`/admin/listdoctrine/${doctrine._id}`">detail</router-link> -->
                  <!-- <router-link :to="{name : 'DetailDoctrine', params: {id:doctrine._id}}">detail</router-link> -->
                  <button @click="ViewCampaign(campaign._id)">view</button>
                  
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
const Navbar = () => import('@/components/navbar/admin_navbar')
import {
  } from '@mdi/js'

  export default {
    name : "ListCampaign",
    data (){
      return {
        campaigns : []
        }
    },
    mounted: async function mounted(){
      await this.$http.get("/campaign/ShowListCampaign")
      .then((res) => {
        console.log(res.data)
        this.campaigns = res.data;
        console.log(this.campaigns)
      })
      .catch(function(err){
        console.log(err)

      })
    },
    components: {
      Navbar
    },
    methods: {
      // async ViewDoctrine(doctrineid){
      //   await this.$http.get("/DetailDoctrine/"+doctrineid)
      //   .then((res)=> {

      //   })
      // }
      ViewCampaign(campaignid){
        this.$router.push({ name: 'DetailCampaign' , params: {id : campaignid}})
          
        }
      }
    
  }

</script>
<style>
    #table{
        text-align: left;
        
    }
    #headaddnews{
        margin: 3%;
    }
    
</style>
