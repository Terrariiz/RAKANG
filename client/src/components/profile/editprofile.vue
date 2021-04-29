<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    
    <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="EditProfile">
      <div>
      <br><br><br>
        <v-container>
          <v-row>
            <v-col style="background-color:red;" cols="12" md="4" sm="12">
              <div style="text-align:right;">
                <v-btn icon
                  ><label style=" cursor: pointer;" for="file-input"
                    ><v-icon>mdi-pencil</v-icon></label
                  ></v-btn
                >
              </div>
              
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

              <hr />
              <div class="name-sur">
                <h6 style="font-size: 20px; color;blue;" class="f-w-600">
                  {{ dataUser.firstname }} {{ dataUser.lastname }}
                </h6>
                <!-- <h6 class="f-w-600">{{ dataUser.coin }} Coin</h6> -->
              </div>
              <!-- <div class="btn-log">
                        <v-btn small @click.stop="dialog_Logcoin=true">ประวัติการบริจาค</v-btn>
                        <Logcoin :visible="dialog_Logcoin" @close="dialog_Logcoin=false" />                     
                    </div>
                    <div class="btn-cpass">
                        <v-btn small @click.stop="dialog_ChangePassword=true">เปลี่ยนรหัสผ่าน</v-btn>
                        <ChangePassword :visible="dialog_ChangePassword" @close="dialog_ChangePassword=false" />                     
                    </div> -->
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <div class="tab-section">
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
                        v-model="dataUser.firstname"
                        :rules="firstnameRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">นามสกุล</p>
                      <v-text-field
                        single-line
                        solo
                        v-model="dataUser.lastname"
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
                            v-model="dataUser.birthdate"
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
                          v-model="dataUser.birthdate"
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
                        v-model="dataUser.phone"
                        :rules="phoneRules"
                        required
                      ></v-text-field>
                    </div>
                    <!-- <div class="col-md-6">
                                            <v-btn type="submit" style="margin:1%; text-align:center;" to="/profile" color="error" dark>Cancel</v-btn>
                                            
                                        </div>
                                        <div class="col-md-6">
                                            
                                            <v-btn type="submit" style="margin:1% text-align:center;"  color="primary" dark>Edit</v-btn>
                                        </div> -->

                    <v-row>
                      <v-col cols="3"></v-col>
                      <v-col cols="3">
                        <v-btn
                          type="submit"
                          style="margin:1%; text-align:center;"
                          to="/profile"
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
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-form>
  </div>
</template>

<script>
import swal from "sweetalert2";
const Navbar = () => import("@/components/navbar/navbar");
const token = window.localStorage.getItem("user_token");
var id;
export default {
  name: "Editprofile",
  components: {
    Navbar,
  },
  data() {
    return {
      valid: false,
      imageData: null,
      dataUser: {},
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
    };
  },
  // get data of user
  mounted: async function mounted() {
    id = window.localStorage.getItem("user_id");
    await this.$http
      .get("/user/" + id)
      .then((res) => {
        this.dataUser = res.data;
        this.dataEdit.oldimage = res.data.image;
        this.imageData = res.data.image;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  async created() {
    // const token = window.localStorage.getItem('user_token')
    if (token) {
      try {
        this.$router.push("/editprofile");
      } catch (err) {
        console.log(err);
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
      }
    }
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
    validate() {
      this.$refs.form.validate();
    },
    async EditProfile() {
      try {
        var formData = new FormData();
        formData.append("firstname", this.dataUser.firstname);
        formData.append("lastname", this.dataUser.lastname);
        formData.append("birthdate", this.dataUser.birthdate);
        formData.append("phone", this.dataUser.phone);

        if (this.dataEdit.newimage == null) {
          formData.append("imagepath", this.dataUser.image);
          formData.append("oldimage", this.dataUser.image);
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

<style>
body {
  background-color: #f9f9fa;
}
img {
  width: 200px;
  height: 200px;
}

.padding {
  padding: 3rem !important;
}

.user-card-full {
  /* width: 700px; */
  overflow: hidden;
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px;
}

.m-r-0 {
  margin-right: 0px;
}

.m-l-0 {
  margin-left: 0px;
}

.user-card-full .user-profile {
  border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f29263),
    to(#ee5a6f)
  );
  background: linear-gradient(to right, #ee5a6f, #f29263);
}

.user-profile {
  padding: 20px 0;
}

.card-block {
  padding: 1.25rem;
}

.m-b-25 {
  margin-bottom: 25px;
}

.img-radius {
  border-radius: 5px;
}

h6 {
  font-size: 14px;
}

.card .card-block p {
  line-height: 25px;
}

@media only screen and (min-width: 1400px) {
  p {
    font-size: 14px;
  }
}
@media only screen and (max-width: 991px) {
  img {
    width: 150px;
    height: 150px;
  }
}
@media only screen and (max-width: 770px) {
  img {
    width: 100px;
    height: 100px;
  }
}
@media only screen and (max-width: 576px) {
  img {
    width: 200px;
    height: 200px;
  }
}

.card-block {
  padding: 1.25rem;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
  margin-bottom: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.card .card-block p {
  line-height: 25px;
}

.m-b-10 {
  margin-bottom: 10px;
}

.text-muted {
  color: #919aa3 !important;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
}

.m-t-40 {
  margin-top: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-40 {
  margin-top: 20px;
}

.user-card-full .social-link li {
  display: inline-block;
}

.user-card-full .social-link li a {
  font-size: 20px;
  margin: 0 10px 0 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
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
.name-sur {
  text-align: center;
}
.btn-log {
  margin: 20px auto;
  text-align: center;
}
.btn-cpass {
  margin: 20px auto;
  text-align: center;
}
</style>
