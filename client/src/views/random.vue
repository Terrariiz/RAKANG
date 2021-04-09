<template >
    <div >
       
        <div>
        <Navbar></Navbar>
        </div> 
        <div class="bg"></div>
        <div class='bg-text'>
        <h1>mini page</h1>
        <v-text id="demo"> </v-text><br>
        <!-- <div id="acab"> -->
        <img @click="random(test)" src="../assets/images/SEE.gif"><br><br>
        <!-- </div> -->
        <!-- <button @click="random(test)">test</button> -->
        <p id='CNumber'> </p>
        <div id='content'> </div>
        </div>
    </div>
</template>

<script>
// document.addEventListener('mousemove', function(ev){
// document.getElementById('acab').style.transform = 'translateY('+(ev.clientY-80)+'px)';
// document.getElementById('acab').style.transform += 'translateX('+(ev.clientX-100)+'px)';            
// },false);
import swal from "sweetalert2";
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
        //    document.getElementById("demo").innerHTML = test;
         //this.$router.push({path: '/Card' , params: {test}})
            this.$http.get("/rulet/ShowCard/"+test)
            .then((res) => {
            this.rulet = res.data;
            setTimeout(() =>   swal.fire({
                title: "ใบที่"+this.rulet[0].CNumber,
                text: this.rulet[0].content, 
                }), 1000);
            // document.getElementById("CNumber").innerHTML = this.rulet[0].CNumber;
            // document.getElementById("content").innerHTML = this.rulet[0].content;
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
.bg {
    height: 100vh;
    background-image: url("../assets/images/san.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(8px);
}
.bg-text{
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
img{
    cursor: pointer
}
/* #acab {
  position: fixed; 
  transition: transform 0.1s; 
  pointer-events: none 
} */
</style>