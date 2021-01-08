<template>
    <div class="dashboard" >
        <form @submit.prevent="handleSubmit">
        <v-container id ='rounded' style="background-color: #F09C0B;">
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container id = "picturenews"  >
                                <input type="file" id="file" ref="file" multiple v-on:change="onFileSelected">
                                <!-- <v-file-input label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                            </v-container>
                        
                        </v-flex>
                        <v-flex xs12 md6>
                                <!-- <h1 style="color:black;">หัวข้อเรื่อง</h1> -->
                                <center><v-text-field v-model="head" style="width:70%; text-align: center;" label="หัวข้อเรื่อง" ></v-text-field></center>
                                <br><br>
                                <v-container id ="detailnews"  style="background-color: white ; margin-right:3%;">
                                    <v-container fluid>
                                        <v-textarea name="input-7-1" v-model="detail" filledlabel="Label" label="รายละเอียด" auto-grow></v-textarea>
                                    </v-container>
                                    <!-- <v-btn small style="text-align: right;" rounded color="primary" dark  >Add detailnews</v-btn> -->
                                <!-- <div id="app">
                                    <ckeditor @input="onEditorInput"></ckeditor>
                                </div> -->
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
    </div>
</template>

<script>
import axios from "axios";

    export default {
        name: 'app',
        data() {
            return {
                selctedFile: null,
                head: null,
                detail: null,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        },
        methods:{
            onFileSelected(){
                this.file = this.$refs.file.files[0];
                // this.selctedFile = event.target.files[0];
                console.log(this.file);
                
            },
            handleSubmit() {
            let formData = new FormData();
            formData.append('file', this.file);  // appending file
            console.log(formData)
            let add = {
                head : this.head,
                detail: this.detail,
                image : this.file,
            }
            console.log(add);


     // sending file to the backend
      axios
        .post("http://localhost:4000/admin/upload", this.add)
        .then(res => {
            console.log(formData);
          console.log(res);
        })
        .catch(err => {
            console.log(formData);
          console.log(err);
        });
    }

}
};
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
</style>