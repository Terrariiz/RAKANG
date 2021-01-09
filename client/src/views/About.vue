<template>
  <div class='about'>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>This is about page.</h1>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/visitor_navbar')
export default {
  components:{
        Navbar
    },
}
</script>

<style>

</style>