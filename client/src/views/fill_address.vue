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
            Log in </v-btn>
            <br />
        </v-form>
      </v-container>
    </v-container> -->

    <div class="container">
      <h1 class="head">กรอกที่อยู่ในการจัดส่ง</h1>
      <hr>
      <v-checkbox
              v-model="ex4"
              label="ใช้ที่อยู่ปัจจุบัน"
              color="success"
              value="success"
              hide-details
            ></v-checkbox>
        <v-row>
          <v-col cols="12" md="6" sm="12">
              <label for="name">ชื่อ-นามสกุล</label><br>
              <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="name"
                type="text"
                required
            >
          </v-col>
          <v-col cols="12" md="6" sm="12">
              <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                type="text"
                required
            >
          </v-col>

          <v-col cols="12" md="4" sm="6">
              <ThailandAutoComplete
            required
            v-model="district"
            type="district"
            @select="select"
            label="ตำบล"
            color="#42b883"
            size="default"
            placeholder="ตำบล..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="amphoe" type="amphoe" @select="select" label="อำเภอ" placeholder="อำเภอ..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="province" type="province" @select="select" label="จังหวัด" color="#35495e" placeholder="จังหวัด..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/>
          </v-col>
          <v-col cols="12" md="8" sm="12">
            <label for="phone">ที่อยู่</label>
            <v-textarea
              clearable
              solo
              filled
              auto-grow
              clear-icon="mdi-close-circle"
              label="46 หมู่ 4 ถนน......."
            ></v-textarea>
          </v-col>
        </v-row>
         <div class="btn"><v-btn color="success" @click="validate" type="submit">ยืนยันสินค้า</v-btn></div>
    </div>

    <div class="container">
      <h1 class="head">กรอกที่อยู่ในการจัดส่ง</h1>
      <hr>
      <v-checkbox
              v-model="ex4"
              label="ใช้ที่อยู่ใหม่"
              color="success"
              value="success"
              hide-details
            ></v-checkbox>
        <v-row>
          <v-col cols="12" md="6" sm="12">
              <label for="name">ชื่อ-นามสกุล</label><br>
              <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="name"
                type="text"
                required
            >
          </v-col>
          <v-col cols="12" md="6" sm="12">
              <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                type="text"
                required
            >
          </v-col>

          <v-col cols="12" md="4" sm="6">
              <ThailandAutoComplete
            required
            v-model="district"
            type="district"
            @select="select"
            label="ตำบล"
            color="#42b883"
            size="default"
            placeholder="ตำบล..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="amphoe" type="amphoe" @select="select" label="อำเภอ" placeholder="อำเภอ..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="province" type="province" @select="select" label="จังหวัด" color="#35495e" placeholder="จังหวัด..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/>
          </v-col>
          <v-col cols="12" md="8" sm="12">
            <label for="phone">ที่อยู่</label>
            <v-textarea
              clearable
              solo
              filled
              auto-grow
              clear-icon="mdi-close-circle"
              label="46 หมู่ 4 ถนน......."
            ></v-textarea>
          </v-col>
        </v-row>
         <div class="btn"><v-btn color="success" @click="validate" type="submit">ยืนยันสินค้า</v-btn></div>
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
.container{
   margin-top:30px;
  display: grid;
  width: 60%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

.head{
  font-weight: 400;
  font-size: 36px;
}
.btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type=text]{
  width: 100%;
  padding: 4px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
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

</style>