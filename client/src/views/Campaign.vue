<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>Campaign</h1>
    <!-- test -->
     <v-container class="container-news">
        <v-card class="margin-card" v-for="(campaign,percent) in campaigns " :key="percent" elevation="5" outlined shaped >
        <v-row class="row-news">
          <v-col cols="12" md="6">
            <v-img
            :src="'http://localhost:4000/uploads/' + campaign.image"
            class="img-fluid"
            style=""
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
              <p><p>
              
              <div class="btn-news">
                <v-btn block style="background-color: #ffdd94; color:#455054;" 
                @click="ViewCampaign(campaign._id)"
                elevation="3">
                ดูเนื้อหา</v-btn>
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
    };
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
          this.campaigns[i].date = moment(this.campaigns[i].date).format(
            " dddd DD-MM-YY  A"
          );
          this.percent[i] = (this.campaigns[i].donate / this.campaigns[i].amount)* 100
        }

        
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    ViewCampaign(campaignid) {
      this.$router.push({
        name: "UserDetailCampaign",
        params: { id: campaignid },
      });
    },
    //  percentdonate(){
    //       let donate = this.campaign.donate;
    //       let amount = this.campaign.amount;
    //       let per = (donate/amount)*100;
    //       console.log(this.campaign.donate)
    //       console.log(amount)
    //       console.log(per);
    //       this.percent = per;
    //     },
  },
  if(result){
    console.log(result)
  }
};
</script>

<style>
.margin-card{
  margin-bottom:5%;
}
div{
  display: block;
}
.res-top {
  display: none;
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
.btn-news {
  position: relative;
  width: 40%;
  /* left: 50%; */
  margin-left: auto;
  margin-right: auto;
}
.btn-doctrine {
  position: relative;
  width: 20%;
  left: 20%;
}


@media only screen and (max-width: 415px) {
  .res-top {
    display: initial;
  }
  .hide-res {
    display: none;
  }
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
