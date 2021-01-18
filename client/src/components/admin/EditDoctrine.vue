<template>
    <div class="dashboard" >
        <div>
            <Navbar></Navbar>
        </div>
         <v-form
         @submit.prevent="Editdoctrine">
        <v-container id ='rounded' style="background-color: #F09C0B;">
           
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container v-model = "doctrine.image"  >
                                <!-- <v-file-input v-model="doctrine.image" label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                                <input type="file"  @change="onFileSelected">

                                <!-- <v-btn @click="reset" style="weihgt = 40%" color="red" dark>Clear</v-btn> -->
                                <p>*if don't submit new picture we just use previous picture</p>
                            </v-container>
                            <v-container>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                                <center><v-text-field  v-model="doctrine.title" style="width:70%; text-align: center;" label="หัวข้อเรื่อง" required></v-text-field></center>
                                <br><br>
                                <v-container  style="background-color: white ; margin-right:3%;">
                                    <!-- <v-container fluid>
                                        <v-textarea name="input-7-1" filledlabel="Label" label="รายละเอียด" auto-grow></v-textarea>
                                    </v-container> -->
                                    <ckeditor v-model="doctrine.content" :config="editorConfig"></ckeditor>
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
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert";
export default {
    name : "EditDoctrine",

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },

    data(){
        return{
            doctrine: {
                title: "",
                content: "",
                image: null,
                imagepath: "" ,
                newimage: null,
                oldimage: ""

            },
            editorConfig: {
                    // The configuration of the editor.
                }
        }
    },
    components:{
        Navbar
    },
    mounted: function(){
        this.getData()
    },
    methods: {
    async Editdoctrine(){
        try {
            var formData = new FormData();
            formData.append('title', this.doctrine.title)
            formData.append('content', this.doctrine.content)
            
            if(this.doctrine.newimage == null){
                console.log('true')
                formData.append('imagepath', this.doctrine.image)
                formData.append('oldimage', this.doctrine.image)
                console.log('true')
            }else {
                console.log('else')
                formData.append('image', this.doctrine.newimage)
                formData.append('imagepath', this.doctrine.newimage.name)
                formData.append('oldimage', this.doctrine.oldimage)
                console.log('else')
            }
            
            console.log('formData')
            console.log(formData)
            console.log(this.doctrine.title)
            console.log(this.doctrine.content)
            console.log(this.doctrine.image)
            console.log(this.doctrine.image.name)
            console.log(this.doctrine.imagepath)
            await this.$http.put("/doctrine/DetailDoctrine/"+this.$route.params.id+"/edit/", formData)
            .then(() => {
                this.$router.push({ name: 'DetailDoctrine' , params: {id : this.$route.params.id}})
            })
            .catch(function(err){
                console.log(err)
            })
           
            
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
            this.doctrine.newimage = event.target.files[0]
        },
    async getData(){
        var that = this;
        await this.$http.get("/doctrine/DetailDoctrine/"+this.$route.params.id)
        .then((res) => {
        console.log(res.data)
        that.doctrine = res.data;
        that.doctrine.oldimage = res.data.image;
        console.log(that.doctrine)
      })
        .catch(function(err){
        console.log(err)
        })
    },
    // reset(){
    //     this.$refs.myFileInput.value = null;
    //     this.doctrine.newimage = null;
    // }
    },
}
</script>