<template>
  <div>
    <div>
      <Navbar></Navbar>
       <!-- <div>
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
                        <h1>ชื่อของ</h1>
                        <h4>ราคา</h4>
                        <h3>detail</h3>
                        <p>บอกรายละเอียด</p>
                        <a href="" class="btn">Buy</a>
                    </div>
                </div>
            </div> -->
            <!-- title  -->
            <!-- <div class="small-container">
                <div class="row row-2">
                    <h2>Other Product</h2>
                    <p>View more</p>
                </div>
            </div>
            <br> -->
            <!-- featured product  -->
            <!-- <div class="small-container">
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

        </div> -->
    </div>
    <br><br><br>
    <!-- อันใหม่ -->
    <v-btn class="back-btn" @click="$router.back()"> <i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
      <section class="header">
        <!-- <h1>หลักธรรม</h1> -->
        <!-- <h4>ชื่อหัวข้อเรื่อง</h4> -->
      </section>
      <hr>
      <section class="content-container">
        <div class="left-content">
          <h2>{{ item.name }}</h2>
          <div class="date-news">
            ยอดคงเหลือ: {{ item.remain }}
          </div>
          <div class="date-news">
            แต้มบุญที่ใช้แลก: {{ item.cost }}
          </div>
          <div class="featured-article">
            <img  :src="item.overviewimage">
            <p v-html="item.detail">{{ item.detail }}</p>
          </div>
          <!-- <div class="another-article">
            <h3>another article</h3>
            <img >
            <p></p>
            <button class="btn read-more-btn">อ่านเพิ่มเติม</button>
          </div> -->
        </div>
        <!-- <div class="right-content">
          <div class="topics">
              <h5>หัวข้อเพิ่มเติม</h5>
            </div>
          <div class="avatar-content">
            <h5>แคมเปญแนะนำ</h5>
            <img :src="campaigns[showcampaign].image">
            <p>{{ campaigns[showcampaign].name }}</p>
          </div>
          <div class="avatar-content">
            <h5>ข่าวแนะนำ</h5>
            <img :src="news[shownews].image">
            <p>{{news[shownews].title}}</p>
          </div>
        </div> -->
      </section>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "detail_doctrine",
    data (){
      return {
        item: null,
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
            
    },
};
</script>

<style scoped>
.back-btn{
    position: absolute;
    left: 15%;
}
.project-header{
  background-color: #fff8ec;
}
.project-content{
    padding-right: 40px;
    
}
.image .-fullwidth{
  width: 100%;
}
.image{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  
  width: 100%;
  

}
.img-responsive{
  display: block;
  max-width: 100%;
  height: auto;
}
img{
  vertical-align: middle;
  border: 0;
}
.fund-raising{
    border-radius: 6px;
    background-clip: padding-box;
    color: #666;
    border: 1px solid #f3d9ab;
    background-color: #fff;
    z-index: 999;
}
.fund-raising .body{
   padding: 30px 25px 0  25px;
}
.fund-raising .action{
   padding: 30px 25px 30px 25px;
}
@media(max-width: 767px){
    .project-content {
    padding-right: 0;
}
}
/* อันใหม่ */
.date-news{
  color: #a9a9a9;
  font-size: 13px;
}
.header{
  text-align: center;
  margin-top:3% ;
  margin-bottom: 2%;
}
h1{
  font-size: 50px;
}
h2,h4,h5{
  font-weight: 100;
}
hr{
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
}
.content-container{
  display: grid;
  grid-template-areas:'left-content right-content' ;
  width: 60%;
  margin: auto;
  grid-gap:50px;
  text-align: left;
}
.featured-article, .another-article{
  margin-top: 2%;
  margin-bottom: 2%;

}
.another-article h3, p{
  margin-bottom:10px ;
}
img{
  height:400px;
  width: 700px;
}
.read-more-btn{
  background-color: black;
  border: none;
  color: white;
  float: right;
  padding: 10px 20px 10px 20px;
}
.read-more-btn:hover{
  background-color: #a9a9a9;
}
.right-content img{
  height: 200px;
  width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
}
.topics{
  margin-bottom: 20%;
}
.topics h5{
  background-color: black;
  color: white;
  padding: 10px;
  text-align: center;
  margin-bottom: 2%;
}
@media(max-width:1299px){
  .content-container{
    grid-template-areas:'left-content''right-content' ;
    width: 70%;
    margin: auto;

  }
  hr{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2%;
  }

}
/* อันใหม่ */
</style>