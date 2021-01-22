<template>
  <div class='about'>
    <div>
      <Navbar></Navbar>
    </div>
    <v-img src="https://media1.tenor.com/images/e3784e69e1d3114d42f6e5f51bea0879/tenor.gif?itemid=14949762"></v-img>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
  components:{
        Navbar
    },
}
</script>

<style>

</style>