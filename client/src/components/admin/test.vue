<template>
    <div >
        <!-- <div>
            <Navbar></Navbar>
        </div> -->
        <!-- <h1>test</h1>
        <v-container class="con">
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name2</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name3</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
        </v-container> -->
      <v-container>
        <v-row class="rows">
            <v-col  cols="12" md="4" sm="12"> <!-- class="name-picture" -->
               <v-row>
                 <v-col class="name-pic-pro"  cols="12" md="12" sm="12">
                    <div class="edit-profile">
                  <v-btn v-if="selected == 'โปรไฟล์' || selected == 'ประวัติการบริจาค' || selected =='บุ๊คมาค'" @click="onChange('แก้ไขโปรไฟล์')" color="secondary" icon><v-icon>mdi-pencil</v-icon></v-btn>
                </div>
              <center><div v-if="selected == 'โปรไฟล์' || selected == 'ประวัติการบริจาค' || selected =='บุ๊คมาค'" class="image-profile">
                <img :src="
                                'http://localhost:4000/image/profile/' +
                                Profile.image
                              ">
              </div></center>

              <center><div v-if="selected == 'แก้ไขโปรไฟล์'" class="image-profile">
                <!-- <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"> -->
                 <center>
                <v-div
                  style=""
                  class="base-image-input"
                  :style="{ 'background-image': `url(${imageData})` }"
                  @click="chooseImage"
                >
                  <span v-if="!imageData" class="placeholder"
                    >Choose an Image</span
                  >
                  <input
                    class="file-input"
                    id="file-input"
                    ref="fileInput"
                    type="file"
                    @input="onSelectFile"
                  />
                </v-div>
              </center>
              </div></center>
              <hr>
              <div class="name">
                
                <h3>{{Profile.firstname}} {{Profile.lastname}}</h3>
                <div>แต้มบุญ: {{Profile.point}}</div>
                <br>
                <div class="btn-cpass">
                        <v-btn small @click.stop="dialog_ChangePassword=true">เปลี่ยนรหัสผ่าน</v-btn>
                        <ChangePassword :visible="dialog_ChangePassword" @close="dialog_ChangePassword=false" />                     
                    </div>
                
              </div>
              
                 </v-col>
                 <v-col class="select-head"  cols="12" md="12" sm="12">
                  <div class="selectboxs">
                <div class="setting-proflie2">
                  <div class="hover-setting" @click="onChange('โปรไฟล์')">โปรไฟล์</div>
                  <div class="hover-setting" @click="onChange('ประวัติการบริจาค')">ประวัติการบริจาค</div>
                  <div class="hover-setting" @click="onChange('บุ๊คมาค')">บุ๊คมาค</div>
                </div>
               
            <!-- <div class="selectboxs">
              <div>
                 <v-select
                 v-model="selected"
                :items="items"
                label="Solo field"
                solo
                
                ></v-select>
              </div>
              
            </div> -->
            
         
                
              </div>
                 </v-col>
               </v-row>
            </v-col>
          
          <v-col class="setting-proflie" cols="12" md="4" sm="12">
            <div class="selectboxs">
              <div>
                 <v-select
                 v-model="selected"
                :items="items"
                label="Solo field"
                solo
                @change="onChange()"
                ></v-select>
              </div>
              
            </div>
            
          </v-col>
          <!-- โปรไฟล์ -->
          <v-col  v-if="selected == 'โปรไฟล์'" class="details-profile" cols="12" md="8" sm="12">
            <v-container>
               <v-card-text><div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">
                            {{Profile.email}}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                          <h6 class="text-muted f-w-400">
                           {{Profile.phone}}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">วัน/เดือน/ปีเกิด</p>
                          <h6 class="text-muted f-w-400">{{Profile.birthdate}}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Point</p>
                          <h6 class="text-muted f-w-400">
                            {{Profile.point}}
                          </h6>
                        </div>
                        
                      </div></v-card-text>
            </v-container>
          </v-col>

           <!-- editโปรไฟล์ -->
           
           <v-col v-else-if="selected == 'แก้ไขโปรไฟล์'" class="details-profile" cols="12" md="8" sm="12">
            <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="EditProfile">
            <v-container>
                  <h6
                    class="m-b-20 p-b-5 b-b-default f-w-600"
                    style="font-size:20px;"
                  >
                    Edit Profile
                  </h6>

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">ชื่อ</p>
                      <v-text-field
                        single-line
                        solo
                        v-model="Profile.firstname"
                        :rules="firstnameRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">นามสกุล</p>
                      <v-text-field
                        single-line
                        solo
                        v-model="Profile.lastname"
                        :rules="lastnameRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">วัน/เดือน/ปีเกิด</p>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            single-line solo
                            v-model="Profile.birthdate"
                            prepend-icon="mdi-calendar"
                            :rules="dateRules"
                            readonly
                            required
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="Profile.birthdate"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                      <v-text-field
                        single-line
                        solo
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        v-model="Profile.phone"
                        :rules="phoneRules"
                        required
                      ></v-text-field>
                    </div>
                   
                    <v-row>
                      <v-col cols="3"></v-col>
                      <v-col cols="3">
                        <v-btn
                          type="submit"
                          style="margin:1%; text-align:center;"
                          @click="onChange('โปรไฟล์')"
                          color="error"
                          dark
                          >Cancel</v-btn
                        >
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          :disabled="!valid"
                          type="submit"
                          style="margin:1% text-align:center;"
                          color="primary"
                          @click="validate"
                        >
                          Edit
                        </v-btn>
                      </v-col>
                      <v-col cols="3"></v-col>
                    </v-row>
                  </div>
                  
                </v-container>
          </v-form>

          </v-col>

          <!-- ประวัติการบริจาค -->
           <v-col v-else-if="selected == 'ประวัติการบริจาค'"  class="table-profile" cols="12" md="8" sm="12">
            <v-container > 
              <div class="head-details">ประวัติการบริจาค</div>
               <table class="table">
                <thead>
                  <tr>
                    <th>ชื่อแคมเปญ</th>
                    <th>จำนวนเงิน(บาท)</th>
                    <th>วัน-เดือน-ปี</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                </tbody>
               </table>
            </v-container>
          </v-col>
          
          <!-- bookmark -->
          <v-col v-else-if="selected == 'บุ๊คมาค'"  class="bookmark-profile" cols="12" md="8" sm="12">
            <v-container>
               <div class="block latestPostBlock">
      <v-container>
        <h2 class="text-center">ข่าว</h2>
        <v-row>
          <v-col v-for="Bookmark in Bookmarks" :key="Bookmark.id" cols="12" md="4">
            <v-card
     
      max-width="344"
      outlined
    >
     <v-img  class="mx-auto" :src="'http://localhost:4000/image/doctrine/' + Bookmark.image"></v-img>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
           {{ Bookmark.categories }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{Bookmark.title}}
          </v-list-item-title>
          <v-list-item-subtitle v-html="Bookmark.content" >{{ Bookmark.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
            <v-card-actions>
                      <v-btn to="" color="primary" style="margin-left:auto;" text
                        >More</v-btn
                      >
                    </v-card-actions>
          </v-card>
                </v-col>
              </v-row>
              <router-link to='/news' style="float:right; margin-bottom:3%"
                >แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i
                ><i class="fa fa-chevron-right" aria-hidden="true"></i
              ></router-link>
            </v-container>
          </div>

          
            </v-container>
          </v-col>
          <!-- bookmark -->

        
           
            
          
          
          
        </v-row>
      
      </v-container>
    </div>
</template>


<script>
// const Navbar = () => import('@/components/navbar/navbar')
import moment from 'moment'
const id = window.localStorage.getItem("user_id");
import swal from "sweetalert2";
export default {
    name : "test",
   
    components:{
        // Navbar,
        
    },
    data ()  {
      return{
      items: ['โปรไฟล์', 'ประวัติการบริจาค', 'บุ๊คมาค', 'แก้ไขโปรไฟล์'],
      selected: 'โปรไฟล์',
      Bookmarks:[],
      Log:[],
      Profile:{},
      imageData: null,
      valid: false,
      dataEdit: {
        image: null,
        imagepath: "",
        newimage: null,
        oldimage: "",
      },
      emailRules: [
        (v) => !!v || "Email is required!",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length >= 6 || "Name must be more than 6 characters",
        (v) => v.length <= 12 || "Name must be less than 12 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Name must be more than 6 characters",
        (v) => v.length <= 12 || "Name must be less than 12 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required!",
        (v) => v.length <= 50 || "Name must be less than 50 characters",
      ],
      firstnameRules: [
        (v) => !!v || "Firstname is required!",
        (v) => v.length <= 50 || "Firstname must be less than 50 characters",
      ],
      lastnameRules: [
        (v) => !!v || "Lastname is required!",
        (v) => v.length <= 50 || "lastname must be less than 50 characters",
      ],
      dateRules: [(v) => !!v || "Birthdate is required!"],
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => v.length == 10 || "Phone must be 10 numbers",
      ],
      }

    },
    async mounted(){
      const token = window.localStorage.getItem("user_token");
      const id = window.localStorage.getItem("user_id");
      if (token) {
      try {
        // this.$router.push("/profile");
      } catch (err) {
        console.log(err);
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
      }
    }
      console.log(id)
    await this.$http
      .get("/user/" + id)
      .then((res) => {
        this.Profile = res.data;
        this.dataEdit.oldimage = res.data.image;
        this.imageData =
          "http://localhost:4000/image/profile/" + res.data.image;
      
        console.log("get user data")
        console.log(this.Profile)
      })
      .catch(function (err) {
        console.log(err);
      });
    await this.$http
      .get("donatelog/donateloguser/" + id)
      .then((res) => {
        console.log("get log")
        console.log(this.donatelog)
        
        this.Log = res.data.donatelog;

        var i = 0
        for(this.donatelog[i];;i++){
            this.donatelog[i].date = moment(this.donatelog[i].date).format(" DD-MM-YYYY HH:mm A");
            } 
      })
      .catch(function (err) {
        console.log(err);
      });
      await this.$http
      .get("/doctrine/ShowFavDoctrine/" + id)
      .then((res) => {

        this.Bookmarks = res.data.favdoctrinelist;
        console.log("get user Bookmark")
        console.log(this.Bookmarks)
      })
      .catch(function (err) {
        console.log(err);
      });
    
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
          save (date) {
        this.$refs.menu.save(date)
    },
      onChange(value) {
        this.selected = value;
        console.log(this.selected);
      },
      validate() {
      this.$refs.form.validate();
    },
      chooseImage() {
      this.$refs.fileInput.click();
    },
      onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      this.dataEdit.newimage = event.target.files[0];
      console.log(this.dataEdit.newimage);
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    async EditProfile() {
      try {
        var formData = new FormData();
        formData.append("firstname", this.Profile.firstname);
        formData.append("lastname", this.Profile.lastname);
        formData.append("birthdate", this.Profile.birthdate);
        formData.append("phone", this.Profile.phone);

        if (this.dataEdit.newimage == null) {
          formData.append("imagepath", this.Profile.image);
          formData.append("oldimage", this.Profile.image);
        } else {
          formData.append("image", this.dataEdit.newimage);
          formData.append("imagepath", this.dataEdit.newimage.name);
          formData.append("oldimage", this.dataEdit.oldimage);
        }
        swal
          .fire({
            title: "Do you want to save the changes?",
            icon: "question",
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            showCancelButton: true,
            confirmButtonText: `Save`,
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.$http.put("/user/" + id + "/editProfile", formData);
              this.$router.push("/profile");
              swal.fire(
                "Saved!",
                "Edit your profile Was successful.",
                "success"
              );
              console.log("success");
            }
          });
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal.fire("Error", error.data.message, "error");
          console.log("success");
        } else {
          swal.fire("Error", error.data.err.message, "error");
          console.log("error");
        }
      }
    },
      
    },
    
 
    };
 


