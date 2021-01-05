<template>
  <div class='login'>
    <h1>This is login page.</h1>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="loginUser"
      >
        <v-text-field
          v-model="login.email"
          :counter="12"
          :rules="nameRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="login.password"
          :counter="12"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          type='submit'
        >
          Log in
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
    <router-link to='/register'>Register</router-link>
  </div>
</template>

<script>
import swal from "sweetalert";
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
    };

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

</style>