<template>
    <div >
        <div>
            <Navbar></Navbar>
        </div>
        <h1>test</h1>
        <v-container class="con">
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name2</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name3</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
        </v-container>

        
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')

export default {
    name : "test",
   
    components:{
        Navbar,
        
    },
    
     
    };
 
    
    
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
.con{
  /* background: blue; */
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 1000px;
}
.image-box{
  position: relative;
  display: inline-block;
  width: 250px;
  height: 350px;
  margin: 15px;
  border-radius: 40px;
  box-shadow: 5px 5px 5px rgba(68, 68, 68,.6),
              5px 5px 5px 3px rgba(68, 68, 68,.6);
}
.image-box::before{
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 251, 251, 0.4);
  transform: skew(-35deg);
  transform-origin: top left;
  transform: translate(350px,0);
  transition: 3s linear;
  z-index: 3;
}
.image-box:hover::before{
  transform: translate(-350px,0);
}
.image-box:hover img{
  transform: scale(1.3);
  overflow: hidden;
}
.contents .content-textx{
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100px;
  background: rgb(220, 20, 60);
  padding-top: 10px;
  text-align: center;
  color: white;
  transition: .3s cubic-bezier(.52,-0.30,.45,1.6);
  text-transform: uppercase;
  z-index: 4;
}
.image-box:hover .contents .content-textx{
  height: 65%;
}
.contents img{
  position: relative;
  display: inline;
  transition: 2s ease;
  z-index: -1;
}

</style>
