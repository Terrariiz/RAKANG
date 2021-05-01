<template>
  <div >
    <div>
      <Navbar></Navbar>
    </div>
    
    <section >
      <div class="header"></div>
      <div class="text-box">
        <br><br><br><br>
        <h1>ยินดีต้อนรับเข้าสู่เว็บระฆังธรรม</h1>
        <p>เว็บที่รวบรวมหลักธรรมคำสอนของพระพุทธเจ้าและยังส่งเสริมการทำบุญออนไลน์ด้วยการบริจาค</p>
        
      </div>
    </section>
    
    <section class="campaign">
      <h1>แคมเปญ</h1>
      <p>โครงการรวบรวมเงินทุนบริจาค</p>

      <v-container v-if="newcampaign != null" class="container-news">
        <v-card   elevation="5" outlined >
        <v-row class="row-news">
          <v-col class="image-cam" cols="12" md="6">
            <center><div class="image-size">
              
              <img  class="image -fullwidth img-responsive" id="showimage" :src="newcampaign.image"/>
            </div></center>
          </v-col>
          <v-col class="colxx" cols="12" md="6">
            <v-container class="box-content">
                <h1 class="text-align-left"> {{newcampaign.name}} </h1>
                
              <div class="text-align-left">{{newcampaign.content}}</div>
              <div >
                <v-row>
                  <v-col style="text-align:left;" cols="12" md="3">
                    <span class="amount">วันสิ้นสุดโครงการ: </span><span>{{newcampaign.date}}</span><br>
                    <span class="amount">สถานที่:</span><span> {{newcampaign.location}}</span>
                  </v-col>
                  <v-col style="text-align:right;" cols="12" md="9">  
                    <span class="amount">ยอดบริจาค:</span><span> {{newcampaign.donate}} / {{newcampaign.amount}} บาท</span>
                  </v-col>
                </v-row>
              </div>
              <progress class="progress is-danger" :value="(newcampaign.donate/newcampaign.amount)*100" max="100"></progress>
              
              <div class="btn-news">
                <v-btn block style="background-color: #ffdd94; color:#455054;" @click="ViewCampaign(newcampaign._id)">
                  ดูเนื้อหา</v-btn
                >
              </div>
            </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
    </section>
      <!-- <center><div style="background:#fbe9e7; margin-top">Campaign</div></center> -->
      

      <!--  -->
     
      <div v-if="newcampaign != null" class="ytube">
        <v-row >
          <v-col class="headcam" cols="12" md="5">
            <!-- <h1>ลูกศร</h1> -->
            <img class="arrow" src="https://media2.giphy.com/media/LnhtN5kEFZxTstNJIX/giphy.gif">
          </v-col>
          <v-col  cols="12" md="7">
            <div @click="Clickpicture" id="cardsopens"  class="cards">
              <div class="imgBoxs">
                <img :src="newcampaign.image"/>
                <img :src="newcampaign.image"/>
              </div>
          
              <div class="details">
                <v-container>
                <div class="contents">
                  <div class="name-con" > {{newcampaign.name}} </div>
                  <div class="contents-con">{{newcampaign.content}}</div>
                
                <!-- <v-container>
                <progress class="progress is-danger" :value="(newcampaign.donate/newcampaign.amount)*100" max="100"></progress>
                </v-container> -->
                <div class="btn-news">
                  <v-row>
                    <v-col cols="12" >
                      <v-btn block style="background-color: #ffdd94; color:#455054;" @click="ViewCampaign(newcampaign._id)">ดูเนื้อหา</v-btn>
                    </v-col>
                    <!-- <v-col cols="12" md="6">
                      <v-btn block color="green" @click.stop="dialogDonate=true" >บริจาค</v-btn>
                  <DialogDonate :visible="dialogDonate" @close="dialogDonate=false" />
                    </v-col> -->
                  </v-row>
                </div>
                 
                <div class="social-icons">
                  <a href="#"></a>
                </div>
              </div>
              </v-container>
            </div>
          
          </div>
          </v-col>
        </v-row>
      </div>
     
      <!--  -->
    <!-- เก็บไว้ -->
    <!-- <section class="course">
      <h1>ข่าวล่าสุด</h1>
      <p>เป็นข่าวที่ใหม่ที่สุดของเว็บของเรา</p>
      <div class="rowx">
        <div class="course-col">
          <h3>Intermediate</h3>
          <p>loadwwadajnadajdajdbajdabjdajdajdawdd.
            dawdadadadwad
            dawddawdawdad
          </p>
        </div>
        <div class="course-col">
          <h3>Intermediate</h3>
          <p>loadwwadajnadajdajdbajdabjdajdajdawdd.
            dawdadadadwad
            dawddawdawdad
          </p>
        </div>
        <div class="course-col">
          <h3>Intermediate</h3>
          <p>loadwwadajnadajdajdbajdabjdajdajdawdd.
            dawdadadadwad
            dawddawdawdad
          </p>
        </div>
      </div>
    </section> -->
    <!-- เก็บไว้ -->

    <!-- hotnews -->
    <section v-if="doctrine != null" class="hotnews">
      <h1>ข่าวสารล่าสุด</h1>
      <p>รวบรวมข่าวสารใหม่ล่าสุดที่คอยอัพเดตตลอด ๒๔ ชั่วโมง</p>

      <div class="rowx">
          <div @click="ViewNews(news._id)" class="hotnews-col" v-for="news in filteredListnews " :key="news.title">
            <img :src="news.image">
            <div class="layer">
              <h3>{{news.title}}</h3>
            </div>
          </div>

      </div>
    </section>
    <!-- hotnews -->

    <!-- หลักธรรม -->
    <section v-if="news != null" class="doctrine">
      <h1>หลักธรรมล่าสุด</h1>
      <p>รวบรวมหลักธรรมต่างๆ</p>
      <div class="rowx">
          <div @click="ViewDoctrine(doctrine._id)" class="doctrine-col" v-for="doctrine in filteredListdoctrine " :key="doctrine.title">
            <img :src="doctrine.image">
              <h3 class="title-color">{{doctrine.title}}</h3>
          </div>
      </div>       
    </section>
    <!-- หลักธรรม --> 
    <div>
      <Footer></Footer>
    </div>    
  </div>
