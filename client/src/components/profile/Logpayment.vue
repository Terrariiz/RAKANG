<template>
  <div>
      <div>
        <Navbar></Navbar>
      </div>
      <h1>Payment Log</h1>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'LogPayment',
    components:{
        Navbar
    }
}
</script>

<style>

</style>