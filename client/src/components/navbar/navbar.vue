<template>
  <div>
    <div v-if='$store.getters.UserIsLoggedIn'>
        <b-navbar toggleable="lg" type="dark" variant="info">
              <b-navbar-brand href="/home">NavBar</b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item href="/about">About</b-nav-item>
                </b-navbar-nav>

              

               

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                  <b-nav-item href='/profile'>Profile</b-nav-item>
                  <b-nav-item v-on:click="sign_out()">Log out</b-nav-item>
                </b-navbar-nav>
              </b-collapse>
        </b-navbar>
    </div>
    <div v-else-if='$store.getters.AdminIsLoggedIn'>
        <b-navbar toggleable="lg" type="dark" variant="info">
              <b-navbar-brand href="/home">NavBar</b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item href="/about">About</b-nav-item>
                </b-navbar-nav>

              

               

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="/admin">Admin</b-nav-item>
                  <!-- <b-nav-item v-on:click="sign_out()">Log out</b-nav-item> -->
                </b-navbar-nav>
              </b-collapse>
        </b-navbar>
    </div>
    <div v-else>
        <b-navbar toggleable="lg" type="dark" variant="info">
              <b-navbar-brand href="/home">NavBar</b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item href="/about">About</b-nav-item>
                </b-navbar-nav>

              

               
                
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                  <b-nav-item href="/login">Log in</b-nav-item>
                  <b-nav-item href="/admin/login">Admin site</b-nav-item>
                </b-navbar-nav>
              </b-collapse>
        </b-navbar>
      </div>
    </div>    
</template>

<script>
export default {
    name:'Navbar',
    methods:{
      async sign_out () {
      localStorage.removeItem('user_token')
      this.$store.dispatch('UserLoggedOut')
			await this.$router.push('/home')
		}
  }
}
</script>

<style>

</style>