<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
    <!-- อันใหม่ -->
      <section class="header">
        <h1>หลักธรรม</h1>
        <!-- <h4>ชื่อหัวข้อเรื่อง</h4> -->
      </section>
      <hr>
      <section class="content-container">
        <div class="left-content">
         <!-- ปุ่ม bookmark -->
                <div v-if="$store.getters.UserIsLoggedIn">
                  <v-btn
                    icon
                    v-model="bookmark.value"
                    v-if="bookmark.value == false"
                    @click="clickBookmarks()"
                  >
                    <v-icon x-large>mdi-bookmark</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="#ffb703"
                    v-model="bookmark.value"
                    @click="clickBookmarks()"
                    v-if="bookmark.value == true"
                  >
                    <v-icon x-large>mdi-bookmark</v-icon>
                  </v-btn>
                  
              
                </div>
          <h2>{{ doctrine.title }}</h2>
          <div class="date-news">
            วันที่โพสต์: {{ doctrine.edittime }}
          </div>
          <div class="date-news">
            หมวดหมู่: {{ doctrine.categories }}
          </div>
          <div class="featured-article">
            <img  :src="doctrine.image">
            <p v-html="doctrine.content">{{ doctrine.content }}</p>
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
            <h5>ข่าวแนะนำ</h5>
            <img :src="news[shownews].image">
            <p>{{news[shownews].title}}</p>
            
          </div>
        </div>
      </section>
      <!-- อันใหม่ -->
    <!-- <div class="project-header">
      <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ doctrine.title }}</h1>
                ปุ่ม bookmark
                <div v-if="$store.getters.UserIsLoggedIn">
                  <v-btn
                    icon
                    v-model="bookmark.value"
                    v-if="bookmark.value == false"
                    @click="clickBookmarks()"
                  >
                    <v-icon x-large>mdi-bookmark</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="#ffb703"
                    v-model="bookmark.value"
                    @click="clickBookmarks()"
                    v-if="bookmark.value == true"
                  >
                    <v-icon x-large>mdi-bookmark</v-icon>
                  </v-btn>
                  
              
                </div>
            </v-col>
            <v-col cols="12">
                <p class="duration">วันที่โพสต์ {{ doctrine.edittime }}</p>
                <p class="location">หมวดหมู่ {{ doctrine.categories }}</p>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <div class="project-content">
              <img
                class="image -fullwidth img-responsive"
                id="showimage"
                :src="'http://localhost:4000/image/doctrine/' + doctrine.image"
              />
              <div class="lead" v-html="doctrine.content">{{ doctrine.content }}</div>
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
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "detail_doctrine",
    data (){
      return {
        doctrine: [],
        bookmark: [],
        showcampaign:0,
        shownews:0,
        news:[],
        campaigns:[]
      }
    },
    components:{
      Navbar,
      Footer
    },
    created: async function created() {
      await this.getData()
    },
    
     mounted: async function mounted() {
    await this.$http
      .get("/campaign/ShowListCampaign")
      .then((res) => {
        console.log(res.data);
        // this.percent = (res.datadonate / this.amount)* 100
        this.campaigns = res.data;
        this.showcampaign = this.randomcampaign(this.campaigns.length);
        
      })
      .catch(function(err) {
        console.log(err);
      });
       await this.$http
      .get("/news/ShowListNews")
      .then((res) => {
        this.news = res.data;
        this.shownews = this.randomcampaign(this.news.length);
        console.log(this.shownews);
      })
       .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
        getData(){
            var IsFav
            if(this.$store.getters.UserIsLoggedIn){
              var id = localStorage.getItem("user_id")
            }
            this.$http.get("/doctrine/DetailDoctrine/"+this.$route.params.id)
            .then((res) => {
                console.log(res.data)
                this.doctrine = res.data;
                console.log(this.doctrine)
                
                if(moment(this.doctrine.edittime).format('dddd') == 'Mondey'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันจันทร์ DD-MM-YYYY ");
                } else if(moment(this.doctrine.edittime).format('dddd') == 'Tuesday'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันอังคาร DD-MM-YYYY ");
                } else if(moment(this.doctrine.edittime).format('dddd') == 'Wednesday'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันพุธ DD-MM-YYYY ");
                } else if(moment(this.doctrine.edittime).format('dddd') == 'Thursday'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันพฤหัสบดี DD-MM-YYYY ");
                } else if(moment(this.doctrine.edittime).format('dddd') == 'Friday'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันศุกร์ DD-MM-YYYY ");
                } else if(moment(this.doctrine.edittime).format('dddd') == 'Saturday'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันเสาร์ DD-MM-YYYY ");
                } else if(moment(this.doctrine.edittime).format('dddd') == 'Sunday'){
                    this.doctrine.edittime = moment(this.doctrine.edittime).format(" วันอาทิตย์ DD-MM-YYYY ");
                }
                if(this.$store.getters.UserIsLoggedIn){
                  this.$http.get("/user/"+id+"/CheckFav/"+this.doctrine._id).then((res) => {
                      console.log(res.data.result)
                      IsFav = res.data.result
                      this.bookmark = {doctrinesID: this.doctrine._id, value: IsFav}
                  })
                } 
            })
        .catch(function(err){
          console.log(err)
        })
      },
       randomcampaign(lengthoflist){
          var list =  Math.floor(Math.random() * lengthoflist);
          return list;
      },
      //เปลี่ยน value ใน bookmark

      clickBookmarks(){
        var id = localStorage.getItem("user_id")
          if(this.bookmark.value == false){
            this.$http.post("/user/"+id+"/AddFavouriteDoctrine/"+this.$route.params.id)
            this.bookmark.value = !this.bookmark.value
          } else{
            this.$http.post("/user/"+id+"/RemoveFavouriteDoctrine/"+this.$route.params.id)
            this.bookmark.value = !this.bookmark.value
          }
      }
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