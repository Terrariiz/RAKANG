<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>Campaign</h1>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Campaign',
    components:{
        Navbar
    },
}
</script>

<style>

</style>