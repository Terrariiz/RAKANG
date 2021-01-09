<template>
    <div class="dashboard" >
         <v-form
         @submit.prevent="Adddoctrine">
        <v-container id ='rounded' style="background-color: #F09C0B;">
           
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container id = "picturenews"  >
                                <!-- <v-file-input v-model="doctrine.image" label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                                <input type="file" @change="onFileSelected">
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
</style>

<script>
import swal from "sweetalert";
export default {
    name : "Adddoctrine",
    data(){
        return{
            doctrine: {
                title: "",
                content: "",
                image: null,
                imagepath: "" 
            }
        }
    },
    methods: {
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