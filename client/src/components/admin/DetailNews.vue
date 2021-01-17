<template>
  <div class='DetailNews'>
    <div>
      <Navbar></Navbar>
    </div>
      <h1>detail page</h1>
      {{$route.params.id}}
      <v-container style="background-color:white;">
      <div  v-if="news" >
                
              <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
              <a href="#">
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + news.image"/>
              </a>
              </div>
              </center>
              <v-container>
                {{ news.title }}
              </v-container>
              <v-container>  
                <div v-html="news.content">{{ news.content }}</div>
              </v-container>
              <v-row>
                <v-col style="background-color:blue;" cols = "3"></v-col>
                <v-col style="background-color:red;" cols = "3">
                  <v-btn style="float:right;" @click="EditNews($route.params.id)">Edit</v-btn>
                </v-col>
                <v-col style="background-color:black;" cols = "3">
                  <v-btn style="float:left;" @click="DeleteNews($route.params.id)">Delete</v-btn>
                </v-col>
                  <v-col style="background-color:white;" cols = "3"></v-col>
              </v-row>
      </div>
      </v-container>
        
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "DetailNews",
    data (){
      return {
        news: null
        }
    },
    components:{
      Navbar
    },
    mounted: function(){
      this.getData()
    },
    methods: {
         getData(){
            var that = this;
       this.$http.get("/news/DetailNews/"+this.$route.params.id)
      .then((res) => {
        console.log(res.data)
        that.news = res.data;
        console.log(that.news)
        
      
      })
      .catch(function(err){
        console.log(err)
      })
        },
      EditNews(newsid){
        this.$router.push({ name: 'editnews' , params: {id : newsid}})
      },
       DeleteNews(){
        this.$http.delete("/news/DeleteNews/"+this.$route.params.id)
        console.log("delete")
        this.$router.push({ name: 'Listnews'})
      },
    }
    
}
</script>

<style>
.showimage {
  
  width: 700px;
  height: 250px; 
  object-fit: cover;
}
</style>