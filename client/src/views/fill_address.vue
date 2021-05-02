<template>
  <div class="login">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
    <!-- <v-container
      id="border-login"
      rounded-xl
      style="text-align:center;  margin-top:5%; box-shadow: 5px 6px 5px #888888; "
    >
      <h1>กรอกที่อยู่ในการจัดส่ง</h1>
      <v-container :elevation="11" style="">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="loginUser"
        >
            <label for="name">ชื่อ-นามสกุล</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="name"
                type="text"
                required
            ><br>
            <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                type="text"
                required
            >
          <ThailandAutoComplete
            required
            v-model="district"
            type="district"
            @select="select"
            label="ตำบล"
            color="#42b883"
            size="default"
            placeholder="ตำบล..."/>
            <ThailandAutoComplete required v-model="amphoe" type="amphoe" @select="select" label="อำเภอ" placeholder="อำเภอ..."/>
            <ThailandAutoComplete required v-model="province" type="province" @select="select" label="จังหวัด" color="#35495e" placeholder="จังหวัด..."/>
            <ThailandAutoComplete required v-model="zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/> 
            <br />
            <v-btn color="success" @click="validate" type="submit">
            Log in </v-btn
          ><br />
        </v-form>
      </v-container>
    </v-container> -->

    <div class="container">
      <h1>กรอกที่อยู่ในการจัดส่ง</h1>
      <v-container :elevation="11" style="">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="loginUser"
        >
            <label for="name">ชื่อ-นามสกุล</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="name"
                type="text"
                required
            ><br>
            <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                type="text"
                required
            >
          <ThailandAutoComplete
            required
            v-model="district"
            type="district"
            @select="select"
            label="ตำบล"
            color="#42b883"
            size="default"
            placeholder="ตำบล..."/>
            <ThailandAutoComplete required v-model="amphoe" type="amphoe" @select="select" label="อำเภอ" placeholder="อำเภอ..."/>
            <ThailandAutoComplete required v-model="province" type="province" @select="select" label="จังหวัด" color="#35495e" placeholder="จังหวัด..."/>
            <ThailandAutoComplete required v-model="zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/> 
            <br />
            <v-btn color="success" @click="validate" type="submit">
            Log in </v-btn
          ><br />
        </v-form>
      </v-container>
    </div>

    <br />
    <br />
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import("@/components/navbar/navbar");
export default {
    components: {
        Navbar,
        Footer,
    },
    data () {
        return {
            district: '',
            amphoe: '',
            province: '',
            zipcode: ''
        }
    },
    methods: {
    select (address) {
      this.district = address.district
      this.amphoe = address.amphoe
      this.province = address.province
      this.zipcode = address.zipcode
    }
  },
}
</script>

<style scoped>
#border-login {
  width: 500px;
  box-shadow: 5px 6px 5px #888888;
  background-color: white;
}
@media screen and (max-width: 400px) {
  #border-login {
    width: 350px;
  }
}
.container{
  display: grid;
  width: 60%;
  background-color: rgb(194, 194, 194);
}
</style>