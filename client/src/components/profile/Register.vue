<template>
  <div class='register'>
    <div>
      <Navbar></Navbar>
    </div>
    <br><br><br><br><br>
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

      <v-col cols="12" sm="12" >
        <v-text-field 
          single-line solo  
          v-model="register.email"
          label="Mail" 
          :rules="emailRules"  
          required></v-text-field>
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
            hint="At least 6 characters"
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
            v-model='register.confirmPassword'
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules.concat(passwordConfirmationRule)" 
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm password"
            hint="At least 6 characters"
            value=""
            class="input-group--focused"
            @click:append="show2 = !show2"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" >
         <v-text-field 
         single-line solo 
         v-model="register.firstname"
         label="Name" 
         :rules="firstnameRules"  
         required></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" >
         <v-text-field 
         single-line solo  
         v-model="register.lastname" 
         label="Surname" 
         :rules="lastnameRules"  
         required></v-text-field>
      </v-col>

      <v-col cols="12" md="6" sm="4" >
         <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              single-line solo
              v-model="register.birthdate"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              :rules="dateRules"
              readonly
              required
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="register.birthdate"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="6" sm="4" >
         <v-text-field 
         single-line solo 
         v-model="register.phone" 
         :counter="10" 
         label="Phone" 
         onkeypress="return event.charCode >= 48 && event.charCode <= 57"
         :rules="phoneRules" 
         required></v-text-field>
      </v-col>
    </v-row>
    <div>
      <v-checkbox
        v-model="register.checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label='I accept the terms and use'
        required>
      </v-checkbox>
    </div>
      <br>
      <center>
    <v-btn
      :disabled="!valid"
      type='submit'
      color="success"
      class="mr-4"
      @click="validate"
    >
      Register
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
    </center>
  </v-container>
  </v-form>
  </div>

</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
  export default {
    name: 'Register',
  data() {
    return {
      valid: false,
      dateNow: null,
      register: {
        email: "",
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        phone: '',
        checkbox: false,
      },              
      show1: false,
      show2: false,
      emailRules:[
          v => !!v || 'Email is required!',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
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
        nameRules:[
          v => !!v || 'Name is required!',
          v => v.length <= 50 || 'Name must be less than 50 characters',
        ],
        firstnameRules:[
          v => !!v || 'Firstname is required!',
          v => v.length <= 50 || 'Firstname must be less than 50 characters',
        ],
        lastnameRules:[
          v => !!v || 'Lastname is required!',
          v => v.length <= 50 || 'lastname must be less than 50 characters',
        ],
        dateRules:[
          v => !!v || 'Birthdate is required!',
        ],
        phoneRules:[
          v => !!v || 'Phone is required',
          v => v.length == 10 || 'Phone must be 10 numbers',
        ],
    }
  },
  async created() {
    this.dateNow = new Date();
    console.log(this.dateNow);
  },
  computed: {
    passwordConfirmationRule() {
        return () => (this.register.password === this.register.confirmPassword) || 'Password must match'
    },
  },
    components:{
      Navbar
  },
  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        // console.log(response);
        let token = response.data.token;
        let id = response.data.data._id;
        let userrank = response.data.Rank;
        let userpoint = response.data.userpoint;
        if (token) {
          localStorage.setItem("user_exp", userpoint);
          localStorage.setItem("user_token", token);
          localStorage.setItem('user_id', id)
          localStorage.setItem("user_rank", userrank);
          this.$store.dispatch('UserLoggedIn');
          this.$router.push("/profile");
          swal.fire("Success", "Registration Was successful", "success");
          console.log('success')
        } else {
          swal.fire("Error", "Something Went Wrong", "error");
          console.log('error')
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal.fire("Error", error.data.message, "error");
          console.log('success')
        } else {
          swal.fire("Error", error.data.err.message, "error");
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
      save (date) {
        this.$refs.menu.save(date)
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