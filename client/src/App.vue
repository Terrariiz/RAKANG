<template>
  <div id="app">
    <v-app>
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
      sidebar: false
    }
  },
}
//  import a from '../src/assets/images/bg-temple-2.jpg'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  /* background-image: url('../src/assets/images/bg-temple-2.jpg') ; */
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;
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
@import url("https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css");
</style>