</script>

<style scoped>
  /* *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  } */
/* .con{
  
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 1000px;
}
.image-box{
  position: relative;
  display: inline-block;
  width: 250px;
  height: 350px;
  margin: 15px;
  border-radius: 40px;
  box-shadow: 5px 5px 5px rgba(68, 68, 68,.6),
              5px 5px 5px 3px rgba(68, 68, 68,.6);
}
.image-box::before{
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 251, 251, 0.4);
  transform: skew(-35deg);
  transform-origin: top left;
  transform: translate(350px,0);
  transition: 3s linear;
  z-index: 3;
}
.image-box:hover::before{
  transform: translate(-350px,0);
}
.image-box:hover img{
  transform: scale(1.3);
  overflow: hidden;
}
.contents .content-textx{
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100px;
  background: rgb(220, 20, 60);
  padding-top: 10px;
  text-align: center;
  color: white;
  transition: .3s cubic-bezier(.52,-0.30,.45,1.6);
  text-transform: uppercase;
  z-index: 4;
}
.image-box:hover .contents .content-textx{
  height: 65%;
}
.contents img{
  position: relative;
  display: inline;
  transition: 2s ease;
  z-index: -1;
} */
/* previewsimage */
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  clip-path: circle();
}
.placeholder {
  clip-path: circle();
  background: #f0f0f0;
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
  background: #e0e0e0;
}
.file-input {
  display: none;
}

