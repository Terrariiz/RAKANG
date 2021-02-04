<template>

    <modal name="change-password" transition="pop-out" :width="modalWidth" :focus-trap="true" :height="475">
        <div class="box">
            <div class="box-part" id="bp-left">
                <div class="partition" id="partition-register">
                    <div class="partition-title">CHANGE PASSWORD</div>
                    <hr>
                    <div class="partition-form">
                      <center>
                        <v-form
                          ref="form"
                          style="margin:3%;"
                          v-model="valid"
                          lazy-validation
                          @submit.prevent="changePassword"
                        >
                          <v-row>
                            <v-col cols="12" sm="12" >
                              
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
                            <v-col cols="12" sm="12" >
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
                            <v-col cols="12" sm="12" >
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
                          <center>
                            <v-btn class="mr-4" color="error" @click="cancel">Cancel</v-btn>
                            <v-btn
                              :disabled="!valid"
                              type='submit'
                              color="success"
                              class="mr-4"
                              @click="validate"
                            >
                              Submit
                            </v-btn>
                          </center>
                          <br>
                        </v-form>
                      </center>
                    </div>
                </div>
            </div>
            <!-- <div class="box-part" id="bp-right"></div>
            <div class="box-messages"></div> -->
        </div>
    </modal>

</template>

<script>
const MODAL_WIDTH = 656
import swal from "sweetalert";
const id = window.localStorage.getItem('user_id')
export default {
    name: 'changePassword',
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
          modalWidth: MODAL_WIDTH,
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
    created() {
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
    },
    methods:{
      validate () {
        this.$refs.form.validate()
      },
      cancel () {
        this.$modal.hide('change-password')
        this.$refs.form.reset()
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
                swal("Success", "Change your password Was successful", "success");
                console.log('success')
            } else { 
                if(check == false){
                  this.$refs.form.reset()
                  this.show = false
                  swal("Error", "รหัสผ่านใหม่ที่กรอกเป็นรหัสเดิม", "error");
                } else {
                  this.$refs.form.reset()
                  this.show = false
                  swal("Error", check, "error");
                  console.log('error')
                }
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
        }
        
      }
    },
    computed: {
      passwordConfirmationRule() {
        return () => (this.dataPassword.newPassword === this.dataPassword.confirmNewPassword) || 'Password must match'
      }
    },
}
</script>

<style >
/* $background_color: #404142;

.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: auto;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    &#bp-right {
      background: url('/static/panorama.jpg') no-repeat top left;
      border-left: 1px solid #eee;
    }
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type='password'],
  input[type='text'] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
  }
  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .large-btn {
    width: 100%;
    background: white;
    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }
  
  
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }

}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
} */

</style>