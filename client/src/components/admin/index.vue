<template>
  <!-- App.vue -->
<v-app>
  <v-navigation-drawer color="gray accent-4" nav dark app>
    <v-card height="350px">
    <v-navigation-drawer
      absolute
      permanent
      style='position: fixed; top: 0;'
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="item.action"
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </v-navigation-drawer>

  <v-app-bar flat app>
    <Navbar />
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <!-- <v-footer app>
    
  </v-footer> -->
</v-app>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    components:{
        Navbar
    },
    data(){
        return {
            items: [
                        { title: 'หน้าหลัก', action: () =>{this.$router.push('/admin/dashboard')} },
                        { title: 'ลิสต์แคมเปญ', action: () =>{this.$router.push('/admin/dashboard/list-campaign')} },
                        { title: 'ลิสต์หลักธรรม', action: () =>{this.$router.push('/admin/dashboard/list-doctrine')} },
                        { title: 'ลิสต์ข่าวประชาสัมพันธ์', action: () =>{this.$router.push('/admin/dashboard/list-news')} },
                        { title: 'ลิสต์ของรางวัล', action: () =>{this.$router.push('/admin/dashboard/list-reward')} },
                        { title: 'ออกจากระบบ', action: () =>{this.sign_out()} },
                    ],
        }
    },
    methods: {
        async sign_out () {
            localStorage.removeItem('admin_token')
            this.$store.dispatch('AdminLoggedOut')
            await this.$router.push('/home')
        }
    }
}
</script>

<style>

</style>