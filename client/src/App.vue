<template>
  <div id="app">
    <v-app>
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
    
    <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      appTitle: 'RAKANG',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/home'},
          { title: 'About', path: '/about'},
          { title: 'Log in', path: '/login'}
     ]
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  background: linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
