<template>
    <div>   
      <div>
      <Navbar></Navbar>
    </div>
    <br><br><br>
    <form @submit.prevent="Additems">
        <div class="container">
            <h1>เพิ่มรายการของ</h1>
            <center>
                </center>
                 <div class="head1">ใส่รูปมุมมองอื่นๆ</div>
                    <v-row >
                        <v-col  md="2" sm="6" >
                                <div class="preview" >
                                    <img id="file-ip-1-preview">
                                </div>
                        </v-col>
                        <v-col  md="2" sm="6">
                            <div class="form-input">
                                <label for="file-ip-1">เลือกรูปภาพ</label>
                                <input type="file" id="file-ip-1" accept="image/*" @click="onFileSelected">
                            </div>
                        </v-col>
                    </v-row>
                <div class="items">
                    <div class="name-items">
                        <v-row>
                            <v-col cols="12" md="4" sm="12">
                                <div class="head1">name</div>
                                <v-text-field
                                v-model="exchange.name"
                                solo
                                label="Name"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col  md="2" sm="6">
                                <div class="head1">ราคา</div>
                                <v-text-field
                                v-model="exchange.cost"
                                class="value"
                                solo
                                label="90"
                                required
                                type="number"
                                onkeypress="return event.charCode >= 48"
                                min="1"
                                ></v-text-field>
                            </v-col>
                            <v-col  md="2" sm="6">
                                <div class="head1">จำนวน</div>
                                <v-text-field
                                v-model="exchange.name"
                                class="value"
                                solo
                                label="1"
                                required
                                type="number"
                                min="1"
                                ></v-text-field>
                            </v-col>
                       </v-row>
                    </div>
                    <div class="detail-items">
                        <div class="head1">รายละเอียด</div>
                        <v-textarea
                            v-model="exchange.detail"
                            solo
                            clearable
                            clear-icon="mdi-close-circle"
                            label="รายละเอียดของแคมเปญ"
                            value=""
                            required
                        ></v-textarea>
                    </div>
                    
                    
                </div>
                <!-- ปุ่มกดยืนยันหรือยกเลิก  -->
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
        <br><br>
    </form>
  </div>
</template>


<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";

   export default {
  name: "Addcampaign",
  data() {
    return {
      imageData:null,
      exchange: {
        name: null,
        detail: null,
        overviewimage: null,
        imagepath: "",
        cost: null,
        remain: null,
        galleryimage:[],
      },  
     
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async Additems(){
        try{
            var formData = new FormData();
            formData.append("name", this.exchange.name);
            formData.append("detail", this.exchange.detail);
            formData.append("overviewimage", this.exchange.overviewimage);
            formData.append("galleryimage", this.exchange.galleryimage);
            formData.append("remain", this.exchange.remain);
            formData.append("cost", this.exchange.cost);
            console.log(formData);
            let exchange = await this.$http.post("/exchangeitem/addnewItem", formData);
        console.log(exchange);
        if (exchange) {
          this.$router.push({ name: "Listiems" });
          swal.fire("Success", "Add Items Was successful", "success");
          console.log("success");
        } else {
          swal.fire("Error", "Something Went Wrong", "error");
          console.log("error");
        }
        }catch (err){
        //     let error = err.response;
        // if (error.status == 409) {
        //   swal.fire("Error", error.data.message, "error");
        //   console.log("success");
        // } else {
        //   swal.fire("Error", error.data.err.message, "error");
        //   console.log("error");
        // }
        }

    },
    async showPreview(event){
    if(event.target.files.length > 0){
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("file-ip-1-preview");
    preview.src = src;
    preview.style.display = "block";
        }
    },
    async onFileSelected(event) {
      this.exchange.overviewimage = event.target.files[0];
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
</script>
<style scoped>
  .container{
      width: 80%;
      background-color: cornflowerblue;
      border-radius: 5px;
  }
   /* previewsimage  */

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
.preview{
    width: 120px;
  height: 150px;
}
.form-input {
  display: block;
  width: 120px;
  height: 150px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.form-input input {
  display:none;
}
.form-input label {
  
 background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 20px;
  font-family: Helvetica;
  cursor: pointer;
}
.form-input img {
  width:200px;
  height: 200px;
  display:none;
  margin-top:10px;
  text-align: center;
}



.preview img {
  width: 120px;
  height: 150px;
  margin-left: 15px;
  display:none;
  text-align: center;
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
  .form-input-preview img {
  margin-left: 0px;
}
  
  
}
    

    
</style>