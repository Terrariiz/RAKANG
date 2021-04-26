<template>
    <div class='termuse'>
        <div>
            <Navbar></Navbar>
        </div>
        <br><br><br><br><br>
        <div style="margin-left: 10%; margin-right: 10%">
            <h1>วิธีการใช้งานเว็บไซต์</h1>
            <h5>นั่นสิ มันใช้ยังไงนะ</h5>
        </div>        
        <div>
            <Footer style="position: absolute;"></Footer>
        </div>
    </div>
</template>

<script>
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import('@/components/navbar/navbar')
export default {    
  components:{
        Navbar,
        Footer
    },
}
</script>

<style>

</style>