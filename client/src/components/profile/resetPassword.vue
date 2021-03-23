<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
    <v-container id="border-login" rounded-xl style="text-align:center;  margin-top:5%; box-shadow: 5px 6px 5px #888888; ">
      <h1>Enter your new password</h1>
      <v-container :elevation="11" style="">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="resetPassword"
        >
            <v-text-field style="text-align:center; "
                single-line solo
                v-model="password.new"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules='passwordRules'
                label="Password"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
                aria-required=""
            ></v-text-field>
            <v-text-field style="text-align:center; "
                single-line solo
                v-model="password.confirm"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                label="Confirm Password"
                hint="At least 6 characters"
                counter
                @click:append="show2 = !show2"
                aria-required=""
            ></v-text-field>
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
    name:'resetPassword',
    components:{
        Navbar
    },
    data(){
        return {
            password:{
                new:null,
                confirm:null,
            },
            show1: false,
            show2: false,
            valid: false,
            passwordRules:[
                v => !!v || 'Password is required!',
                v => v.length >= 6 || 'Name must be more than 6 characters',
                v => v.length <= 12 || 'Name must be less than 12 characters',
            ],
            confirmPasswordRules: [
                v => !!v || "Password is required",
                v => v.length >= 6 || 'Name must be more than 6 characters',
                v => v.length <= 12 || 'Name must be less than 12 characters',
            ],
        }
    },
    async created() {
      await this.$http.get('/user/resetPassword/'+this.$route.params.token).then((res) => {
        console.log(res)
        if(res.data.check == "error"){
          this.$router.push({name: 'Login'})
          swal.fire(res.data.errors.title, res.data.errors.detail, "error");
        } else{
          console.log(res.data.token)
        }
      }).catch(function (err) {
        console.log(err)
        // let error = err.response;
        // if (error.status == 409) {
        //   swal.fire(error.data.errors.title, error.data.errors.detail, "error");
        // } else {
        //   swal.fire(error.data.errors.title, error.data.errors.detail, "error");
        // }
      });
    },
    computed: {
        passwordConfirmationRule() {
            return () => (this.password.new === this.password.confirm) || 'Password must match'
        },
    },
    methods: {
        async resetPassword(){
            try {
              let response = await this.$http.post("/user/resetPassword/"+this.$route.params.token, this.password);
              console.log(response)
              //ยังมีบัคอยู่ถ้าให้มันรีไปหน้า login หลังจากเปลี่ยนรหัสแล้วจะล็อคอินไม่ได้
              if(response.data == 'reset true'){
                this.$router.push({name: 'Home'})
                swal.fire("Success", "รหัสผ่านของคุณได้ถูกเปลี่ยนแล้ว", "success")
              } else{
                swal.fire("Error", "ผิดพลาดบางอย่าง", "error");
              }
            } catch (err) {
              let error = err.response;
              console.log(error)
              if (error.status == 409) {
                swal.fire("Error", error.data.errors.detail, error.data.errors.title);
                console.log("success");
              } else {
                swal.fire("Error", error.data.errors.detail, error.data.errors.title);
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