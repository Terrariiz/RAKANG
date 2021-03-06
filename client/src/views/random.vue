<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>mini page</h1>
        <v-text id="demo"> </v-text><br>
        <button @click="random(test)">test</button>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'random',
    data() {
        return {
            test: null
        };
    },
    components:{
        Navbar
    },
    mounted: function(){
      this.getData()
    },
    methods: {
        random(){
           var test = Math.floor(Math.random() * 11);
           document.getElementById("demo").innerHTML = test;
        },
    //     getData(){
    //     var that = this;
    //     this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
    //     .then((res) => {
    //       console.log(res.data)
    //       that.campaign = res.data;
    //       console.log(that.campaign)
    //       that.campaign.date = moment(that.campaign.date).format(" dddd DD-MM-YY  A");
    //     })
    //     .catch(function(err){
    //       console.log(err)
    //     })
    //   },
    }

}
</script>

<style>

</style>