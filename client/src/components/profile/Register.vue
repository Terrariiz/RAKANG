<template>
  <div class='register'>
    <h1>This is register page.</h1>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="registerUser"
      >
        <v-text-field
          id = "name"
          v-model="register.name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          id = "password"
          v-model="register.password"
          :counter="12"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-text-field
          id = "email"
          v-model="register.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          type='submit'
        >
          Sign up
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
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
    return {
      register: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
    methods: {
      async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          // swal("Success", "Registration Was successful", "success");
          console.log('success')
        } else {
          // swal("Error", "Something Went Wrong", "error");
          console.log('error')
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
        //   swal("Error", error.data.message, "error");
        console.log('success')
        } else {
        //   swal("Error", error.data.err.message, "error");
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

</style>