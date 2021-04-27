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
//  import a from '../../client/public/image/ja-jp.ttf'

</script>
<script src="../node_modules/ckeditor4/ckeditor.js"></script>
<script src="../node_modules/ckeditor4-vue/dist/ckeditor.js"></script>
<style>

#app {
  
  font-family: 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  /* overflow-x: hidden; */
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

@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css");
</style>
