<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="project-header">
      <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ doctrine.title }}</h1>
                <!-- ปุ่ม bookmark -->
                  <v-btn
                    icon
                    v-model="bookmark.value"
                    v-if="bookmark.value == false"
                    @click="clickBookmarks()"
                  >
                    <v-icon>mdi-bookmark</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="pink"
                    v-model="bookmark.value"
                    @click="clickBookmarks()"
                    v-if="bookmark.value == true"
                  >
                    <v-icon>mdi-bookmark</v-icon>
                  </v-btn>
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
                :src="'http://localhost:4000/uploads/' + doctrine.image"
              />
              <div class="lead" v-html="doctrine.content">{{ doctrine.content }}</div>
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
    name : "detail_doctrine",
    data (){
      return {
        doctrine: null,
        bookmark: null
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
            this.$http.get("/doctrine/DetailDoctrine/"+this.$route.params.id)
            .then((res) => {
                console.log(res.data)
                this.doctrine = res.data;
                console.log(this.doctrine)
                this.bookmark = {doctrinesID: this.doctrine._id, value: false}
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
            })
        .catch(function(err){
          console.log(err)
        })
      },
      //เปลี่ยน value ใน bookmark
      clickBookmarks(){
        this.bookmark.value = !this.bookmark.value
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
</style>