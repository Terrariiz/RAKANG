<template>
    <div>
         <div>
      <Navbar></Navbar>
    </div>
     <v-overlay :value="isloading">
        <v-progress-circular
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
        <h1 >items</h1>
        <section id="products" class="products py-5">
  
    
      <div class="container">
        <h1 class="text-capitalize product-title">แลกของรางวัล</h1>        
        <div class='point'>แต้มสะสม: {{Profile.point}} </div>
        <div class="sub">นำแต้มสะสมที่มีมาแลกของรางวัลต่างๆ</div>
        <hr>
        <v-row>

          <v-col v-for="items in items" :key="items" cols="12" md="4" sm="12">
              <div @click="ViewItems(items._id)" class="card single-item">
          <div class="img-container">
            <img :src="items.galleryimage[0].image" class="card-img-top product-img" alt="">
           </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 id="item-name">{{items.name}}</h5>
              <span>{{items.cost}} แต้มสะสม</span>
              </div>
          </div>
        </div>
          </v-col>

        </v-row>
      </div>


    

    </section>
    </div>
</template>

<script>
 const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "Listitems",
     data (){
      return {
        items : [],
        isloading:true,
        Profile:{},
        }
    },
     mounted: async function mounted(){
      const id = window.localStorage.getItem("user_id");
      await this.$http.get("/exchangeitem/ShowListItem")
      .then((res) => {
      this.items = res.data;
      this.isloading = false
       })
      .catch(function(err){
        console.log(err)
      })
      await this.$http
      .get("/user/" + id)
      .then((res) => {
        this.Profile = res.data;
      
        console.log("get user data")
        console.log(this.Profile)
      })
      .catch(function (err) {
        console.log(err);
      });
    },
    components: {
      Navbar
    },
    methods: {
    ViewItems(itemsid){
      this.$router.push({
        name: "userDetailitems",
        params: {id:itemsid}
      })
    }
      }
}
</script>


<style scoped>
/* Products section */
.point{
  font-size: 20px;
  float: right;
}
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

</style>