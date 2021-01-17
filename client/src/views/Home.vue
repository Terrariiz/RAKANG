<template>
  <div class="heroBlock">
    <div>
      <Navbar></Navbar>
    </div>
    <v-carousel cycle hide-delimiters>
      <v-carousel-item href="/"
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
      <h2 class="text-center">ข่าวประชาสัมพันธ์</h2>
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
  </div>
  

   <div class="block latestPostBlock">
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
          src: require("../assets/images/img-carousel1.jpg"),
          title: "We are creative"
        },
        {
          src: require("../assets/images/img-carousel2.jpg"),
          title: "We are hard worker"
        },
        {
          src: require("../assets/images/img-carousel3.jpg"),
          title: "We are professional"
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
        src: require("../assets/images/img-carousel1.jpg")
      },
      {
        id: 2,
        name: "No.2",
        title: "Christmas tales to read",
        subtitle: "2,000 miles of wonder",
        description: "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
        src: require("../assets/images/img-carousel2.jpg")
      },
      {
        id: 3,
        name: "No.3",
        title: "20 movies not to miss in 2020",
        subtitle: "3,000 miles of wonder",
        description: "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        src: require("../assets/images/img-carousel3.jpg")
      }
    ]
    };
  },
  components:{
        Navbar
    },
  

};
</script>