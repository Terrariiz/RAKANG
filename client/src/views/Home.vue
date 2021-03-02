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
        
        >
      </v-carousel-item>
    </v-carousel>

    <!-- แคมเปญ -->
    
      <v-container class="container-news">
        <v-card elevation="5" outlined shaped >
        <v-row class="row-news">
          <v-col cols="12" md="6">
            <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/uploads/' + newcampaign.image"/>
          </v-col>
          <v-col class="cols-detail-campaign" cols="12" md="6">
            <v-container>
                <h1> {{newcampaign.name}} </h1>
              <h4>detail</h4>
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
                <v-btn block style="background-color: #ffdd94; color:#455054;" @click="ViewCampaign(campaign._id)">
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
        
        this.newcampaign.date = moment(this.newcampaign.date).format(
          " dddd DD-MM-YY  A"
        );
        

        
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  components: {
    Navbar,
  },
  
};

</script>
<style>
/* .heroBlock{
  position: relative;
}
.heroBlock:after{
  background-image: url('../assets/images/bg-temple-2.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.2;
} */
div{
  display: block;
}
.res-top {
  display: none;
}
v-img {
   
   width: 100%;
   
}
@media only screen and (max-width: 415px) {
  .res-top {
    display: initial;
  }
  .hide-res {
    display: none;
  }
}
.img {
  width: 300px;

  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.btn-news {
  position: relative;
  width: 40%;
  /* left: 50%; */
  margin-left: auto;
  margin-right: auto;
}
.btn-doctrine {
  position: relative;
  width: 20%;
  left: 20%;
}
.container-news {
  margin-top: 3%;
  padding: 20vh;
  /* background-color: #d8d1d028;
  padding: 10px 10px; */
}
@media only screen and (max-width: 415px) {
  .img {
    width: 100%;

    background-size: cover;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .btn-news {
    position: relative;

    width: 100%;
  }
  .container-news {
    padding: 0vh;
  }
  .btn-doctrine {
    position: relative;
    left: 0;
    width: 100%;
    margin: 3%;
  }
}

/* #news {
} */
.container-doctrine {
  margin-top: 3%;
  padding: 20vh;
}

/* .heroBlock {
  background-image: url("../../../client/public/image/bg3.jpg");
  background-size: cover;
  background-attachment: fixed;
} */
.row-news {
  margin-bottom: 3%;
  margin-top: 3%;
}
.cols-detail-campaign {
  margin-top: 5%;
}
</style>
