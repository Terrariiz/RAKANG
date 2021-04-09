<template>
    <div >
        <div>
        <Navbar></Navbar>
        </div>
        <div class= 'bg'>
        <br><br><br><br>
        <h1>sky lantern</h1> 
    <center>
				<div id="test1" class="controller">
					<img src="../assets/images/360.png">
				</div>
				<br><br><br><br><br><br><br><br>
				<div class="box" id="box"> 
				<label id="test" for="fname" >คำอธิฐาน</label>
				<input id="test3" type="text" name="fname"><br><br>
				<button id="test2" @click="lantern()">ส่ง</button>
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
          text: "Thank you",
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
  padding: 50px;
  margin-bottom: 100px;
}

</style>