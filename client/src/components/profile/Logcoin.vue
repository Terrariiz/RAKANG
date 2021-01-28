<template>
  <div>
      <div>
        <Navbar></Navbar>
      </div>
      <h1>Coin Log</h1>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'LogCoin',
    components:{
        Navbar
    }
}
</script>

<style>

</style>