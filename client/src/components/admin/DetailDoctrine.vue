<template>
  <div>
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

              <div>{{ doctrines.title }}</div>
                
              {{ doctrines.content }}
                
                
      </div>
        
  </div>
</template>

<script>
export default {
    name : "DetailDoctrine",
    data (){
      return {
        doctrines: null
        }
    },
    mounted: function(){
    //     var that = this;
    //   await this.$http.get("/doctrine/DetailDoctrine/"+this.$route.params.id)
    //   .then((res) => {
    //       console.log('-------')
    //     console.log(res.data)
    //     console.log('-------')
    //     that.doctrines = res.data;
    //     console.log('-------')
    //     console.log(this.doctrines)
    //     console.log('-------')
    //   })
    //   .catch(function(err){
    //     console.log(err)
    //   })
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
        }
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