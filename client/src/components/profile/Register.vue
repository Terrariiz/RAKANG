<template>
  <div class='register'>
    <h1>This is register page.</h1>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="registerUser"
      >
    
      <v-container style="-webkit-box-shadow: 0 10px 6px -6px #777;
     -moz-box-shadow: 0 10px 6px -6px #777;
          box-shadow: 0 10px 6px -6px #777; border-radius: 15px;" >
    <!-- Columns are always 50% wide, on mobile and desktop -->
    <v-row>

      <v-col cols="12" sm="6" >
         <v-text-field single-line solo  id = "username" v-model="register.username"  :counter="10" label="Username" :rules="[rules.required]"  required></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" >
         <v-text-field single-line solo  id = "email"  v-model="register.email" :counter="10" label="Mail" :rules="[rules.required]"  required></v-text-field>
      </v-col>

      <v-col
          cols="12"
          sm="6"
        >
          <v-text-field single-line solo
            v-model="register.password"
            id="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field single-line solo
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm password"
            hint="At least 8 characters"
            value=""
            class="input-group--focused"
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" >
         <v-text-field single-line solo  id = "firstname" v-model="register.firstname" :counter="10" label="Name" :rules="[rules.required]"  required></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" >
         <v-text-field single-line solo  id = "lastname" v-model="register.lastname" :counter="10" label="Surname" :rules="[rules.required]"  required></v-text-field>
      </v-col>

      <v-col cols="6" sm="4" >
         <v-text-field single-line solo  id = "age" v-model="register.age" :counter="10" label="Age"   ></v-text-field>
      </v-col>

      <v-col cols="6" sm="4" >
         <v-text-field single-line solo  id = "phone" v-model="register.phone" :counter="10" label="Phone" ></v-text-field>
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
                  >
                    I accept the terms and use
                  </b-form-checkbox>
    </div>
  </v-container>
              <br>
              <center><router-link style="color:green;" to="/login"  >Login ?</router-link></center>
              <center><v-btn type="submit" style="margin-top:1% "  color="primary" dark>Register</v-btn></center>
  </v-form>
  </div>

</template>

<script>
import swal from "sweetalert";
  export default {
    name: 'Register',
    
    // data: () => ({
    //   valid: true,
    //   name: '',
    //   nameRules: [
    //     v => !!v || 'Name is required',
    //     v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    //   ],
    //   password: '',
    //     passwordRules: [
    //       v => !!v || 'Password is required',
    //       v => (v && v.length <= 12) || 'Password must be less than 12 characters',
    //   ],
    //   email: '',
    //   emailRules: [
    //     v => !!v || 'E-mail is required',
    //     v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    //   ],
    //   checkbox: false,
    // }),
    
  data() {
    // return {
      // register: {
      //   name: "",
      //   email: "",
      //   password: "",
      //   firstname: "",
      //   lastname: "",
      //   age: "",
      //   phone: "",
    //   }
    // }
    return {
      register: {
        name: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        phone: "",
      },
        show1: false,
        show2: false,
        show3: false,
        show4: false,
       
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
  },
    methods: {
      async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/login");
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
      }
    },
  }
</script>

<style>
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto  auto;
    grid-column-gap: 10%;
}
</style>