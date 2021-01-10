<template>
<div>
    <div>
        <Navbar></Navbar>
    </div>
   <h1>This is editprofile page.</h1>
    <v-container >
        <div  class="padding">
        <div  class="row container d-flex justify-content-center">
            <!-- กรอบนอกสุด -->
            <div style=" width: 700px;">
                <!-- กรอบชั้นใน -->
                <div  class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div  class="col-sm-4 bg-c-lite-green user-profile">
                            <div style="text-align:center;"  class="card-block text-center text-white">
                                <div style="text-align:right;"><v-btn icon ><label for="file-input"><v-icon>mdi-pencil</v-icon></label></v-btn></div>
                                <!-- <div class="m-b-25"><img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"><br></div>
                                <div style="text-align:center; display:none;"><input style="visibility:hidden;  width:0;  height:0" id="file-input" type="file" /></div>
                                 -->

                                <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  @input="onSelectFile" >
                                </v-div></center>

                                <hr><v-container><v-text-field single-line solo label="" ></v-text-field></v-container>
                                <h6 class="f-w-600">200 Coin</h6> 
                                
                                <center><v-container >
                                    <v-row >
                                        

                                        <v-col cols="12" sm ="12" md="12">
                                            
                                            <v-btn small>ประวัติการบริจาค</v-btn>
                                        </v-col>

                                        <v-col cols="12" sm ="12" md="12">
                                            
                                            <v-btn small  >ประวัติการซื้อ coin</v-btn>
                                        </v-col>

                                        


                                    </v-row>
                                </v-container></center>
                            </div>
                        </div>
                        
                        <div class="col-sm-8">
                            <div  class="card-block">
                                <!-- <router-link style=" color:gray;" to="/editprofile"  ><i style="text-align:right;" class="fa fa-edit"></i>Edit</router-link> -->
                                <!-- <div style="text-align: right;"><router-link style="color:gray; " to="/editprofile"><i class="fa fa-edit"></i>Edit</router-link></div> -->
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600" style="font-size:20px;">Profile</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Email</p>
                                        <v-container><v-text-field single-line solo label="" ></v-text-field></v-container>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                                        <v-container ><v-text-field  single-line solo label="" ></v-text-field></v-container>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">อายุ(ปี)</p>
                                        <v-container><v-text-field single-line solo label="" ></v-text-field></v-container>
                                    </div>
                                </div>
                                <!-- <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Recent</p>
                                        <h6 class="text-muted f-w-400">Sam Disuja</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Most Viewed</p>
                                        <h6 class="text-muted f-w-400">Dinoter husainm</h6>
                                    </div>
                                </div>
                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                </ul> -->
                            </div>
                        </div>
                        
                    </div>
                </div>
                <v-container fluid>
            <v-row>
                <v-col  cols ="12" sm = "2">
                    
                            
                </v-col>
                
                <v-col  cols ="12" sm = "2">
                    
                            
                </v-col>

                <v-col  cols ="12" sm = "2">
                            <v-btn  color="primary" dark>cancle</v-btn>
                            
                </v-col>   
                
                <v-col  cols ="12" sm = "2">
                            <v-btn  color="primary" dark>submit</v-btn>
                            
                </v-col>

            </v-row>
        </v-container>
            </div>
        </div>
        </div>
        
    </v-container>
   
</div>


</template>

<script>
const Navbar = () => import('@/components/navbar/user_navbar')
export default {
    
    name:'Editprofile',
     data() {
    return {
        imageData:null,
          }
    },
    components:{
        Navbar
    },
    

    async created (){
        const token = window.localStorage.getItem('user_token')
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
  if (files && files[0]) {
    const reader = new FileReader
    reader.onload = e => {
      this.imageData = e.target.result
    }
    reader.readAsDataURL(files[0])
    this.$emit('input', files[0])
  }
    },
   
}}
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

