<template>
    <div class="Adddoctrine">
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
        
        >
      </v-carousel-item>
    </v-carousel>

    <!-- แคมเปญ -->
    
      <v-container class="container-news">
        <v-card elevation="5" outlined shaped >
        <v-row class="row-news">
          <v-col class="colxx"  cols="12" md="6">
              <center><div class="image-size">
                <img class="image"  src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg">
              </div></center>
          </v-col>
          <v-col cols="12" md="6">
            <v-container>
                <h1> name </h1>
              <h4> content </h4>
              <div >
                <v-row>
                  <v-col style="text-align:left;" cols="12" md="3">
                    <span >วันสิ้นสุดโครงการ </span><br>
                    <span >สถานที่ </span>
                  </v-col>
                  <v-col style="text-align:right;" cols="12" md="9">  
                    <span>ยอดบริจาค 10 บาท</span>
                  </v-col>
                </v-row>
              </div>
             
              
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
           name
          </div>
          <v-list-item-title class="headline mb-1">
            subtitle
          </v-list-item-title>
          <v-list-item-subtitle>desceiption</v-list-item-subtitle>
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
const Navbar = () => import('@/components/navbar/navbar')

export default {
    name : "Adddoctrine",
   
    components:{
        Navbar,
        
    },
    data() {
    return {
      newcampaign: null,
      

      show: false,
      news: [
        {
          id: 1,
          name: "No.1",
          title: "Top western road trips",
          subtitle: "1,000 miles of wonder",
          description:
            "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
          
        },
        {
          id: 2,
          name: "No.2",
          title: "Christmas tales to read",
          subtitle: "2,000 miles of wonder",
          description:
            "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
          
        },
        {
          id: 3,
          name: "No.3",
          title: "20 movies not to miss in 2020",
          subtitle: "3,000 miles of wonder",
          description:
            "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
          
        },
      ],
    };
  },
    }
    
</script>

<style scoped>
.container-news {
    margin-top: 3%;
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
@media only screen and (max-width: 768px){
    .image-size{
    
    max-width: 90%;
    height: 300px;
}
}
</style>
