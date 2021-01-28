<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>News page</h1>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'News',
    components:{
        Navbar
    },
}
</script>

<style>

</style>