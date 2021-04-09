<template >
    <div >
       
        <div>
        <Navbar></Navbar>
        </div> 
        <div class="bg"></div>
        <br><br>
        <div class='bg-text'>
        <h1>seamsi</h1>
        <v-text id="demo"> </v-text><br>
        <!-- <div id="acab"> -->
        <center><img id="seam" @click="random(test)" src="../assets/images/seamsi2.png"></center>
        <center><img id="seam1"  src="../assets/images/ezgif.com-gif-maker.gif"></center>
        
        <br><br>
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
           var x = document.getElementById("seam");
           x.style.display = "none";
           var y = document.getElementById("seam1");
           y.style.display = "flex";
        //    document.getElementById("demo").innerHTML = test;
         //this.$router.push({path: '/Card' , params: {test}})
            this.$http.get("/rulet/ShowCard/"+test)
            .then((res) => {
            this.rulet = res.data;
            setTimeout(() =>    
        swal.fire({
          title: 'ใบที่'+ this.rulet[0].CNumber,
          text: this.rulet[0].content,
          showCancelButton: false,
          confirmButtonText: 'OK',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'Home'})
          } 
        }), 2000);
                
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
    background-image: url("../assets/images/Omikuji-5.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(3px);
}
.bg-text{
background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 40%;
  text-align: center;

}
img{
    cursor: pointer;
    height: 50%;
    width: 50%;
    position: center;
}
#seam1{
    
    display: none;
    
    
}
#seam{
    
    width: 100px;
    height: 300px;
}
/* #acab {
  position: fixed; 
  transition: transform 0.1s; 
  pointer-events: none 
} */
h1{
    margin-top: 50px;
    font-size: 72px;
    text-align: center;
    color: honeydew;
    text-transform: uppercase;
}
</style>