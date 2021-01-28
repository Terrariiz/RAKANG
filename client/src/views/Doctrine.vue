<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>Doctrine page</h1>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Doctrine',
    components:{
        Navbar
    },
}
</script>

<style>

</style>