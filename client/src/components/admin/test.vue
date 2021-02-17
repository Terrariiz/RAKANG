<template>
<div>
  
    <div class="project-header">
    <v-container >
      <v-row >
               <h1>Add new campaign</h1>
              </v-row>
      <v-row class="headname" >
          <v-text-field  solo label="Name"  ></v-text-field>
          <br>
      </v-row>
      <v-row>
          <v-col  cols="12" md="8" sm="12">
              <div class="project-content">
                  <!-- <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/> -->
                   <v-container id = "picturenews">
                                <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  v-on:change="onFileSelected" >
                                </v-div></center>

                                <hr>
                            </v-container>
                  <v-textarea solo
                    clearable
                    clear-icon="mdi-close-circle"
                    label="รายละเอียดของแคมเปญ"
                    value=""
                  ></v-textarea>
                  <!-- <p class="lead">content</p> -->
                  <p class="details">
                      <v-text-field  type="date" solo label="วันสิ้นสุดแคมเปญ" required></v-text-field>
                      <v-text-field class="location"  solo label="สถานที่" required></v-text-field>
                      <!-- <span class="location">สถานที่</span> -->
                  </p>
              </div>
          </v-col>
          <v-col  cols="12" md="4" sm="12">
            <div class="fund-raising affix-top">
                <div class="body">
                    <!-- <div class="amount-raised">
                        <h3 class="title">ยอดบริจาคขณะนี้</h3>
                        <span class="value">100000 บาท</span>
                    </div> -->
                    <div class="funding-goal">
                        <h3 class="title">เป้าหมาย</h3>
                         <v-text-field class="value" solo label="จำนวนเงิน" ></v-text-field>
                        
                    </div>
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
                    
                </div>
                    
            <!-- <div class="action">
                <a><v-btn block> </v-btn></a>
                
            </div> -->

            </div>
          </v-col>
      </v-row>
      <v-row>
         <v-col  cols="12" md="8" sm="12">
           <h3>ภาพรวม</h3>
           <br>
            <ckeditor 
              id="content"
              v-model="content"
              @input="onEditorInput">
            </ckeditor>
            <hr>
            <h3>ความคืบหน้า</h3>
            <br>
              <ckeditor 
                id="content"
                v-model="content"
                @input="onEditorInput">
            </ckeditor>
         </v-col>
      </v-row>
      
  </v-container>
   <div id="grid-container">
                    <div></div>
                    <v-btn style="weidth = 40%" color="primary" dark href='/admin/listnews'>cancle</v-btn>
                    <v-btn type="submit" color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>
    </div>
    
 
</div>
</template>
<script>

import moment from "moment";
export default {
    name:'Campaign',
    components:{
        
    },
    data (){
      return {
        campaign: null,
        tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    mounted: function(){
      this.getData()
    },
    
    methods: {
        getData(){
            var that = this;
            this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
            .then((res) => {
              console.log(res.data)
              that.campaign = res.data;
              console.log(that.campaign)
              that.campaign.date = moment(that.campaign.date).format(" dddd DD-MM-YY  A");
            })
            .catch(function(err){
              console.log(err)
            })
        },
    }
}
</script>

<style>
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
  margin-bottom: 40px;
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
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto 10% 10% auto;
    grid-column-gap: 10%;
}
.headname{
  width:30%;
 
}
.details{
  width:40%;
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