<template>
  <div class='login'>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>This is admin login page.</h1>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field single-line solo
            id = "username" 
            v-model="admin.username"  
            :counter="10" label="Username" 
            :rules="[rules.required]"  
            required
        ></v-text-field>

        <v-text-field single-line solo
            v-model="admin.password"
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

        <!-- <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field> -->

        <!-- <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox> -->

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
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
  </div>
</template>

<script>
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
    //     email: '',
    //     emailRules: [
    //       v => !!v || 'E-mail is required',
    //       v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    //     ],
    //     checkbox: false,
    // }),
    name:'Loginadmin',
    data(){
      return{
        admin:{
          username:"",
          password:""
        },
        show1:false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    components:{
      Navbar
    },    

    methods: {
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