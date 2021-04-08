<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>News</h1>
        <!-- test -->
     <v-container class="container-news">
       <center>
          <v-chip-group
            v-model="selectedCategory"
            active-class="primary--text"
            mandatory
          >
            <h5 style="padding: 7px 0px 0px 0px;">หมวดหมู่ : </h5> 
            <v-chip
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </v-chip>
          </v-chip-group>
        </center>
       <v-text-field style="width:30%; text-align: center;" prepend-inner-icon="mdi-magnify" v-model="search" label="ค้นหาหัวข้อ"></v-text-field>
       <p class="notfound" v-if="filteredList.length == 0 && search !== ''">ไม่พบ "{{search}}"</p>
       <p class="notfound" v-if="filteredList.length == 0 && search == ''">ไม่มีเนื้อหาในส่วนนี้</p>
        <v-card class="margin-card" v-for="(news) in filteredList " :key="news.title" elevation="5" outlined shaped >
        <v-row class="row-news">
          <v-col cols="12" md="6">
            <v-img
            :src="'http://localhost:4000/image/new/' + news.image"
            class="img-fluid"
            style=""
            align="center"
          >
          </v-img>
          </v-col>
          <v-col class="cols-detail-campaign" cols="12" md="6">
            <v-container>
                <h1>{{ news.title }} </h1>
              <!-- <div>{{doctrines.content}}</div> -->
              <div >
                <v-row>
                  <v-col style="text-align:left;" cols="12" md="6">
                    <div>วันที่โพสต์ {{ news.date }}</div>
                    <div>หมวดหมู่ {{ news.categories }}</div>
                  </v-col>
                </v-row>
              </div>
              <div class="btn-news">
                <v-btn block style="background-color: #ffdd94; color:#455054;" 
                @click="ViewNews(news._id)"
                elevation="3">
                ดูเนื้อหา</v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
    </div>
</template>

<script>
import moment from "moment";
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'News',
    components:{
        Navbar
    },
    data() {
    return {
      news : [],
      search: '',
      selectedCategory: 'ทั้งหมด',
      categories:['ทั้งหมด','วัด','โรงพยาบาล','มูลนิธิ','ประชาสัมพันธ์ของเว็บไซค์','อื่นๆ'],
    };
  },
  computed: {
    filteredList() {
      return this.news.filter(news => {
        var result
        if(this.selectedCategory == 'ทั้งหมด'){
          result = news.title.toLowerCase().includes(this.search.toLowerCase())
          return result
        } else{
          result = news.categories.includes(this.selectedCategory)
          if(this.search == ''){
            return result
          } else{
            if(result == true){
              result = news.title.toLowerCase().includes(this.search.toLowerCase())
              return result
            }
          }
        }
      })
    }
  },
  mounted: async function mounted() {
    await this.$http.get("/news/ShowListNews")
      .then((res) => {
        console.log(res.data);
        this.news = res.data;
        this.news.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });
        var i = 0;
        for (this.news[i]; i<this.news.length; i++) {
          if(moment(this.news[i].date).format('dddd') == 'Mondey'){
                this.news[i].date = moment(this.news[i].date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Tuesday'){
                this.news[i].date = moment(this.news[i].date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Wednesday'){
                this.news[i].date = moment(this.news[i].date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Thursday'){
                this.news[i].date = moment(this.news[i].date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Friday'){
                this.news[i].date = moment(this.news[i].date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Saturday'){
                this.news[i].date = moment(this.news[i].date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Sunday'){
                this.news[i].date = moment(this.news[i].date).format(" วันอาทิตย์ DD-MM-YY A");
              }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    ViewNews(newsID) {
      this.$router.push({
        name: "UserDetailNews",
        params: { id: newsID },
      });
    },
  },
  if(result){
    console.log(result)
  }
}
</script>

<style>
.margin-card{
  margin-bottom:5%;
}
div{
  display: block;
}
.res-top {
  display: none;
}
v-img {
   
   width: 100%;
   
}

.img {
  width: 300px;

  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.img-fluid{
  object-fit: cover;  
  margin:3%;
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


@media only screen and (max-width: 415px) {
  .res-top {
    display: initial;
  }
  .hide-res {
    display: none;
  }
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
</style>