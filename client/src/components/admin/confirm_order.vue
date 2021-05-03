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
                    <div class="head-profile">สินค้ารอการยืนยัน</div>
                    <v-card>
                      <v-data-table
                        :headers="header1"
                        
                      ></v-data-table>
                      
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
                        
                      ></v-data-table>
                      
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
export default {
  components: {
    Navbar,
  },
  data(){
    return {
      logs:[],
      header1: [
                { text: 'เลือกทั้งหมด',sortable: false,},
                { text: 'เลือก',sortable: false,},
                { text: 'รูปภาพประกอบ',sortable: false, value: '' },
                { text: 'ชื่อของรางวัล',sortable: false,value: ''},
                { text: 'แต้มที่ใช้',sortable: false, value: '' },
                
                
            ],
      
       header2: [
                { text: 'สถานะ',sortable: false,},
                { text: 'รูปภาพประกอบ',sortable: false, value: '' },
                { text: 'ชื่อของรางวัล',sortable: false,value: ''},
                { text: 'แต้มที่ใช้',sortable: false, value: '' },
                
                
            ],
    }
  },
  created: async function created() {
    await this.$http.get("/exchangeitem/ShowOrder")
    .then((res) => {
      this.logs = res.data
      console.log(this.logs)
    }).catch(function(err){
        console.log(err)
    })
  },
};
</script>

<style>
</style>