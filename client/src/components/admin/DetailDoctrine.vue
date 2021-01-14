<template>
  <div class='DetailDoctrine'>
    <div>
      <Navbar></Navbar>
    </div>
      <h1>detail page</h1>
      {{$route.params.id}}
      <div  v-if="doctrines" >
                
              <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
              <a href="#">
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + doctrines.image"/>
              </a>
              </div>
              </center>

              <div >{{ doctrines.title }}</div>
                
              <div v-html="doctrines.content"> {{ doctrines.content }} </div>
                
               <div>   <button @click="EditDoctrine($route.params.id)">Edit</button>    </div>
               <div>  <button @click="DeleteDoctrine()">Delete</button> </div> 
      </div>
      
        
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/admin_navbar')
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