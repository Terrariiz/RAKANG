<template>
    <div>   
      <div>
      <Navbar></Navbar>
    </div>
    <br><br><br>
    <form @submit.prevent="Additems">
        <div class="container">
            <h1>เพิ่มรายการของ</h1>
            
                 <h3>ใส่รูปของสินค้าไม่เกิน 5 รูป</h3>
                 <hr>
                 <div class="head1">รูปแรกคือภาพปก</div>
                    <v-row >
                        <v-col class="col-vue" v-for="(image,index) in imageData" :key="image" md="2" sm="6" >
                                <div  class="preview" >
                                    <v-img @click="deletex(index)" class="iconx" src="../../../../public/image/times-solid.svg"></v-img>
                                    <v-img class="img-size" :src="image"></v-img>
                                    
                                </div>
                        </v-col>
                        <v-col  md="2" sm="6">
                            <div class="form-input">
                                <label for="file-ip-1">เลือกรูปภาพ</label>
                                <v-file-input style="display:none;" multiple v-model="file" type="file" id="file-ip-1" accept="image/*" @change="onFileSelected"></v-file-input>
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
                                v-model="exchange.remain"
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
         
        </v-row>
        </div>
        <br><br>
    </form>
  </div>
</template>


<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
// import a from "../../../../public/image"
   export default {
  name: "Addcampaign",
  data() {
    return {
      imageData:[],
      exchange: {
        name: null,
        detail: null,
        imagepath: "",
        cost: null,
        remain: null,
        galleryimage:[],
      },
      file:[],
      test:[],  
     
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
            this.test.forEach( files =>{
              formData.append("multi-files", files);
            })
            formData.append("remain", this.exchange.remain);
            formData.append("cost", this.exchange.cost);
            console.log(formData);
            let exchange = await this.$http.post("/exchangeitem/addnewItem", formData);
        console.log(exchange);
        if (exchange) {
          this.$router.push({ name: "Listitems" });
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
    
    async onFileSelected() {
      // this.exchange.overviewimage = event.target.files[0];
      // const input = this.$refs.fileInput;
      if (this.file != null) {
        console.log(this.file.length)
        for(var i=0;i<this.file.length;i++){
          this.test.push(this.file[i])}
          console.log(this.file)
          console.log(typeof this.file)
          this.exchange.galleryimage = this.test
          console.log(this.exchange.galleryimage)
          this.file.forEach(f => {var url = URL.createObjectURL(f)
          console.log(f)
          this.imageData.push(url)})

        // this.$emit('input', files[0])
      }
    },
    deletex(index){
      this.imageData.splice(index,1)
      this.test.splice(index,1)
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
.col-vue{
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-size{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  

}
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
  position: relative;
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
.form-input:hover{
  box-shadow: 0 0 20px 0px rgb(0,0,0,0.2);
}
.form-input input {
  display:none;
}
.form-input label {
  
 background: #f0f0f0;
 border-radius: 5px;
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
.form-input label:hover{
  background: #838181;
  color: #e0e0e0;
}
.form-input img {
  width:200px;
  height: 200px;
  display:none;
  margin-top:10px;
  text-align: center;
}
.preview > .iconx{
position: absolute;
  top: -5px;
  right: -5px;
  height: 15px;
  width: 15px;
  z-index: 2;
  background-color: red;
  /* padding: 8px; */
  border-radius: 10px;
}
.iconx:hover{
  background-color: #e0e0e0;
  
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