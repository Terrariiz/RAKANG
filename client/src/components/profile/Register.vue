<template>
  <div style="" class='register'>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>This is register page.</h1>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="registerUser"
      >
    
      <v-container id="border-login" style="border-radius: 15px; " >
        <h1 style="text-align:center">Register </h1>
    <!-- Columns are always 50% wide, on mobile and desktop -->
    <v-row >

      <!-- <v-col cols="12" sm="6" >
         <v-text-field single-line solo  v-model="register.username"  :counter="10" label="Username" :rules="usernameRules"  required></v-text-field>
      </v-col> -->

      <v-col cols="12" sm="12" >
         <v-text-field single-line solo  v-model="register.email" :counter="10" label="Mail" :rules="emailRules"  required></v-text-field>
      </v-col>

      <v-col
          cols="12"
          sm="6"
        >
          <v-text-field single-line solo
            v-model="register.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field single-line solo
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm password"
            hint="At least 8 characters"
            value=""
            class="input-group--focused"
            @click:append="show2 = !show2"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" >
         <v-text-field single-line solo  v-model="register.firstname" :counter="10" label="Name" :rules="firstnameRules"  required></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" >
         <v-text-field single-line solo  v-model="register.lastname" :counter="10" label="Surname" :rules="lastnameRules"  required></v-text-field>
      </v-col>

      <v-col cols="6" sm="4" >
         <v-text-field single-line solo  v-model="register.age" :counter="10" label="Age" :rules="ageRules" required ></v-text-field>
      </v-col>

      <v-col cols="6" sm="4" >
         <v-text-field single-line solo  v-model="register.phone" :counter="10" label="Phone" :rules="phoneRules" required></v-text-field>
      </v-col>
    </v-row>
    <div>
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted" 
                    style="text-align:left ;"
                    required
                  >
                    I accept the terms and use
                  </b-form-checkbox>
    </div>
      <br>
              <center><router-link style="color:green;" to="/login"  >Login ?</router-link></center>
              <center><v-btn type="submit" style="margin-top:1% "  color="primary" dark>Register</v-btn></center>
  </v-container>
              <!-- <br>
              <center><router-link style="color:green;" to="/login"  >Login ?</router-link></center>
              <center><v-btn type="submit" style="margin-top:1% "  color="primary" dark>Register</v-btn></center> -->
  </v-form>
  </div>

</template>

<script>
const Navbar = () => import('@/components/navbar/visitor_navbar')
import swal from "sweetalert";
  export default {
    name: 'Register',
  data() {
    return {
      register: {
        // username: "",
        usernameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 6) || 'Name must be less than 6 characters',
      ],
        // email: "",
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        // password: "",
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
        // firstname: "",
        firstnameRules: [
          v => !!v || 'Firstname is required',
      ],
        // lastname: "",
        lastnameRules: [
          v => !!v || 'Lastname is required',
      ],
        // age: "",
        ageRules: [
          v => !!v || 'Age is require',
      ],
        // phone: "",
        phoneRules: [
          v => !!v || 'Phone is require',
          v => (v && v.length <= 12) || 'Password must be less than 12 characters',
      ],
        checkbox: false
      },
        show1: false,
        show2: false,
        show3: false,
        show4: false,
       
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        }
    }
  },
    components:{
      Navbar
  },
  
    methods: {
      async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("user_token", token);
          this.$router.push("/profile");
          swal("Success", "Registration Was successful", "success");
          console.log('success')
        } else {
          swal("Error", "Something Went Wrong", "error");
          console.log('error')
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        console.log('success')
        } else {
          swal("Error", error.data.err.message, "error");
        console.log('error')
        }
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
  width:600px; box-shadow: 5px 6px 5px #888888; background-color:white;
}
@media screen and (max-width: 400px) {
  #border-login{
    width:350px;
    
  }
  }
@media screen and (max-width: 450px) {
  #border-login{
    width:350px;
    
  }
  }
</style>