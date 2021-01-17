<template>
  <div class='DetailCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
      <!-- <h1>detail page</h1>
      {{$route.params.id}} -->
      <v-container rounded-xl style="background:linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%); 
       box-shadow:5px 6px 5px #888888; margin-top: 3%">
        <i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
      <div  v-if="campaign" >
        <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <!-- <div><i style="font-size: 50px; float:left;" class="fa fa-arrow-left" aria-hidden="true"></i></div> -->
              <a href="#"><br>
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/>
              </a>
              </div>
              </center>
              <v-container>
                <div style="text-align:center; font-size:40px;">{{ campaign.name }}</div>
              </v-container>
              <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; width:70%;">  
               <div style="margin:5%" v-html="campaign.content"> {{campaign.content }} </div>
              </v-container>

              <v-row>
                
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                    <!-- date -->
                    <v-col cols="4">
                      <h3>Date</h3>
                    <div>{{ campaign.date }}</div>
                    </v-col>
                
                    <!-- เงิน -->
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                      <v-col cols="4">
                        <h3>เงิน</h3>
                    <div>{{ campaign.amount }}</div>
                      </v-col>
                
               </v-row>

              <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:right;" @click="EditCampaign($route.params.id)">Edit</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:left;" @click="DeleteCampaign($route.params.id)">Delete</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
                <!-- test -->
              <!-- <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
              <a href="#">
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/>
              </a>
              </div>
              </center>

              <div>{{ campaign.name }}</div>
              <div>{{ campaign.date }}</div>
              <div>{{ campaign.amount }}</div>
                
              <div v-html="campaign.content">{{ campaign.content }}</div>
                
               <div>   <button @click="EditCampaign($route.params.id)">Edit</button>    </div>
               <div>  <button @click="DeleteCampaign($route.params.id)">Delete</button> </div>  -->
      </div>
      
      </v-container>   
  </div>

</template>

<script>
const Navbar = () => import('@/components/navbar/admin_navbar')
export default {
    name : "DetailCampaign",
    data (){
      return {
        campaign: null
        }
    },
    components:{
      Navbar
    },
    mounted: function(){
      this.getData()
    },
    methods: {
         getData(){
            var that = this;
       this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
      .then((res) => {
        console.log(res.data)
        that.campaign = res.data;
        console.log(that.campaign)
        
      
      })
      .catch(function(err){
        console.log(err)
      })
        },
      EditCampaign(campaignid){
        this.$router.push({ name: 'editCampaign' , params: {id : campaignid}})
      },
       DeleteCampaign(){
        this.$http.delete("/campaign/DeleteCampaign/"+this.$route.params.id)
        console.log("delete")
        this.$router.push({ name: 'ListCampaign'})
      },
    }
    
}
</script>

<style>
.showimage {
  
  width: 700px;
  height: 250px; 
  object-fit: cover;
}
</style>