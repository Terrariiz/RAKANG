<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <center>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-12 col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <center>
                          <div>
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
                        </center>
                      </div>
                      <hr />
                      <h6 style="font-size: 20px; color;blue;" class="f-w-600">
                        {{ dataUser.firstname }} {{ dataUser.lastname }}
                      </h6>
                      <h6 class="f-w-600">{{ dataUser.coin }} Coin</h6>
                      <v-container fluid>
                        <v-row justify="center">

                          <!-- <v-col cols="12" sm="12" md="12">
                            <v-btn small @click="$modal.show('change-password')"
                              >change password</v-btn
                            >
                          </v-col> -->

                          <v-col cols="12" sm="12" md="12">
                            <v-btn small @click.stop="dialog=true">change password</v-btn>
                            <ChangePassword :visible="dialog" @close="dialog=false" />
                          </v-col>

                        </v-row>
                      </v-container>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div style="text-align: right; margin-right: 3%">
                      <router-link style="color: gray" to="/editprofile"
                        ><v-btn color="secondary" icon
                          ><v-icon>mdi-pencil</v-icon></v-btn
                        ></router-link
                      >
                    </div>
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Profile</h6>
                      <div class="row">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import ChangePassword from '@/components/profile/changePassword'
const token = window.localStorage.getItem("user_token");
const Navbar = () => import("@/components/navbar/navbar");
const id = window.localStorage.getItem("user_id");
export default {
  name: "Profile",
  data() {
    return {
      dataUser: {},
      dialog: false,
    };
  },
  components: {
    Navbar,
    ChangePassword
  },
  mounted: async function mounted() {
    await this.$http
      .get("/user/" + id)
      .then((res) => {
        this.dataUser = res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  async created() {
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
body {
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
  /* width: 700px; */
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
}
</style>
