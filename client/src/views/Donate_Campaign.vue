<template>
<div>
    <div>
        <Navbar></Navbar>
        </div>
        <h1>donateCampaign</h1>

         <v-container rounded-xl style="background:linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%); 
       box-shadow:5px 6px 5px #888888; margin-top: 3%">
        <v-btn to='/campaign'><i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
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
                <div style="text-align:center; font-size:40px;"> {{campaign.name}} </div>
              </v-container>
              <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; width:70%;">  
               <div style="margin:5%" v-html="campaign.content"> {{campaign.content}}  </div>
              </v-container>

              <v-row>
                
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                    <!-- date -->
                    <v-col cols="4">
                      <h3>วันสิ้นสุดการรับบริจาค </h3>
                    <div>{{ campaign.date }} </div>
                    </v-col>
                
                    <!-- เงิน -->
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                      <v-col cols="4">
                        <h3>เป้าหมาย</h3>
                    <div>{{ campaign.amount }} บาท</div>
                      </v-col>
                
               </v-row>

               <v-row style="margin-top:3%;">
                <v-col  cols = "4"></v-col>
                <v-col  cols = "4"></v-col>

                <v-col  cols = "4">
                  <v-btn color="primary" style="float:left;" 
                  @click="donate($route.params.id)"
                  >บริจาค</v-btn>
                </v-col>
                  
              </v-row>

             
      </div>
      
      </v-container>   
    </div>
</template>
<script>
const Navbar = () => import('@/components/navbar/navbar')

export default {
    name:'Campaign',
    components:{
        Navbar
    },
    data (){
      return {
        campaign: null
        }
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
    }
}
</script>

<style>

</style>