.img-profile {
  margin: 20px auto;
  width: 300px;
  height: 200px;
}
.img-profile img {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}
.hover-setting:hover{
  color: red;
  cursor: pointer;
}
.head-details{
  text-align: center;
  font-size: 32px;
  font-weight: 300;
  margin: 2%;
}
.edit-profile{
  position: absolute;
  right: 0;
  top:0;
  
}
.btn-cpass{
    margin: 20px auto;
    text-align: center;
  }
.image-profile{
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
img{
  clip-path: circle();
  background-size: cover;
}
.name-picture{
  background-color: cornflowerblue;
  align-items: center;
  justify-content: center;
  border: black solid 0.8px;
  padding: 50px 50px;
  /* height: 80vh;  */
  
}

.name-pic-pro{
  border: black solid 0.8px;
  
}
.select-head{
  margin-top: 3% ;
  border: black solid 0.8px;
  
}
.setting-proflie{
  display: none;
  margin-top: 3%;
  /* border: black solid 0.8px; */
}
.details-profile{
  /* border: black solid 0.8px; */
  height: 80vh;
  overflow-y: scroll;
}
.table-profile{
  height: 80vh;
  overflow-y: scroll;
}
.bookmark-profile{
  height: 80vh;
  overflow-y: scroll;
}


/* ประวัติการบริจาค */
.table{
  width: 100%;
  border-collapse: collapse;
}
.table thead{
  background-color: #ee2828;
}
.table thead tr th{
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.35px;
  color:#ffffff;
  opacity: 1;
  padding: 12px;
  vertical-align: top;
  border:1px solid #dee2e685;
}
.table tbody tr td{
  font-size: 14px;
  letter-spacing: 0.35px;
  font-weight: normal;
  color: #f1f1f1;
  background-color: #3c3f44;
  padding: 8px;
  text-align: left;
  border: 1px solid #dee2e685;
}
.mx-auto{
      height:200px;

}
@media (max-width:768px){
  .details-profile{
  
  max-height:auto;
  
}
.setting-proflie2{
  display: none;
}
  .setting-proflie{
  display: block;
  margin-top: 3%;
  
}
  .table thead{
    display: none;
  }
  .table, .table tbody,.table tr,.table td{
    display: block;
    width: 100%;
  }
  .table tr{
    margin-bottom:15px;
  }
  .table tbody tr td{
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  .table td:before{
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
  }
}
/* ประวัติการบริจาค */
</style>