</template>

<script>
// import a from '../../public/image/lotus.jpg'
import moment from "moment";
// import DialogDonate from "./dialog_donate";
import countapi from 'countapi-js';
const Navbar = () => import("@/components/navbar/navbar");
const Footer = () => import("@/components/navbar/footer");
export default {
  name: "Home",
  data() {
    return {
      newcampaign: null,
      news:null,
      doctrine:null,
      show: false,
      
    };
  },
  
  mounted: async function mounted() {
    await this.$http
      .get("/campaign/ShowListCampaign")
      .then(async (res) => {
        if(res.data != null)
        {console.log(res.data);
        this.newcampaign = res.data[0];
        if(this.newcampaign != null)
        await countapi.get(this.newcampaign.count_api_namespace, this.newcampaign.count_api_key).then((result) => { 
                    this.newcampaign['view'] = result.value
                });
       { if(moment(this.newcampaign.date).format('dddd') == 'Mondey'){
                this.newcampaign.date = moment(this.newcampaign.date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.newcampaign.date).format('dddd') == 'Tuesday'){
                this.newcampaigื.date = moment(this.newcampaign.date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.newcampaign.date).format('dddd') == 'Wednesday'){
                this.newcampaign.date = moment(this.newcampaign.date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.newcampaign.date).format('dddd') == 'Thursday'){
                this.newcampaign.date = moment(this.newcampaign.date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.newcampaign.date).format('dddd') == 'Friday'){
                this.newcampaign.date = moment(this.newcampaign.date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.newcampaign.date).format('dddd') == 'Saturday'){
                this.newcampaign.date = moment(this.newcampaign.date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.newcampaign.date).format('dddd') == 'Sunday'){
                this.newcampaign.date = moment(this.newcampaign.date).format(" วันอาทิตย์ DD-MM-YY A");
              }}}
        

        
      })
      .catch(function(err) {
        console.log(err);
      });
    await this.$http
      .get("/news/ShowListNews")
      .then(async (res) => {
        this.news = res.data;
        var i = 0
        this.news.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });
        for (this.news[i]; i<this.news.length; i++) {
          await countapi.get(this.news[i].count_api_namespace, this.news[i].count_api_key).then((result) => { 
              this.news[i]['view'] = result.value
          });
        }
      })
       .catch(function(err) {
        console.log(err);
      });
    await this.$http
      .get("/doctrine/ShowListDoctrine")
      .then(async (res) =>{
        this.doctrine = res.data;
        for (var i = 0; i<this.doctrine.length; i++) {
        await countapi.get(this.doctrine[i].count_api_namespace, this.doctrine[i].count_api_key).then((result) => { 
              this.doctrine[i]["view"] = result.value
              console.log(result.value)
          });
        }
      })
      .catch(function(err){
      console.log(err);
      });
    await this.onbeforeunload() 
  },
    
  methods: {
    ViewCampaign(campaignid) {
      this.$router.push({
        name: "UserDetailCampaign",
        params: { id: campaignid },
      });
    },
    Clickpicture(){
      let click = document.getElementById("cardsopens")
        click.classList.toggle("opencards");
        // alert("123")
    },
    ViewDoctrine(doctrineid){
      this.$router.push({
        name: "UserDetailDoctrine",
        params: {id:doctrineid}
      })
    },
    ViewNews(newsid){
      this.$router.push({
        name: "UserDetailNews",
        params: {id:newsid}
      })
    },
    onbeforeunload() {
    window.scrollTo(0, 0);
    }
  },
  computed:{
    filteredListdoctrine() {
           var showData = this.doctrine.slice(0,3);
            console.log(showData);
            return showData
        },
        filteredListnews() {
           var showData = this.news.slice(0,3);
            console.log(showData);
            return showData
        }
  },
  
  components: {
    Navbar,
    Footer
  },
  
};
// import a from '../../public/image/background.png'
</script>
<style scoped>
.amount{
  font-weight: 600;
}
/* new */
.header{
  min-height: 100vh;
  width: 100%;
  background-image: url(../../public/image/bg1.jpg);
  filter: blur(4px);
  background-position: center;
  background-size: cover;
  position: relative;
}
.text-box{
  width: 90%;
  color: #fff;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  z-index: 1;
}
.text-box h1{
  font-size: 62px;
}
.text-box p{
  margin: 10px 0 40px;
  font-size: 14px;
  color: #fff;
}
/* ข่าวล่าสุด */
  .course{
    width: 80%;
    margin:auto;
    text-align: center;
    padding-top: 100px;

  }
  h1{
    font-size: 36px;
    font-weight: 600;
  }
  p{
    color: #777;
    font-size: 14px;
    font-weight: 300;
    line-height: 22px;
    padding:10px;
  }
  .rowx{
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
  }
  .course-col{
    flex-basis: 31%;
    background:#fff3f3 ;
    border-radius: 10px;
    margin-bottom:5%;
    padding: 20px 12px;
    box-sizing: border-box;
    transition: 0.5s;
  }
  h3{
    text-align: center;
    font-weight: 600;
    margin: 10px 0;
  }
  .course-col:hover{
    box-shadow: 0 0 20px 0px rgb(0,0,0,0.2);
  }
  @media(max-width: 700px){
    .rowx{
      flex-direction: column;
    }
  }
