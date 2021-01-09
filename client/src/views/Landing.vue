<template>
  <div class='landing'>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>This is landing page.</h1>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/visitor_navbar')
export default {
  name: 'Landing',
  components:{
        Navbar
    },
}
</script>

<style>

</style>