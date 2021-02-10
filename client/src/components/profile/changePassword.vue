<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Change Password</span>
      </v-card-title>
      <v-card-text>
        <v-form
                          ref="form"
                          style="margin:3%;"
                          v-model="valid"
                          lazy-validation
                          @submit.prevent="changePassword"
                        >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field single-line solo
                                  v-model="dataPassword.oldPassword"
                                  
                                  :rules="oldPasswordRules"
                                  :type="show1 ? 'text' : 'password'"
                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                  name="input-10-1"
                                  label="Old password"
                                  hint="At least 6 characters"
                                  counter
                                  @click:append="show1 = !show1"
                                  required
                              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field single-line solo
                                  v-model="dataPassword.newPassword"
                                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="newPasswordRules"
                                  :type="show2 ? 'text' : 'password'"
                                  name="input-10-2"
                                  label="New password"
                                  hint="At least 6 characters"
                                  counter
                                  @click:append="show2 = !show2"
                                  required
                              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field single-line solo
                                  v-model="dataPassword.confirmNewPassword"
                                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                                  :type="show3 ? 'text' : 'password'"
                                  name="input-10-3"
                                  label="Confirm new password"
                                  hint="At least 6 characters"
                                  counter
                                  @click:append="show3 = !show3"
                                  required
                              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="cancel"> Close </v-btn>
        <v-btn color="green darken-1" text :disabled="!valid" type='submit' @click="changePassword"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import swal from "sweetalert2";
const id = window.localStorage.getItem('user_id')
export default {
  name: "changePassword",
  props: ['visible'],
  data() {
        return {
          dataPassword: {
            oldPassword: null,
            newPassword: null,
            confirmNewPassword: null
          },
          valid: false,
          show1: false,
          show2: false,
          show3: false,
          oldPasswordRules:[
            v => !!v || 'Old Password is required!',
            v => v.length >= 6 || 'Old Password must be more than 6 characters',
            v => v.length <= 12 || 'Old Password must be less than 12 characters',
          ],
          NewPasswordRules:[
            v => !!v || 'New Password is required!',
            v => v.length >= 6 || 'New Password must be more than 6 characters',
            v => v.length <= 12 || 'New Password must be less than 12 characters',
          ],
          confirmPasswordRules: [
            v => !!v || "Confirm new Password is required",
            v => v.length >= 6 || 'Confirm new Password must be more than 6 characters',
            v => v.length <= 12 || 'Confirm new Password must be less than 12 characters',
          ]
        }
    },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      },
      passwordConfirmationRule() {
        return () => (this.dataPassword.newPassword === this.dataPassword.confirmNewPassword) || 'Password must match'
      }
    }
  },
  methods:{
      validate () {
        this.$refs.form.validate()
      },
      cancel () {
        this.$refs.form.reset()
        this.show = false
      },
      async changePassword(){
        if(this.dataPassword.oldPassword == null || this.dataPassword.newPassword == null || this.dataPassword.confirmNewPassword == null){
          this.$refs.form.reset()
          this.show = false
        } else{
            try {
              let response = await this.$http.post("/user/"+id+"/reset-password", this.dataPassword);
              let check = response.data
              if (check == true) {
                  this.$refs.form.reset()
                  this.show = false
                  swal.fire("Success", "Change your password Was successful", "success");
                  console.log('success')
              } else { 
                  if(check == false){
                    this.$refs.form.reset()
                    this.show = false
                    swal.fire("Error", "รหัสผ่านใหม่ที่กรอกเป็นรหัสเดิม", "error");
                  } else {
                    this.$refs.form.reset()
                    this.show = false
                    swal.fire("Error", check, "error");
                    console.log('error')
                  }
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
          }
      }
    },
};
</script>

<style>
</style>