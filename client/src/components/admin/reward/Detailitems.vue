<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br><br><br>
        
        <div class="container">
            <v-btn class="back-btn" @click="$router.back()"> <i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
            <div class="small-container single-product">
                <h1 class="admin">** หน้ารายละเอียดของแอดมิน **</h1>
                <div class="row">
                    <div class="col-2">
                        <img :src="item.galleryimage[elementIdSelected].image" width="100%" id="product-img">
                        <div class="small-img-row">
                            <div v-for="(image_item,index) in item.galleryimage" :key="image_item" class="small-img-col">
                                <img v-if="index == 0" :id="index" @click="changeImage(index)" :src="image_item.image"  class="small-img selected-image">
                                <img v-if="index != 0" :id="index" @click="changeImage(index)" :src="image_item.image"  class="small-img">
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <p>แลกของรางวัล/{{item.name}}</p>
                        <hr>
                        <h1>รางวัล: <span>{{item.name}}</span></h1>
                        <h1>แต้มที่ใช้: <span>{{item.cost}}</span> แต้ม</h1>
                        <h3>รายละเอียด</h3>
                        <p v-html="item.detail">{{item.detail}}</p>

                    </div>
                </div>
            </div>
            <br>
        </div>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "detail_doctrine",
    data (){
      return {
        item: null,
        index_for_change: 0,
        elementIdSelected: 0,
      }
    },
    components:{
      Navbar,
    },
    created: async function created() {
      await this.getData()
    },
    
    mounted: async function mounted() {
        await this.$http
        .get("/exchangeitem/DetailItem/"+this.$route.params.id)
        .then((res) => {
            console.log(res.data);
            // this.percent = (res.datadonate / this.amount)* 100
            this.item = res.data;
        })
        .catch(function(err) {
            console.log(err);
        });
    },
    methods: {
        changeImage(index){
                var element = document.getElementById(index);
                var element2 = document.getElementById(this.elementIdSelected)
                element2.classList.remove("selected-image");
                element.classList.add("selected-image");
                this.index_for_change = index
                this.elementIdSelected = index
            },
    },
};
</script>

<style scoped>
.admin{
    ffont-size: 25px;
    font-weight: 200;
    color: #D55F43;
}
.small-img{
    height: 100%;
    width: 100%;
}
.pointer {cursor: pointer;}
.single-item {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgb(247, 241, 241);
  position: relative;
  transition-duration: 0.3s;
  transition-property: transform;
  cursor: pointer;
}
.single-item:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
   background: radial-gradient(ellipse at center, rgba(248, 248, 248, 0.35) 0%, rgba(247, 244, 244, 0) 80%);
   transition-duration: 0.3s;
  transition-property: transform, opacity;
}
.single-item:hover, .single-item:focus, .single-item:active {
    transform: translateY(-5px);
    
}
.single-item:hover:before, .single-item:focus:before, .single-item:active:before {
  opacity: 1;
  transform: translateY(5px);
}
.selected-image{
    /* transform: scale(0.90); */
    border: 4px #D55F43 solid;
    /* background-color: rgb(172, 112, 112); */
}
a{
    text-decoration: none;
    color: #555;
}
/* mouse over link */
.row > a:hover {
  color: hotpink;
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
    min-width: 400px;
}
.col-2 img{
    max-width: 100%;
    height: 300px;
    margin-bottom: 20px;
}
.col-2 h1{
    font-size: 25px;
    font-weight: 200;
}
.col-2 h1 span{
    color: rgb(138, 138, 138);
}
.col-2 h4 span{
    color: rgb(138, 138, 138);
}
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
    /* color: #555; */
    font-weight: 200;
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
       /* padding: 20px; */
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
   .small-img-col > img{
       height: 100px;
   }
   /* Products section */
  #products{
    background:rgb(255, 255, 255);
  }
  .product-title{
    color: rgb(0, 0, 0);
  }
  .sub{
    color: #555;
    font-weight: normal;
  }

.single-item {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgb(247, 241, 241);
  position: relative;
  transition-duration: 0.3s;
  transition-property: transform;
  cursor: pointer;
}
.single-item:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
   background: radial-gradient(ellipse at center, rgba(248, 248, 248, 0.35) 0%, rgba(247, 244, 244, 0) 80%);
   transition-duration: 0.3s;
  transition-property: transform, opacity;
}
.single-item:hover, .single-item:focus, .single-item:active {
    transform: translateY(-5px);
    
}
.single-item:hover:before, .single-item:focus:before, .single-item:active:before {
  opacity: 1;
  transform: translateY(5px);
}
.img-container{
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 200px;
  width: 400px;
}

/* Grow Shadow */
.img-container{
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.img-container:hover, .product-img:focus, .product-img:active {
   box-shadow: 1px 0px 1px 4px rgba(247, 243, 243, 0.932);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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
           /* padding: 20px 0; */
       }
       .single-product h1{
           font-size: 26px;
           line-height: 36px;
       }
       .col-2 img{
            /* max-width: 90%; */
        }
   }
</style>