/* ข่าวล่าสุด */

 /* hotnews */
.hotnews{
  width: 80%;
  margin: auto;
  text-align: center;
  padding-top: 50px;
}
.hotnews-col{
  flex-basis: 32%;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}
.hotnews-col img{
  width: 100%;
  display: block;
  height: 300px;
}
.layer{
  background: transparent;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s;
}
.layer:hover{
   background: rgba(233, 231, 222, 0.7);
}
.layer h3{
  width: 100%;
  font-weight: 500;
  color:#000;
  font-size: 26px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  opacity: 0;
  transition: 0.5s;
}
.layer:hover h3{
  bottom: 49%;
  opacity: 1;
}
 /* hotnews */
 /* หลักธรรม */
 .title-color{
   
 }
 .doctrine{
   width: 80%;
   margin: auto;
   text-align: center;
   padding-top: 100px;
 }
 .doctrine-col{
   flex-basis: 31%;
   border-radius: 10px;
   margin-bottom:5% ;
   text-align: left;
  background-color: white;
 }
 .doctrine-col:hover{
   box-shadow: 10px 20px 40px rgba(0,0, 0, 0.25);
 }
  
 .doctrine-col img{
   width: 100%;
   height: 300px;
   border-radius:10px 10px 0px 0px ;
 }
 .doctrine-col p{
  padding: 0;
  margin: 10px;
 }
 .doctrine-col h3{
   margin: 10px;
   margin-top: 16px;
   margin-bottom: 15px;
   text-align: left;
 }
 /* หลักธรรม */
