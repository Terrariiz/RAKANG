<template>
  <div>
      <h1>detail page</h1>
      {{$route.params.id}}
      <div  v-if="doctrines" >
                
                
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

</style>