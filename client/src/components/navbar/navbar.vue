<template>
  <div>
    <go-top></go-top>
    <div v-if="$store.getters.UserIsLoggedIn">
      <v-app-bar fixed color="#F8C471">
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
        color='#F8C471'
        v-model="drawer"
        right
        absolute
        temporary
        style='position: fixed; top: 0;'
      >
      <div v-if='$store.getters.IsDesk'>
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/profile"
              ><v-list-item>
                <v-list-item-title>หน้าโปรไฟล์</v-list-item-title>
              </v-list-item></router-link
            >
            <hr>
            <router-link tag="v-list-item" to="/seamsi"
              ><v-list-item>
                <v-list-item-title>เสี่ยงเซียมซี</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/lantern"
              ><v-list-item>
                <v-list-item-title>ลอยโคมอธิษฐาน</v-list-item-title>
              </v-list-item></router-link
            >
          </v-list-item-group>
        </v-list>
        <div class="pa-2">
          <v-btn block v-on:click="UserSign_out()">
            ออกจากระบบ
          </v-btn>
        </div>
      </div>
      <div v-else>
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/home"
              ><v-list-item>
                <v-list-item-title>RAKANGTHAM</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/campaign"
              ><v-list-item>
                <v-list-item-title>แคมเปญ</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/doctrine"
              ><v-list-item>
                <v-list-item-title>หลักธรรมคำสอน</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/news"
              ><v-list-item>
                <v-list-item-title>ข่าวประชาสัมพันธ์</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/rank"
              ><v-list-item>
                <v-list-item-title>อันดับ</v-list-item-title>
              </v-list-item></router-link
            >
            <hr>
            <router-link tag="v-list-item" to="/profile"
              ><v-list-item>
                <v-list-item-title>หน้าโปรไฟล์</v-list-item-title>
              </v-list-item></router-link
            >
            <hr>
            <router-link tag="v-list-item" to="/seamsi"
              ><v-list-item>
                <v-list-item-title>เสี่ยงเซียมซี</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/lantern"
              ><v-list-item>
                <v-list-item-title>ลอยโคมอธิษฐาน</v-list-item-title>
              </v-list-item></router-link
            >
          </v-list-item-group>
        </v-list>
        <div class="pa-2">
          <v-btn block v-on:click="UserSign_out()">
            ออกจากระบบ
          </v-btn>
        </div>
      </div>
      </v-navigation-drawer>
    </div>

    <div v-else-if="$store.getters.AdminIsLoggedIn">
      <v-app-bar fixed color="gray accent-4" dark>
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
        style='position: fixed; top: 0;'
      >
      <div v-if='$store.getters.IsDesk'>
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
      </div>

      <div v-else>
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/home"
              ><v-list-item>
                <v-list-item-title>RAKANGTHAM</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/campaign"
              ><v-list-item>
                <v-list-item-title>แคมเปญ</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/doctrine"
              ><v-list-item>
                <v-list-item-title>หลักธรรมคำสอน</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/news"
              ><v-list-item>
                <v-list-item-title>ข่าวประชาสัมพันธ์</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/rank"
              ><v-list-item>
                <v-list-item-title>อันดับ</v-list-item-title>
              </v-list-item></router-link
            >
            <hr>
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
      </div>
      </v-navigation-drawer>
    </div>

    <div v-else>
      <v-app-bar fixed color='#FAD7A0'>
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
        color='#FAD7A0'
        v-model="drawer"
        right
        absolute
        temporary
        style='position: fixed; top: 0;'
      >
      <div v-if='$store.getters.IsDesk'>
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
      </div>
      <div v-else>
        <v-list nav>
          <v-list-item-group v-model="group">
            <router-link tag="v-list-item" to="/home"
              ><v-list-item>
                <v-list-item-title>RAKANGTHAM</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/campaign"
              ><v-list-item>
                <v-list-item-title>แคมเปญ</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/doctrine"
              ><v-list-item>
                <v-list-item-title>หลักธรรมคำสอน</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/news"
              ><v-list-item>
                <v-list-item-title>ข่าวประชาสัมพันธ์</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link tag="v-list-item" to="/rank"
              ><v-list-item>
                <v-list-item-title>อันดับ</v-list-item-title>
              </v-list-item></router-link
            >
            <hr>
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
      </div>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import GoTop from '@inotom/vue-go-top';
export default {
  name: "Navbar",
  components:{
    GoTop
  },
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
  mounted(){
    this.getDeviceType();
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
  async getDeviceType(){
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return this.$store.dispatch('DeviceIsMobile');
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return this.$store.dispatch('DeviceIsMobile');
  }
  return this.$store.dispatch('DeviceIsDesktop');
},

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
