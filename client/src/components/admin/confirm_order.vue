<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
    <v-overlay :value="isloading">
        <v-progress-circular
          indeterminate
          size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
    <h1>ยืนยันคำสั่งการแลกของ</h1>
     <div class="container" >
          <v-card>
            <v-toolbar flat color="#cfd6ea" dark> </v-toolbar>
            <v-tabs>
              <v-tab>
                รอการยืนยัน
              </v-tab>
              <v-tab>
                ยืนยันแล้ว
              </v-tab>
              

               <v-tab-item>
                <v-card flat>
                  <v-container>
                    <v-card>
                      <v-data-table
                        v-model="selected"
                        :headers="header1"
                        :items="waitLogs"
                        item-key="_id"
                        show-select
                        class="elevation-1"
                        :items-per-page="10"
                        >
                       <template v-slot:top>
                         <v-toolbar flat>
                            <v-toolbar-title>สินค้ารอการยืนยัน</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-dialog
      persistent
      v-model="dialog"
      width="500"
    >
    <v-card>
        <v-card-title>
              <span class="headline">เพิ่มเลขพัสดุ</span>
            </v-card-title>

        <v-card-text>
          <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      outlined
                      v-model="editedItem.trackings_id"
                      label="ใส่เลขพัสดุ"
                    ></v-text-field>
                  </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
                            <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                              @click="confirmOrder"
                            >
                              ยืนยันออเดอร์
                            </v-btn>
                          </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                          
          <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                          </v-icon>
      
                        </template>

                      </v-data-table>
                    </v-card>
                  </v-container>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-container>
                    <v-card>
                      <v-data-table
                        :headers="header2"
                        :items="confirmLogs"
                        :items-per-page="10"
                      >
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>ยืนยันสินค้าเรียบร้อยแล้ว</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                         </template>
                      </v-data-table>
                      
                    </v-card>
                  </v-container>
                </v-card>
              </v-tab-item>
             
            </v-tabs>
            
          </v-card>
        </div>
  </div>
</template>

<script>
const Navbar = () => import("@/components/navbar/navbar");
import moment from "moment";
import swal from "sweetalert2";
export default {
  
  components: {
    Navbar,
  },
  data(){
    return {
      isloading: false,
      waitLogs:[],
      confirmLogs:[],
      selected: [],
      header1: [
                { text: 'วันที่สั่ง',value: 'date'},
                { text: 'ชื่อผู้สั่ง', value: 'name' },
                { text: 'เบอร์',sortable: false, value: 'phone' },
                { text: 'แขวง/ตำบล', value: 'Sub_District' },
                { text: 'เขต/อำเภอ', value: 'District' },
                { text: 'จังหวัด', value: 'province' },
                { text: 'รหัสไปรษณีย์', value: 'postcode' },
                { text: 'เลขพัสดุ',sortable: false, value: 'trackings_id' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
      
       header2: [
                { text: 'สถานะ',sortable: false, value: 'status'},
                { text: 'เลขพัสดุ',sortable: false, value: 'trackings_id' },
                { text: 'ชื่อผู้สั่ง', value: 'name' },
                { text: 'เบอร์',sortable: false, value: 'phone' },
                { text: 'แขวง/ตำบล', value: 'Sub_District' },
                { text: 'เขต/อำเภอ', value: 'District' },
                { text: 'จังหวัด', value: 'province' },
                { text: 'รหัสไปรษณีย์', value: 'postcode' },
                
                
            ],
            dialog: false,
             editedIndex: -1,
      editedItem: {
        trackings_id: '',
      },
      defaultItem:{
        trackings_id: '',
      },
            
    }
  },

  created: async function created() {
    await this.$http.get("/exchangeitem/DetailItem/"+ this.$route.params.id +"/ShowOrder")
    .then( async (res) => {
      this.waitLogs = res.data.waitingorder
      this.confirmLogs = res.data.confirmorder
      await this.changeFormatDate1()
      await this.changeFormatDate2()
    }).catch(function(err){
        console.log(err)
    })
  },
  methods:{
    async confirmOrder(){
      if(this.selected.length <= 0){
        swal.fire("เกิดข้อผิดผลาด", "กรุณาเลือกออเดอร์", "error");
      } else{
          this.isloading = true
          var formData = new URLSearchParams()
          var checkTracking = false
          // for(var key in this.selected){
          //   formData.append('AcceptList',this.selected[key])
          // }
          var count = 0
          this.selected.forEach( order =>{
              if(order.trackings_id !== '' || order.trackings_id !== '-'){
                formData.append("id", order._id);
                formData.append("trackings_id", order.trackings_id);
                count = count+1
              }else{
                checkTracking = true
              }
            })
            if(checkTracking){
              swal.fire("เกิดข้อผิดผลาด", "กรุณากรอกเลขพัสดุให้ครบ", "error");
            } else{
              formData.append("count", count);
              console.log(formData.getAll("id"))
              console.log(formData.getAll("trackings_id"))
              console.log(formData.getAll("count"))
              let kuy = await this.$http.post("exchangeitem/DetailItem/"+ this.$route.params.id +"/AcceptOrder", formData)
              console.log(kuy)
              this.isloading = false
              swal.fire("สำเร็จ", "ออเดอร์ได้รับการยืนยันแล้ว", "success");
            }
      }
    },
    changeFormatDate1(){
      console.log()
      if(this.waitLogs.length == 0){
        this.waitLogs.length = null
      } else{
        for (var i = 0;i<this.waitLogs.length; i++) {
          this.waitLogs[i]["actions"] = ''
          if(moment(this.waitLogs[i].date).format('dddd') == 'Monday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.waitLogs[i].date).format('dddd') == 'Tuesday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.waitLogs[i].date).format('dddd') == 'Wednesday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.waitLogs[i].date).format('dddd') == 'Thursday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.waitLogs[i].date).format('dddd') == 'Friday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.waitLogs[i].date).format('dddd') == 'Saturday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.waitLogs[i].date).format('dddd') == 'Sunday'){
                this.waitLogs[i].date = moment(this.waitLogs[i].date).format(" วันอาทิตย์ DD-MM-YY A");
              }
        }
      }
    },
    changeFormatDate2(){
      if(this.confirmLogs.length == 0){
        this.confirmLogs.length = null
      } else{
        for (var i = 0;i<this.confirmLogs.length; i++) {
          if(moment(this.confirmLogs[i].date).format('dddd') == 'Monday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.confirmLogs[i].date).format('dddd') == 'Tuesday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.confirmLogs[i].date).format('dddd') == 'Wednesday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.confirmLogs[i].date).format('dddd') == 'Thursday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.confirmLogs[i].date).format('dddd') == 'Friday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.confirmLogs[i].date).format('dddd') == 'Saturday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.confirmLogs[i].date).format('dddd') == 'Sunday'){
                this.confirmLogs[i].date = moment(this.confirmLogs[i].date).format(" วันอาทิตย์ DD-MM-YY A");
              }
        }
      }
    },
      close () {
        this.dialog = false
          this.editedItem = this.defaultItem
          this.editedIndex = -1
      },
      editItem (item) {
        this.editedIndex = this.waitLogs.indexOf(item)
        this.editedItem = item
        this.dialog = true
      },
      save () {
        if (this.editedIndex > -1) {
          this.waitLogs[this.editedIndex]['trackings_id'] = this.editedItem.trackings_id
        } else {
          this.waitLogs.push(this.editedItem)
        }
        this.close()
      },

  },
};
</script>

<style>
</style>