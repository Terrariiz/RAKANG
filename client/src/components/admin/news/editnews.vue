<template>
    <div class="Editnews">
        <div>
            <Navbar></Navbar>
        </div>
        <br><br>
        <v-overlay :value="isloading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
        <form
         @submit.prevent="Editnews">
        <v-container id ='rounded' style="background-color: #F09C0B;">
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                             <v-container v-model = "news.image"  >
                                 <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <img v-if="!imageData" class="image -fullwidth img-responsive" id="showimage" :src="news.image"/>
                                    <span  v-if="!news.image"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  v-on:change="onFileSelected" >
                                </v-div></center>

                                <hr>
                               <p>*if don't submit new picture we just use previous picture</p>
                                <!-- <v-file-input v-model="doctrine.image" label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                                <!-- <input type="file"  @change="onFileSelected"> -->
                                
                                <!-- <v-btn @click="reset" style="weihgt = 40%" color="red" dark>Clear</v-btn> -->
                                <!-- <p>*if don't submit new picture we just use previous picture</p> -->
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                                <!-- <h1 style="color:black;">หัวข้อเรื่อง</h1> -->
                                 <center><v-text-field  v-model="news.title" style="width:70%; text-align: center;" label="หัวข้อเรื่อง" required></v-text-field></center>
                                <br><br>
                                <v-select
                                    v-model="news.categories"
                                    :items="items"
                                    menu-props="auto"
                                    label="เลือกหมวดหมู่"
                                    single-line
                                ></v-select>
                                <br><br>
                                <v-container  style="background-color: white ; margin-right:3%;">
                                    <!-- <v-container fluid>
                                        <v-textarea name="input-7-1" filledlabel="Label" label="รายละเอียด" auto-grow></v-textarea>
                                    </v-container> -->
                                    <ckeditor v-model="news.content" :editor="editor"
                                    :config="editorConfig"></ckeditor>
                                    <!-- <v-btn small style="text-align: right;" rounded color="primary" dark  >Add detailnews</v-btn> -->
                                </v-container>
                                
                        </v-flex>
                    
                </v-layout>
            </v-container>
                <div id="grid-container">
                    <div></div>
                    <v-btn style="weihgt = 40%" color="primary" dark @click="$router.back()">cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>

            <!-- <v-btn style="margin-right= 50%;" color="primary" dark>cancle</v-btn> 
                <v-btn style="margin-left= 50%;" color="primary" dark>submit</v-btn> -->
        </v-container>
        </form>    
    </div>
</template>
<style >
#detailnews{
    text-align: left;
    border-radius:30px;
    box-shadow: 7px 7px 4px ;
}
#picturenews{
    margin-top: 10%;
    margin-bottom: 10%;
    height:70% ;
    width: 70% ;
}
#rounded{
    border-radius:30px;
    
}
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto 10% 10% auto;
    grid-column-gap: 10%;
}
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

<script>
const Navbar = () => import('@/components/navbar/navbar')
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from "sweetalert2";
export default {
    name : "EditNews",

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },

    data(){
        return{
            news: {
                title: "",
                content: "",
                image: null,
                imagepath: "" ,
                newimage: null,
                oldimage: "",
                categories: null,
            },
            items:['วัด','โรงพยาบาล','มูลนิธิ','ประชาสัมพันธ์ของเว็บไซค์','อื่นๆ'],
            editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
		},
      toolbar: [ 'ckfinder', '|',
        'heading', '|',
        'alignment', '|',
        'bold', 
        'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'todoList',
        '-', // break point
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'outdent', 'indent', '|',
        'uploadImage', 'blockQuote', '|',
        'undo', 'redo']
      },
            imageData:null,
            isloading:false
        }
    },
    mounted: function(){
        this.getData()
    },
    components:{
        Navbar
    },
    methods: {
        chooseImage () {
            this.$refs.fileInput.click();
        },
    async Editnews(){
        try {
            var formData = new FormData();
            formData.append('title', this.news.title)
            formData.append('content', this.news.content)
            formData.append('categories', this.news.categories)
            if(this.news.newimage == null){
                console.log('true')
                formData.append('imagepath', this.news.image)
                formData.append('oldimage', this.news.image)
                console.log('true')
            }else {
                console.log('else')
                formData.append('image', this.news.newimage)
                formData.append('imagepath', this.news.newimage.name)
                formData.append('oldimage', this.news.oldimage)
                console.log('else')
            }
            
            // console.log('formData')
            // console.log(formData)
            // console.log(this.news.title)
            // console.log(this.news.content)
            // console.log(this.news.image)
            // console.log(this.news.image.name)
            // console.log(this.news.imagepath)
            swal.fire({
                title: 'Do you want to save the changes?',
                icon: 'question',
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                showCancelButton: true,
                confirmButtonText: `Save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.isloading = true
                    this.$http.put("/news/DetailNews/"+this.$route.params.id+"/edit/", formData)
                    .then(() => {
                        this.$router.push({ name: 'DetailNews' , params: {id : this.$route.params.id}})
                        swal.fire('Saved!', 'Edit this news was successful.', 'success')
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }
            })
            // await this.$http.put("/news/DetailNews/"+this.$route.params.id+"/edit/", formData)
            // .then(() => {
            //     this.$router.push({ name: 'DetailNews' , params: {id : this.$route.params.id}})
            // })
            // .catch(function(err){
            //     console.log(err)
            // })
           
            
        } catch (err) {
            let error = err.response;
            if (error.status == 409) {
                swal.fire("Error", error.data.message, "error");
                console.log('success')
            } else {
                swal.fire("Error", error.data.err.message, "error");
                console.log('error')
            }
        }
            },
    async onFileSelected(event){
            this.news.newimage = event.target.files[0]
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
        },
    async getData(){
        var that = this;
        await this.$http.get("/news/DetailNews/"+this.$route.params.id)
        .then((res) => {
        console.log(res.data)
        that.news = res.data;
        that.news.oldimage = res.data.image;
        console.log(that.news)
      })
        .catch(function(err){
        console.log(err)
        })
    },
    // reset(){
    //     this.$router.push({ name: 'DetailNews' , params: {id : this.$route.params.id}})
    // }
    },
}
</script>