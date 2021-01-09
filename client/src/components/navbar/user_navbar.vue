<template>
  <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
              <b-navbar-brand href="/home">NavBar</b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item href="/about">About</b-nav-item>
                </b-navbar-nav>

              

               

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">                                  
                  <b-nav-item v-on:click="sign_out()">Log out</b-nav-item>
                </b-navbar-nav>
              </b-collapse>
        </b-navbar>
    </div>
    <!-- <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar> -->
    
</template>

<script>
export default {
    name:'User_navbar',
    methods: {
    async sign_out () {
			localStorage.removeItem('user_token')
			await this.$router.push('/home')
		}
  }
}
</script>

<style>

</style>