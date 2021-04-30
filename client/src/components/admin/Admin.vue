<template>
  <div class="admin">
    <div>
      <Navbar></Navbar>
    </div>
    <br><br><br>
    <h1>Dashboard</h1>
    <v-container >
      <v-row>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="bar" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="bar" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="line" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="line" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
    </v-container>    
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
  name: 'Admin',
  components:{
    Navbar
  },
  data(){
      return {
          options: {
              chart: {
                  id: 'vuechart-example'
              },
              xaxis: {
                  title:{
                      text:'ปี'
                  },
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
              },
              yaxis: {
                  title:{
                      text:'ยอดขาย(ล้านบาท)'
                  },
              }
          },
          series: [{
              name: 'ยอดขาย(ล้านบาท)',
              data: [30, 40, 45, 50, 49, 60, 70, 91]
          }]
      }
    },
  methods: {
    async sign_out () {
      localStorage.removeItem('admin_token')
      this.$store.dispatch('AdminLoggedOut')
			await this.$router.push('/home')
		}
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
}
</script>