@media(max-width: 700px){
  .text-box h1{
    font-size: 20px;
  }
}
/* new */
.contrainer-home{
  height: 100vh;
  width: 100%;
  background-image:url(../../public/image/bg3.jpg) ;
  background-size: cover;
  /* padding-left:5%;
  padding-right:5% */
}
.content-home h1{
  font-size: 60px;
  font-weight: 100;
  /* margin-top: 20%; */
  margin-bottom: 15px;
  color: #232d60;
}
.content-home p{
  font-size: 20px;
  color: #6a7199;
}
.content-home{
  margin-left: 10%;
  margin-right: 10% ;
}

.feature-img{
 display:flex;
  width: 100%;
  height: 100%;
  
  
}

.box-content{
  background-color: #fff;
}

.container-news {
    margin-top: 3%;
    display: none;
}
.row-news {
  margin-bottom: 3%;
  margin-top: 3%;
}
.cols-detail-campaign {
  margin-top: 5%;
}
.colxx{
    margin: auto;
}
.image-size{
    
    max-width: 90%;
    height: 300px;
}

.image{
    display: block;
    width: 100%;
    margin: auto;
    height: 100%;

}
/* ห้องเทส */
 .ytube{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background:#fbe9e7;
}
.cards{
  position: relative;
  width: 600px;
  height: 500px;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  left: 15%;
  box-shadow: 10px 20px 40px rgba(0,0, 0, 0.25);
}
.cards .imgBoxs{
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform-origin: left;
  transform-style: preserve-3d;
  background: rgba(255, 255, 255, 0);
  transition: 1.5s;
  box-shadow: 10px 20px 40px rgba(0,0, 0, 0.25);
}
/* .cards:hover .imgBoxs{
  transform: rotateY(-180deg);
  
} */
.opencards .imgBoxs{
  transition: 2s;
  transform: rotateY(-180deg);
  
} 
.cards .imgBoxs img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.cards .imgBoxs img:nth-child(2){
transform: rotateY(180deg);
}
.cards .details
{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cards .details .contents{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cards .details .contents h2 span{
  color:#e21;
  font-size: 0.8em;
}
.headcam{
  text-align: center;
}
.arrow{
  height: 300px;
  width: 300px;
  float: right;
}
.btn-news{
  margin: 3%;
}
.name-con{
  font-size: 28px;
  max-width: 450px;
  margin-bottom: 3%;
}
/* ห้องเทส */
@media only screen and (max-width: 768px){
  
    .image-size{
    
    max-width: 90%;
    height: 300px;
}
}
@media only screen and (max-width: 415px) {
  
  /* ห้องเทส */
  .container-news {
  
  display: block;
  
}
 .ytube{
   display: none;
}
/* ห้องเทส */
}
@media only screen and (max-width: 1024px) {
  .container-news {
  
  display: block;
  
}
.ytube{
   display: none;
}
}

/* ข่าวล่าสุด */

.img{
    
    height: 100%;
    width: 100%;
    cursor: pointer;
    position: relative;
    /* margin: 20px; */
    transition: all 0.25s ease;
    background-size: cover;
    background-repeat: repeat;
    background-position: center;
    /* filter: grayscale(100%); */
    /* background-color: rgb(238, 146, 8); */
    color: #000;
    transition: all 0.25s ease;
    position: relative;
    border:7px solid rgb(255, 255, 255);
    
  }
  
  .white{
    height: 100%;
    width: 100%;
    
    
  }
  .cen-text {
    position: absolute;
    top: 50%;
    left: 40%;
    color: #fff;
    
  }
  
  
  .img:hover{
    filter: grayscale(0%);
    z-index: 1;
    transform: scale(1.15)
    
  }
  
 .campaign{
   background:#fbe9e7;
  margin: auto;
  padding-top: 50px;
  text-align: center;
 }
 .campaign p{
   margin: 0;
 }
 .text-align-left{
   text-align: left;
 }
</style>
