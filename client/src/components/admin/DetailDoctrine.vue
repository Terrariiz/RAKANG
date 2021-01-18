<template>
  <div class='DetailDoctrine'>
    <div>
      <Navbar></Navbar>
    </div>
      <v-container rounded-xl style="background:linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%); 
       box-shadow:5px 6px 5px #888888; margin-top: 3%">
        <v-btn to='/admin/listdoctrine'> <i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
      <div  v-if="doctrines" >
        <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <!-- <div><i style="font-size: 50px; float:left;" class="fa fa-arrow-left" aria-hidden="true"></i></div> -->
              <a href="#"><br>
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + doctrines.image"/>
              </a>
              </div>
              </center>
              <v-container>
                <div style="text-align:center; font-size:40px;">{{ doctrines.title }}</div>
              </v-container>
              <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; width:70%;">  
               <div style="margin:5%" v-html="doctrines.content"> {{ doctrines.content }} </div>
              </v-container>
              <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:right;" @click="EditDoctrine($route.params.id)">Edit</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:left;" @click="DeleteDoctrine()">Delete</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
                
              
                
              

      </div>
      
      </v-container>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert";
export default {
    name : "DetailDoctrine",
    data (){
      return {
        doctrines: null
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
       this.$http.get("/doctrine/DetailDoctrine/"+this.$route.params.id)
      .then((res) => {
        console.log(res.data)
        that.doctrines = res.data;
        console.log(that.doctrines)
        
      })
      .catch(function(err){
        console.log(err)
      })
        },
      EditDoctrine(doctrineid){
        this.$router.push({ name: 'EditDoctrine' , params: {id : doctrineid}})
      },
      DeleteDoctrine(){
        this.$http.delete("/doctrine/DeleteDoctrine/"+this.$route.params.id)
        this.$router.push({ name: 'Listdoctrine'})
        swal("Success", "Delete Doctrine Success", "success");


        
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