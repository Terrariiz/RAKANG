<template>
  <div  class='login'>
     <div>
      <Navbar></Navbar>
    </div>
    <h1 style="text-align:center;">This is login page.</h1>
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
          :rules="nameRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field style="text-align:center; "
          single-line solo
          v-model="login.password"
          type="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          
          color="success"
          
          @click="validate"
          type='submit'
        >
          Log in
        </v-btn><br>
        <v-btn text><router-link  to='/register'>Register ?</router-link></v-btn>
        
      </v-form>
      </v-container>
    </v-container>
    
  </div>
</template>

<script>
import swal from "sweetalert";
const Navbar = () => import('@/components/navbar/visitor_navbar')
export default {

    // data: () => ({
    //     valid: true,
    //     name: '',
    //     nameRules: [
    //       v => !!v || 'Name is required',
    //       v => (v && v.length <= 12) || 'Name must be less than 12 characters',
    //     ],
    //     password: '',
    //     passwordRules: [
    //       v => !!v || 'Password is required',
    //       v => (v && v.length <= 12) || 'Password must be less than 12 characters',
    //     ],
    //     checkbox: false,
    // }),
    data() {
    return {
      login: {
        email: "",
        password: ""
      }
    }

  },
  components:{
        Navbar
    },

    methods: {
      async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("user_token", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push("/profile");
        }
      } catch (err) {
        swal("Error", "Email or Password Went Wrong", "error");
        console.log(err.response);
      }
    },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
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