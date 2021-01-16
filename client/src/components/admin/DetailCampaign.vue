<template>
  <div class='DetailCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
      <h1>detail page</h1>
      {{$route.params.id}}
      <div  v-if="campaign" >
                
              <center>
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
               <div>  <button @click="DeleteCampaign($route.params.id)">Delete</button> </div> 
      </div>
      
        
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