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
          label="Email"
          required
        ></v-text-field>

        <v-text-field style="text-align:center; "
          single-line solo
           v-model="login.password"
            id="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            
            label="Password"
            hint="At least 8 characters"
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
        <v-btn text><router-link  to='/register'>Register ?</router-link></v-btn>
        
      </v-form>
      </v-container>
    </v-container>
    
  </div>
</template>

<script>
import swal from "sweetalert";
const Navbar = () => import('@/components/navbar/navbar')
export default {
    data() {
    return {
      login: {
        email: "",
        password: ""
      },
        show1:false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        },
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
          this.$store.dispatch('UserLoggedIn');
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