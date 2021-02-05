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

    <div class="block latestPostBlock">
    <v-container>
      <h2 class="text-center">แคมเปญ</h2>
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
            <v-card-text>
              <div style="text-align:right;">ยอดบริจาค xxx / 60000 บาท</div>
              <v-progress-linear  color="light-green darken-4"  height="10"  value="20"  striped></v-progress-linear>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text>More</v-btn>
            </v-card-actions>
          </v-card>
         
        </v-col>
         
      </v-row>
      <a href="/home" style="float:right; margin-bottom:3%">แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
    </v-container>
  </div>
  

   <!-- <div class="block latestPostBlock">
    <v-container>
      <h2 class="text-center">หลักธรรม</h2>
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
              <v-btn color="primary" text>More</v-btn>
            </v-card-actions>
          </v-card>
         
        </v-col>
         
      </v-row>
      <a href="/home" style="float:right;">แสดงทั้งหมด >>></a>
    </v-container>
  </div> -->
  <!-- ข่าวล่าสุด -->
  <section id="news">
    <v-container style=" margin-top:3%;  padding:10vh; ">
      <v-row class="test"  >
        <v-col  cols="12" md="6">
          <img class="img" style="background-color:red;"  src="../../../client/public/image/bubble.png">
        </v-col>
        
        <v-col cols="12" md="6" >
          <div>Title</div>
          <div>detail</div>

        </v-col>
        <div class="btn"><v-btn block style="background-color: #ffdd94; color:#455054;"> ดูเนื้อหา</v-btn></div>
      </v-row>
      
    </v-container>
  </section>
  
    
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
.show-res
{
  display: none;
}
@media only screen and (max-width: 415px) {
    .show-res{
    display: initial;
    
}
    .hide-res{
      display: none;
    }
    
} 
.img
{
  width: 200px;
  height: 200px;
  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.btn{
  position: relative;
  left: 50%;
  
}
@media only screen and (max-width: 415px) {
    .btn{
    
      
      width: 300px;
  
}
    
} 

</style>