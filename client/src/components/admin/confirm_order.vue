<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
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
                    <div class="head-profile">สินค้ารอการยืนยัน </div>
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
            
                      </v-data-table>
                    </v-card>
                  </v-container>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-container>
                    <div class="head-profile">สินค้าที่ยืนยันแล้ว</div>
                    <v-card>
                      <v-data-table
                        :headers="header2"
                        :items="waitLogs"
                        :items-per-page="10"
                      ></v-data-table>
                      
                    </v-card>
                  </v-container>
                </v-card>
              </v-tab-item>
             
            </v-tabs>
            <v-btn @click="confirmOrder">ยืนยัน</v-btn>
          </v-card>
        </div>
  </div>
</template>

<script>
const Navbar = () => import("@/components/navbar/navbar");
import moment from "moment";
import swal from "sweetalert2";
import {
    mdiPencil,
    mdiDelete,
  } from '@mdi/js'
export default {
  
  components: {
    Navbar,
  },
  data(){
    return {
      waitLogs:[],
      confirmLogs:[],
      selected: [],
      items: {
        mdiPencil, 
        mdiDelete,
      },
      header1: [
                { text: 'วันที่สั่ง',value: 'date'},
                { text: 'ชื่อผู้สั่ง', value: 'name' },
                { text: 'เบอร์',sortable: false, value: 'phone' },
                { text: 'แขวง/ตำบล', value: 'Sub_District' },
                { text: 'เขต/อำเภอ', value: 'District' },
                { text: 'จังหวัด', value: 'province' },
                { text: 'รหัสไปรษณีย์', value: 'postcode' },
                { text: 'เลขพัสดุ',sortable: false, value: '' },
                { text: 'การจัดการ',sortable: false, value: 'actions' },
            ],
      
       header2: [
                { text: 'สถานะ',sortable: false, value: 'status'},
                { text: 'เลขพัสดุ',sortable: false, value: '' },
                { text: 'ชื่อผู้สั่ง', value: 'name' },
                { text: 'เบอร์',sortable: false, value: 'phone' },
                { text: 'แขวง/ตำบล', value: 'Sub_District' },
                { text: 'เขต/อำเภอ', value: 'District' },
                { text: 'จังหวัด', value: 'province' },
                { text: 'รหัสไปรษณีย์', value: 'postcode' },
                
                
            ],
            
            
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
          var formData = new URLSearchParams()
          this.selected.forEach( order =>{
              formData.append("AcceptList",order)
              // formData.append("id", order._id);
              // formData.append("name", order._id);
            })
          console.log(formData.getAll("AcceptList"))
          let kuy = await this.$http.post("/exchangeitem/DetailItem/"+ this.$route.params.id +"/AcceptOrder", formData)
          console.log(kuy)
      }
    },
    changeFormatDate1(){
      console.log()
      if(this.waitLogs.length == 0){
        this.waitLogs.length = null
      } else{
        for (var i = 0;i<this.waitLogs.length; i++) {
          console.log(moment(this.waitLogs[i].date).format('dddd'))
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
      console.log()
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
  },
};
</script>

<style>
</style>