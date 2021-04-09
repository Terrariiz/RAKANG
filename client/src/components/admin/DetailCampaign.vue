<template>
  <div class='DetailCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
     <div class="project-header">
    <v-container >
      <!-- this.$router.back(); -->
      <v-btn @click="$router.back()"> <i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
      
      <v-row>
          <h1>{{ campaign.name }}</h1>
          <br>
      </v-row>
      <v-row>
          <v-col  cols="12" md="8" sm="12">
              <div class="project-content">
                  <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/image/campaign/' + campaign.image"/>
                  <p class="lead">{{campaign.content }}</p>
                  <p class="details">
                      <span class="duration">สิ้นสุดวันที่ {{ campaign.date }} </span><br>
                      <span class="location">สถานที่ {{campaign.location}}</span>
                  </p>
              </div>
          </v-col>
          <v-col  cols="12" md="4" sm="12">
            <div class="fund-raising affix-top">
                <div class="body">
                    <div class="amount-raised">
                        <h3 class="title">ยอดบริจาคขณะนี้</h3>
                        <span class="value">{{campaign.donate}}</span>
                    </div>
                    <div class="funding-goal">
                        <h3 class="title">เป้าหมาย</h3>
                        <span class="value">{{ campaign.amount }} บาท</span>
                    </div>
                    <div >
                       <progress class="progress is-danger" :value="(campaign.donate/campaign.amount)*100" max="100"></progress>
                    </div>
                    <!-- <span class="timeleft">365 วัน</span> -->
                    <span class="people">
                        <!-- <span class="hide-txt">จำนวนคนที่บริจาค</span> -->
                        <!-- <span class="icon-people"><i class="fa fa-users" aria-hidden="true"></i> 43</span> -->
                    </span>
                    <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="error" style="float:right;" @click="DeleteCampaign($route.params.id)">Delete</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="success" style="float:left;" @click="EditCampaign($route.params.id)">Edit</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
                </div>

            <!-- <div class="action">
                <a><v-btn block></v-btn></a>
                
            </div> -->

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
import swal from "sweetalert2";
import moment from "moment";
export default {
    name : "DetailCampaign",
    data (){
      return {
        campaign: null,
         tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: ['Lorem ipsum dolor sit amet',' consectetur adipiscing elit',' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', "Ut enim ad minim veniam",
        ]
        }
    },
    components:{
      Navbar
    },
    mounted: function(){
      this.getData()
    },
    methods: {
       percentdonate(){
          let donate = this.campaign.donate;
          let amount = this.campaign.amount;
          let per = (donate/amount)*100;
          console.log(this.campaign.donate)
          console.log(amount)
          console.log(per);
          this.percent = per;
        },
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
      EditCampaign(campaignid){
        this.$router.push({ name: 'editCampaign' , params: {id : campaignid}})
      },
       DeleteCampaign(){
        const swalWithBootstrapButtons = swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("/campaign/DeleteCampaign/"+this.$route.params.id)
            console.log("delete")
            this.$router.push({ name: 'ListCampaign'})
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Delete Campaign Success.',
              'success'
            )
          } 
        })
      },
    },
}
</script>

<style>
.showimage {
  
  width: 700px;
  height: 250px; 
  object-fit: cover;
}
.image{
  width: 100%;
  /* height: 300px; */
}
.people {
  float: right;
  font-weight: 100;
}
.people .hide-txt{
  display: none;
}
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