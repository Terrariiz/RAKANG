<template>
  <div class="admin">
    <div>
      <Navbar></Navbar>
    </div>
    <br><br><br><br><br><br>
    <v-container >
      <v-row>      
        <v-col cols="12"   sm="12" md="6">
          <v-btn block style="margin:3%; float:right;" color="primary" to = "/admin/listcampaign">รวมแคมเปญ</v-btn>    
        </v-col>
      
        <v-col cols="12" sm="12" md="6">
          <v-btn block style="margin:3%; " color="primary" to = "/admin/listnews">รวมข่าวประชาสัมพันธ์</v-btn>
        </v-col>
      
        <v-col cols="12"   sm="12" md="6">
          <v-btn block style="margin:3%; float:right;" color="primary" to = "/admin/listdoctrine">รวมหลักธรรม</v-btn>
        </v-col>

        <v-col cols="12"   sm="12" md="6">
          <v-btn block  style="margin:3%; " to = "/admin/listitems" color="primary">listitems</v-btn>
        </v-col>

         <v-col cols="12"   sm="12" md="6">
          <v-btn block v-on:click="sign_out()" style="margin:3%; " color="error">Logout</v-btn>
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
  methods: {
    async sign_out () {
      localStorage.removeItem('admin_token')
      this.$store.dispatch('AdminLoggedOut')
			await this.$router.push('/home')
		}
    }
}
</script>
