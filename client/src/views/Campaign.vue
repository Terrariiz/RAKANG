<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>Campaign</h1>
    <!-- Test -->
    
    <center><v-text-field style="width:70%; text-align: center;" append-icon="mdi-magnify" v-model="search" label="ค้นหาหัวข้อ"></v-text-field></center>
     <v-container class="container-news">
        <v-card class="margin-card" v-for="(campaign,percent) in filteredList " :key="percent" elevation="5" outlined shaped >
          <div class="status_open" v-if="campaign.status =='open'">{{campaign.status}}</div>
        <div class="status_close" v-if="campaign.status =='close'">{{campaign.status}}</div>
        <v-row class="row-news">
          <v-col cols="12" md="6">
            <v-img
            :src="'http://localhost:4000/image/campaign/' + campaign.image"
            class="img-fluid"
            align="center"
          >
          </v-img>
          </v-col>
          <v-col class="cols-detail-campaign" cols="12" md="6">
            <v-container>
              
                <h1>{{ campaign.name }} </h1>
              <div>{{campaign.content}}</div>
              <div >
                <v-row>
                  <v-col style="text-align:left;" cols="12" md="6">
                    <!-- <span >วันที่</span> -->
                    <span> เป้าหมาย {{ campaign.amount }}</span>
                    <div> วันที่สิ้นสุด{{ campaign.date }}</div>
                  </v-col>
                  <v-col style="text-align:right;" cols="12" md="6">
                    <div>ยอดบริจาค</div>  
                    <span> {{campaign.donate}} / {{ campaign.amount }} บาท</span>
                  </v-col>
                </v-row>
              </div>
              <progress class="progress is-danger" :value="(campaign.donate/campaign.amount)*100" max="100"></progress>
              
              
              <div class="btn-news" >
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn class="fontstlye" x-large block style="background-color: #ffdd94; color:#455054;" 
                    @click="ViewCampaign(campaign._id)"
                    elevation="3">ดูเนื้อหา</v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn class="fontstlye" x-large block  color="green" style="background-color: #ffdd94; color:#455054;" 
                    @click="ViewCampaign(campaign._id)"
                    elevation="3">บริจาคได้ที่นี่</v-btn>
                    </v-col>
                </v-row>
              </div>
            </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
  </div>
</template>

<script>
import moment from "moment";
const Navbar = () => import("@/components/navbar/navbar");
export default {
  name: "Campaign",
  components: {
    Navbar,
  },
  data() {
    return {
      campaigns: [],
      percent: [],
      search: '',
    };
  },
  computed: {
    filteredList() {
      return this.campaigns.filter(campaign => {
        return campaign.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted: async function mounted() {
    await this.$http
      .get("/campaign/ShowListCampaign")
      .then((res) => {
        console.log(res.data);
        // this.percent = (res.datadonate / this.amount)* 100
        this.campaigns = res.data;
        // console.log(this.campaigns);
        // console.log(this.campaigns[0]);
        var i = 0;
        for (this.campaigns[i]; ; i++) {
          // this.campaigns[i].date = moment(this.campaigns[i].date).format(
          //   " dddd DD-MM-YY  A"
          // );
          if(moment(this.campaigns[i].date).format('dddd') == 'Mondey'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.campaigns[i].date).format('dddd') == 'Tuesday'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.campaigns[i].date).format('dddd') == 'Wednesday'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.campaigns[i].date).format('dddd') == 'Thursday'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.campaigns[i].date).format('dddd') == 'Friday'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.campaigns[i].date).format('dddd') == 'Saturday'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.campaigns[i].date).format('dddd') == 'Sunday'){
                this.campaigns[i].date = moment(this.campaigns[i].date).format(" วันอาทิตย์ DD-MM-YY A");
              }
          this.percent[i] = (this.campaigns[i].donate / this.campaigns[i].amount)* 100
        }

        
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    ViewCampaign(campaignid) {
      this.$router.push({ path: '/campaign/'+campaignid})
      // this.$router.push({
      //   name: "UserDetailCampaign",
      //   params: { id: campaignid },
      // });
    },
    //  
  },
  if(result){
    console.log(result)
  }
};
</script>

<style >
.status_open{
  text-align: right;
  padding: 20px;
  background-color: rgb(114, 231, 114);
  font-size: 30px;
}
.status_close{
  text-align: right;
  padding: 20px;
  background-color: rgb(218, 15, 15);
  font-size: 30px;
}
.container-news {
    margin-top: 3%;
    
}
.row-news {
  margin-bottom: 3%;
  margin-top: 3%;
}
.cols-detail-campaign {
  margin-top: 5%;
}
.colxx{
    margin: auto;
}
.image-size{
    
    max-width: 90%;
    height: 300px;
}

.image{
    display: block;
    width: 100%;
    margin: auto;
    height: 100%;

}
.margin-card{
  margin-bottom:5%;
}
div{
  display: block;
}

v-img {
   
   width: 100%;
   
}

.img {
  width: 300px;

  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.img-fluid{
  object-fit: cover;  
  margin:3%;
}
.fontstlye{
  font-size: 20px;
  font-weight: bold;
}
.btn-news {
  position: relative;
   width: 40%;
  margin-left: auto;
  margin-right: auto;
  
}
.btn-doctrine {
  position: relative;
  width: 20%;
  left: 20%;
}



@media only screen and (max-width: 415px) {
  .img {
    width: 100%;

    background-size: cover;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .btn-news {
    position: relative;

    width: 100%;
  }
  .container-news {
    padding: 0vh;
  }
  .btn-doctrine {
    position: relative;
    left: 0;
    width: 100%;
    margin: 3%;
  }
}


</style>
