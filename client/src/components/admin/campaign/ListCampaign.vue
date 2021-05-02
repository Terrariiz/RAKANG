<template>
  <div class='ListCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
    <br><br>
    <v-overlay :value="isloading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    <div id ='headaddnews'>
        <div class="text-center">
          
            <v-btn rounded color="primary" dark to = "/admin/addCampaign">เพิ่มแคมเปญ</v-btn>
  
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
                <td><center><img :src="campaign.image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td>
                <td>{{ campaign.name }}</td>
                <td>{{ campaign.date }}</td>
                <td>{{ campaign.amount }}</td>
                <!-- <td v-html="campaign.content">{{ campaign.content }}</td> -->
                <td>
                  <!-- <router-link :to="`/admin/listdoctrine/${doctrine._id}`">detail</router-link> -->
                  <!-- <router-link :to="{name : 'DetailDoctrine', params: {id:doctrine._id}}">detail</router-link> -->
                  <v-btn style="margin-right:3%;" @click="ViewCampaign(campaign._id)">view</v-btn>
                  <v-btn style="margin-right:3%;" @click="ViewLogCampaign(campaign._id)">Log</v-btn>
                  <v-btn style="margin-right:3%;" @click="EditCampaign(campaign._id)">Edit</v-btn>
                  <v-btn @click="DeleteCampaign(campaign._id)">Delete</v-btn>
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
import swal from "sweetalert2";
import {
  } from '@mdi/js'
import moment from "moment";
  export default {
    name : "ListCampaign",
    data (){
      return {
        campaigns : [],
        isloading:true,
        }
    },
    mounted: async function mounted(){
      await this.$http.get("/campaign/ShowListCampaign")
      .then((res) => {
        this.campaigns = res.data;
        this.isloading = false
        this.campaigns.sort(function(a, b){
            var dateA = new Date(a.startdate), dateB = new Date(b.startdate);
            return dateB -dateA;
        });
    //     movies.sort(function(a, b) {
    // var dateA = new Date(a.release), dateB = new Date(b.release);
    // return dateA - dateB;
// });

        console.log(res.data)
        
        console.log(this.campaigns)
        var i = 0
        for(this.campaigns[i];i<this.campaigns.length;i++){
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
        },
      Refresh(campaignid){
        console.log('sdfsdfsddf')
        this.campaigns = this.campaigns.filter(function(c){
          return c._id !== campaignid
        })
      },
      EditCampaign(campaignid){
        this.$router.push({ name: 'editCampaign' , params: {id : campaignid}})
      },
      DeleteCampaign(campaignid){
        const swalWithBootstrapButtons = swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("/campaign/DeleteCampaign/"+campaignid)
            console.log("delete")
            this.$router.push({ name: 'ListCampaign'})
            this.Refresh(campaignid)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Delete Campaign Success.',
              'success'
            )
          } 
        })
      },
      }
    
  }

</script>
<style scoped>
    #table{
        text-align: left;
        
    }
    #headaddnews{
        margin: 3%;
    }
    
</style>
