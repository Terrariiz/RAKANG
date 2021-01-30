<template>

    <div class="test">
        <div>
            <Navbar></Navbar>
        </div>
        <v-card
    class="mx-auto overflow-hidden"
    height="400"
    width="344"
  >
    <v-app-bar
      color="deep-purple accent-4"
      dark
      prominent
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-navigation-drawer
      class="deep-purple accent-4"
      v-model="drawer"
      dark
      right
      absolute
      bottom
      temporary
    >
      <v-list
        nav
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item>
            <v-list-item-title>profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </v-card>
    </div>
    
</template>

<script>
 const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "DetailNews",
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    components:{
      Navbar
    },
    mounted: function(){
      this.getData()
      const iddd = localStorage.getItem('user_id')
      console.log(iddd)
      document.getElementById("data-merchantid").value =  iddd;
      const a = localStorage.getItem('a')
      this.a = a;

    },
    methods: {
      chooseImage () {
            this.$refs.fileInput.click();
        },
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
      async onFileSelected(event){
            this.image = event.target.files[0]
            const input = this.$refs.fileInput 
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                    
                }
            reader.readAsDataURL(files[0])
            // this.$emit('input', files[0])
            }
      }
      
    }
    
}
</script>
<style >
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto 10% 10% auto;
    grid-column-gap: 10%;
}
/* previewsimage */

 .base-image-input {
  display: block;
  width: 300px;
  height: 300px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 20px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
</style>
