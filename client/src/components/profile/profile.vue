<template>
    <div>
      <div>
      <Navbar></Navbar>
    </div>   
    <br><br><br>
    
      <v-container>
        <v-row>
            <v-col class="pad0"  cols="12" md="4" sm="12"> <!-- class="name-picture" -->
               <v-row >
                 <v-card-text  class="border-cardtext" >
                 <v-col class="name-pic-pro"  cols="12" md="12" sm="12">
                    <div class="edit-profile">
                  
                </div>
              <center><div v-if="selected == 'โปรไฟล์' || selected == 'ประวัติการบริจาค' || selected =='บุ๊คมาค'" class="image-profile">
                <img  :src="
                                Profile.image
                              ">
              </div></center>

              <center><div v-if="selected == 'แก้ไขโปรไฟล์'" class="image-profile">
                <!-- <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"> -->
                 <center>
                <v-div
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
                
                <center><div class="name-profile">{{Profile.firstname}} {{Profile.lastname}}</div>
                <div><span class="sub-head">แต้มบุญ:</span> {{Profile.point}}  </div></center>
                <br>
                <div class="btn-cpass">
                        <v-btn class="e-profile" v-if="selected == 'โปรไฟล์' || selected == 'ประวัติการบริจาค' || selected =='บุ๊คมาค'" @click="onChange('แก้ไขโปรไฟล์')" color="secondary" >แก้ไขโปรไฟล์</v-btn>
                        <br>
                        <v-btn  @click.stop="dialog_ChangePassword=true">เปลี่ยนรหัสผ่าน</v-btn>
                        <ChangePassword :visible="dialog_ChangePassword" @close="dialog_ChangePassword=false" />                     
                    </div>
                
              </div>
              
                 </v-col>
                 <hr class="hr-hide">
                 <v-col class="select-head"  cols="12" md="12" sm="12">
                  <div class="selectboxs">
                <div class="setting-proflie2">
                  <div class="hover-setting" @click="onChange('โปรไฟล์')">โปรไฟล์</div>
                  <div class="hover-setting" @click="onChange('ประวัติการบริจาค')">ประวัติการบริจาค</div>
                  <div class="hover-setting" @click="onChange('บุ๊คมาค')">บุ๊คมาค</div>
                </div>
               
                
              </div>
                 </v-col>
                 </v-card-text>
               </v-row>
            </v-col>
          
          <v-col v-if="selected == 'โปรไฟล์' || selected == 'ประวัติการบริจาค' || selected =='บุ๊คมาค'" class="setting-proflie" cols="12" md="4" sm="12">
            <div class="selectboxs">
              <div>
                 <v-select
                 v-model="selected"
                :items="items"
                label="เลือกหัวข้อ"
                solo
               
                ></v-select>
              </div>
              
            </div>
            
          </v-col>
          <!-- โปรไฟล์ -->
          <v-col  v-if="selected == 'โปรไฟล์'" class="details-profile" cols="12" md="8" sm="12">
            <v-container>
              
              <div class="head-profile">บัญชีของฉัน</div>
              <div class="sub-profile">ดูและแก้ไขข้อมูลส่วนบุคคลของคุณที่นี่</div>
              <center><img class="img-rank" :src="
                                'http://localhost:8080/image/rank/' +
                                Profile.Rank+'.png'
                              "></center>
              <hr>
             
                 <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600 sub-head">อีเมลสำหรับล็อกอิน</p>
                          <h6 class="text-muted f-w-400">
                            {{Profile.email}}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600 sub-head">เบอร์โทรติดต่อ</p>
                          <h6 class="text-muted f-w-400">
                           {{Profile.phone}}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600 sub-head">วัน/เดือน/ปีเกิด</p>
                          <h6 class="text-muted f-w-400">{{Profile.birthdate}}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600 sub-head">แต้มบุญ</p>
                          <h6 class="text-muted f-w-400">
                            {{Profile.point}}
                          </h6>
                        </div>
                        
                      </div>
                
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
                        onkeypress="return event.charCode != 32"
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
                        onkeypress="return event.charCode != 32"
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
            <h2 class="text-center">ประวัติการบริจาค</h2>
               <v-card>
                
                <v-data-table
                  :headers="headers"
            :items="filteredList"
            :items-per-page="pagination.rowsPerPage" 
            hide-default-footer
            class="elevation-1"
                ></v-data-table>
                <v-pagination circle :total-visible="7"  v-model="pagination.page" :length="pages"></v-pagination>
              </v-card>
            </v-container>
          </v-col>
          
          <!-- bookmark -->
          <v-col v-else-if="selected == 'บุ๊คมาค'"  class="bookmark-profile" cols="12" md="8" sm="12">
            <v-container>
               <div class="block latestPostBlock">
      <v-container>
        <h2 class="text-center">หลักธรรมที่บันทึก</h2>
        <v-row>
          <v-col v-for="Bookmark in Bookmarks" :key="Bookmark.id" cols="12" md="4">
            <v-card
     
      max-width="344"
      outlined
    >
     <v-img  class="mx-auto" :src="Bookmark.image"></v-img>
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
                      <v-btn @click="ViewDoctrine(Bookmark._id)" color="primary" style="margin-left:auto;" text
                        >More</v-btn
                      >
                    </v-card-actions>
          </v-card>
                </v-col>
              </v-row>
    <v-pagination circle :total-visible="7"  v-model="pagination.page" :length="pages"></v-pagination>

              <!-- <router-link to='/news' style="float:right; margin-bottom:3%"
                >แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i
                ><i class="fa fa-chevron-right" aria-hidden="true"></i
              ></router-link> -->
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
import ChangePassword from '@/components/profile/changePassword';
const Navbar = () => import("@/components/navbar/navbar");
import moment from 'moment';
// import a from '../../../public/image/outline_add_photo_alternate_black_24dp.png'
const id = window.localStorage.getItem("user_id");
import swal from "sweetalert2";
export default {
    name : "test",
   
    components:{
      ChangePassword,
        Navbar,
        // Pagination,
        
    },
    data ()  {
      return{
      items: ['โปรไฟล์', 'ประวัติการบริจาค', 'บุ๊คมาค'],
      selected: 'โปรไฟล์',
      Bookmarks:[],
      dialog_ChangePassword: false,
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
      pagination:{
                data: null,
                rowsPerPage: 10,
                page: 1,
            },
            totalNumberOfItems: this.$store.getters.banana.length,
            headers: [
                {
                    text: 'ชื่อแคมเปญ',
                    sortable: false,
                    value: 'CampaignName'
                },
                { text: 'จำนวนเงิน', value: 'amount' },
                { text: 'วัน-เดือน-ปี', value: 'date' }
                
            ]
      }

    },
    async mounted(){
      const token = window.localStorage.getItem("user_token");
      const id = window.localStorage.getItem("user_id");
      if (token) {
      try {
        // this.$router.push("/profile");
        this.forceRerender()
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
        this.imageData =res.data.image;
      
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
        
        this.pagination.data = res.data.donatelog;
        

        var i = 0
        for(this.pagination.data[i];;i++){
            this.pagination.data[i].date = moment(this.pagination.data[i].date).format(" DD-MM-YYYY HH:mm A");
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
    forceRerender() {
            this.componentKey += 1;
          },
      onChange(value) {
        this.selected = value;
        console.log(this.selected);
      },
      ViewDoctrine(doctrineid){
      this.$router.push({
        name: "UserDetailDoctrine",
        params: {id:doctrineid}
      })
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
              location.reload();
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
          this.selected = 'โปรไฟล์';
        } else {
          swal.fire("Error", error.data.err.message, "error");
          console.log("error");
          this.selected = 'โปรไฟล์';
        }
      }
    },
      
    },
    
    computed: {
        pages () {
            return this.pagination.rowsPerPage ? Math.ceil(this.pagination.data.length / this.pagination.rowsPerPage) : 0
        },
        filteredList() {
            var firstIndex;
            if (this.pagination.page == 1) {
                firstIndex = 0;
            } else{
                firstIndex = (this.pagination.page-1) * this.pagination.rowsPerPage;
            }
            console.log(firstIndex + " firstIndex");
            var showData = this.pagination.data.slice(firstIndex, firstIndex + this.pagination.rowsPerPage);
            console.log(showData);
            return showData
        },
        
    },
      
  
    };
    
 


</script>

<style scoped>
.e-profile{
  margin-bottom: 10px;
}
hr{
  border-top: 1px solid black;
}
.border-cardtext{
  background-color: #efefef;
  border: #cfd6ea solid 4px ;
  border-radius: 10px;
}
/* .pad0{
  padding: 0;
}
.container{
  padding: 0;
}
.row{
  padding: 0;
} */
.rows{
  background-color: #e5e5e5;
}
.name-profile{
  text-align: center;
  justify-content: center;
  font-size: 32px;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 20px;
}
.sub-head{
  font-size: 20px;
  font-weight: bold;
}
.head-profile{
  font-size: 30px;
  font-weight: bold;
}
.sub-profile{
  font-size: 14px;
}
/* previewsimage */
.base-image-input {
  display: block;
  width: 300px;
  height: 300px;
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
  font-size: 30px;
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
  color: rgb(190, 160, 60);
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
  height: 300px;
  width: 300px;
}
.edit-pic{
  padding: 20px;
  background-color: #C0C5C1;
  position: absolute;
  left: 65%;
  top: 5%;
}
.edit-pic:hover{
  background-color:rgb(230, 230, 154) ;
}

.img-rank{
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 40%;
  width: 40%;
}

.image-profile img{
  clip-path: circle();
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
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
  /* border: black solid 0.8px; */
}
.select-head{
  /* margin-top: 3% ; */
  /* border: black solid 0.8px ; */
  
}
.setting-proflie{
  display: none;
  margin-top: 3%;
  /* border: black solid 0.8px; */
}
.details-profile{
  /* border: black solid 0.8px; */
  height: 80vh;
  /* padding: 12px; */
  
}
.table-profile{
  height: 80vh;
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
.hr-hide{
  display: none;
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
