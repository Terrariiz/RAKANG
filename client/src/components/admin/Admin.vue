<template>
  <div class="admin">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
    <!-- <v-overlay :value="isloading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay> -->
    <h1>Dashboard</h1>
    <v-container>
      <v-card flat class="py-12">
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <p class="text-center">Rounded</p>
            </v-col>
            <v-btn-toggle v-model="toggle_exclusive" rounded mandatory>
              <v-btn @click="updateChart(test1, test2)">change 1</v-btn>
              <v-btn @click="updateChart(date, dataTest)">change 2</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>ปู่ลูฟี่</v-card-title>
            <apexchart
              type="bar"
              :options="options"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>ปู่ลูฟี่</v-card-title>
            <apexchart
              type="bar"
              :options="options"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>ปู่ลูฟี่</v-card-title>
            <apexchart
              type="line"
              :options="options"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>ปู่ลูฟี่</v-card-title>
            <apexchart
              type="line"
              :options="options"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import moment from "moment";
import countapi from 'countapi-js';
const Navbar = () => import("@/components/navbar/navbar");
export default {
  name: "Admin",
  components: {
    Navbar,
  },
  data() {
    return {
      TotalDonatePerUser:{},
      TotalDonatePerCampaign:{},
      DonatePerDay:{},
      DoctrineperType:{},
      NewsPerType:{},
      CampaignPerType:{},
      ExchangePerDay:{},

      campaign_view: null,
      news_view:null,
      doctrine_view:null,

      campaign:[],
      news:[],
      doctrine:[],
      Exchange_item:[],

      startDate: [],
      toggle_exclusive: 0,
      stopDate: "2021-05-31",
      date: [],
      dataTest: [],
      // isloading:true,
      test1: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      test2: [30, 40, 45, 50, 49, 60, 70, 91],
      options: {
        chart: {
          id: "vuechart-example",
        },
        title: {
          text: 'ปู่ลูฟี่',
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        xaxis: {
          title: {
            text: "ปี",
          },
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        yaxis: {
          title: {
            text: "ยอดขาย(ล้านบาท)",
          },
        },
      },
      series: [
        {
          name: "ยอดขาย(ล้านบาท)",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    async sign_out() {
      localStorage.removeItem("admin_token");
      this.$store.dispatch("AdminLoggedOut");
      await this.$router.push("/home");
    },
    // เปลี่ยนข้อมูลในกราฟ
    updateChart(new_categories, new_data) {
      this.options = {
        xaxis: {
          categories: new_categories,
        },
      };
      this.series = [
        {
          data: new_data,
        },
      ];
    },
    getdata(){
            this.$http.get("/dashboard/Getdata_Campaign")
                .then(async (res) => {
                  console.log(res.data)
                    this.campaign = res.data
                    await this.campaignview()
                    
            })
            this.$http.get("/dashboard/Getdata_Doctrine")
                .then(async (res) => {
                    console.log(res.data)
                    this.doctrine = res.data
                    await this.doctrineview()
                    this.favbycount = await this.favbydoctrine()
                    
            })
            this.$http.get("/dashboard/Getdata_News")
                .then(async (res) => {
                    console.log(res.data)
                    this.news = res.data
                    await this.newsview()
            })
            this.$http.get("/dashboard/TotalDonatePerUser")
                .then(async (res) => {
                    console.log(res.data)
                    this.TotalDonatePerUser = res.data
            })
            this.$http.get("/dashboard/TotalDonatePerCampaign")
                .then(async (res) => {
                    console.log(res.data)
                    this.TotalDonatePerCampaign = res.data
            })
            this.$http.get("/dashboard/DonatePerDay")
                .then(async (res) => {
                    console.log(res.data)
                    this.DonatePerDay = res.data
            })
            this.$http.get("/dashboard/DoctrineperType")
                .then(async (res) => {
                    console.log(res.data)
                    this.DoctrineperType = res.data
            })
            this.$http.get("/dashboard/NewsPerType")
                .then(async (res) => {
                    console.log(res.data)
                    this.NewsPerType = res.data
            })
            this.$http.get("/dashboard/CampaignPerType")
                .then(async (res) => {
                    console.log(res.data)
                    this.CampaignPerType = res.data
            })
            this.$http.get("/dashboard/ExchangePerDay")
                .then(async (res) => {
                    console.log(res.data)
                    this.ExchangePerDay = res.data
            })
            this.$http.get("/exchangeitem/ShowListItem")
                .then(async (res) => {
                    console.log(res.data)
                    this.Exchange_item = res.data
            })
        },
        cal(){
          
        },
        campaignview(){
          var i = 0
          for (i; i <= this.campaign.length; i++) {
            countapi.get(this.campaign[i].count_api_namespace, this.campaign[i].count_api_key).then((result) => { 
            console.log(result)
            this.campaign_view += result.value
            });
          }
        },
        doctrineview(){
          var i = 0
          for (i; i <= this.doctrine.length; i++) {
            countapi.get(this.doctrine[i].count_api_namespace, this.doctrine[i].count_api_key).then((result) => { 
            console.log(result)
            this.doctrine_view += result.value
            });
          }  
        },
        newsview(){
          var i = 0
          for (i; i <= this.news.length; i++) {
            countapi.get(this.news[i].count_api_namespace, this.news[i].count_api_key).then((result) => { 
            console.log(result)
            this.news_view += result.value
            });
          }  
        },
  },
  // ทำวันที่เป็นสัปดาห์
  created: async function created() {
    await this.getdata()
    
    var date_now = new Date();
    this.startDate = date_now.toISOString().substr(0, 10);
    // this.isloading = false
    for (var i = 0; ; i++) {
      if (this.startDate < this.stopDate) {
        this.date.push(date_now.toISOString().substr(0, 10));
        date_now.setDate(date_now.getDate() + 7);
        this.startDate = date_now.toISOString().substr(0, 10);
        this.dataTest.push(i * 10 + 1);
      } else {
        break;
      }
    }
    console.log(date_now);
    console.log(this.date);
    console.log(this.dataTest);
    
  },
  // mounted: async function mounted() {
  // const id = this.$route.params.id;
  // await this.$http
  //   .get("donatelog/donatelogcampaign/")
  //   .then((res) => {
  //   this.loguser = res.data.donatelist;
  //   var i = 0
  //   for(this.loguser[i];;i++){
  //       this.loguser[i].date = moment(this.loguser[i].date).format(" DD-MM-YY HH:mm A");
  //       }
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // },
};
</script>
