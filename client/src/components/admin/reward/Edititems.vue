<template>
    <div>
       <div>
      <Navbar></Navbar>
    </div>
    <br><br><br>
        <!-- <div class="container">
            <div class="small-container single-product">
                <div class="row">
                    <div class="col-2">
                                
                        <img src="../../../public/image/bubble.png" width="100%" id="product-img">
                        <div class="small-img-row">

                            <div class="small-img-col">
                                <img src="../../../public/image/bubble.png" width="100%" class="small-img">
                            </div>

                            <div class="form-input">
                                <label for="file-ip-1">เลือกรูปภาพ</label>
                                <v-file-input style="display:none;" multiple v-model="file" type="file" id="file-ip-1" accept="image/*" @change="onFileSelected"></v-file-input>
                            </div>

                            <div class="small-img-col">
                                <img src="" width="100%" class="small-img"> 
                            </div>

                            <div class="small-img-col">
                                <img src="" width="100%" class="small-img">
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <p>Items/ชื่อของ</p>
                        <h4>ชื่อของ</h4>
                         <v-text-field
                                solo
                                label="ชื่อสินค้า"
                                required
                                ></v-text-field>
                        <h4>ราคา</h4>
                         <v-text-field
                                solo
                                label="ราคา"
                                required
                                ></v-text-field>
                        <h4>รายละเอียด</h4>
                         <v-text-field
                                solo
                                label="รายละเอียด"
                                required
                                ></v-text-field>
                        <p>บอกรายละเอียด</p>
                         <v-text-field
                                solo
                                label="ชื่อสินค้า"
                                required
                                ></v-text-field>
                        <a href="" class="btn">ยกเลิก</a><a href="" class="btn greenx">ยืนยัน</a>
                    </div>
                </div>
            </div>
           
        
        </div> -->
        <v-overlay :value="isloading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
        <form @submit.prevent="Edititems">
        <div class="container">
            <h1>แก้ไขรายการของ</h1>
            <center>
                </center>
                 <h3>ใส่รูปของสินค้า</h3>
                 <hr>
                 <div class="head1">รูปภาพปก</div>
                    <v-row >
                        <v-col v-for="(image,index) in imageData" :key="image" md="2" sm="6" >
                                <div  class="preview" >
                                  <v-img @click="deletex(index)" class="icon" src="../../../../public/image/times-solid.svg"></v-img>
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
                    <hr>
                <h3>ข้อมูลสินค้า</h3>
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
              to="/admin/Listitems"
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
</template>

<script>
    // import a from "../../public/image/bubble.png"
    const Navbar = () => import('@/components/navbar/navbar')
    import swal from "sweetalert2";
    export default {
        data() {
    return {
      imageData:[],
      exchange: {
        name: null,
        detail: null,
        overviewimage: null,
        imagepath: "",
        cost: null,
        remain: null,
        galleryimage:[],
      },
      deleteimage:[],
      file:null,  
      delcount: false,
      filecount: false,
      isloading:false,
      test:[]
     
    };
  },
        components: {
      Navbar
        },
        mounted: function(){
        this.getData()
    },
        methods: {
          async Edititems(){
        try{
            var formData = new FormData();
            formData.append("name", this.exchange.name);
            formData.append("detail", this.exchange.detail);
            if(this.filecount){
                this.file.forEach( files =>{
              formData.append("multi-files", files);
            })
            }
            
            formData.append("remain", this.exchange.remain);
            formData.append("cost", this.exchange.cost);
         
                this.deleteimage.forEach( del =>{
              formData.append("deleteimage", del);
            })
          
            
        swal.fire({
                title: 'Do you want to save the changes?',
                icon: 'question',
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                showCancelButton: true,
                confirmButtonText: `Save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                
                if (result.isConfirmed) {
                  this.isloading = true
                    this.$http.put("/exchangeitem/EditItem/"+this.$route.params.id+"/edit", formData)
                    .then(() => {

                        this.$router.push({ name: 'Detailitems' , params: {id : this.$route.params.id}})
                        swal.fire('Saved!', 'Edit this news was successful.', 'success')
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }
            })
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
        for(var i=0;i<this.file.length;i++){
          this.test.push(this.file[i])}
          console.log(this.file)
          console.log(typeof this.file)
          this.exchange.galleryimage = this.test
          this.file.forEach(f => {var url = URL.createObjectURL(f)
          console.log(f)
          this.imageData.push(url)})
          this.filecount = true
          

        // this.$emit('input', files[0])
      }
    },
    deletex(index){
      console.log(index)
      
      this.imageData.forEach(element => {
        console.log(element)
      })
      var link = this.imageData[index]

      this.deleteimage.push(link)
      
      console.log(JSON.stringify(link))
      this.imageData.splice(index,1)
      this.delcount = true
      
    },
    async getData(){
        var that = this;
        await this.$http.get("/exchangeitem/DetailItem/"+this.$route.params.id)
        .then((res) => {
        console.log(res.data)
        that.exchange = res.data;
        // that.exchange.galleryimage.forEach(image => {this.imageData.push(image)})
        for(var i=0;i<4;i++){
        var x = that.exchange.galleryimage[i].image
        this.imageData.push(x)}
        // that.news.oldimage = res.data.image;
        console.log(that.exchange)
        console.log(this.imageData)
      })
        .catch(function(err){
        console.log(err)
        })
    },

        },

        
    }
</script>


<style scoped>
.img-size{
  height: 150px;
  width: 120px;
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
.icon{
  position: absolute;
  height: 15px;
  width: 15px;
  right:60px;
  top:7px;
  z-index: 2;
  background-color: red;
  padding: 8px;
  border-radius: 10px;
}
.icon:hover{
  background-color: #e0e0e0;
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