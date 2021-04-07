<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>mini page</h1>
        <div id="test">
        <label for="fname" >Prayer:</label>
        <input type="text" id="aaa" name="fname"><br><br>
        </div>
        <button @click="lantern()">test</button>
        
    </div>

</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'lantern',
    components:{
        Navbar
    },
    methods: { 
        lantern(){
            var x = document.getElementById("test");
            console.log(x)
            if (x.style.display === "none") {
            x.style.display = "block";
            } else {
            x.style.display = "none";
            }
        },
    }

}
</script>

<style>
/* #test {
  width: 100%;
  padding: 50px 0;
  text-align: center;
  background-color: lightblue;
  margin-top: 20px;
} */
</style>