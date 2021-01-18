<template>
  <div>
    <div v-if='$store.getters.UserIsLoggedIn'>
        <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-brand href="/home">RAKANGTHAM</b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item href="/about">About</b-nav-item>
                </b-navbar-nav>

              
              <b-navbar-nav class="ml-auto">
                <b-nav-item href='/coin'>coin:{{dataUser.coin}}</b-nav-item>
               <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                  <template #button-content>
                    <a>User</a>
                  </template>
                   <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                   <b-dropdown-item v-on:click='sign_out()'>Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
              </b-collapse>
        </b-navbar>
    </div>
    <div v-else-if='$store.getters.AdminIsLoggedIn'>
        <b-navbar toggleable="lg" type="dark" variant="dark">
              <b-navbar-brand href="/home">RAKANGTHAM</b-navbar-brand>
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
        <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-brand href="/home">RAKANGTHAM</b-navbar-brand>
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
    
    data(){
        return{
            dataUser: {}
        }
    },
    mounted: function mounted(){
      const id = window.localStorage.getItem('user_id')
      console.log(id)
      this.$http.get("/user/"+id)
      .then((res) => {
        this.dataUser = res.data;
      })
      .catch(function(err){
        console.log(err)
      })
    },
    methods:{
      async sign_out () {
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem("top-up-amount");
      this.$store.dispatch('UserLoggedOut')
      await this.$router.push('/home')
		},
  }
}
</script>

<style>

</style>