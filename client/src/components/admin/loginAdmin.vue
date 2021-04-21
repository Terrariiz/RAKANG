<template>
  <div class='login'>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
    <v-container id="border-login" rounded-xl style="text-align:center;  margin-top:5%; box-shadow: 5px 6px 5px #888888; ">
      <h1>Admin Login</h1>
      <v-container :elevation="11" style="">
     
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="loginAdmin"
      >
        <v-text-field style="text-align:center; "
          single-line solo
          v-model="admin.username"
          :rules="[rules.required]" 
          label="Username"
          required
        ></v-text-field>

        <v-text-field single-line solo
            v-model="admin.password"
            id="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn
          
          color="success"
          
          @click="validate"
          type='submit'
        >
          Log in
        </v-btn><br>
        
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
const Footer = () => import('@/components/navbar/footer')
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Loginadmin',
    data(){
      return{
        admin:{
          username:'admin',
          password:"123456789"
        },
        show1:false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        },
      }
    },
    components:{
      Navbar,
      Footer
    },    

    methods: {
      async loginAdmin() {
      try {
        let response = await this.$http.post("/admin/login", this.admin);
        let token = response.data.token;
        localStorage.setItem("admin_token", token);
        if (token) {
          swal.fire("Success", "Login Successful", "success");
          this.$store.dispatch('AdminLoggedIn')
          this.$router.push("/admin");
        }
      } catch (err) {
        swal.fire("Error", "Email or Password Went Wrong", "error");
        console.log(err.response);
      }
    },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      }
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