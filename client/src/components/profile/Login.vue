<template>
  <div class='login'>
     <div>
      <Navbar></Navbar>
    </div>
    <br><br><br>
    <v-container id="border-login" rounded-xl style="text-align:center;  margin-top:5%; box-shadow: 5px 6px 5px #888888; ">
      
      <h1>Login</h1>
      <v-container :elevation="11" style="">
     
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="loginUser"
      >
        <v-text-field style="text-align:center; "
          single-line solo
          v-model="login.email"
          :rules='emailRules'
          label="Email"
          required
        ></v-text-field>

        <v-text-field style="text-align:center; "
          single-line solo
           v-model="login.password"
            id="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules='passwordRules'
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show1 = !show1"
            aria-required=""
        ></v-text-field>

        <v-btn
          
          color="success"
          
          @click="validate"
          type='submit'
        >
          Log in
        </v-btn><br>
        <v-btn text><router-link  to='/register'>สมัครสมาชิก</router-link></v-btn>
        <v-btn text><router-link  to='/forgotPassword'>ลืมรหัสผ่าน</router-link></v-btn>
      </v-form>
      </v-container>
    </v-container>
    <div>
      <Footer style="position: absolute;"></Footer>
    </div>

  </div>
</template>

<script>
import swal from "sweetalert2";
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import('@/components/navbar/navbar')
export default {
    data() {
    return {
      login: {
        email: "",
        password: ""
      },
      show1:false,
      emailRules:[
        v => !!v || 'Email is required!',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
        v => !!v || 'Password is required!',
        v => v.length >= 6 || 'Name must be more than 6 characters',
        v => v.length <= 12 || 'Name must be less than 12 characters',
      ],
    }
  },
  components:{
        Navbar,
        Footer
    },

    methods: {
      async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        let idUser = response.data.user._id;
        let userrank = response.data.Rank;
        let userpoint = response.data.userpoint;
        localStorage.setItem("user_token", token);
        localStorage.setItem("user_id", idUser);
        localStorage.setItem("user_rank", userrank);
        localStorage.setItem("user_exp", userpoint);
        if (token) {
          swal.fire("Success", "Login Successful", "success");
          this.$store.dispatch('UserLoggedIn');
          this.$router.push("/profile");
        }
      } catch (err) {
        swal.fire("Error", "Email or Password Went Wrong", "error");
        console.log(err.response);
      }
    },
      validate () {
        this.$refs.form.validate()
      },
    },
}

</script>

<style>
#border-login{
  width:500px; box-shadow: 5px 6px 5px #888888; background-color:white;
}
@media screen and (max-width: 400px) {
  #border-login{
    width:350px;
    
  }
}
  

</style>