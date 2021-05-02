<template>
    <div class="EditCampaign" >
        <div>
            <Navbar></Navbar>
        </div>
        <br><br>
        <v-overlay :value="isloading">
        <v-progress-circular
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
         <v-form
         @submit.prevent="Editcampaign">
       <div class="project-header">
    <v-container >
          <v-row >
               <h1>Edit campaign</h1>
          </v-row>
      <center><v-row class="headname" >
          <v-text-field v-model="campaign.name"  solo label="Name"  required></v-text-field>
          <br>
      </v-row></center>
      <v-row>
          <v-col  cols="12" md="12" sm="12">
              <div class="project-content">
                  <!-- <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/> -->
                   <center><v-container id = "picturenews">
                                <v-div required style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <img v-if="!imageData" class="image -fullwidth img-responsive" id="showimage" :src="campaign.image"/>
                                    <span  v-if="!campaign.image"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  v-on:change="onFileSelected" >
                                </v-div>

                                <hr>
                            </v-container></center>
                  <v-textarea solo
                    clearable
                    v-model="campaign.content"
                    clear-icon="mdi-close-circle"
                    label="รายละเอียดของแคมเปญ"
                    value="" required
                  ></v-textarea>
                 
                      
                  
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
                      <v-text-field v-model="campaign.location" class="location"  solo label="สถานที่" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6" sm="12">
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
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <h3 class="title">หมวดหมู่</h3>
                      <v-select
                          v-model="campaign.categories"
                          :items="items"
                          menu-props="auto"
                          label="เลือกหมวดหมู่"
                          solo
                          required
                      ></v-select>
                    </v-col>
                  </v-row>    
          </v-col>
          <!-- <v-col  cols="12" md="4" sm="12">
            <div class="fund-raising affix-top">
                <div class="body"> -->
                    <!-- <div class="amount-raised">
                        <h3 class="title">ยอดบริจาคขณะนี้</h3>
                        <span class="value">100000 บาท</span>
                    </div> -->
                    <!-- <div class="funding-goal">
                        <h3 class="title">เป้าหมาย</h3>
                         <v-text-field v-model="campaign.amount" class="value" solo label="จำนวนเงิน" required ></v-text-field>
                        
                    </div> -->
                    <!-- <div class="progress-bar">
                        <span class="percent">
                            <span class="hide-txt">ดำเนินการไปแล้ว</span>
                            80%
                        </span>
                        <span class="bar" style="width:80%"></span>
                    </div> -->
                    <!-- <span class="timeleft">365 วัน</span>
                    <span class="people">
                        <span class="hide-txt">จำนวนคนที่บริจาค</span>
                        <span class="icon-people">43</span>
                    </span> -->
                    
                <!-- </div> -->
                    
            <!-- <div class="action">
                <a><v-btn block> </v-btn></a>
                
            </div> -->
<!-- 
            </div>
          </v-col> -->
      </v-row>
      <v-row>
         <v-col  cols="12" md="8" sm="12">
           <h3>ภาพรวม</h3>
           <br>
            <ckeditor 
              id="content"
              v-model="campaign.overview"
              :editor="editor"
              :config="editorConfig"
              @input="onEditorInput" required> 
            </ckeditor>
            <hr>
            <h3>ความคืบหน้า</h3>
            <br>
              <ckeditor 
                id="content"
                :editor="editor"
                :config="editorConfig"
                v-model="campaign.done"
                @input="onEditorInput">
            </ckeditor>
         </v-col>
      </v-row>
      
  </v-container>
   <!-- <div id="grid-container">
                    <div></div>
                    <v-btn style="weidth = 40%" color="error" dark href='/admin/listcampaign'>cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div> -->
                <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="error" style="float:right;" dark @click="$router.back()">Cancle</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:left;" type="submit">Submit</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
                
               
    </div>
    
        </v-form>     
         
    </div>
</template>

<style >
#detailnews{
    text-align: left;
    border-radius:30px;
    box-shadow: 7px 7px 4px ;
}
#picturenews{
    margin-top: 10%;
    margin-bottom: 10%;
    height:70% ;
    width: 70% ;
}
#rounded{
    border-radius:30px;
    
}
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto 10% 10% auto;
    grid-column-gap: 10%;
}
.base-image-input {
  display: block;
  width: 300px;
  height: 300px;
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
  font-size: 20px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
/* ฟอมอันใหม่ */
.project-header{
  background-color: #fff8ec;
}
.project-content{
    padding-right: 40px;
    
}
.image .-fullwidth{
  width: 100%;
}
.image{
  margin-left: auto;
  margin-right: auto;
  /* margin-bottom: 40px; */
}
.img-responsive{
  display: block;
  max-width: 100%;
  height: auto;
}
img{
  vertical-align: middle;
  border: 0;
}
.fund-raising{
    border-radius: 6px;
    background-clip: padding-box;
    color: #666;
    border: 1px solid #f3d9ab;
    background-color: #fff;
    z-index: 999;
}
.fund-raising .body{
   padding: 30px 25px 0  25px;
}
.fund-raising .action{
   padding: 30px 25px 30px 25px;
}

#picturenews{
    /* margin-top: 10%; */
    /* margin-bottom: 10%; */
    height:70% ;
    width: 70% ;
}
.headname{
  width:40%;
  margin-right: 5%;
  
 
}
.details{
  width:40%;
}
.project-header{
  background-color: #fff8ec;
}

