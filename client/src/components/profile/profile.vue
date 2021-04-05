<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <center>
     
    <v-container>
      <v-row>
        <v-col style="background-color:red;" cols="12" md="4" sm="12">
          <div  class="img-profile">
            <img
                              style="display: flex"
                              :src="
                                'http://localhost:4000/image/profile/' +
                                dataUser.image
                              "
                              class="img-radius base-image-input"
                              alt="User-Profile-Image"
                            />
          </div>
          <hr>
                    <div class="name-sur">
                        <h6 style="font-size: 20px; color;blue;" class="f-w-600">
                           {{ dataUser.firstname }} {{ dataUser.lastname }}
                        </h6>
                        <!-- <h6 class="f-w-600">{{ dataUser.coin }} Coin</h6> -->
                    </div>
                    <div class="btn-cpass">
                        <v-btn small @click.stop="dialog_ChangePassword=true">เปลี่ยนรหัสผ่าน</v-btn>
                        <ChangePassword :visible="dialog_ChangePassword" @close="dialog_ChangePassword=false" />                     
                    </div>
        </v-col>
        <v-col cols="12" md="8" sm="12">
          <div style="text-align: right; margin-right: 3%">
                      <router-link style="color: gray" to="/editprofile"
                        ><v-btn color="secondary" icon
                          ><v-icon>mdi-pencil</v-icon></v-btn
                        ></router-link
                      >
                    </div>
          <div class="tab-section">
      <v-container>
         <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab>
        รายละเอียดโปรไฟล์
      </v-tab>
      <v-tab>
        ประวัติการบริจาค
      </v-tab>
      <v-tabs-items v-model="tab">
      <v-tab-item
       
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text><div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.email }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                          <h6 class="text-muted f-w-400">
                           {{ dataUser.phone }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">วัน/เดือน/ปีเกิด</p>
                          <h6 class="text-muted f-w-400">{{ dataUser.birthdate }}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Point</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.point }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            {{ rank }}
                          </h6>
                        </div>
                      </div></v-card-text>
        </v-card>
      </v-tab-item>
              <v-tab-item>
                  <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="donatelog"
              :search="search"
            ></v-data-table>
          </v-card>
              </v-tab-item>
            </v-tabs-items>
    
      
    
      
    </v-tabs>

    
        
      </v-container>
  </div>
        </v-col>
      </v-row>
    </v-container>
  
    </center>
  </div>
</template>

<script>
import ChangePassword from '@/components/profile/changePassword'
import moment from "moment";

const Navbar = () => import("@/components/navbar/navbar");

export default {
  name: "Profile",
  data() {
    return {
      rank : null,
      dataUser: {},
      donatelog:[],
      dialog_ChangePassword: false,
      dialog_Logcoin: false,
      tab: null,
        items: [
          'รายละเอียดโปรไฟล์', 'ประวัติการบริจาค',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      search: '',
        headers: [
          { text: 'ชื่อแคมเปญ',value: 'CampaignName',},
          { text: 'จำนวนเงินที่บริจาค(บาท)', value: 'amount' },
          { text: 'วัน-เดือน-ปี', value: 'date' },
          
        ],
    };
  },
  components: {
    Navbar,
    ChangePassword
  },
  // mounted: async function mounted() {

  // },
  async created() {
    const token = window.localStorage.getItem("user_token");
    const id = window.localStorage.getItem("user_id");
      console.log(id)
    await this.$http
      .get("/user/" + id)
      .then((res) => {
        this.dataUser = res.data;
        console.log("get user data")
        console.log(this.dataUser)
      })
      .catch(function (err) {
        console.log(err);
      });
    await this.$http
      .get("donatelog/donateloguser/" + id)
      .then((res) => {
        console.log("get log")
        console.log(this.donatelog)
        
        this.donatelog = res.data.donatelog;

        var i = 0
        for(this.donatelog[i];;i++){
            this.donatelog[i].date = moment(this.donatelog[i].date).format(" DD-MM-YYYY HH:mm A");
            } 
      })
      .catch(function (err) {
        console.log(err);
      });
      // await this.$http
      // .get("user/UserRank/" + id)
      // .then((res) => {
      //   console.log(res.data)
      //   this.rank = res.data;
      // })
      // .catch(function (err) {
      //   console.log(err);
      // });
    // const token = window.localStorage.getItem('user_token')
    if (token) {
      try {
        this.$router.push("/profile");
      } catch (err) {
        console.log(err);
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
      }
    }
  },
  methods: {
    async sign_out() {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_token");
      await this.$router.push("/login");
    }
  },
};
</script>
<style scoped>
/* body {
  background-color: #f9f9fa;
}
img {
  width: 200px;
  height: 200px;
}

.padding {
  padding: 3rem !important;
}

.user-card-full {
  
  overflow: hidden;
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px;
}

.m-r-0 {
  margin-right: 0px;
}

.m-l-0 {
  margin-left: 0px;
}

.user-card-full .user-profile {
  border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f29263),
    to(#ee5a6f)
  );
  background: linear-gradient(to right, #ee5a6f, #f29263);
}

.user-profile {
  padding: 20px 0;
}

.card-block {
  padding: 1.25rem;
}

.m-b-25 {
  margin-bottom: 25px;
}

.img-radius {
  border-radius: 5px;
}

h6 {
  font-size: 14px;
}

.card .card-block p {
  line-height: 25px;
}

@media only screen and (min-width: 1400px) {
  p {
    font-size: 14px;
  }
}
@media only screen and (max-width: 991px) {
  img {
    width: 150px;
    height: 150px;
  }
}
@media only screen and (max-width: 770px) {
  img {
    width: 100px;
    height: 100px;
  }
}
@media only screen and (max-width: 576px) {
  img {
    width: 200px;
    height: 200px;
  }
}

.card-block {
  padding: 1.25rem;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
  margin-bottom: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.card .card-block p {
  line-height: 25px;
}

.m-b-10 {
  margin-bottom: 10px;
}

.text-muted {
  color: #919aa3 !important;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
}

.m-t-40 {
  margin-top: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-40 {
  margin-top: 20px;
}

.user-card-full .social-link li {
  display: inline-block;
}

.user-card-full .social-link li a {
  font-size: 20px;
  margin: 0 10px 0 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
} */
.img-profile{
  margin: 20px auto;
  width: 300px;
  height: 200px;
}
  .img-profile img{
    width:100%; 
    height:100%;
    margin-left: auto;
    margin-right: auto;
  }
  .name-sur{
    text-align: center;
  }
  .btn-log{
    margin: 20px auto;
    text-align: center;
  }
  .btn-cpass{
    margin: 20px auto;
    text-align: center;
  }
</style>
