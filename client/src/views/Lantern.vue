<template>
    <div >
        <div>
        <Navbar></Navbar>
        </div>
        <div class= 'bg'>
        <br><br><br><br>
        <h1>mini page</h1> 
    <center>
				<div id="test1" class="controller">
					<img src="../assets/images/360.png">
				</div>
				<br><br><br><br><br><br><br><br>
				<label id="test" for="fname" >Prayer:</label>
				<input id="test3" type="text" name="fname"><br><br>
				<button id="test2" @click="lantern()">test</button>
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
			var element = document.getElementById("test1");
			element.classList.remove("controller");
			element.classList.add("example");
			setTimeout(() =>  swal.fire("Thank You"), 6000);
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
        /* position: absolute;
        width: 150px;
        height: 150px;
        z-index: 100;
        bottom: 20px;
        left: 50%;
        margin-left: -12px; */
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
/* @keyframes shake {
	0% {
		transform : rotate(10deg) scale(1);
	}
	50% {
		transform : rotate(-10deg) scale(1);
	}
	100% {
		transform : rotate(10deg) scale(1);
	}
}
@keyframes innerlightbreathe {
	0% {
		height : 30px;
		width : 30px;
		opacity : 0.1;
		top : 35px;
		left : 10px;
	}
	20% {
		-webkit-clip-path : inset(0px 0px 0px 0px);
		clip-path : inset(0px 0px 0px 0px);
	}
	50% {
		height : 60px;
		width : 60px;
		opacity : 0.5;
		top : 5px;
		left : -5px;
		-webkit-clip-path : inset(0px 5px 0px 5px);
		clip-path : inset(0px 5px 0px 5px);
	}
	80% {
		-webkit-clip-path : inset(0px 0px 0px 0px);
		clip-path : inset(0px 0px 0px 0px);
	}
	100% {
		height : 30px;
		width : 30px;
		opacity : 0.1;
		top : 35px;
		left : 10px;
	}
}
@keyframes outerlightbreathe {
	0% {
		height : 100px;
		width : 100px;
		top : -10px;
		left : -20px;
	}
	50% {
		height : 200px;
		width : 200px;
		top : -60px;
		left : -70px;
	}
	100% {
		height : 100px;
		width : 100px;
		top : -10px;
		left : -20px;
	}
}
.lantern {
	z-index : 999;
	position : absolute;
	height : 70px;
	width : 50px;
	transform-origin : top center;
	animation : shake 4s ease-in-out infinite;
    
}
.lanternBody {
	position : absolute;
	background-color : #756b3c;
	height : 70px;
	width : 50px;
	border-radius : 15px 15px 25px 25px;
}
.outerLight {
	z-index : -1;
	position : absolute;
	background-image:
		radial-gradient(rgba(117, 107, 60, 1.0), rgba(117, 107, 60, 0.0), rgba(117, 107, 60, 0.0));
	opacity : 0.5;
	border-radius : 50%;
	animation : outerlightbreathe 3s ease-in-out infinite;
}
.innerLight {
	position : absolute;
	background-image:
		radial-gradient(rgba(255, 241, 181, 1.0), rgba(255, 241, 181, 1.0), rgba(255, 241, 181, 0.0));
	border-radius : 50%;
	animation : innerlightbreathe 3s ease-in-out infinite;
}
center {
	position : absolute;
	top : 50%;
	left : 50%;
}
.example2 {
 height: 250px;	
 overflow: hidden;
 position: relative;
}
.example2 h3 {
 position: absolute;
 width: 100%;
 height: 100%;
 margin: 0;
 line-height: 50px;
 text-align: left; */

 /* Apply animation to this element */	
 /* animation: example2 10s ease-out;
} */
/* Move it (define the animation) */
/* @keyframes example2 {
 0%   { 
 transform: translateY(200%); 		
 }
 100% { 
 transform: translateY(0%); 
 }
} */
/* #test {
  width: 100%;
  padding: 50px 0;
  text-align: center;
  background-color: lightblue;
  margin-top: 20px;
} */
</style>