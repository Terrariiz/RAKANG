<template>
  <div class='DetailCampaign'>
    <div>
      <Navbar></Navbar>
    </div>
     <div class="project-header">
    <v-container >
      <v-btn to='/admin/listcampaign'> <i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
      <v-row style="margin-top:3%;">
                <v-col  cols = "3"></v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:right;" @click="EditCampaign($route.params.id)">Edit</v-btn>
                </v-col>
                <v-col  cols = "3">
                  <v-btn color="primary" style="float:left;" @click="DeleteCampaign($route.params.id)">Delete</v-btn>
                </v-col>
                  <v-col  cols = "3"></v-col>
              </v-row>
      <v-row>
          <h1>{{ campaign.name }}</h1>
          <br>
      </v-row>
      <v-row>
          <v-col  cols="12" md="8" sm="12">
              <div class="project-content">
                  <img class="image -fullwidth img-responsive" id="showimage" :src="'http://localhost:4000/uploads/' + campaign.image"/>
                  <p class="lead">{{campaign.content }}</p>
                  <p class="details">
                      <span class="duration">เริ่มวันที่ {{ campaign.date }} </span>
                      <span class="location">สถานที่</span>
                  </p>
              </div>
          </v-col>
          <v-col  cols="12" md="4" sm="12">
            <div class="fund-raising affix-top">
                <div class="body">
                    <div class="amount-raised">
                        <h3 class="title">ยอดบริจาคขณะนี้</h3>
                        <span class="value">100000 บาท</span>
                    </div>
                    <div class="funding-goal">
                        <h3 class="title">เป้าหมาย</h3>
                        <span class="value">{{ campaign.amount }} บาท</span>
                    </div>
                    <div class="progress-bar">
                        <span class="percent">
                            <span class="hide-txt">ดำเนินการไปแล้ว</span>
                            80%
                        </span>
                        <span class="bar" style="width:80%"></span>
                    </div>
                    <span class="timeleft">365 วัน</span>
                    <span class="people">
                        <span class="hide-txt">จำนวนคนที่บริจาค</span>
                        <span class="icon-people">43</span>
                    </span>
                </div>

            <div class="action">
                <a><v-btn block></v-btn></a>
                
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
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="text in text"
        :key="text"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text v-html="campaign.overview">{{ campaign.overview }}</v-card-text>
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
          reverseButtons: true
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
</style>