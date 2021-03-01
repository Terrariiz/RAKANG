<template>
  <div class="dashboard">
    <div>
      <Navbar></Navbar>
    </div>
    <!-- <form
         @submit.prevent="Addcampaign">
        <v-container id ='rounded' style="background-color: #F09C0B;">
            <center><h1>Add new Campaign</h1></center>
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container id = "picturenews">
                                <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  v-on:change="onFileSelected" >
                                </v-div></center>

                                <hr>
                            </v-container>
                        
                        </v-flex>
                        <v-flex xs12 md6>
                                <center><v-text-field v-model="campaign.name" style="width:70%; text-align: center;" label="ชื่อแคมเปญ" required></v-text-field></center>
                                <br><br>
                                <center><v-text-field v-model="campaign.date" type="date" style="width:70%;" label="วันสิ้นสุดแคมเปญ" required></v-text-field></center>
                                <br><br>
                                 <center><v-text-field v-model="campaign.amount" style="width:70%;" label="ยอดสุทธิ" required></v-text-field></center>
                                <br><br>
                                <v-container id ="detailnews" style="background-color: white ; margin-right:3%;">
                                    <v-container fluid>
                                        <v-textarea v-model="campaign.content" name="input-7-1" filledlabel="Label" label="รายละเอียด" auto-grow required></v-textarea>
                                    </v-container>
                                
                                </v-container>
                                
                        </v-flex>
                    
                </v-layout>
            </v-container>
                <div id="grid-container">
                    <div></div>
                    <v-btn style="weihgt = 40%" color="primary" dark href='/admin/listcampaign'>cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>

        </v-container>
        </form> -->

    <!-- อันใหม่ยังไม่ใช่ form     -->
    <form @submit.prevent="Addcampaign">
      <div class="project-header">
        <v-container>
          <v-row>
            <h1>Add new campaign</h1>
          </v-row>
          <center>
            <v-row class="headname">
              <v-text-field
                v-model="campaign.name"
                solo
                label="Name"
                required
              ></v-text-field>
              <br />
            </v-row>
          </center>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <div class="project-content">
                <!-- <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/> -->
                <center>
                  <v-container id="picturenews">
                    <v-div
                      required
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
                        v-on:change="onFileSelected"
                      />
                    </v-div>

                    <hr />
                  </v-container>
                </center>
                <v-textarea
                  solo
                  clearable
                  v-model="campaign.content"
                  clear-icon="mdi-close-circle"
                  label="รายละเอียดของแคมเปญ"
                  value=""
                  required
                ></v-textarea>
                <!-- <p class="lead">content</p> -->
                
              </div>
              <v-row>
                    <v-col cols="12" md="6" sm="12">
                      <h3 class="title">วันที่สิ้นสุดแคมเปญ</h3>
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
                        solo
                        required
                        v-model="campaign.date"
                        label="วันสิ้นสุด"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="campaign.date"
                      :min="new Date().toISOString().substr(0, 10)"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <h3 class="title">สถานที่</h3>
                      <v-text-field
                    v-model="campaign.location"
                    class="location"
                    solo
                    label="รพ. วัด มูลนิธิ"
                    required
                  ></v-text-field>
                    </v-col>
                  </v-row>
              <div class="details funding-goal">
                <h3 class="title">เป้าหมาย</h3>
                <v-text-field
                  v-model="campaign.amount"
                  class="value"
                  solo
                  label="จำนวนเงิน"
                  required
                  type="number"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                ></v-text-field>
              </div>
            </v-col>
            
          </v-row>
          <v-row>
            <v-col cols="12" md="8" sm="12">
              <h3>ภาพรวม</h3>
              <br />
              <ckeditor
                id="content"
                v-model="campaign.overview"
                @input="onEditorInput"
                required
              >
              </ckeditor>
              <hr />
              <!-- <h3>ความคืบหน้า</h3>
            <br>
              <ckeditor 
                id="content"
                v-model="campaign.done"
                @input="onEditorInput">
            </ckeditor> -->
