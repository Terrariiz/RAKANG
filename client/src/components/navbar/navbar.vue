<template>
  <div>
    <div v-if="$store.getters.UserIsLoggedIn">
      <b-navbar toggleable="lg" type="light" variant="info">
        <router-link to='/home'><b-navbar-brand>RAKANGTHAM</b-navbar-brand></router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link tag='b-nav-item' to='/about'>About</router-link>
            <router-link tag='b-nav-item' to='/campaign'>Campaign</router-link>
            <router-link tag='b-nav-item' to='/doctrine'>Doctrine</router-link>
            <router-link tag='b-nav-item' to='/news'>News</router-link>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <router-link tag='b-nav-item' to='/coin'>coin:{{ dataUser.coin }}</router-link>
              <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
              ></v-app-bar-nav-icon>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <v-navigation-drawer
        class="info accent-4"
        v-model="drawer"
        dark
        right
        absolute
        bottom
        temporary
      >
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag='v-list-item' to='/profile'><v-list-item>
              <v-list-item-title>หน้าโปรไฟล์</v-list-item-title>
            </v-list-item></router-link>
            <router-link tag='v-list-item' to='/profile/logcoin'><v-list-item>
              <v-list-item-title>ประวัติการซื้อเหรียญ</v-list-item-title>
            </v-list-item></router-link>
            <router-link tag='v-list-item' to='/profile/logpayment'><v-list-item>
              <v-list-item-title>ประวัติการบริจาค</v-list-item-title>
            </v-list-item></router-link>
          </v-list-item-group>
        </v-list>
        <div class="pa-2">
          <v-btn block v-on:click="UserSign_out()">
            Logout
          </v-btn>
        </div>
      </v-navigation-drawer>
    </div>
    <div v-else-if="$store.getters.AdminIsLoggedIn">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <router-link to='/home'><b-navbar-brand>RAKANGTHAM</b-navbar-brand></router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link tag='b-nav-item' to='/campaign'>Campaign</router-link>
            <router-link tag='b-nav-item' to='/doctrine'>Doctrine</router-link>
            <router-link tag='b-nav-item' to='/news'>News</router-link>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <v-navigation-drawer
        class="dark accent-4"
        v-model="drawer"
        dark
        right
        absolute
        bottom
        temporary
      >
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag='v-list-item' to='/admin'><v-list-item>
              <v-list-item-title>แอดมินเพจ</v-list-item-title>
            </v-list-item></router-link>
            <router-link tag='v-list-item' to='/admin/listcampaign'><v-list-item>
              <v-list-item-title>ลิสต์แคมเปญ</v-list-item-title>
            </v-list-item></router-link>
            <router-link tag='v-list-item' to='/admin/listdoctrine'><v-list-item>
              <v-list-item-title>ลิสต์หลักธรรม</v-list-item-title>
            </v-list-item></router-link>
            <router-link tag='v-list-item' to='/admin/listnews'><v-list-item>
              <v-list-item-title>ลิสต์ข่าวประชาสัมพันธ์</v-list-item-title>
            </v-list-item></router-link>
          </v-list-item-group>
        </v-list>
        <div class="pa-2">
          <v-btn block v-on:click="AdminSign_out()">
            Logout
          </v-btn>
        </div>
      </v-navigation-drawer>
    </div>
    <div v-else>
      <b-navbar toggleable="lg" type="light" variant="info">
        <router-link to='/home'><b-navbar-brand>RAKANGTHAM</b-navbar-brand></router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link tag='b-nav-item' to='/about'>About</router-link>
            <router-link tag='b-nav-item' to='/campaign'>Campaign</router-link>
            <router-link tag='b-nav-item' to='/doctrine'>Doctrine</router-link>
            <router-link tag='b-nav-item' to='/news'>News</router-link>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <router-link tag='b-nav-item'  to="/login">Log in</router-link>
            <router-link tag='b-nav-item'  to="/admin/login">Admin site</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      drawer: false,
      group: null,
      dataUser: {},
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted: function mounted() {
    if (window.localStorage.getItem("user_id")) {
      const id = window.localStorage.getItem("user_id");
      console.log(id);
      this.$http
        .get("/user/" + id)
        .then((res) => {
          this.dataUser = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  methods: {
    async UserSign_out() {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_token");
      localStorage.removeItem("top-up-amount");
      this.$store.dispatch("UserLoggedOut");
      await this.$router.push("/home");
    },
    async AdminSign_out () {
      localStorage.removeItem('admin_token')
      this.$store.dispatch('AdminLoggedOut')
			await this.$router.push('/home')
		}
  },
};
</script>

<style>
b-navbar-nav{
  text-decoration-color: black;  
}
</style>
