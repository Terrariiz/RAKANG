<template>
<div>
    <div>
        <Navbar></Navbar>
    </div>
   <!-- <h1>This is editprofile page.</h1> -->
   <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="EditProfile"
    >
    <v-container >
        <div class="padding">
        <div id="borderbox1"  class="row container d-flex justify-content-center ">
            <!-- กรอบนอกสุด -->
            <div id="borderbox2">
                <!-- กรอบชั้นใน -->
                <div  class="card user-card-full">
                    <div class="row m-l-0 m-r-0">

                        
                        
                            <div  class="col-sm-4 bg-c-lite-green user-profile">
                                <div style="text-align:center;"  class="card-block text-center text-white">
                                    <div style="text-align:right;"><v-btn icon ><label for="file-input"><v-icon>mdi-pencil</v-icon></label></v-btn></div>
                                    <!-- <div class="m-b-25"><img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"><br></div>
                                    <div style="text-align:center; display:none;"><input style="visibility:hidden;  width:0;  height:0" id="file-input" type="file" /></div>
                                    -->

                                    <center><v-div  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                        <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                        <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  @input="onSelectFile" >
                                    </v-div></center>
                                    <hr>
                                    
                                </div>
                            </div>
                            
                            <div class="col-sm-8">
                                <div  class="card-block">
                                    <!-- <router-link style=" color:gray;" to="/editprofile"  ><i style="text-align:right;" class="fa fa-edit"></i>Edit</router-link> -->
                                    <!-- <div style="text-align: right;"><router-link style="color:gray; " to="/editprofile"><i class="fa fa-edit"></i>Edit</router-link></div> -->
                                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600" style="font-size:20px;">Edit Profile</h6>
                                    
                                    <div class="row">
                                        
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">ชื่อ</p>
                                            <v-text-field single-line solo  v-model="dataEdit.firstname" v-bind:label="dataUser.firstname"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">นามสกุล</p>
                                            <v-text-field single-line solo  v-model="dataEdit.lastname" v-bind:label="dataUser.lastname"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">อายุ(ปี)</p>
                                            <v-text-field single-line solo  v-model="dataEdit.age" v-bind:label="dataUser.age"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                                            <v-text-field single-line solo  v-model="dataEdit.phone" v-bind:label="dataUser.phone"></v-text-field>
                                        </div>
                                        <div class="col-md-6">
                                            <v-btn type="submit" style="margin:1%; text-align:center;" to="/profile" color="error" dark>Cancel</v-btn>
                                            <v-btn type="submit" style="margin:1% text-align:center;"  color="primary" dark>Edit</v-btn>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        
                        
                    </div>
                </div>
               
            </div>
        </div>
        </div>
        
    </v-container>
   </v-form>
</div>


</template>

