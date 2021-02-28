<template>
  <div >
    <div v-if="$store.getters.UserIsLoggedIn">
      
        
        <br>
        <br>
      <v-app-bar  fixed app color="cyan accent-4">
        
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/home">
            RAKANGTHAM
          </v-btn>
          <v-btn text to="/campaign">
            แคมเปญ
          </v-btn>
          <v-btn text to="/doctrine">
            หลักธรรมคำสอน
          </v-btn>
          <v-btn text to="/news">
            ข่าวประชาสัมพันธ์
          </v-btn>
          <v-btn text to='/rank'>
            อันดับ
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        class="cyan accent-4"
        v-model="drawer"
        right
        absolute
        temporary
      >
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/profile"
              ><v-list-item>
                <v-list-item-title>หน้าโปรไฟล์</v-list-item-title>
              </v-list-item></router-link
            >
          </v-list-item-group>
        </v-list>
        <div class="pa-2">
          <v-btn block v-on:click="UserSign_out()">
            ออกจากระบบ
          </v-btn>
        </div>
      </v-navigation-drawer>
    </div>

    <div v-else-if="$store.getters.AdminIsLoggedIn">
      <v-app-bar color="gray accent-4" dark>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/home">
            RAKANGTHAM
          </v-btn>
          <v-btn text to="/campaign">
            แคมเปญ
          </v-btn>
          <v-btn text to="/doctrine">
            หลักธรรมคำสอน
          </v-btn>
          <v-btn text to="/news">
            ข่าวประชาสัมพันธ์
          </v-btn>
          <v-btn text to='/rank'>
            อันดับ
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        class="dark accent-4"
        v-model="drawer"
        dark
        right
        absolute
        temporary
      >
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/admin"
              ><v-list-item>
                <v-list-item-title>แอดมินเพจ</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/admin/listcampaign"
              ><v-list-item>
                <v-list-item-title>ลิสต์แคมเปญ</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/admin/listdoctrine"
              ><v-list-item>
                <v-list-item-title>ลิสต์หลักธรรม</v-list-item-title>
              </v-list-item></router-link
            >
            
            <router-link tag="v-list-item" to="/admin/listnews"
              ><v-list-item>
                <v-list-item-title>ลิสต์ข่าวประชาสัมพันธ์</v-list-item-title>
              </v-list-item></router-link
            >
          </v-list-item-group>
        </v-list>
        <div class="pa-2">
          <v-btn block v-on:click="AdminSign_out()">
            ออกจากระบบ
          </v-btn>
        </div>
      </v-navigation-drawer>
    </div>

    <div v-else>
      <v-app-bar color="cyan accent-4">
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/home">
            RAKANGTHAM
          </v-btn>
          <v-btn text to="/campaign">
            แคมเปญ
          </v-btn>
          <v-btn text to="/doctrine">
            หลักธรรมคำสอน
          </v-btn>
          <v-btn text to="/news">
            ข่าวประชาสัมพันธ์
          </v-btn>
          <v-btn text to='/rank'>
            อันดับ
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        class="cyan accent-4"
        v-model="drawer"
        right
        absolute
        temporary
      >
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/login"
              ><v-list-item>
                <v-list-item-title>เข้าสู่ระบบ</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/admin/login"
              ><v-list-item>
                <v-list-item-title>หน้าแอดมิน</v-list-item-title>
              </v-list-item></router-link
            >
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
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
    // if (window.localStorage.getItem("user_id")) {
    //   const id = window.localStorage.getItem("user_id");
    //   console.log(id);
    //   this.$http
    //     .get("/user/" + id)
    //     .then((res) => {
    //       this.dataUser = res.data;
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // }
  },
  methods: {
    async UserSign_out() {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_token");
      localStorage.removeItem("top-up-amount");
      this.$store.dispatch("UserLoggedOut");
      await this.$router.push("/home");
    },
    async AdminSign_out() {
      localStorage.removeItem("admin_token");
      this.$store.dispatch("AdminLoggedOut");
      await this.$router.push("/home");
    },
  },
};
</script>

<style>
</style>
