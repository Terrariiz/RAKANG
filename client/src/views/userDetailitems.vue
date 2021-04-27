<template>
    <div>
       <div>
      <Navbar></Navbar>
    </div>
    <br><br><br><br>
        <div class="container">
            <!-- zoom container start -->
            <div class="xzoom-container">
                <img class="xzoom" xriginal  src="../../public/image/bg1.jpg">
                <div class="xzoom-thumbs">

                    <a href="#">
                        <img class="zxoom-gallery" src="../../public/image/bubble.png" xpreviews="../../public/image/bubble.png">
                    </a>

                    <a href="#">
                        <img class="zxoom-gallery" src="../../public/image/bubble.png" xpreviews="../../public/image/bubble.png">
                    </a>

                    <a href="#">
                        <img class="zxoom-gallery" src="../../public/image/bubble.png" xpreviews="../../public/image/bubble.png">
                    </a>

                    <a href="#">
                        <img class="zxoom-gallery" src="../../public/image/bubble.png" xpreviews="../../public/image/bubble.png">
                    </a>

                </div>
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
                <div>
                    <button class="buy">แลกของ</button>
                </div>
            </div>
            <!-- description end  -->
        </div>
    </div>
</template>

<script>
    // import a from "../../public/image/bubble.png"
    const Navbar = () => import('@/components/navbar/navbar')
    export default {
        components: {
      Navbar
        },
        methods: {
            // function () {
            // zoom(".xzoom, .xzoom-gallery").xzoom({
            //     zoomWidth: 400,
            //     tint: "#333",
            //     Xoffset: 15,
            //     });
            //  },
        }
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
   .description{
       margin-right: 50px;
   }
   .description h1{
       margin:50px 0 10px 0;
       font-weight: 300;
   }
   .description p{
       font-size: 15px;
       
   }
   .description span{
       margin-top: 15px;
       display: inline-block;
       font-weight: 600;
       font-size: 30px;
       color:#353535
   }
   .description button{
       font-size: 18px;
       padding: 15px 50px;
       margin-top: 40px;
       cursor: pointer;
       border: 0;
       outline: none;
       color: #fff;
       box-shadow: 0 4px 6px 0 rgba(0,0,0,0.12);
   }
   .description .buy{
       background-color: #ff9f00;
       margin-left: 10px;
       border-radius: 10px;
   }
   .xzoom-thumbs a{
       text-decoration: none;
   }
   .xzoom-thumbs img{
       display: inline-block;
       height: 80px;
       width: 80px;
       border: 1px solid #ccc;
   }

   .xzoom-preview{
       border: 1px solid #e0e0e0;
       box-shadow: 0 4px 20px 2px rgba(0,0,0,0.2);
   }
   .active{
       border: 1px solid #4aaad2;
       box-shadow: 0 0 3px 0 #4aaad2;
   }
</style>