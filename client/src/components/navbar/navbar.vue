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
                  <b-nav-item-dropdown right>
                    <template #button-content>
                      <em>Admin</em>
                    </template>
                    <b-dropdown-item href="/admin/login">Log in</b-dropdown-item>
                    <b-dropdown-item href="/admin">Admin</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-navbar-nav>
              </b-collapse>
        </b-navbar>
      </div>
    </div>    
</template>

<script>
export default {
    name:'Visitor_navbar',
    methods:{
      async sign_out () {
			localStorage.removeItem('user_token')
			await this.$router.push('/home')
		}
  }
}
</script>

<style>

</style>