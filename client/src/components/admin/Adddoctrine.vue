<template>
    <div class="dashboard" >
        <div>
            <Navbar></Navbar>
        </div>
         <v-form
         @submit.prevent="Adddoctrine">
        <v-container id ='rounded' style="background-color: #F09C0B;">
           
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container id = "picturenews"  >
                              <!-- preview image -->
                                <div style="text-align:right;"></div>
                                <!-- <div class="m-b-25"><img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"><br></div>
                                <div style="text-align:center; display:none;"><input style="visibility:hidden;  width:0;  height:0" id="file-input" type="file" /></div>
                                 -->

                                <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  @input="onSelectFile" >
                                </v-div></center>

                                <hr>
                               
                                <!-- <v-file-input v-model="doctrine.image" label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                                <!-- <input type="file" @change="onFileSelected"> -->
                            </v-container>
                            <v-container>
                            <span>{{doctrine.title}}</span>
                            <span>{{doctrine.content}}</span>
                            <span>{{doctrine.image}}</span>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                                <center><v-text-field  v-model="doctrine.title" style="width:70%; text-align: center;" label="หัวข้อเรื่อง" required></v-text-field></center>
                                <br><br>
                                <v-container id ="detailnews" style="background-color: white ; margin-right:3%;">
                                    <!-- <v-container fluid>
                                        <v-textarea name="input-7-1" filledlabel="Label" label="รายละเอียด" auto-grow></v-textarea>
                                    </v-container> -->
                                    <ckeditor 
                                    id="content"
                                    v-model="doctrine.content"
                                    @input="onEditorInput">
                                    </ckeditor>
                                    <!-- <v-btn small style="text-align: right;" rounded color="primary" dark  >Add detailnews</v-btn> -->
                                </v-container>
                        </v-flex>
                    
                </v-layout>
            </v-container>
                <div id="grid-container">
                    <div></div>
                    <v-btn style="weihgt = 40%" color="primary" dark>cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>

            <!-- <v-btn style="margin-right= 50%;" color="primary" dark>cancle</v-btn> 
                <v-btn style="margin-left= 50%;" color="primary" dark>submit</v-btn> -->
        </v-container>    
        </v-form>
    
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

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert";
export default {
    name : "Adddoctrine",
    data(){
        return{
           imageData:null,
            doctrine: {
                title: "",
                content: "",
                image: null,
                imagepath: "" 
            }
        }
    },
    components:{
        Navbar
    },
    methods: {chooseImage () {
            this.$refs.fileInput.click()
        },
        onSelectFile () {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                }
            reader.readAsDataURL(files[0])
            this.$emit('input', files[0])
            }
        },
        async Adddoctrine(){
    try {
        var formData = new FormData();
        formData.append('title', this.doctrine.title)
        formData.append('content', this.doctrine.content)
        formData.append('image', this.doctrine.image)
        formData.append('imagepath', this.doctrine.image.name)
        console.log(formData)
        let doctrine = await this.$http.post("/doctrine/adddoctrine", formData);
        console.log(doctrine);
        if (doctrine) {
          this.$router.push({ name: 'Listdoctrine'})
          swal("Success", "Add doctrine Was successful", "success");
          console.log('success')
          
        } else {
          swal("Error", "Something Went Wrong", "error");
          console.log('error')
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        console.log('success')
        } else {
          swal("Error", error.data.err.message, "error");
        console.log('error')
        }
      }
        },
        async onFileSelected(event){
            this.doctrine.image = event.target.files[0]
        }
    },

}
</script>