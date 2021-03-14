<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>mini page</h1>
        <v-text id="demo"> </v-text><br>
        <button @click="random(test)">test</button>
        <p id='CNumber'> </p>
        <div id='content'> </div>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'random',
    data() {
        return {
            test: null,
            rulet: [],
        };
    },
    components:{
        Navbar
    },
    methods: {
        random(){
           var test = Math.floor(Math.random() * 28)+1;
           document.getElementById("demo").innerHTML = test;
         //this.$router.push({path: '/Card' , params: {test}})
           console.log(test)
            this.$http.get("/rulet/ShowCard/"+test)
            .then((res) => {
            console.log(res.data)
            this.rulet = res.data;
            console.log(this.rulet)
            document.getElementById("CNumber").innerHTML = this.rulet[0].CNumber;
            document.getElementById("content").innerHTML = this.rulet[0].content;
            })
            .catch(function(err){
            console.log(err)
            })
        },
    //     getData(){
    //     var that = this;
    //     this.$http.get("/rulet/ShowCard/")
    //     .then((res) => {
    //       console.log(res.data)
    //       that.rulet = res.data;
    //       console.log(that.rulet)
    //     })
    //     .catch(function(err){
    //       console.log(err)
    //     })
    //   }
    }

}
</script>

<style>

</style>