<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
    <v-container id="border-login" rounded-xl style="text-align:center;  margin-top:5%; box-shadow: 5px 6px 5px #888888; ">
      <h1>Enter your email</h1>
      <v-container :elevation="11" style="">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="sentEmail"
        >
            <v-text-field style="text-align:center; "
                single-line solo
                v-model="email"
                :rules='emailRules'
                label="Email"
                required
            ></v-text-field>
            <v-btn
                style="margin: 5px;"
                @click="$router.back();"
            >ยกเลิก</v-btn>
            <v-btn
                color="success"
                style="margin: 5px;"
                :disabled="!valid"
                @click="validate"
                type='submit'
            >ยืนยัน</v-btn>
            <br>

        </v-form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
export default {
    name:'InputEmail',
    components:{
        Navbar
    },
    data(){
        return {
            email: null,
            valid: false,
            emailRules:[
                v => !!v || 'Email is required!',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        async sentEmail(){
            try {
              swal.fire({
                title: 'โปรดรอสักครู่',
                text: 'กำลังส่งอีเมลยืนยัน...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                onOpen: () => {
                    swal.showLoading()
                }
              })
              let response = await this.$http.post("/user/forgotpassword", {email:this.email});
              console.log(response)
              if(response.data == 'mail sent'){
                swal.hideLoading()
                swal.fire("ส่งอีเมลสำเร็จ", "ข้อความถูกส่งไปที่อีเมลของคุณแล้ว", "success")
              } else{
                swal.hideLoading()
                swal.fire("ส่งอีเมลไม่สำเร็จ", "เกิดข้อผิดพลาดบางอย่าง", "error");
              }
            } catch (err) {
              let error = err.response;
              console.log(error)
              if (error.status == 409) {
                swal.fire(error.data.errors.title, error.data.errors.detail, "error");
                console.log("success");
              } else {
                swal.fire(error.data.errors.title, error.data.errors.detail, "error");
                console.log("error");
              }
            }
        },
        validate () {
            this.$refs.form.validate()
        },
    },
}
</script>

<style scoped>
#border-login{
  width:500px; box-shadow: 5px 6px 5px #888888; background-color:white;
}
@media screen and (max-width: 400px) {
  #border-login{
    width:350px;
    
  }
}
</style>