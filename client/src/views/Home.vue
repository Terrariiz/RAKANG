<template>
  <div class="heroBlock" >
    <div>
      <Navbar></Navbar>
    </div>

    <v-carousel cycle hide-delimiters show-arrows-on-hover img-width="1024" img-height="480">
      <v-carousel-item 
        to=""
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition" 
        
      >
        
        
      </v-carousel-item>
    </v-carousel>

    <!-- แคมเปญ -->
    
      <v-container class="container-news">
        <v-card elevation="5" outlined shaped >
        <v-row class="row-news">
          <v-col class="image-cam" cols="12" md="6">
            <center><div class="image-size">
              <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/image/campaign/' + newcampaign.image"/>
            </div></center>
          </v-col>
          <v-col class="colxx" cols="12" md="6">
            <v-container>
                <h1> {{newcampaign.name}} </h1>
              <h4> {{newcampaign.content}} </h4>
              <div >
                <v-row>
                  <v-col style="text-align:left;" cols="12" md="3">
                    <span >วันสิ้นสุดโครงการ {{newcampaign.date}}</span><br>
                    <span >สถานที่ {{newcampaign.location}}</span>
                  </v-col>
                  <v-col style="text-align:right;" cols="12" md="9">  
                    <span>ยอดบริจาค {{newcampaign.donate}} / {{newcampaign.amount}} บาท</span>
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

      <!--  -->
     
      <div  class="ytube">
        <v-row >
          <v-col class="headcam" cols="12" md="5">
            <!-- <h1>ลูกศร</h1> -->
            <img class="arrow" src="https://media2.giphy.com/media/LnhtN5kEFZxTstNJIX/giphy.gif">
          </v-col>
          <v-col cols="12" md="7">
            <div class="cards">
          <div class="imgBoxs">
            <img :src="'http://localhost:4000/image/campaign/' + newcampaign.image"/>
            <img :src="'http://localhost:4000/image/campaign/' + newcampaign.image"/>
          </div>
          
            <div class="details">
              <v-container>
              <div class="contents">
                <h4   style="max-width: 450px;"> {{newcampaign.name}} </h4>
                <!-- <v-container>
                <progress class="progress is-danger" :value="(newcampaign.donate/newcampaign.amount)*100" max="100"></progress>
                </v-container> -->
                <div class="btn-news">
                  <v-btn block style="background-color: #ffdd94; color:#455054;" @click="ViewCampaign(newcampaign._id)">
                    ดูเนื้อหา</v-btn
                  >
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
    

     <!-- ข่าวล่าสุด -->
    <div class="block latestPostBlock">
      <v-container>
        <h2 class="text-center">ข่าว</h2>
        <v-row>
          <v-col v-for="news in news" :key="news.id" cols="12" md="4">
            <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
     <v-img :src="news.src"></v-img>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
           {{ news.name }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{news.subtitle}}
          </v-list-item-title>
          <v-list-item-subtitle>{{ news.description }}</v-list-item-subtitle>
        </v-list-item-content>
  
      
      </v-list-item>
  
      <v-card-actions>
                <v-btn to="" color="primary" style="margin-left:auto;" text
                  >More</v-btn
                >
              </v-card-actions>
    </v-card>
          </v-col>
        </v-row>
        <router-link to='/news' style="float:right; margin-bottom:3%"
          >แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i
          ><i class="fa fa-chevron-right" aria-hidden="true"></i
        ></router-link>
      </v-container>
    </div>


    
  </div>
</template>

<script>
// import a from '../assets/images/bg-temple-2.jpg'
import moment from "moment";

const Navbar = () => import("@/components/navbar/navbar");
export default {
  name: "Home",
  data() {
    return {
      newcampaign: null,
      items: [
        {
          src: require("../assets/images/ศีล5 5.jpg"),
        },
        {
          src: require("../assets/images/อิทธิบาท4.jpg"),
        },
        {
          src: require("../assets/images/ธรรมะ.jpg"),
        },
      ],

      show: false,
      news: [
        {
          id: 1,
          name: "No.1",
          title: "Top western road trips",
          subtitle: "1,000 miles of wonder",
          description:
            "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
          src: require("../assets/images/tenor.gif"),
        },
        {
          id: 2,
          name: "No.2",
          title: "Christmas tales to read",
          subtitle: "2,000 miles of wonder",
          description:
            "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
          src: require("../assets/images/tenor.gif"),
        },
        {
          id: 3,
          name: "No.3",
          title: "20 movies not to miss in 2020",
          subtitle: "3,000 miles of wonder",
          description:
            "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
          src: require("../assets/images/tenor.gif"),
        },
      ],
    };
  },
  
  mounted: async function mounted() {
    await this.$http
      .get("/campaign/ShowListCampaign")
      .then((res) => {
        console.log(res.data);
        this.newcampaign = res.data[0];
        
        if(moment(this.newcampaign.date).format('dddd') == 'Mondey'){
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
                this.newcampaigื.date = moment(this.newcampaign.date).format(" วันอาทิตย์ DD-MM-YY A");
              }
        

        
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    ViewCampaign(campaignid) {
      this.$router.push({
        name: "UserDetailCampaign",
        params: { id: campaignid },
      });
    },
  },
  
  components: {
    Navbar,
  },
  
};

</script>
<style scoped>
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
  width: 500px;
  height: 400px;
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
  background: #0000;
  transition: 1.5s;
  box-shadow: 10px 20px 40px rgba(0,0, 0, 0.25);
}
.cards:hover .imgBoxs{
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


</style>
