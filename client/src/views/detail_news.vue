<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="project-header">
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
    </div>
  </div>
</template>

<script>
import moment from "moment";
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "detail_news",
    data (){
      return {
        news: null,
      }
    },
    components:{
      Navbar
    },
    created() {
      this.getData()
    },
    methods: {
        getData(){
            this.$http.get("/news/DetailNews/"+this.$route.params.id)
            .then((res) => {
                this.news = res.data;
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
</style>