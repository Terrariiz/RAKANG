<template>
  <div class='ListCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
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
                 
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                 Date
                </th>
                <th class="text-left">
                 Amount
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
                  <v-btn @click="ViewLogCampaign(campaign._id)">Log</v-btn>
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
import {
  } from '@mdi/js'
import moment from "moment";
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
        var i = 0
        for(this.campaigns[i];;i++){
            this.campaigns[i].date = moment(this.campaigns[i].date).format(" DD-MM-YY A");
            } 
      })
      .catch(function(err){
        console.log(err)

      })
    },
    components: {
      Navbar
    },
    methods: {
      ViewCampaign(campaignid){
        this.$router.push({ name: 'DetailCampaign' , params: {id : campaignid}})
        },
      ViewLogCampaign(campaignid){
        this.$router.push({ name: 'LogDonate' , params: {id : campaignid}})
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
