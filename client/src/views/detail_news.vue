<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
<!-- อันใหม่ -->
      <section class="header">
        <h1>ข่าวประชาสัมพันธ์</h1>
        <!-- <h4>ชื่อหัวข้อเรื่อง</h4> -->
      </section>
      <hr>
      <section class="content-container">
        <div class="left-content">
          <h2>{{ news.title }}</h2>
          <div class="date-news">
            วันที่โพสต์: {{ news.date }}
          </div>
          <div class="date-news">
            หมวดหมู่: {{ news.categories }}
          </div>
          <div class="featured-article">
            <img  :src="news.image">
            <p v-html="news.content">{{ news.content }}</p>
          </div>
          <div class="another-article">
            <h3>another article</h3>
            <img >
            <p></p>
            <button class="btn read-more-btn">อ่านเพิ่มเติม</button>
          </div>
        </div>
        <div class="right-content">
          <div class="topics">
              <h5>หัวข้อเพิ่มเติม</h5>
            </div>
          <div class="avatar-content">
            <h5>แคมเปญแนะนำ</h5>
            <img :src="campaigns[showcampaign].image">
            <p>{{ campaigns[showcampaign].name }}</p>
          </div>
          <div class="avatar-content">
            <h5>หลักธรรมแนะนำ</h5>
            <img :src="doctrine[showdoctrine].image">
            <p>{{doctrine[showdoctrine].title}}</p>
          </div>
        </div>
      </section>
      <!-- อันใหม่ -->
    <!-- <div class="project-header">
      <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ news.title }}</h1>
            </v-col>
            <v-col cols="12">
                <p class="duration">วันที่โพสต์ {{ news.edittime }}</p>
                <p class="location">หมวดหมู่ {{ news.categories }}</p>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <div class="project-content">
              <img
                class="image -fullwidth img-responsive"
                id="showimage"
                :src="'http://localhost:4000/image/new/' + news.image"
              />
              <div class="lead" v-html="news.content">{{ news.content }}</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div> -->
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import countapi from 'countapi-js';
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "detail_news",
    data (){
      return {
        campaigns: [],
        news: [],
        doctrine:[],
        showcampaign:0,
        showdoctrine:0
      }
    },
    components:{
      Navbar,
      Footer
    },
    created() {
      this.getData()
    },
    methods: {
        getData(){
            this.$http.get("/news/DetailNews/"+this.$route.params.id)
            .then(async (res) => {
                
                this.news = res.data;
                await countapi.get(this.news.count_api_namespace, this.news.count_api_key).then((result) => { 
                    this.news['view'] = result.value
                });
                if(moment(this.news.date).format('dddd') == 'Mondey'){
                    this.news.date = moment(this.news.date).format(" วันจันทร์ DD-MM-YY A");
                } else if(moment(this.news.date).format('dddd') == 'Tuesday'){
                    this.news.date = moment(this.news.date).format(" วันอังคาร DD-MM-YY A");
                } else if(moment(this.news.date).format('dddd') == 'Wednesday'){
                    this.news.date = moment(this.news.date).format(" วันพุธ DD-MM-YY A");
                } else if(moment(this.news.date).format('dddd') == 'Thursday'){
                    this.news.date = moment(this.news.date).format(" วันพฤหัสบดี DD-MM-YY A");
                } else if(moment(this.news.date).format('dddd') == 'Friday'){
                    this.news.date = moment(this.news.date).format(" วันศุกร์ DD-MM-YY A");
                } else if(moment(this.news.date).format('dddd') == 'Saturday'){
                    this.news.date = moment(this.news.date).format(" วันเสาร์ DD-MM-YY A");
                } else if(moment(this.news.date).format('dddd') == 'Sunday'){
                    this.news.date = moment(this.news.date).format(" วันอาทิตย์ DD-MM-YY A");
                }
            })
        .catch(function(err){
          console.log(err)
        })
      },
      randomcampaign(lengthoflist){
          var list =  Math.floor(Math.random() * lengthoflist);
          return list;
      }
    },
    mounted: async function mounted() {
    await this.$http
      .get("/campaign/ShowListCampaign")
      .then((res) => {
        console.log(res.data);
        // this.percent = (res.datadonate / this.amount)* 100
        this.campaigns = res.data;
        this.showcampaign = this.randomcampaign(this.campaigns.length);
        // console.log(this.campaigns);
        // console.log(this.campaigns[0]);
        

        
      })
      .catch(function(err) {
        console.log(err);
      });
       await this.$http
      .get("/doctrine/ShowListDoctrine")
      .then((res) =>{
        this.doctrine = res.data;
        this.showdoctrine = this.randomcampaign(this.doctrine.length);
        console.log(this.showcampaign);
      })
      .catch(function(err){
      console.log(err);
      });
  },
};
</script>

<style>
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