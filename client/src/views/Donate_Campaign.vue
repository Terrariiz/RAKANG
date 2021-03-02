<template>
<div>
    <div>
        <Navbar></Navbar>
        </div>
        <!-- <h1>donateCampaign</h1> -->

         <!-- <v-container rounded-xl style="background:linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%); 
       box-shadow:5px 6px 5px #888888; margin-top: 3%">
        <v-btn to='/campaign'><i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
      <div  v-if="campaign" >
        <center>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                
              <a href="#"><br>
                <img class="img-fluid rounded" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/>
              </a>
              </div>
              </center>
              <v-container>
                <div style="text-align:center; font-size:40px;"> {{campaign.name}} </div>
              </v-container>
              <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; width:70%;">  
               <div style="margin:5%" v-html="campaign.content"> {{campaign.content}}  </div>
              </v-container>

              <v-row>
                
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                    date
                    <v-col cols="4">
                      <h3>วันสิ้นสุดการรับบริจาค </h3>
                    <div>{{ campaign.date }} </div>
                    </v-col>
                
                    เงิน
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                      <v-col cols="4">
                        <h3>เป้าหมาย</h3>
                    <div>{{ campaign.amount }} บาท</div>
                      </v-col>
                
               </v-row>

               <v-row style="margin-top:3%;">
                <v-col  cols = "4"></v-col>
                <v-col  cols = "4"></v-col>

                <v-col  cols = "4">
                  <v-btn color="primary" style="float:left;" 
                  @click="donate($route.params.id)"
                  >บริจาค</v-btn>
                </v-col>
                  
              </v-row>

             
      </div>
      
      </v-container>    -->
    <div class="project-header">
    <v-container >
      <v-row>
          <h1>{{campaign.name}}</h1>
          <br>
      </v-row>
      <v-row>
          <v-col  cols="12" md="8" sm="12">
              <div class="project-content">
                  <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/>
                  <p class="lead">{{campaign.content}}</p>
                  <p class="details">
                      
                      <span class="location">สถานที่</span>
                  </p>
              </div>
          </v-col>
          <v-col  cols="12" md="4" sm="12">
            <div class="fund-raising affix-top">
                <div class="body">
                    <div class="amount-raised">
                        <h3 class="title">ยอดบริจาคขณะนี้</h3>
                        <span class="value">{{ campaign.donate }} บาท</span>
                    </div>
                    <br>
                    <div class="funding-goal">
                        <h3 class="title"></h3>
                        <span class="value">เป้าหมาย {{ campaign.amount }} บาท</span>
                    </div>
                    <div >
                        <span style="float:right;" class="percent">
                            <!-- <span class="hide-txt">ดำเนินการไปแล้ว</span> -->
                            {{Math.round((campaign.donate/campaign.amount)*100)}}%
                        </span>
                        <progress class="progress is-danger" :value="(campaign.donate/campaign.amount)*100" max="100"></progress>
                    </div>
                    <v-row>
                  <v-col style="text-align:left;" cols="9" md="9">
                    <span class="duration">สิ้นสุดวันที่ {{ campaign.date }} </span>
                  </v-col>
                  <v-col style="text-align:right;" cols="3" md="3">  
                    <!-- <span class="hide-txt">จำนวนคนที่บริจาค</span> -->
                        <span class="icon-people"><i class="fa fa-users" aria-hidden="true"></i> 0</span>
                  </v-col>
                </v-row>
                    
                    
                </div>

              <div class="action">
                  <v-btn v-if="notend" color="green" @click.stop="dialogDonate=true" block>บริจาค</v-btn><v-btn disabled v-if="end" color="green" depressed block>โครงการนี้สิ้นสุดแล้ว</v-btn>
                  <DialogDonate :visible="dialogDonate" @close="dialogDonate=false" />
              </div>
              

            </div>
          </v-col>
      </v-row>
      
  </v-container>
    </div>
  <!-- tablist -->
    <div class="tab-section">
      <v-container>
         <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab>
        ภาพรวม
      </v-tab>
      <v-tab>
        ความคืบหน้า
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <v-card-text v-html="campaign.overview">{{campaign.overview}}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <v-card-text v-html="campaign.done">{{campaign.done}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    
        
      </v-container>
  </div>
  


    </div>
</template>
<script>

const Navbar = () => import('@/components/navbar/navbar')
import DialogDonate from "./dialog_donate";
import swal from 'sweetalert2'
import moment from "moment";
export default {
    name:'Campaign',
    components:{
        Navbar,
        DialogDonate,
    },
    data (){
      return {
        campaign: null,
        tab: null,
        dialogDonate: false,
        thaidate : null,
        end:null,
        notend:null,

      }
    },
    mounted: function(){
      
      this.getData()
      if(localStorage.getItem("donate-campaign") != null){
        this.AlertDonate()
      }
      
      
    },
    created: function(){
      
    },
    
    methods: {
      
        getData(){
            var that = this;
            this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
            .then((res) => {
              console.log(res.data)
              // that.percent = res.data.percentage
              that.campaign = res.data;
              console.log(that.campaign)
              
              

              this.end_date()

              if(moment(that.campaign.date).format('dddd') == 'Mondey'){
                that.campaign.date = moment(that.campaign.date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(that.campaign.date).format('dddd') == 'Tuesday'){
                that.campaign.date = moment(that.campaign.date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(that.campaign.date).format('dddd') == 'Wednesday'){
                that.campaign.date = moment(that.campaign.date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(that.campaign.date).format('dddd') == 'Thursday'){
                that.campaign.date = moment(that.campaign.date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(that.campaign.date).format('dddd') == 'Friday'){
                that.campaign.date = moment(that.campaign.date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(that.campaign.date).format('dddd') == 'Saturday'){
                that.campaign.date = moment(that.campaign.date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(that.campaign.date).format('dddd') == 'Sunday'){
                that.campaign.date = moment(that.campaign.date).format(" วันอาทิตย์ DD-MM-YY A");
              }
              
              
              
              
            })
            .catch(function(err){
              console.log(err)
            })
        },
        AlertDonate(){
          this.$http.get("/donatelog/CheckDonate/"+localStorage.getItem("user_id"))
            .then((res) => {
              console.log('res')
              console.log(res.data)
              console.log('res')
              if(res.data == false){
                console.log("false")
              } else if(res.data == 'complete'){
                swal.fire({
                  icon: 'success',
                  title: 'ทำรายการเสร็จสิ้น',
                  showConfirmButton: false,
                  timer: 1500
                })
              } else if(res.data == 'incomplete'){
                swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาดบางอย่าง',
                  showConfirmButton: false,
                  timer: 1500
                })
              } else if(res.data == 'cancel'){
                swal.fire({
                  icon: 'info',
                  title: 'ยกเลิกการทำรายการแล้ว',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              localStorage.removeItem("donate-campaign")
            })
            .catch(function(err){
              console.log(err)
            })
        },
        end_date(){
          
          var enddate = moment(this.campaign.date).format(" dddd DD-MM-YY A");
          var now = new Date().toISOString().substr(0, 10);
          now = moment(now).format(" dddd DD-MM-YY  A");
          console.log("kuy"+enddate)
          console.log("kuy"+now)
          if(enddate == now || now > enddate)
          { this.end = true;
           this.notend = false;
         }
          else{ this.end = false;
          this.notend = true;
           }
          
        }
        
         
        
    }
}
</script>

<style>
/* .value{
  font-weight: 100;
  margin: 0 0 10px;
  font-size: 1.375em;
}
.percent{
  position: absolute;
  top:35px;
  right: 0;
  font-size: 1.75em;
  color: #666;
} เดี๋ยวมาแก้ */ 
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
  
  width: 100%;
  

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
@media(max-width: 767px){
    .project-content {
    padding-right: 0;
}
}
</style>