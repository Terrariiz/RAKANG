<template>
    <div>   
      <div>
      <Navbar></Navbar>
    </div>
    <br><br>
    <div id ='headaddnews'>
        <div class="text-center">
            <v-btn rounded color="primary" dark to = "/admin/addCampaign">เพิ่มของรางวัล</v-btn>
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
                <tr>  <!-- @submit.prevent="editcampaign" v-for="campaign in campaigns"  :key="campaign._id" -->
                <!-- :src="'http://localhost:4000/image/campaign/' + campaign.image" -->
                <td><center><img  class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td> 
                <td>
                    <!-- {{ campaign.name }} -->
                </td>
                <td>
                    <!-- {{ campaign.date }} -->
                </td>
                <td>
                    <!-- {{ campaign.amount }} -->
                </td>
                
                <td>
                  <v-btn style="margin-right:3%;">view</v-btn><!-- @click="ViewCampaign(campaign._id)" -->
                  <v-btn style="margin-right:3%;">Log</v-btn><!-- @click="ViewLogCampaign(campaign._id)" -->
                  <v-btn style="margin-right:3%;">Edit</v-btn><!-- @click="EditCampaign(campaign._id)" -->
                  <v-btn >Delete</v-btn><!-- @click="DeleteCampaign(campaign._id)" -->
                </td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
    </v-container>
  </div>
</template>


<script>
const Navbar = () => import('@/components/navbar/navbar')
    export default{
        components: {
      Navbar
    },
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