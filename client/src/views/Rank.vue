<template>
  <div class="coin">
    <div>
      <Navbar></Navbar>
    </div>
    <h1>RANK</h1>
    
  </div>
</template>
<script>
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
  }
}
</script>
<style>
</style>
