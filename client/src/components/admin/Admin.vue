<template>
  <div class="admin">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
    <!-- <v-overlay :value="isloading">
        <v-progress-circular
        indeterminate
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay> -->
      <div class="head">
        <h1>ระฆังธรรม</h1>
      </div>
      <hr>
    <v-container>
     
 <!-- ไม่มีกราฟ  -->
  
<v-container class="no-grahp">
  <v-row>
    <v-col class="color-col" cols="12" md="4" sm="4">
       <div class="overline">
          totalviewsCampaign test
        </div>
        <div class="headline">
        {{campaign_view}}
        </div>
    </v-col>

    <v-col class="color-col" cols="12" md="4" sm="4">
       <div class="overline">
          ttotalviewsnews test
        </div>
        <div class="headline">
        {{news_view}}
        </div>
    </v-col>

    <v-col class="color-col" cols="12" md="4" sm="4">
       <div class="overline">
           totalviewsdoctrine test
        </div>
        <div class="headline">
        {{doctrine_view}}
        </div>
    </v-col>

    <!-- <v-col cols="12" md="6" sm="6">
       <div class="overline">
          test
        </div>
        <div class="headline">
        
        </div>
    </v-col> -->
  </v-row>
</v-container>

 <!-- ไม่มีกราฟ  -->
           
      <v-row >
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>TotalDonatePerCampaign</v-card-title>
            <apexchart
              type="bar"
              :options="options1"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
         <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>Exchange_item</v-card-title>
            <apexchart
              type="bar"
              :options="options4"
              :series="series5"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>DonatePerDay</v-card-title>
            <apexchart
              type="line"
              :options="options2"
              :series="series0"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>ExchangePerDay</v-card-title>
            <apexchart
              type="line"
              :options="options3"
              :series="series4"
            ></apexchart>
          </v-card>
        </v-col>
         <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>หลักธรรม</v-card-title>
             <div id="chart">
        <apexchart type="pie"  :options="chartOptions1" :series="series1"></apexchart>
      </div>
          </v-card>
        </v-col>
         <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>ข่าวสาร</v-card-title>
             <div id="chart">
        <apexchart type="pie"  :options="chartOptions2" :series="series2"></apexchart>
      </div>
          </v-card>
        </v-col>
         <v-col cols="12" md="6" sm="12">
          <v-card class="mx-auto" max-width="500">
            <v-card-title>Campaign</v-card-title>
             <div id="chart">
        <apexchart type="pie"  :options="chartOptions3" :series="series3"></apexchart>
      </div>
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
      options1: {
        chart: {
          id: "vuechart-example",
        },
        title: {
          text: 'TotalDonatePerCampaign',
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
            text: "วัน",
          },
          categories: [],
        },
        yaxis: {
          title: {
            text: "ยอดการบริจาค",
          },
        },
      },
      options2: {
        chart: {
          id: "vuechart-example",
        },
        title: {
          text: 'DonatePerDay',
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
            text: "วัน",
          },
          categories: [],

        },
        yaxis: {
          title: {
            text: "ยอดการบริจาค",
          },
        },
      },
      options3: {
        chart: {
          id: "vuechart-example",
        },
        title: {
          text: 'ExchangePerDay',
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
            text: "วัน",
          },
          categories: [],
        },
        yaxis: {
          title: {
            text: "ยอดการบริจาค",
          },
        },
      },
      options4: {
        chart: {
          id: "vuechart-example",
        },
        title: {
          text: 'ExchangeItem',
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
            text: "name",
          },
          categories: [],
        },
        yaxis: {
          title: {
            text: "ยอดการสั่ง",
          },
        },
      },
      series: [
        {
          name: "ยอด",
          data: [],
        },
      ],
      series0: [
        {
          name: "ยอด",
          data: [],
        },
      ],
     
      series1: [],
      series2: [],
      series3: [],

       series4: [
        {
          name: "ยอด",
          data: [],
        },
      ],
      series5: [
        {
          name: "จำนวน",
          data: [],
        },
      ],


          chartOptions1: {
            chart: {
              width: 360,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
          },
          chartOptions2: {
            chart: {
              width: 360,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
          },
          chartOptions3: {
            chart: {
              width: 360,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
          }
      
    }
  },
  methods: {
    async sign_out() {
      localStorage.removeItem("admin_token");
      this.$store.dispatch("AdminLoggedOut");
      await this.$router.push("/home");
    },
    // เปลี่ยนข้อมูลในกราฟ
   
    updateChart(new_categories, new_data) {
      this.options1 = {
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
    updateChart1(new_categories, new_data) {
      this.options2 = {
        xaxis: {
          categories: new_categories,
        },
      };
      this.series0 = [
        {
          data: new_data,
        },
      ];
    },
    updateChart2(new_categories, new_data) {
      this.options3 = {
        xaxis: {
          categories: new_categories,
        },
      };
      this.series4 = [
        {
          data: new_data,
        },
      ];
    },
    updateChart3(new_categories, new_data) {
      this.options4 = {
        xaxis: {
          categories: new_categories,
        },
      };
      this.series5 = [
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
                    // for(var i=0;i<this.TotalDonatePerUser.length;i++){
                    //     var y = this.TotalDonatePerUser[i]._id
                    //     this.options2.xaxis.categories.push(y)
                    //     var x = this.TotalDonatePerUser[i].total
                    //     this.series0[0].data.push(x)
                    //   }
                    //   let c = this.options2.xaxis.categories
                    //   let d = this.series0[0].data
                    //   this.updateChart1(c, d)
            })
            this.$http.get("/dashboard/TotalDonatePerCampaign")
                .then(async (res) => {
                    console.log(res.data)
                    this.TotalDonatePerCampaign = res.data
                    for(var i=0;i<this.TotalDonatePerCampaign.length;i++){
                        var y = this.TotalDonatePerCampaign[i]._id
                        this.options1.xaxis.categories.push(y)
                        var x = this.TotalDonatePerCampaign[i].total
                        this.series[0].data.push(x)
                      }
                      let c = this.options1.xaxis.categories
                      let d = this.series[0].data
                      this.updateChart(c, d)
            })
            this.$http.get("/dashboard/DonatePerDay")
                .then(async (res) => {
                    console.log(res.data)
                    this.DonatePerDay = res.data
                     for(var i=0;i<this.DonatePerDay.length;i++){
                        var y = this.DonatePerDay[i]._id
                        this.options2.xaxis.categories.push(y)
                        var x = this.DonatePerDay[i].total
                        this.series0[0].data.push(x)
                      }
                      let c = this.options2.xaxis.categories
                      let d = this.series0[0].data
                      this.updateChart1(c, d)
            })
            this.$http.get("/dashboard/DoctrineperType")
                .then(async (res) => {
                    console.log(res.data)
                    this.DoctrineperType = res.data
                      for(var i=0;i<5;i++){
                        var y = this.DoctrineperType[i]._id
                        this.chartOptions1.labels.push(y)
                        var x = this.DoctrineperType[i].count
                        this.series1.push(x)
                      }
            })
            this.$http.get("/dashboard/NewsPerType")
                .then(async (res) => {
                    console.log(res.data)
                    this.NewsPerType = res.data
                     for(var i=0;i<5;i++){
                        var y = this.NewsPerType[i]._id
                        this.chartOptions2.labels.push(y)
                        var x = this.NewsPerType[i].count
                        this.series2.push(x)
                      }
            })
            this.$http.get("/dashboard/CampaignPerType")
                .then(async (res) => {
                    console.log(res.data)
                    this.CampaignPerType = res.data
                    for(var i=0;i<3;i++){
                        var y = this.CampaignPerType[i]._id
                        this.chartOptions3.labels.push(y)
                        var x = this.CampaignPerType[i].count
                        this.series3.push(x)
                      }
            })
            this.$http.get("/dashboard/ExchangePerDay")
                .then(async (res) => {
                    console.log(res.data)
                    this.ExchangePerDay = res.data
                     for(var i=0;i<this.ExchangePerDay.length;i++){
                        var y = this.ExchangePerDay[i]._id
                        this.options3.xaxis.categories.push(y)
                        var x = this.ExchangePerDay[i].count
                        this.series4[0].data.push(x)
                      }
                      let c = this.options3.xaxis.categories
                      let d = this.series4[0].data
                      this.updateChart2(c, d)
            })
            this.$http.get("/exchangeitem/ShowListItem")
                .then(async (res) => {
                    console.log(res.data)
                    this.Exchange_item = res.data
                    for(var i=0;i<this.Exchange_item.length;i++){
                        var y = this.Exchange_item[i].name
                        this.options4.xaxis.categories.push(y)
                        var x = this.Exchange_item[i].exchange_complete
                        this.series5[0].data.push(x)
                      }
                      let c = this.options4.xaxis.categories
                      let d = this.series5[0].data
                      this.updateChart3(c, d)
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
  mounted: async function mounted() {
    // await this.updateChart()
  },
};
</script>

<style scoped>
.head{
  display: flex;
  align-items: center;
  justify-content: center;
}
.head > h1{
    font-size: 60px;
}
.no-grahp{
  width: 90%;
}
.color-col{
  background-color: white;
  /* margin: 10px; */
  border: 5px #efefef solid;
}
</style>
