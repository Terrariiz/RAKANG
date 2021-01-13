<template>
  <div class='DetailNews'>
    <div>
      <Navbar></Navbar>
    </div>
      <h1>detail page</h1>
      {{$route.params.id}}
      <div  v-if="news" >
                
              <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
              <a href="#">
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + news.image"/>
              </a>
              </div>
              </center>

              <div>{{ news.title }}</div>
                
              {{ news.content }}
                
               <div>   <button @click="EditDoctrine($route.params.id)">Edit</button>    </div>
               <div>  <button @click="DeleteDoctrine($route.params.id)">Delete</button> </div> 
      </div>
      
        
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/admin_navbar')
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
      EditDoctrine(newsid){
        this.$router.push({ name: 'editnews' , params: {id : newsid}})
      },
      DeleteDoctrine(newsid){
        this.$router.push({ name: 'DeleteDoctrine' , params: {id : newsid}})
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