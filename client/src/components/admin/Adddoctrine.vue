<template>
    <div class="Adddoctrine">
        <div>
            <Navbar></Navbar>
        </div>
         <form
         @submit.prevent="Adddoctrine">
        <v-container id ='rounded' style="background-color: #F09C0B;">
           
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container id = "picturedoctrine"  >
                                <div style="text-align:right;"></div>
                                

                                <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  v-on:change="onFileSelected" >
                                </v-div></center>

                                <hr>
                               
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                                <center><v-text-field  v-model="title" style="width:70%; text-align: center;" label="หัวข้อเรื่อง" required></v-text-field></center>
                                <br><br>
                                <v-container id ="detaildoctrine" style="background-color: white ; margin-right:3%;">
                                    <ckeditor 
                                    id="content"
                                    v-model="content"
                                    @input="onEditorInput">
                                    </ckeditor>
                                </v-container>
                        </v-flex>
                    
                </v-layout>
            </v-container>
                <div id="grid-container">
                    <div></div>
                    <v-btn style="weidth = 40%" color="primary" dark to='/admin/listdoctrine'>cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>
        </v-container>    
        </form>
    
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
export default {
    name : "Adddoctrine",
    data(){
        return{
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
    methods: {
        chooseImage () {
            this.$refs.fileInput.click();
        },
        async Adddoctrine(){
        try {
            var formData = new FormData();
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('image', this.image)
            formData.append('imagepath', this.image.name)
            console.log(formData)
            let doctrine = await this.$http.post("/doctrine/adddoctrine", formData);
            console.log(doctrine);
            if (doctrine) {
                this.$router.push({ name: 'Listdoctrine'})
                swal.fire("Success", "Add doctrine Was successful", "success");
                console.log('success')
            } else {
                swal.fire("Error", "Something Went Wrong", "error");
                console.log('error')
            }
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
    },

}
</script>

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
