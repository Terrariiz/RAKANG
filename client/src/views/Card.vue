<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>Card</h1>
        <p>{{random[0].CNumber}}</p>
        <div>{{random[0].content}}</div>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Card',
    data() {
        return {
            random: []
        };
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
        this.$http.get("/rulet/ShowCard/"+this.$route.params.id)
        .then((res) => {
          console.log(res.data)
          that.random = res.data;
          console.log(that.random)
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