@media(max-width: 767px){
    .project-content {
    padding-right: 0;
  }
 
}
@media(max-width: 321px){
    
 .base-image-input {
  
  width: 100px;
  height: 100px;
  }
  .placeholder{
    font-size: 10px;
  }
  .headname{
  width:100%;
  margin-left: auto;
  margin-right: auto;
}
.details{
  width:100%;
}
}

</style>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from "sweetalert2";
export default {
    name : "EditCampaign",

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },

    data(){
        return{ 
            menu: false,
            items:['วัด','โรงพยาบาล มูลนิธิ'],
            campaign: {
                name: "",
                content: "",
                image: null,
                imagepath: "" ,
                newimage: null,
                oldimage: "",
                date: "",
                amount: "",
                overview: null,
                done: null,
                location: null,
                categories: null
            },
           
            editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
		},
      toolbar: [ 'ckfinder', '|',
        'heading', '|',
        'alignment', '|',
        'bold', 
        'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'todoList',
        '-', // break point
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'outdent', 'indent', '|',
        'uploadImage', 'blockQuote', '|',
        'undo', 'redo']
      },
            imageData:null,
            isloading:false
        }
    },
     components:{
            Navbar
        },
    mounted: function(){
        this.getData()
    },
    methods: {
    async Editcampaign(){
        try {
            // this.campaign.date = this.date;
            var formData = new FormData();
            formData.append('name', this.campaign.name)
            formData.append('content', this.campaign.content)
            formData.append('date', this.campaign.date)
            formData.append('amount', this.campaign.amount)
            formData.append('overview', this.campaign.overview)
            formData.append('done', this.campaign.done)
            formData.append('location', this.campaign.location)
            formData.append('categories', this.campaign.categories)
            if(this.campaign.newimage == null){
                console.log('true')
                formData.append('imagepath', this.campaign.image)
                formData.append('oldimage', this.campaign.image)
                console.log('true')
            }else {
                console.log('else')
                formData.append('image', this.campaign.newimage)
                formData.append('imagepath', this.campaign.newimage.name)
                formData.append('oldimage', this.campaign.oldimage)
                console.log('else')
            }
            
            // console.log('formData')
            // console.log(formData)
            // console.log(this.campaign.name)
            // console.log(this.campaign.content)
            // console.log(this.campaign.image)
            // console.log(this.campaign.image.name)
            // console.log(this.campaign.imagepath)
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
                    this.$http.put("/campaign/DetailCampaign/"+this.$route.params.id+"/edit/", formData)
                    .then(() => {
                        this.$router.push({ name: 'DetailCampaign' , params: {id : this.$route.params.id}})
                        swal.fire('Saved!', 'Edit this Campaign was successful.', 'success')
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }
            })
            // await this.$http.put("/campaign/DetailCampaign/"+this.$route.params.id+"/edit/", formData)
            // .then(() => {
            //     this.$router.push({ name: 'DetailCampaign' , params: {id : this.$route.params.id}})
            // })
            // .catch(function(err){
            //     console.log(err)
            // })
           
            
        } catch (err) {
            let error = err.response;
            if (error.status == 409) {
                swal.fire("Error", error.data.message, "error");
                console.log('success')
            } else {
                swal.fire("Error", error.data.err.message, "error");
                console.log('error')
            }
        }
            },
    async onFileSelected(event){
            this.campaign.newimage = event.target.files[0]
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
            this.$refs.fileInput.click();
        },
    async getData(){
        var that = this;
        await this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
        .then((res) => {
        console.log(res.data)
        that.campaign = res.data;
        that.campaign.oldimage = res.data.image;
        console.log(that.campaign)
      })
        .catch(function(err){
        console.log(err)
        })
    },
    // reset(){
    //     this.$router.push({ name: 'DetailCampaign' , params: {id : this.$route.params.id}})
    // },
    save (date) {
        this.$refs.menu.save(date)
      },
    },
}
</script>
