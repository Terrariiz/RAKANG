<template>
  <div class='DetailNews'>
    <div>
      <Navbar></Navbar>
    </div>
      <v-container rounded-xl style="background:linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%); 
       box-shadow:5px 6px 5px #888888; margin-top: 3%">
      <v-btn to='/admin/listnews'><i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
      <div  v-if="news" >
                
              <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <!-- <div><i style="font-size: 50px; float:left;" class="fa fa-arrow-left" aria-hidden="true"></i></div> -->
              <a href="#"><br>
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/image/new/' + news.image"/>
              </a>
              </div>
              </center>
              <v-container>
                <div style="text-align:center; font-size:40px;">{{ news.title }}</div>
              </v-container>
              <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; width:70%;">  
                <div style="margin:5%" v-html="news.content">{{ news.content }}</div>
              </v-container>
              <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:right;" @click="EditNews($route.params.id)">Edit</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:left;" @click="DeleteNews($route.params.id)">Delete</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
      </div>
      </v-container>
        
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
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
        const swalWithBootstrapButtons = swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("/news/DeleteNews/"+this.$route.params.id)
            this.$router.push({ name: 'Listnews'})
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Delete News Success.',
              'success'
            )
          } 
        })
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
img
{
  height: 70%;
  width: 70%;
}
</style>