<script>
import swal from "sweetalert";
const Navbar = () => import('@/components/navbar/navbar')
const jwt = require("jsonwebtoken")
const token = window.localStorage.getItem('user_token')
const decoded = jwt.verify(token, "secret")
export default {
    
    name:'Editprofile',
    components:{
        Navbar
    },
    data() {
        return {
            imageData:null,
            dataUser: {},
            dataEdit:{
                firstname: "",
                lastname: "",
                age: "",
                phone: "",
                image: null,
                imagepath: "" ,
                newimage: null,
                oldimage: ""
            }
        }
    },
    // get data of user
    mounted: async function mounted(){
      await this.$http.get("/user/"+decoded._id)
      .then((res) => {
        this.dataUser = res.data;
        this.dataEdit.oldimage = res.data.image;
        this.imageData = "http://localhost:4000/image/profile/" + res.data.image;
      })
      .catch(function(err){
        console.log(err)
      })
    },
    async created (){
        // const token = window.localStorage.getItem('user_token')
			if (token) {
				try{
                    this.$router.push('/editprofile')
				}catch(err){
                    console.log(err)
                    localStorage.removeItem('user_token')
				}
			}
    },
    methods: {
        chooseImage () {
            this.$refs.fileInput.click()
        },
        onSelectFile () {
            const input = this.$refs.fileInput
            const files = input.files
            this.dataEdit.newimage = event.target.files[0]
            console.log(this.dataEdit.newimage)
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                }
            reader.readAsDataURL(files[0])
            this.$emit('input', files[0])
            }
        },
        async EditImage() {

        },
        async EditProfile() {
            if(this.dataEdit.firstname == ""){
                this.dataEdit.firstname = this.dataUser.firstname
            }
            if(this.dataEdit.lastname == ""){
                this.dataEdit.lastname = this.dataUser.lastname
            }
            if(this.dataEdit.age == ""){
                this.dataEdit.age = this.dataUser.age
            }
            if(this.dataEdit.phone == ""){
                this.dataEdit.phone = this.dataUser.phone
            }
            try {
                var formData = new FormData();
                formData.append('firstname', this.dataEdit.firstname)
                formData.append('lastname', this.dataEdit.lastname)
                formData.append('age', this.dataEdit.age)
                formData.append('phone', this.dataEdit.phone)
            
                if(this.dataEdit.newimage == null){
                    formData.append('imagepath', this.dataUser.image)
                    formData.append('oldimage', this.dataUser.image)
                }else {
                    formData.append('image', this.dataEdit.newimage)
                    formData.append('imagepath', this.dataEdit.newimage.name)
                    formData.append('oldimage', this.dataEdit.oldimage)
                }
                let response = await this.$http.put("/user/"+decoded._id+"/editProfile", formData);
                let check = response.data
                if (check == true) {
                    this.$router.push("/profile");
                    swal("Success", "Edit your profile Was successful", "success");
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
        }
   }
}
</script>

<style>
       
       body {
    background-color: #f9f9fa
}

.padding {
    padding: 3rem !important
}

.user-card-full {
    overflow: hidden
}

.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    border: none;
    margin-bottom: 30px
    
}

.m-r-0 {
    margin-right: 0px;
    
}

.m-l-0 {
    margin-left: 0px
}

.user-card-full .user-profile {
    border-radius: 5px 0 0 5px
}

.bg-c-lite-green {
    background: -webkit-gradient(linear, left top, right top, from(#f29263), to(#ee5a6f));
    background: linear-gradient(to right, #ee5a6f, #f29263)
}

.user-profile {
    padding: 20px 0
}

.card-block {
    padding: 1.25rem
}

.m-b-25 {
    margin-bottom: 25px
}

.img-radius {
    border-radius: 5px
}

h6 {
    font-size: 14px
}

.card .card-block p {
    line-height: 25px
}


@media only screen and (min-width: 1400px) {
    p {
        font-size: 14px
    }
    
}
@media only screen and (max-width: 820px) {
    p {
        font-size: 14px
    }
    #borderbox1{
        width:300px;
    }
    #borderbox2{
        width:600px;
    }
}


.card-block {
    padding: 1.25rem
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0
}

.m-b-20 {
    margin-bottom: 20px
}

.p-b-5 {
    padding-bottom: 5px !important
}

.card .card-block p {
    line-height: 25px
}

.m-b-10 {
    margin-bottom: 10px
}

.text-muted {
    color: #919aa3 !important
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0
}

.f-w-600 {
    font-weight: 600
}

.m-b-20 {
    margin-bottom: 20px
}

.m-t-40 {
    margin-top: 20px
}

.p-b-5 {
    padding-bottom: 5px !important
}

.m-b-10 {
    margin-bottom: 10px
}

.m-t-40 {
    margin-top: 20px
     
}

.user-card-full .social-link li {
    display: inline-block
}

.user-card-full .social-link li a {
    font-size: 20px;
    margin: 0 10px 0 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out
}

/* previewsimage */

 .base-image-input {
  display: block;
  width: 110px;
  height: 100px;
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
  font-size: 8px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
</style>

