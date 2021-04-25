<template>
    <div>
       <div>
      <Navbar></Navbar>
    </div>
    <br><br><br><br>
        <div class="container">
            <!-- zoom container start -->
            <div class="xzoom-container">
                <img src="../../public/image/bubble.png">
            </div>
            <!-- zoom container end -->

            <!-- description start  -->
            <div class="description">
                <h1>หัวข้อเรื่อง</h1>
                <p>
                    ดีเทล
                </p>
                <span>
                    $150
                </span>
            </div>
            <!-- description end  -->
        </div>
    </div>
</template>

<script>
// import a from "../../public/image/bubble.png"
    const Navbar = () => import('@/components/navbar/navbar')
    export default{
        components: {
      Navbar
    },
    }
</script>


<style scoped>
   .container{
       width: 940px;
       margin: 50px auto 0;
       background-color: rgb(150, 110, 110);
       padding: 15px;
       border-radius: 5px;
       display: grid;
       grid-template-columns:1fr 1fr ;
   }
</style>