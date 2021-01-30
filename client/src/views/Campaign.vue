<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>Campaign</h1>
        <v-container >
            <v-row v-for="campaign in campaigns"  :key="campaign._id">
                <v-col>
                    <div style="margin:3%; font-size:30px;"> {{ campaign.name }} </div>
                    <v-img 
                    :src="'http://localhost:4000/uploads/' + campaign.image" 
                    class="img-fluid" style="width: 500px; height: 400px; object-fit: cover;  margin:3%;" 
                    align="center">
                    </v-img>
                </v-col>
                <v-col>
                    <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; ">  
               <div style="margin:5%">
                    <v-contianer >
                  <div style="float:right; margin-top:5%;">เป้าหมาย {{ campaign.amount }} บาท</div><br>
                  <div style="float:right; margin-top:5%;">วันสิ้นสุดการรับบริจาค {{ campaign.date }} </div>
                  <v-progress-linear   v-model="power"  color="amber" width="400"  height="25"><strong>{{ Math.ceil(power) }}%</strong></v-progress-linear>
                  <v-btn @click="ViewCampaign(campaign._id)" color="success" elevation="3" style="margin:3%; float:right;">รายละเอียด</v-btn>
              </v-contianer>
               </div>
              </v-container>
              
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from "moment";
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Campaign',
    components:{
        Navbar
    },
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
        console.log(this.campaigns[0])
        var i = 0
        for(this.campaigns[i];;i++){
            this.campaigns[i].date = moment(this.campaigns[i].date).format(" dddd DD-MM-YY  A");
            } 
      })
      .catch(function(err){
        console.log(err)
      })
    },
    methods: {
      ViewCampaign(campaignid){
        this.$router.push({ name: 'UserDetailCampaign' , params: {id : campaignid}})    
        }
      }

}
</script>

<style>

</style>