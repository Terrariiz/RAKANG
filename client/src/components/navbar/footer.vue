<template>
  <div
    style=" bottom: 0;
            width: 100%;
            /* Height of the footer*/ 
            height: 40px;"
  >
    <v-footer color="#CFD6EA" padless>
      <v-row justify="center" no-gutters>
        <v-btn color="white" text rounded class="my-2" to="/banana">
          Banana
        </v-btn>
        <v-btn color="white" text rounded class="my-2" to="/test">
          Test
        </v-btn>
        <v-col class="py-4 text-center white--text" color="#CFD6EA" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
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

<style></style>
