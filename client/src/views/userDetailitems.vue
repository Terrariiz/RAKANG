<template>
    <div>
       <div>
      <Navbar></Navbar>
    </div>
        <div class="container">
            <div class="small-container single-product">
                <div class="row">
                    <div class="col-2">
                        <img src="" width="100%" id="product-img">
                        <div class="small-img-row">
                            <div class="small-img-col">
                                <img src="" width="100%" class="small-img">
                            </div>

                            <div class="small-img-col">
                                <img src="" width="100%" class="small-img">
                            </div>

                            <div class="small-img-col">
                                <img src="" width="100%" class="small-img"> 
                            </div>

                            <div class="small-img-col">
                                <img src="" width="100%" class="small-img">
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <p>Items/ชื่อของ</p>
                        <h1>{{items.name}}</h1>
                        <h4>{{items.cost}}</h4>
                        <h3>detail</h3>
                        <p>{{items.detail}}</p>
                        <a href="" class="btn">Buy</a>
                    </div>
                </div>
            </div>
            <!-- title  -->
            <div class="small-container">
                <div class="row row-2">
                    <h2>Other Product</h2>
                    <p>View more</p>
                </div>
            </div>
            <br>
            <!-- featured product  -->
            <div class="small-container">
                <div class="row">
                    <div class="col-4">
                        <img src="">
                        <h4>ชื่อของ</h4>
                        <p>ราคา 500 แต้ม</p>
                    </div>
                     <div class="col-4">
                        <img src="">
                        <h4>ชื่อของ</h4>
                        <p>ราคา 500 แต้ม</p>
                    </div>
                     <div class="col-4">
                        <img src="">
                        <h4>ชื่อของ</h4>
                        <p>ราคา 500 แต้ม</p>
                    </div>
                     <div class="col-4">
                        <img src="">
                        <h4>ชื่อของ</h4>
                        <p>ราคา 500 แต้ม</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // import a from "../../public/image/bubble.png"
    const Navbar = () => import('@/components/navbar/navbar')
    export default {
        data (){
      return {
        items : []
        }
    },
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
        },
        mounted: async function mounted(){
       await this.$http.get("/exchangeitem/DetailItem" +this.$route.params.id)
       .then((res) => {
       this.items = res.data;
       })
       .catch(function(err){
        console.log(err)
      })
    },
    }
</script>


<style scoped>
a{
    text-decoration: none;
    color: #555;
}
p{
    color: #555;
}
.container{
    max-width: 1300px;
    margin: auto;
    padding-left: 25px;
    padding-right: 25px;
}
.row{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
}
.col-2{
    flex-basis: 50%;
    min-width: 300px;
}
.col-2 img{
    max-width: 100%;
    padding: 50px 0;
}
/* .col-2 h1{
    font-size: 50px;
    line-height: 62;
    margin: 25px 0;
    
} */
.btn{
    display: inline-block;
    background: #ff523b;
    color: #fff;
    padding: 8p 30px;
    margin: 30px 0;
    border-radius: 30px;
    transition: background 0.5s;
}
.btn:hover{
    background: #563434;
}
.small-container{
    max-width: 1080px;
    margin:auto;
    padding-left: 25px;
    padding-right: 25px;
    margin-bottom:65px ;
}
h4{
    color: #555;
    font-weight: normal;
}
.col-4 p{
    font-size: 14px;
}
.col-4{
    flex-basis: 25%;
    padding: 10px;
    min-width: 200px;
    margin-bottom: 50px;
}
.col-4 img{
    width: 100%;
}

   .single-product{
       margin-top:80px;
   }
   .single-product .col-2{
       padding: 20px;
   }
   .single-product h4{
       margin: 20px 0;
       font-size: 22px;
       font-weight: bold;
   }
   .small-img-row{
       display: flex;
       justify-content: space-between;
   }
   .small-img-col{
       flex-basis: 24%;
       cursor: pointer;
   }
   @media only screen and (max-width: 600px){
       .row{
           text-align: center;
       }
       .col-2{
           flex-basis:100%;
       }
       .single-product .row{
           text-align:left;
       }
       .single-product .col-2{
           padding: 20px 0;;
       }
       .single-product h1{
           font-size: 26px;
           line-height: 36px;
       }
   }
</style>