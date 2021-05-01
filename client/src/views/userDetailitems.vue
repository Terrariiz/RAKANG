<template>
    <div>
       <div>
      <Navbar></Navbar>
    </div>
        <div class="container">
            <div class="small-container single-product">
                <div class="row">
                    <div class="col-2">
                        <img :src="items.galleryimage[index_for_change].image" width="100%" id="product-img">
                        <div class="small-img-row">
                            <div v-for="(image_item,index) in items.galleryimage" :key="image_item" class="small-img-col">
                                <img v-if="index == 0" :id="index" @click="changeImage(index)" :src="image_item.image" width="100%" class="small-img selected-image">
                                <img v-if="index != 0" :id="index" @click="changeImage(index)" :src="image_item.image" width="100%" class="small-img">
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <p>แลกของรางวัล/ชื่อของ</p>
                        <h1>{{items.name}}</h1>
                        <h4>แต้มที่ใช้ : {{items.cost}}  แต้ม</h4>
                        <h3>รายละเอียด</h3>
                        <p>{{items.detail}}</p>
                        <a href="" class="btn">แลก</a>
                    </div>
                </div>
            </div>
            <!-- title  -->
            <div class="small-container">
                <div class="row row-2">
                    <h2>ของรางวัลอื่นๆ</h2>
                    <a href="/items">View more</a>
                </div>
            </div>
            <br>
            <!-- featured product  -->
            <div class="small-container">
                <div class="row">
                    <div v-for="otheritem in otheritems" :key="otheritem" class="col-4">
                        <img :src="otheritem.galleryimage[0].image">
                        <h4>{{otheritem.name}}</h4>
                        <p>ราคา {{otheritem.cost}} แต้ม</p>
                    </div>
                     <!-- <div class="col-4">
                        <img :src="otheritems[1].galleryimage[0].image">
                        <h4>{{otheritems[1].name}}</h4>
                        <p>ราคา {{otheritems[1].cost}} แต้ม</p>
                    </div>
                    <div class="col-4">
                        <img :src="otheritems[2].galleryimage[0].image">
                        <h4>{{otheritems[2].name}}</h4>
                        <p>ราคา {{otheritems[2].cost}} แต้ม</p>
                    </div> -->
                    <!-- <div class="col-4">
                        <img :src="otheritems[3].galleryimage[0].image">
                        <h4>{{otheritems[3].name}}</h4>
                        <p>ราคา {{otheritems[3].cost}} แต้ม</p>
                    </div> -->
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
        items : [],
        otheritems: [],
        index_for_change: 0,
        elementIdSelected: 0,
        }
    },
        components: {
      Navbar
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
            randomOtherItem(){
                var index = this.otheritems.findIndex(this.findSameItem)
                this.otheritems.splice(index,1)
                if(this.otheritems.length > 4){
                    this.otheritems = this.otheritems.slice(4,this.otheritems.length-4)
                }
            },
            findSameItem(value){
                if(value._id == this.items._id){
                    return value
                }
            },
            // function () {
            // zoom(".xzoom, .xzoom-gallery").xzoom({
            //     zoomWidth: 400,
            //     tint: "#333",
            //     Xoffset: 15,
            //     });
            //  },
        },
        mounted: async function mounted(){
       await this.$http.get("/exchangeitem/DetailItem/" +this.$route.params.id)
       .then((res) => {
       this.items = res.data;
       })
       .catch(function(err){
        console.log(err)
      })
      await this.$http.get("/exchangeitem/ShowListItem")
      .then((res) => {
      this.otheritems = res.data;
      this.randomOtherItem()
       })
      .catch(function(err){
        console.log(err)
      })
    },
    }
</script>


<style scoped>
.selected-image{
    border: 5px solid red;
}
a{
    text-decoration: none;
    color: #555;
}
/* mouse over link */
a:hover {
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