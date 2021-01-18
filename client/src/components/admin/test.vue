<template>

    <div class="test">
      <input id="data-merchantid" type="hidden"> 
        <div>
            <Navbar></Navbar>
        </div>
        <form @submit.prevent="handleSubmit">
        <v-container id ='rounded' style="background-color: #F09C0B;">
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container id = "picturenews"  >
                                 <!-- preview image -->
                                <div style="text-align:right;"></div>

                                <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  v-on:change="onFileSelected" >
                                </v-div></center>

                                <hr> 
                                 <!-- preview image -->
                                <!-- <v-file-input v-model="image" label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                                <!-- <input  type="file" id="file" ref="file" multiple v-on:change="onFileSelected"> -->
                            </v-container>
                        
                        </v-flex>
                        <v-flex xs12 md6>
                                <!-- <h1 style="color:black;">หัวข้อเรื่อง</h1> -->
                                <center><v-text-field v-model="title" style="width:70%; text-align: center;" label="หัวข้อเรื่อง" ></v-text-field></center>
                                <br><br>
                                <v-container id ="detailnews"  style="background-color: white ; margin-right:3%;">
                                    <!-- <v-container fluid>
                                        <v-textarea name="input-7-1" v-model="content" filledlabel="Label" label="รายละเอียด" auto-grow></v-textarea>
                                    </v-container> -->
                                    
                                    <!-- <v-btn small style="text-align: right;" rounded color="primary" dark  >Add detailnews</v-btn> -->
                                <!-- <div id="app">
                                    <ckeditor @input="onEditorInput"></ckeditor>
                                </div> -->
                                 <ckeditor 
                                    id="content"
                                    
                                    @input="onEditorInput">
                                    </ckeditor>
                                </v-container>
                                
                        </v-flex>
                    
                </v-layout>
            </v-container>
                <div id="grid-container">
                    <div></div>
                    <v-btn style="weihgt = 40%" color="primary" dark>cancle</v-btn>
                    <!-- <button @click="onUploadFile" class="upload-button">Upload file</button> -->
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>

            <!-- <v-btn style="margin-right= 50%;" color="primary" dark>cancle</v-btn> 
                <v-btn style="margin-left= 50%;" color="primary" dark>submit</v-btn> -->
        </v-container>  
        </form> 

    <div v-html="doctrines.content">



    </div> 
    </div>
    
</template>

<script>
 const Navbar = () => import('@/components/navbar/navbar')
export default {
    name : "DetailNews",
    data (){
      return {
        a: null,
        news: null,
        selctedFile: null,
        title: null,
        content: null,
        image: null,
        imagepath: "",
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
                    // The configuration of the editor.
        },
        imageData:null,
        }
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
