<template>
    <div >
        <div>
        <Navbar></Navbar>
        </div>
        <div class= 'bg'>
          <br><br><br><br> 
          <center>
              <div id="test1" class="controller">
                <img src="../assets/images/360.png">
              </div>
              <div class="controller2">
                <img src="../assets/images/360.png">
              </div>
              <div class="controller3">
                <img src="../assets/images/360.png">
              </div>
              <div class="controller4">
                <img src="../assets/images/360.png">
              </div>
              <div class="controller5">
                <img src="../assets/images/360.png">
              </div>
              <div class="controller6">
                <img src="../assets/images/360.png">
              </div>
              <div class="controller7">
                <img src="../assets/images/360.png">
              </div>
          
          <div class="box" id="box"> 
            <label id="test" for="fname" >คำอธิษฐาน</label>
            <v-text-field
              id="test3"
              single-line
              solo
              required
            >
            </v-text-field>
            <!-- <input id="test3" type="text" name="fname"><br><br> -->
            <v-btn color="primary" id="test2" @click="lantern()">ส่งคำอธิษฐาน</v-btn>
				</div>
        </center>
		</div>
    </div>

</template>

<script>
import swal from "sweetalert2";
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'lantern',
    components:{
        Navbar
    },
    methods: { 
        lantern(){
            var x = document.getElementById("test");
			x.style.display = "none";
			var y = document.getElementById("test2");
			y.style.display = "none";
			var z = document.getElementById("test3");
			z.style.display = "none";
			var a = document.getElementById("box");
			a.style.display = "none";
			var element = document.getElementById("test1");
			element.classList.remove("controller");
			element.classList.add("example");
			setTimeout(() =>  swal.fire({
          text: "ขอให้ผลบุญส่งเสริมให้คุณสมดังความปรารถนา",
          showCancelButton: false,
          confirmButtonText: 'OK',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'Home'})
          } 
        }), 6000);
        },
    }

}
</script>


<style scoped>
.example {
  width: 200px;
  height: 200px;
  position: relative;
  animation-name: example;
  animation-duration: 10s;
  animation-delay: -5s;
  animation-timing-function: ease-in;
}

@keyframes example {
  75% {left:0px; top:500px;}
  100% {left:0px; top:0px;} 
}

.controller {
        -webkit-animation: bounce-down 1.6s linear infinite;
        animation: bounce-down 1.6s linear infinite;

}
.controller2 {
        -webkit-animation: bounce-down 1.3s linear infinite;
        animation: bounce-down 2s linear infinite;
        position: absolute;
        left: 0%;
        top: 20%;
        height: 200px;
        width: 200px;
}
.controller3 {
        -webkit-animation: bounce-down 1s linear infinite;
        animation: bounce-down 1.6s linear infinite;
        position: absolute;
        left: 20;
        top: 10;
        height: 100px;
        width: 100px;
}
.controller4 {
        -webkit-animation: bounce-down 1.6s linear infinite;
        animation: bounce-down 1.6s linear infinite;
        position: absolute;
        left: 70%;
        top: 10%;
        height: 100px;
        width: 100px;
}
.controller5 {
        -webkit-animation: bounce-down 1.3s linear infinite;
        animation: bounce-down 1.6s linear infinite;
        position: absolute;
        left: 80%;
        top: 60%;
        height: 100px;
        width: 100px;
}
.controller6 {
        -webkit-animation: bounce-down 1.6s linear infinite;
        animation: bounce-down 1.9s linear infinite;
        position: absolute;
        left: 20%;
        top: 30%;
        height: 100px;
        width: 100px;
}
.controller7 {
        -webkit-animation: bounce-down 1.6s linear infinite;
        animation: bounce-down 1.6s linear infinite;
        position: absolute;
        left: 50%;
        top: 20%;
        height: 100px;
        width: 100px;
}
 
@-webkit-keyframes bounce-down {
       25% {
            -webkit-transform: translateY(-4px);
       }
       50%, 100% {
            -webkit-transform: translateY(0);
       }
       75% {
            -webkit-transform: translateY(4px);
       }
}
 
@keyframes bounce-down {
        25% {
             transform: translateY(-4px);
        }
        50%, 100% {
             transform: translateY(0);
        }
        75% {
             transform: translateY(4px);
        }
}



.bg {
    height: 100vh;
    background-image: url("../assets/images/lantern.jpg");
    background-size: cover;
    background-position: center;
    text-align: center;
    align-items: center;
    justify-content: center;
}
h1{
    color: aliceblue;
}
#test2{
    background-color: white;
}
.box{
  background-color: lightgrey;
  width: 300px;
  border: 10px solid black;
  padding: 20px;
  margin-bottom: 100px;
}
#test3{
  background-color: red;
}

</style>