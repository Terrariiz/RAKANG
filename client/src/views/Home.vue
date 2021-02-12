<template>
  <div class="heroBlock">
    <div>
      <Navbar></Navbar>
    </div>
   
      <v-carousel cycle hide-delimiters>
        <v-carousel-item to="/"
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-row  class="title fill-height hidden-xs-only" align="center" justify="center">{{ item.title }}</v-row>
        </v-carousel-item>
      </v-carousel>

      <!-- แคมเปญ -->
       <section id="news">
    
    <v-container class="container-news"   >
      <v-row class="row-news" >
        <v-col  cols="12" md="6">
          <img class="img"  src="../../../client/public/image/bubble.png">
        </v-col>
        <v-col class="cols-detail-campaign" cols="12" md="6" >
          <div>ข่าวประชาสัมพันธ์</div>
          <div>Title</div>
          <div>detail</div>
          <div style="text-align:right;"><span style="text-align:left;">วันที่</span> <span style="text-align:right;">ยอดบริจาค xxx / 60000 บาท</span></div>
          <v-progress-linear  color="light-green darken-4"  height="10"  value="20"  striped></v-progress-linear>
          <hr>
          <div class="btn-news"><v-btn block style="background-color: #ffdd94; color:#455054;"> ดูเนื้อหา</v-btn></div>
        </v-col>
        
      </v-row>
      
    </v-container>
    
  </section>
  

      <!-- ข่าวล่าสุด -->
      <div class="block latestPostBlock">
        <v-container>
          <h2 class="text-center">ข่าว</h2>
          <v-row>
            <v-col v-for="news in news" :key="news.id" cols="12" md="4">
              <v-card outlined class="mx-auto">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="news.src"
                >
                  <v-card-title>{{ news.name }}</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">{{ news.subtitle }}</v-card-subtitle>
                <v-card-text class="text--primary">
                  <div>{{ news.description }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" style="margin-left:auto;" text>More</v-btn>
                </v-card-actions>
              </v-card>
            
            </v-col>
            
          </v-row>
          <a href="/home" style="float:right; margin-bottom:3%">แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
        </v-container>
    </div>
  
  
    
  </div>

  
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          src: require("../assets/images/tenor2.gif")
        },
        {
          src: require("../assets/images/tenor3.gif")
        },
        {
          src: require("../assets/images/tenor4.gif")
        }
      ],

       show: false,
    news: [
      {
        id: 1,
        name: "No.1",
        title: "Top western road trips",
        subtitle: "1,000 miles of wonder",
        description: "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
        src: require("../assets/images/tenor.gif")
      },
      {
        id: 2,
        name: "No.2",
        title: "Christmas tales to read",
        subtitle: "2,000 miles of wonder",
        description: "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
        src: require("../assets/images/tenor.gif")
      },
      {
        id: 3,
        name: "No.3",
        title: "20 movies not to miss in 2020",
        subtitle: "3,000 miles of wonder",
        description: "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        src: require("../assets/images/tenor.gif")
      }
    ]
    };
  },
  components:{
        Navbar
    },
  

};
</script>
<style >
.res-top
{
  display: none;
}
@media only screen and (max-width: 415px) {
    .res-top{
    display: initial;
    
}
    .hide-res{
      display: none;
    }
    
} 
.img
{
  width: 300px;
  
  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.btn-news{
  position: relative;
  width: 40%;
  /* left: 50%; */
  margin-left: auto;
  margin-right: auto;
  
}
.btn-doctrine{
  position: relative;
  width: 20%;
  left: 20%;
  
}
.container-news{
  margin-top: 3%;
  padding:20vh;
  /* background-color: #d8d1d028;
  padding: 10px 10px; */
  
}
@media only screen and (max-width: 415px) {
    .img
{
  width: 100%;
  
  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.btn-news{
  position: relative;
  
  width: 100%;
  
  
}
.container-news{
  
  padding:0vh;
}
.btn-doctrine{
  position: relative;
  left:0;
  width: 100%;
  margin: 3%;
  
}
} 

#news{
  
  
}
.container-doctrine{
  margin-top: 3%;
  padding:20vh;
  
}

.heroBlock{
  /* background-image: url("../../../client/public/image/bg3.jpg");
  background-size: cover;
  background-attachment: fixed; */
}
.row-news{
  margin-bottom:3%
}
.cols-detail-campaign{
  margin-top:5%;
}
</style>