<<<<<<< HEAD
            </v-col>
          </v-row>
        </v-container>
        <!-- <div id="grid-container">
                    <div></div>
                    <v-btn style="weidth = 40%" color="error" dark href='/admin/listcampaign'>cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div> -->
        <v-row style="margin-top: 3%">
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <v-btn
              color="error"
              style="float: right"
              dark
              to="/admin/listcampaign"
              >Cancle</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" style="float: left" type="submit"
              >Submit</v-btn
            >
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
      </div>
    </form>
  </div>
=======
         </v-col>
      </v-row>
      
  </v-container>
                <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="error" style="float:right;" dark to='/admin/listcampaign'>Cancle</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:left;" type="submit">Submit</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
    </div>
        </form>
  
    </div>
>>>>>>> 10d4d2c85b5047e22155b4b9f5c24443da2a1cd9
</template>

<style >
#detailnews {
  text-align: left;
  border-radius: 30px;
  box-shadow: 7px 7px 4px;
}
#picturenews {
  margin-top: 10%;
  margin-bottom: 10%;
  height: 70%;
  width: 70%;
}
#rounded {
  border-radius: 30px;
}
#grid-container {
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
  background: #f0f0f0;
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
  background: #e0e0e0;
}
.file-input {
  display: none;
}

/* ฟอมอันใหม่ */
.project-header {
  background-color: #fff8ec;
}
.project-content {
  padding-right: 40px;
}
.image .-fullwidth {
  width: 100%;
}
.image {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
img {
  vertical-align: middle;
  border: 0;
}
.fund-raising {
  border-radius: 6px;
  background-clip: padding-box;
  color: #666;
  border: 1px solid #f3d9ab;
  background-color: #fff;
  z-index: 999;
}
.fund-raising .body {
  padding: 30px 25px 0 25px;
}
.fund-raising .action {
  padding: 30px 25px 30px 25px;
}
.headname {
  width: 40%;
  margin-right: 5%;
}
.details {
  width: 40%;
}

#picturenews {
  /* margin-top: 10%; */
  /* margin-bottom: 10%; */
  height: 70%;
  width: 70%;
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
  background: #f0f0f0;
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
  background: #e0e0e0;
}
.file-input {
  display: none;
}
#grid-container {
  display: grid;
  /* background-color: white; */
  padding: 10px;
  grid-template-columns: auto 10% 10% auto;
  grid-column-gap: 10%;
}

@media (max-width: 767px) {
  .project-content {
    padding-right: 0;
  }
}
@media (max-width: 321px) {
  .base-image-input {
    width: 100px;
    height: 100px;
  }
  .placeholder {
    font-size: 10px;
  }
  .headname {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .details {
    width: 100%;
  }
}
</style>

<script>
const Navbar = () => import("@/components/navbar/navbar");
import swal from "sweetalert2";

export default {
  name: "Addcampaign",
  data() {
    return {
      tab: null,
      menu: false,
      items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageData: null,
      campaign: {
        name: null,
        content: null,
        image: null,
        imagepath: "",
        date: null,
        amount: null,
        tab: null,
        overview: null,
        done: null,
        location: null,
        items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async Addcampaign() {
      try {
        var formData = new FormData();
        formData.append("name", this.campaign.name);
        formData.append("content", this.campaign.content);
        formData.append("image", this.campaign.image);
        formData.append("imagepath", this.campaign.image.name);
        formData.append("date", this.campaign.date);
        formData.append("amount", this.campaign.amount);
        formData.append("overview", this.campaign.overview);
        formData.append("done", this.campaign.done);
        formData.append("location", this.campaign.location);
        console.log(formData);
        let campaign = await this.$http.post("/campaign/addcampaign", formData);
        console.log(campaign);
        if (campaign) {
          this.$router.push({ name: "ListCampaign" });
          swal.fire("Success", "Add campaign Was successful", "success");
          console.log("success");
        } else {
          swal.fire("Error", "Something Went Wrong", "error");
          console.log("error");
        }
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
<<<<<<< HEAD
    },
    async onFileSelected(event) {
      this.campaign.image = event.target.files[0];
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        // this.$emit('input', files[0])
      }
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
=======
        },
        async onFileSelected(event){
            this.campaign.image = event.target.files[0]
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
        },
        chooseImage () {
            this.$refs.fileInput.click()
        },
        save (date) {
          this.$refs.menu.save(date)
      },
        
    }
}
>>>>>>> 10d4d2c85b5047e22155b4b9f5c24443da2a1cd9
</script>
