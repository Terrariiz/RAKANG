<template>
  <div class="LogDonate">
    <div>
      <Navbar></Navbar>
    </div>
    <br>
    <v-container >
      <h1>Log Donate Admin</h1>
    </v-container>    
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
  name: 'Admin',
  components:{
    Navbar
  }
}
</script>
