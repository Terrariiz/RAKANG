  
<template>
<div>
    <div>
        <Navbar></Navbar>
    </div>
    <v-form @submit.prevent="EditProfile">
    <center><div class="page-content page-container" id="page-content">
    <div class="padding">
        <div  class="row container d-flex justify-content-center">
            <div  class="col-xl-12 col-md-12">
                <div class="card user-card-full">
                    <div  class="row m-l-0 m-r-0">
                        <div  class="col-sm-4 bg-c-lite-green user-profile">
                            <div  class="card-block text-center text-white">
                                 <div style="text-align:right;"><v-btn  icon ><label style=" cursor: pointer;" for="file-input"><v-icon>mdi-pencil</v-icon></label></v-btn></div>
                                    <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
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
                                            <v-text-field single-line solo  v-model="dataUser.firstname"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">นามสกุล</p>
                                            <v-text-field single-line solo  v-model="dataUser.lastname"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">อายุ(ปี)</p>
                                            <v-text-field single-line solo  v-model="dataUser.age"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                                            <v-text-field single-line solo  v-model="dataUser.phone"></v-text-field>
                                        </div>
                                        <!-- <div class="col-md-6">
                                            <v-btn type="submit" style="margin:1%; text-align:center;" to="/profile" color="error" dark>Cancel</v-btn>
                                            
                                        </div>
                                        <div class="col-md-6">
                                            
                                            <v-btn type="submit" style="margin:1% text-align:center;"  color="primary" dark>Edit</v-btn>
                                        </div> -->

                                        <v-row>
                                            <v-col cols="3" ></v-col>
                                            <v-col cols="3" >
                                                <v-btn type="submit" style="margin:1%; text-align:center;" to="/profile" color="error" dark>Cancel</v-btn>
                                            </v-col>
                                             <v-col cols="3" >
                                                <v-btn type="submit" style="margin:1% text-align:center;"  color="primary" dark>Edit</v-btn>
                                            </v-col>
                                            <v-col cols="3" ></v-col>
                                        </v-row>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div></center>
</v-form>
</div>

</template>

<script>
import swal from "sweetalert";
import Swal from "sweetalert2";
const Navbar = () => import('@/components/navbar/navbar')
const token = window.localStorage.getItem('user_token')
const id = window.localStorage.getItem('user_id')
export default {
    
    name:'Editprofile',
    components:{
        Navbar
    },
    data() {
        return {
            valid: false,
            imageData:null,
            dataUser: {},
            dataEdit:{
                image: null,
                imagepath: "" ,
                newimage: null,
                oldimage: ""
            },
            firstnameRules:[
                v => !!v || 'Firstname is required!',
                v => v.length <= 50 || 'Firstname must be less than 50 characters',
            ],
            lastnameRules:[
                v => !!v || 'Lastname is required!',
                v => v.length <= 50 || 'lastname must be less than 50 characters',
            ],
            ageRules:[
                v => !!v || 'Age is required!',
                v => v >= 0 || 'Age must be more than 0 years',
                v => v <= 120 || 'Age must be less than 120 years',
            ],
            phoneRules:[
                v => !!v || 'Phone is required',
                v => v.length == 10 || 'Name must be 10 numbers',
            ]
        }
    },
    // get data of user
    mounted: async function mounted(){
      await this.$http.get("/user/"+id)
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
                    localStorage.removeItem('user_id')
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
        validate () {
            this.$refs.form.validate()
        },
        async EditProfile() {
            try {
                var formData = new FormData();
                formData.append('firstname', this.dataUser.firstname)
                formData.append('lastname', this.dataUser.lastname)
                formData.append('age', this.dataUser.age)
                formData.append('phone', this.dataUser.phone)
            
                if(this.dataEdit.newimage == null){
                    formData.append('imagepath', this.dataUser.image)
                    formData.append('oldimage', this.dataUser.image)
                }else {
                    formData.append('image', this.dataEdit.newimage)
                    formData.append('imagepath', this.dataEdit.newimage.name)
                    formData.append('oldimage', this.dataEdit.oldimage)
                }
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    icon: 'question',
                    confirmButtonColor: 'green',
                    cancelButtonColor: 'red',
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.$http.put("/user/"+id+"/editProfile", formData);
                        this.$router.push("/profile");
                        Swal.fire('Saved!', 'Edit your profile Was successful.', 'success')
                        console.log('success')
                    }
                })
                // let response = await this.$http.put("/user/"+id+"/editProfile", formData);
                // let check = response.data
                // if (check == true) {
                //     this.$router.push("/profile");
                //     swal("Success", "Edit your profile Was successful", "success");
                //     console.log('success')
                // } else {
                //     swal("Error", "Something Went Wrong", "error");
                //     console.log('error')
                // }
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
img{
    width: 200px;
    height: 200px;
}

.padding {
    padding: 3rem !important
}


.user-card-full {
    /* width: 700px; */
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
    margin-right: 0px
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
@media only screen and (max-width: 991px) {
   img{
    width: 150px;
    height: 150px;
}
}
@media only screen and (max-width: 770px) {
   img{
    width: 100px;
    height: 100px;
}
}
@media only screen and (max-width: 576px) {
   img{
    width: 200px;
    height: 200px;
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
  width: 200px;
  height: 200px;
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