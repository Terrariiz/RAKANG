<template class="body">
  <div  >
    <v-container>
      <v-row>
        <v-col style="background-color:red;" cols="12" md="4" sm="12">
          <div style="text-align:right;"><v-btn  icon ><label style=" cursor: pointer;" for="file-input"><v-icon>mdi-pencil</v-icon></label></v-btn></div>
                                    <center><v-div style=""  class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span  v-if="!imageData"  class="placeholder">Choose an Image</span>
                                    <input  class="file-input" id="file-input"  ref="fileInput"  type="file"  @input="onSelectFile" >
                                </v-div></center>
          <div  class="img-profile">
            <img
                              style="display: flex"
                              :src="
                                'http://localhost:4000/image/profile/' +
                                dataUser.image
                              "
                              class="img-radius base-image-input"
                              alt="User-Profile-Image"
                            />
          </div>
          <hr>
                    <div class="name-sur">
                        <h6 style="font-size: 20px; color;blue;" class="f-w-600">
                           {{ dataUser.firstname }} {{ dataUser.lastname }}
                        </h6>
                        <h6 class="f-w-600">{{ dataUser.coin }} Coin</h6>
                    </div>
                    <!-- <div class="btn-log">
                        <v-btn small @click.stop="dialog_Logcoin=true">ประวัติการบริจาค</v-btn>
                        <Logcoin :visible="dialog_Logcoin" @close="dialog_Logcoin=false" />                     
                    </div>
                    <div class="btn-cpass">
                        <v-btn small @click.stop="dialog_ChangePassword=true">เปลี่ยนรหัสผ่าน</v-btn>
                        <ChangePassword :visible="dialog_ChangePassword" @close="dialog_ChangePassword=false" />                     
                    </div> -->
        </v-col>
        <v-col cols="12" md="8" sm="12">
          
          <div class="tab-section">
      <v-container>
        <h6 class="m-b-20 p-b-5 b-b-default f-w-600" style="font-size:20px;">Edit Profile</h6>
                                    
                                    <div class="row">
                                        
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">ชื่อ</p>
                                            <v-text-field single-line solo  v-model="dataUser.firstname"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">นามสกุล</p>
                                            <v-text-field single-line solo  v-model="dataUser.lastname"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">วัน/เดือน/ปีเกิด</p>
                                            <v-text-field type="date" single-line solo  v-model="dataUser.birthdate"></v-text-field>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                                            <v-text-field single-line solo  v-model="dataUser.phone"></v-text-field>
                                        </div>
                                        <!-- <div class="col-md-6">
                                            <v-btn type="submit" style="margin:1%; text-align:center;" to="/profile" color="error" dark>Cancel</v-btn>
                                            
                                        </div>
                                        <div class="col-md-6">
                                            
                                            <v-btn type="submit" style="margin:1% text-align:center;"  color="primary" dark>Edit</v-btn>
                                        </div> -->

                                        <v-row>
                                            <v-col cols="3" ></v-col>
                                            <v-col cols="3" >
                                                <v-btn type="submit" style="margin:1%; text-align:center;" to="/profile" color="error" dark>Cancel</v-btn>
                                            </v-col>
                                             <v-col cols="3" >
                                                <v-btn type="submit" style="margin:1% text-align:center;"  color="primary" dark>Edit</v-btn>
                                            </v-col>
                                            <v-col cols="3" ></v-col>
                                        </v-row>
                                    </div>

    
        
      </v-container>
  </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

//  import x from "../../../public/image/2.jpg"
export default {
  name: "Profile",
  data() {
    return {
      dataUser: {},
      dialog_ChangePassword: false,
      dialog_Logcoin: false,
      tab: null,
        items: [
          'รายละเอียดโปรไฟล์', 'ประวัติการบริจาค',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     search: '',
        headers: [
          {text: 'ชื่อแคมเปญ',value: 'Campaign',},
          { text: 'จำนวนเงินที่บริจาค(บาท)', value: 'amonut' },
          { text: 'วัน-เดือน-ปี', value: 'date' },
          
        ],
    }
  }
}
  
</script>

<style>
.img-profile{
  margin: 20px auto;
  width: 300px;
  height: 200px;
}
  .img-profile img{
    width:100%; 
    height:100%;
    margin-left: auto;
    margin-right: auto;
  }
  .name-sur{
    text-align: center;
  }
  .btn-log{
    margin: 20px auto;
    text-align: center;
  }
  .btn-cpass{
    margin: 20px auto;
    text-align: center;
  }
</style>