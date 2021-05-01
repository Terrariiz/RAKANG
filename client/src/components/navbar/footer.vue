<template>
  <div
    v-if="!$store.getters.AdminIsLoggedIn"
    style=" bottom: 0;
            width: 100%;
            /* Height of the footer*/ 
            height: 40px;"
  >
    <v-footer color="#CFD6EA" padless>
      <v-row justify="center" no-gutters>
        <v-btn text rounded class="my-2" to="/termservice">
          ข้อตกลงการใช้งานเว็บไซต์
        </v-btn>
        <v-btn text rounded class="my-2" to="/termuse">
          วิธีการใช้งานเว็บไซต์
        </v-btn>
      </v-row>
        <v-col class="py-4 text-center white--text" color="#CFD6EA" cols="12">
          {{ new Date().getFullYear() }} — <router-link to='/contact'> <strong>RAKANGTHAM</strong></router-link>
        </v-col>
      
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "User_navbar",
  methods: {
    async sign_out() {
      localStorage.removeItem("user_token");
      await this.$router.push("/home");
    },
  },
};
</script>

<style>

</style>
